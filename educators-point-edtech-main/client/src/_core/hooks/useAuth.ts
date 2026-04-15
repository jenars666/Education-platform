import { supabase } from "@/lib/supabase";
import { useCallback, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath = "/login" } = options ?? {};
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
    isAuthenticated: false,
  });

  const fetchUser = useCallback(async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      setState({
        user,
        loading: false,
        error: null,
        isAuthenticated: !!user,
      });
    } catch (error) {
      setState({
        user: null,
        loading: false,
        error: error as Error,
        isAuthenticated: false,
      });
    }
  }, []);

  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      await supabase.auth.signOut();
      setState({
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error as Error,
      }));
    }
  }, []);

  useEffect(() => {
    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        user: session?.user ?? null,
        loading: false,
        error: null,
        isAuthenticated: !!session?.user,
      });
    });

    return () => subscription.unsubscribe();
  }, [fetchUser]);

  useEffect(() => {
    if (!redirectOnUnauthenticated) return;
    if (state.loading) return;
    if (state.user) return;
    if (typeof window === "undefined") return;
    if (window.location.pathname === redirectPath) return;

    window.location.href = redirectPath;
  }, [redirectOnUnauthenticated, redirectPath, state.loading, state.user]);

  return {
    ...state,
    refresh: fetchUser,
    logout,
    signInWithGoogle: () => supabase.auth.signInWithOAuth({ provider: 'google' }),
    signInWithEmail: (email: string, password: string) => 
      supabase.auth.signInWithPassword({ email, password }),
    signUpWithEmail: (email: string, password: string) => 
      supabase.auth.signUp({ email, password }),
  };
}
