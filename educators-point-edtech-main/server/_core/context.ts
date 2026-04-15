import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { supabase } from "../supabase";

export type User = {
  id: string;
  email: string | null;
  name: string | null;
  role: 'user' | 'admin';
};

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    const authHeader = opts.req.headers.authorization;
    if (authHeader && supabase) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user: supabaseUser }, error } = await supabase.auth.getUser(token);
      
      if (!error && supabaseUser) {
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', supabaseUser.id)
          .single();
        
        user = userData || {
          id: supabaseUser.id,
          email: supabaseUser.email || null,
          name: supabaseUser.user_metadata?.name || null,
          role: 'user' as const,
        };
      }
    }
  } catch (error) {
    console.warn('[Auth] Failed to authenticate request:', error);
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
