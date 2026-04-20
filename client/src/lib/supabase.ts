import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidUrl = (value: unknown) => {
  if (typeof value !== 'string' || !value.trim()) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const hasValidSupabaseConfig = Boolean(
  isValidUrl(supabaseUrl) &&
  typeof supabaseAnonKey === 'string' &&
  supabaseAnonKey.trim().length > 0
);

if (!hasValidSupabaseConfig) {
  console.error(
    '[Supabase] Invalid or missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. ' +
    'Set both values in your Render environment and rebuild.'
  );
}

// Use a valid fallback URL/key to keep the app bootable even with bad env config.
export const supabase = createClient(
  hasValidSupabaseConfig ? supabaseUrl : 'https://invalid.localhost',
  hasValidSupabaseConfig ? supabaseAnonKey : 'invalid-anon-key'
);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string | null;
          name: string | null;
          role: 'user' | 'admin';
          created_at: string;
          updated_at: string;
          last_signed_in: string;
        };
        Insert: {
          id?: string;
          email?: string | null;
          name?: string | null;
          role?: 'user' | 'admin';
          created_at?: string;
          updated_at?: string;
          last_signed_in?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          name?: string | null;
          role?: 'user' | 'admin';
          created_at?: string;
          updated_at?: string;
          last_signed_in?: string;
        };
      };
      enrollments: {
        Row: {
          id: number;
          name: string;
          email: string;
          mobile_no: string | null;
          gender: string | null;
          date_of_birth: string | null;
          city: string | null;
          state: string | null;
          district: string | null;
          place: string | null;
          current_status: string | null;
          profile_data: any;
          batch: string;
          batch_start_date: string;
          batch_end_date: string;
          price: number;
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          email_sent: number;
          created_at: string;
          updated_at: string;
        };
      };
      cms_content: {
        Row: {
          id: number;
          content_type: string;
          content_key: string;
          title: string | null;
          description: string | null;
          content: string | null;
          image_url: string | null;
          metadata: any;
          status: 'draft' | 'published';
          created_by: string;
          created_at: string;
          updated_at: string;
        };
      };
      analytics_events: {
        Row: {
          id: number;
          event_type: string;
          event_name: string;
          user_id: string | null;
          session_id: string;
          page_url: string | null;
          referrer: string | null;
          metadata: any;
          timestamp: string;
        };
      };
      calendar_events: {
        Row: {
          id: number;
          event_type: string;
          title: string;
          description: string | null;
          start_date: string;
          end_date: string;
          location: string | null;
          instructor_id: number | null;
          max_capacity: number | null;
          current_enrollment: number;
          status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
          metadata: any;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
      };
      crm_leads: {
        Row: {
          id: number;
          first_name: string;
          last_name: string | null;
          email: string;
          phone: string | null;
          source: string;
          status: 'new' | 'contacted' | 'interested' | 'qualified' | 'enrolled' | 'rejected';
          lead_score: number;
          notes: string | null;
          metadata: any;
          created_at: string;
          updated_at: string;
        };
      };
      lead_interactions: {
        Row: {
          id: number;
          lead_id: number;
          interaction_type: string;
          subject: string | null;
          message: string | null;
          status: string;
          created_by: string | null;
          created_at: string;
        };
      };
      mentors: {
        Row: {
          id: number;
          name: string;
          title: string;
          description: string | null;
          experience: string | null;
          focus: string | null;
          image_url: string | null;
          tag1: string | null;
          tag2: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          title: string;
          description?: string | null;
          experience?: string | null;
          focus?: string | null;
          image_url?: string | null;
          tag1?: string | null;
          tag2?: string | null;
          sort_order?: number;
          is_active?: boolean;
        };
        Update: {
          name?: string;
          title?: string;
          description?: string | null;
          experience?: string | null;
          focus?: string | null;
          image_url?: string | null;
          tag1?: string | null;
          tag2?: string | null;
          sort_order?: number;
          is_active?: boolean;
        };
      };
      reviews: {
        Row: {
          id: number;
          name: string;
          role: string;
          content: string;
          rating: number;
          image_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          role: string;
          content: string;
          rating?: number;
          image_url?: string | null;
          is_active?: boolean;
        };
        Update: {
          name?: string;
          role?: string;
          content?: string;
          rating?: number;
          image_url?: string | null;
          is_active?: boolean;
        };
      };
    };
  };
};
