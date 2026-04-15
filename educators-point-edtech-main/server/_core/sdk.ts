import { COOKIE_NAME } from "@shared/const";
import { ForbiddenError } from "@shared/_core/errors";
import { parse as parseCookieHeader } from "cookie";
import type { Request } from "express";
import type { User } from "../../drizzle/schema";
import * as db from "../db";
import { supabaseAuth } from "./supabaseAuth";

/**
 * Simplified SDK for Supabase Auth
 * Replaces custom JWT and OAuth logic with Supabase session management
 */

export type SessionPayload = {
  userId: string;
  email: string;
};

class SDKServer {
  /**
   * Extract and verify access token from request
   */
  async verifyRequest(req: Request): Promise<User | null> {
    try {
      const cookies = parseCookieHeader(req.headers.cookie || "");
      const accessToken = cookies[COOKIE_NAME];

      if (!accessToken) {
        return null;
      }

      // Verify token with Supabase
      const { user, error } = await supabaseAuth.getUserFromToken(accessToken);

      if (error || !user) {
        console.warn("[SDK] Token verification failed:", error);
        return null;
      }

      // Get user from database
      const dbUser = await db.getUserById(user.id);
      return dbUser;
    } catch (error) {
      console.error("[SDK] Request verification failed:", error);
      return null;
    }
  }

  /**
   * Ensure user is authenticated
   */
  async ensureAuth(req: Request): Promise<User> {
    const user = await this.verifyRequest(req);

    if (!user) {
      throw new ForbiddenError("Unauthorized");
    }

    return user;
  }

  /**
   * Get session info from request
   */
  async getSession(req: Request): Promise<SessionPayload | null> {
    const user = await this.verifyRequest(req);

    if (!user) {
      return null;
    }

    return {
      userId: user.id,
      email: user.email,
    };
  }

  /**
   * Check if user is admin
   */
  async isAdmin(req: Request): Promise<boolean> {
    try {
      const user = await this.verifyRequest(req);
      return user?.role === "admin" ?? false;
    } catch {
      return false;
    }
  }

  /**
   * Get user info
   */
  async getUserInfo(req: Request): Promise<User | null> {
    return await this.verifyRequest(req);
  }

  /**
   * Authenticate request (wrapper for compatibility)
   */
  async authenticateRequest(req: Request): Promise<User> {
    return this.ensureAuth(req);
  }
}

export const sdk = new SDKServer();
import { COOKIE_NAME } from "@shared/const";
import { ForbiddenError } from "@shared/_core/errors";
import { parse as parseCookieHeader } from "cookie";
import type { Request } from "express";
import type { User } from "../../drizzle/schema";
import * as db from "../db";
import { supabaseAuth } from "./supabaseAuth";

/**
 * Simplified SDK for Supabase Auth
 * Replaces custom JWT and OAuth logic with Supabase session management
 */

export type SessionPayload = {
  userId: string;
  email: string;
};

class SDKServer {
  /**
   * Extract and verify access token from request
   */
  async verifyRequest(req: Request): Promise<User | null> {
    try {
      const cookies = parseCookieHeader(req.headers.cookie || "");
      const accessToken = cookies[COOKIE_NAME];

      if (!accessToken) {
        return null;
      }

      // Verify token with Supabase
      const { user, error } = await supabaseAuth.getUserFromToken(accessToken);

      if (error || !user) {
        console.warn("[SDK] Token verification failed:", error);
        return null;
      }

      // Get user from database
      const dbUser = await db.getUserById(user.id);
      return dbUser;
    } catch (error) {
      console.error("[SDK] Request verification failed:", error);
      return null;
    }
  }

  /**
   * Ensure user is authenticated
   */
  async ensureAuth(req: Request): Promise<User> {
    const user = await this.verifyRequest(req);

    if (!user) {
      throw new ForbiddenError("Unauthorized");
    }

    return user;
  }

  /**
   * Get session info from request
   */
  async getSession(req: Request): Promise<SessionPayload | null> {
    const user = await this.verifyRequest(req);

    if (!user) {
      return null;
    }

    return {
      userId: user.id,
      email: user.email,
    };
  }

  /**
   * Check if user is admin
   */
  async isAdmin(req: Request): Promise<boolean> {
    try {
      const user = await this.verifyRequest(req);
      return user?.role === "admin" ?? false;
    } catch {
      return false;
    }
  }

  /**
   * Get user info
   */
  async getUserInfo(req: Request): Promise<User | null> {
    return await this.verifyRequest(req);
  }

  /**
   * Authenticate request (wrapper for compatibility)
   */
  async authenticateRequest(req: Request): Promise<User> {
    return this.ensureAuth(req);
  }
}

export const sdk = new SDKServer();


  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(
    code: string,
    state: string
  ): Promise<ExchangeTokenResponse> {
    return this.oauthService.getTokenByCode(code, state);
  }

  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken: string): Promise<GetUserInfoResponse> {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken,
    } as ExchangeTokenResponse);
    const loginMethod = this.deriveLoginMethod(
      (data as any)?.platforms,
      (data as any)?.platform ?? data.platform ?? null
    );
    return {
      ...(data as any),
      platform: loginMethod,
      loginMethod,
    } as GetUserInfoResponse;
  }

  private parseCookies(cookieHeader: string | undefined) {
    if (!cookieHeader) {
      return new Map<string, string>();
    }

    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }

  private getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }

  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(
    openId: string,
    options: { expiresInMs?: number; name?: string } = {}
  ): Promise<string> {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || "",
      },
      options
    );
  }

  async signSession(
    payload: SessionPayload,
    options: { expiresInMs?: number } = {}
  ): Promise<string> {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1000);
    const secretKey = this.getSessionSecret();

    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name,
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(expirationSeconds)
      .sign(secretKey);
  }

  async verifySession(
    cookieValue: string | undefined | null
  ): Promise<{ openId: string; appId: string; name: string } | null> {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }

    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"],
      });
      const { openId, appId, name } = payload as Record<string, unknown>;

      if (
        !isNonEmptyString(openId) ||
        !isNonEmptyString(appId) ||
        !isNonEmptyString(name)
      ) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }

      return {
        openId,
        appId,
        name,
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }

  async getUserInfoWithJwt(
    jwtToken: string
  ): Promise<GetUserInfoWithJwtResponse> {
    const payload: GetUserInfoWithJwtRequest = {
      jwtToken,
      projectId: ENV.appId,
    };

    const { data } = await this.client.post<GetUserInfoWithJwtResponse>(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );

    const loginMethod = this.deriveLoginMethod(
      (data as any)?.platforms,
      (data as any)?.platform ?? data.platform ?? null
    );
    return {
      ...(data as any),
      platform: loginMethod,
      loginMethod,
    } as GetUserInfoWithJwtResponse;
  }

  async authenticateRequest(req: Request): Promise<User> {
    // Regular authentication flow
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);

    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }

    const sessionUserId = session.openId;
    const signedInAt = new Date();
    let user = await db.getUserByOpenId(sessionUserId);

    // If user not in DB, sync from OAuth server automatically
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        await db.upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt,
        });
        user = await db.getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }

    if (!user) {
      throw ForbiddenError("User not found");
    }

    await db.upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt,
    });

    return user;
  }
}

export const sdk = new SDKServer();
