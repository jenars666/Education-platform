import { createClient } from "@supabase/supabase-js";
import { ENV } from "./env";

/**
 * Supabase Auth Client
 * Handles all authentication with Supabase Auth (Google OAuth, Email/Password)
 */

const supabaseUrl = ENV.supabaseUrl;
const supabaseAnonKey = ENV.supabaseAnonKey;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "[Supabase] ERROR: Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables"
  );
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAuth = {
  /**
   * Exchange authorization code for session (after OAuth redirect)
   */
  async exchangeCodeForSession(code: string) {
    return await supabase.auth.exchangeCodeForSession(code);
  },

  /**
   * Get Google OAuth URL for login
   */
  async getGoogleAuthUrl() {
    return await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.API_URL || "http://localhost:5173"}/api/auth/callback`,
      },
    });
  },

  /**
   * Sign in with email and password
   */
  async signInWithEmail(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  /**
   * Sign up with email and password
   */
  async signUpWithEmail(email: string, password: string, userData?: any) {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: `${process.env.API_URL || "http://localhost:5173"}/auth/verify`,
      },
    });
  },

  /**
   * Verify session with access token
   */
  async verifySession(accessToken: string) {
    return await supabase.auth.getSession();
  },

  /**
   * Get user by access token
   */
  async getUserFromToken(accessToken: string) {
    const { data, error } = await supabase.auth.getUser(accessToken);
    return { user: data.user, error };
  },

  /**
   * Sign out
   */
  async signOut() {
    return await supabase.auth.signOut();
  },
};
