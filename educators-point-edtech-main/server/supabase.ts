import { createClient } from '@supabase/supabase-js';
import type { Database } from '../client/src/lib/supabase';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('[Supabase] Missing environment variables');
}

export const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient<Database>(supabaseUrl, supabaseServiceKey)
  : null;

export async function getUserById(userId: string) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('[Database] Failed to get user:', error);
    return null;
  }
  return data;
}

export async function upsertUser(user: Database['public']['Tables']['users']['Insert']) {
  if (!supabase) return;
  const { error } = await supabase
    .from('users')
    .upsert(user);
  
  if (error) {
    console.error('[Database] Failed to upsert user:', error);
  }
}

export async function getCmsContentByType(contentType: string) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('cms_content')
    .select('*')
    .eq('content_type', contentType)
    .eq('status', 'published');
  
  if (error) {
    console.error('[Database] Failed to get CMS content:', error);
    return [];
  }
  return data || [];
}

export async function getAnalyticsEventsByType(eventType: string, limit: number = 100) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('analytics_events')
    .select('*')
    .eq('event_type', eventType)
    .order('timestamp', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('[Database] Failed to get analytics events:', error);
    return [];
  }
  return data || [];
}

export async function getCalendarEventsByDateRange(startDate: Date, endDate: Date) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('calendar_events')
    .select('*')
    .gte('start_date', startDate.toISOString())
    .lte('end_date', endDate.toISOString())
    .order('start_date', { ascending: true });
  
  if (error) {
    console.error('[Database] Failed to get calendar events:', error);
    return [];
  }
  return data || [];
}

export async function getCrmLeadsByStatus(status: string) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('crm_leads')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('[Database] Failed to get CRM leads:', error);
    return [];
  }
  return data || [];
}

export async function getCrmLeadWithInteractions(leadId: number) {
  if (!supabase) return null;
  
  const { data: lead, error: leadError } = await supabase
    .from('crm_leads')
    .select('*')
    .eq('id', leadId)
    .single();
  
  if (leadError || !lead) {
    console.error('[Database] Failed to get CRM lead:', leadError);
    return null;
  }

  const { data: interactions, error: interactionsError } = await supabase
    .from('lead_interactions')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });
  
  if (interactionsError) {
    console.error('[Database] Failed to get lead interactions:', interactionsError);
  }

  return { ...lead, interactions: interactions || [] };
}

export async function getCrmLeadStats() {
  if (!supabase) {
    return {
      totalLeads: 0,
      qualifiedLeads: 0,
      enrolledLeads: 0,
      avgLeadScore: 0,
      conversionRate: "0",
    };
  }

  const { data: leads, error } = await supabase
    .from('crm_leads')
    .select('status, lead_score');
  
  if (error || !leads) {
    console.error('[Database] Failed to get CRM lead stats:', error);
    return {
      totalLeads: 0,
      qualifiedLeads: 0,
      enrolledLeads: 0,
      avgLeadScore: 0,
      conversionRate: "0",
    };
  }

  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter(l => l.status === 'qualified').length;
  const enrolledLeads = leads.filter(l => l.status === 'enrolled').length;
  const avgLeadScore = totalLeads > 0
    ? Math.round(leads.reduce((sum, l) => sum + l.lead_score, 0) / totalLeads)
    : 0;

  return {
    totalLeads,
    qualifiedLeads,
    enrolledLeads,
    avgLeadScore,
    conversionRate: totalLeads > 0 ? ((enrolledLeads / totalLeads) * 100).toFixed(2) : "0",
  };
}

export async function getEnrollmentsByStatus(status: string) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('enrollments')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('[Database] Failed to get enrollments:', error);
    return [];
  }
  return data || [];
}
