import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { supabaseAuth } from "./supabaseAuth";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

export function registerOAuthRoutes(app: Express) {
  /**
   * Supabase OAuth callback handler
   * Supabase redirects here after user authenticates
   */
  app.get("/api/auth/callback", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");

    if (!code) {
      res.status(400).json({ error: "Authorization code is required" });
      return;
    }

    try {
      // Exchange code for session
      const { data, error } = await supabaseAuth.exchangeCodeForSession(code);

      if (error || !data.session) {
        console.error("[Auth] Session exchange failed:", error);
        res.status(400).json({ error: "Authentication failed" });
        return;
      }

      const user = data.session.user;

      // Upsert user in our database
      if (user.email) {
        await db.upsertUser({
          id: user.id as any,
          email: user.email,
          name: user.user_metadata?.full_name || user.email.split("@")[0],
          loginMethod: user.identities?.[0]?.provider || "email",
          lastSignedIn: new Date(),
        } as any);
      }

      // Store session token in cookie
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, data.session.access_token, {
        ...cookieOptions,
        maxAge: ONE_YEAR_MS,
      });

      res.redirect(302, "/");
    } catch (error) {
      console.error("[Auth] Callback failed", error);
      res.status(500).json({ error: "Authentication callback failed" });
    }
  });

  /**
   * Google OAuth login endpoint
   */
  app.get("/api/auth/google", async (req: Request, res: Response) => {
    try {
      const { data, error } = await supabaseAuth.getGoogleAuthUrl();

      if (error || !data.url) {
        console.error("[Auth] Failed to get Google auth URL:", error);
        res.status(500).json({ error: "Failed to initialize Google login" });
        return;
      }

      res.redirect(302, data.url);
    } catch (error) {
      console.error("[Auth] Google login failed", error);
      res.status(500).json({ error: "Google login failed" });
    }
  });

  /**
   * Email login
   */
  app.post("/api/auth/email-signin", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    try {
      const { data, error } = await supabaseAuth.signInWithEmail(email, password);

      if (error || !data.session) {
        console.error("[Auth] Email sign-in failed:", error);
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      const user = data.session.user;

      // Upsert user
      if (user.email) {
        await db.upsertUser({
          id: user.id as any,
          email: user.email,
          name: user.user_metadata?.full_name || user.email.split("@")[0],
          loginMethod: "email",
          lastSignedIn: new Date(),
        } as any);
      }

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, data.session.access_token, {
        ...cookieOptions,
        maxAge: ONE_YEAR_MS,
      });

      res.json({ success: true, user: data.user });
    } catch (error) {
      console.error("[Auth] Email sign-in error", error);
      res.status(500).json({ error: "Sign-in failed" });
    }
  });

  /**
   * Logout endpoint
   */
  app.post("/api/auth/logout", async (req: Request, res: Response) => {
    try {
      res.clearCookie(COOKIE_NAME);
      res.json({ success: true });
    } catch (error) {
      console.error("[Auth] Logout failed", error);
      res.status(500).json({ error: "Logout failed" });
    }
  });
}
