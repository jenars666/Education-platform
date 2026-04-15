import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
    };
  };
};
