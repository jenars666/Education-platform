import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import { supabase } from "../supabase";

/**
 * CMS Content Management Router
 */
export const cmsRouter = router({
  getAll: adminProcedure
    .input(z.object({ contentType: z.string().optional() }).optional())
    .query(async ({ input }) => {
      if (!supabase) throw new Error("Database not available");

      let query = supabase.from('cms_content').select('*');
      if (input?.contentType) {
        query = query.eq('content_type', input.contentType);
      }
      
      const { data, error } = await query.order('updated_at', { ascending: false });
      if (error) throw error;
      return data || [];
    }),

  getById: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      if (!supabase) throw new Error("Database not available");

      const { data, error } = await supabase
        .from('cms_content')
        .select('*')
        .eq('id', input.id)
        .single();

      if (error) throw error;
      return data;
    }),

  create: adminProcedure
    .input(z.object({
      contentType: z.string(),
      contentKey: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
      content: z.string().optional(),
      imageUrl: z.string().optional(),
      metadata: z.any().optional(),
      status: z.enum(["draft", "published"]).default("draft"),
    }))
    .mutation(async ({ input, ctx }) => {
      if (!supabase) throw new Error("Database not available");

      const { data, error } = await supabase.from('cms_content').insert({
        content_type: input.contentType,
        content_key: input.contentKey,
        title: input.title,
        description: input.description,
        content: input.content,
        image_url: input.imageUrl,
        metadata: input.metadata,
        status: input.status,
        created_by: ctx.user?.id || '',
      }).select().single();

      if (error) throw error;
      return data;
    }),

  update: adminProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
      description: z.string().optional(),
      content: z.string().optional(),
      imageUrl: z.string().optional(),
      metadata: z.any().optional(),
      status: z.enum(["draft", "published"]).optional(),
    }))
    .mutation(async ({ input }) => {
      if (!supabase) throw new Error("Database not available");

      const { id, ...updates } = input;
      const updateData: any = {};
      if (updates.title) updateData.title = updates.title;
      if (updates.description) updateData.description = updates.description;
      if (updates.content) updateData.content = updates.content;
      if (updates.imageUrl) updateData.image_url = updates.imageUrl;
      if (updates.metadata) updateData.metadata = updates.metadata;
      if (updates.status) updateData.status = updates.status;

      const { error } = await supabase
        .from('cms_content')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      if (!supabase) throw new Error("Database not available");

      const { error } = await supabase
        .from('cms_content')
        .delete()
        .eq('id', input.id);

      if (error) throw error;
      return { success: true };
    }),

  publish: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      if (!supabase) throw new Error("Database not available");

      const { error } = await supabase
        .from('cms_content')
        .update({ status: 'published' })
        .eq('id', input.id);

      if (error) throw error;
      return { success: true };
    }),
});

/**
 * Analytics Router
 */
export const analyticsRouter = router({
  trackEvent: adminProcedure
    .input(z.object({
      eventType: z.string(),
      eventName: z.string(),
      sessionId: z.string(),
      pageUrl: z.string().optional(),
      referrer: z.string().optional(),
      metadata: z.any().optional(),
    }))
    .mutation(async ({ input }) => {
      if (!supabase) throw new Error("Database not available");

      const { error } = await supabase.from('analytics_events').insert({
        event_type: input.eventType,
        event_name: input.eventName,
        session_id: input.sessionId,
        page_url: input.pageUrl,
        referrer: input.referrer,
        metadata: input.metadata,
      });

      if (error) throw error;
      return { success: true };
    }),

  getSummary: adminProcedure
    .input(z.object({
      startDate: z.date().optional(),
      endDate: z.date().optional(),
    }).optional())
    .query(async ({ input }) => {
      if (!supabase) throw new Error("Database not available");

      let query = supabase.from('analytics_events').select('*');

      if (input?.startDate && input?.endDate) {
        query = query
          .gte('timestamp', input.startDate.toISOString())
          .lte('timestamp', input.endDate.toISOString());
      }

      const { data: events, error } = await query;
      if (error) throw error;

      const pageViews = events?.filter(e => e.event_type === 'page_view').length || 0;
      const ctaClicks = events?.filter(e => e.event_type === 'cta_click').length || 0;
      const formSubmits = events?.filter(e => e.event_type === 'form_submit').length || 0;

      return {
        totalEvents: events?.length || 0,
        pageViews,
        ctaClicks,
        formSubmits,
        conversionRate: formSubmits > 0 ? ((formSubmits / pageViews) * 100).toFixed(2) : "0",
      };
    }),

  getEventsByType: adminProcedure
    .input(z.object({
      eventType: z.string(),
      limit: z.number().default(100),
    }))
    .query(async ({ input }) => {
      if (!supabase) throw new Error("Database not available");

      const { data, error } = await supabase
        .from('analytics_events')
        .select('*')
        .eq('event_type', input.eventType)
        .order('timestamp', { ascending: false })
        .limit(input.limit);

      if (error) throw error;
      return data || [];
    }),
});

/**
 * Calendar Router
 */
export const calendarRouter = router({
  getAll: adminProcedure.query(async () => {
    if (!supabase) throw new Error("Database not available");

    const { data, error } = await supabase
      .from('calendar_events')
      .select('*')
      .order('start_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }),

  getByDateRange: adminProcedure
    .input(z.object({
      startDate: z.date(),
      endDate: z.date(),
    }))
    .query(async ({ input }) => {
      if (!supabase) throw new Error("Database not available");

      const { data, error } = await supabase
        .from('calendar_events')
        .select('*')
        .gte('start_date', input.startDate.toISOString())
        .lte('end_date', input.endDate.toISOString())
        .order('start_date', { ascending: true });

      if (error) throw error;
      return data || [];
    }),

  create: adminProcedure
    .input(z.object({
      eventType: z.string(),
      title: z.string(),
      description: z.string().optional(),
      startDate: z.date(),
      endDate: z.date(),
      location: z.string().optional(),
      instructorId: z.number().optional(),
      maxCapacity: z.number().optional(),
      metadata: z.any().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      if (!supabase) throw new Error("Database not available");

      const { data, error } = await supabase.from('calendar_events').insert({
        event_type: input.eventType,
        title: input.title,
        description: input.description,
        start_date: input.startDate.toISOString(),
        end_date: input.endDate.toISOString(),
        location: input.location,
        instructor_id: input.instructorId,
        max_capacity: input.maxCapacity,
        metadata: input.metadata,
        created_by: ctx.user?.id || '',
      }).select().single();

      if (error) throw error;
      return data;
    }),

  update: adminProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
      description: z.string().optional(),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
      location: z.string().optional(),
      status: z.enum(["scheduled", "ongoing", "completed", "cancelled"]).optional(),
    }))
    .mutation(async ({ input }) => {
      if (!supabase) throw new Error("Database not available");

      const { id, ...updates } = input;
      const updateData: any = {};
      if (updates.title) updateData.title = updates.title;
      if (updates.description) updateData.description = updates.description;
      if (updates.startDate) updateData.start_date = updates.startDate.toISOString();
      if (updates.endDate) updateData.end_date = updates.endDate.toISOString();
      if (updates.location) updateData.location = updates.location;
      if (updates.status) updateData.status = updates.status;

      const { error } = await supabase
        .from('calendar_events')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      if (!supabase) throw new Error("Database not available");

      const { error } = await supabase
        .from('calendar_events')
        .delete()
        .eq('id', input.id);

      if (error) throw error;
      return { success: true };
    }),
});

/**
 * CRM Router
 */
export const crmRouter = router({
  getAll: adminProcedure
    .input(z.object({
      status: z.string().optional(),
      source: z.string().optional(),
    }).optional())
    .query(async ({ input }) => {
      if (!supabase) throw new Error("Database not available");

      let query = supabase.from('crm_leads').select('*');
      
      if (input?.status) {
        query = query.eq('status', input.status);
      }
      if (input?.source) {
        query = query.eq('source', input.source);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    }),

  getById: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      if (!supabase) throw new Error("Database not available");

      const { data: lead, error: leadError } = await supabase
        .from('crm_leads')
        .select('*')
        .eq('id', input.id)
        .single();

      if (leadError) throw leadError;

      const { data: interactions, error: intError } = await supabase
        .from('lead_interactions')
        .select('*')
        .eq('lead_id', input.id)
        .order('created_at', { ascending: false });

      if (intError) throw intError;

      return { ...lead, interactions: interactions || [] };
    }),

  create: adminProcedure
    .input(z.object({
      firstName: z.string(),
      lastName: z.string().optional(),
      email: z.string().email(),
      phone: z.string().optional(),
      source: z.string(),
      status: z.enum(["new", "contacted", "interested", "qualified", "enrolled", "rejected"]).default("new"),
      leadScore: z.number().default(0),
      notes: z.string().optional(),
      metadata: z.any().optional(),
    }))
    .mutation(async ({ input }) => {
      if (!supabase) throw new Error("Database not available");

      const { data, error } = await supabase.from('crm_leads').insert({
        first_name: input.firstName,
        last_name: input.lastName,
        email: input.email,
        phone: input.phone,
        source: input.source,
        status: input.status,
        lead_score: input.leadScore,
        notes: input.notes,
        metadata: input.metadata,
      }).select().single();

      if (error) throw error;
      return data;
    }),

  update: adminProcedure
    .input(z.object({
      id: z.number(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      status: z.enum(["new", "contacted", "interested", "qualified", "enrolled", "rejected"]).optional(),
      leadScore: z.number().optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      if (!supabase) throw new Error("Database not available");

      const { id, ...updates } = input;
      const updateData: any = {};
      if (updates.firstName) updateData.first_name = updates.firstName;
      if (updates.lastName) updateData.last_name = updates.lastName;
      if (updates.email) updateData.email = updates.email;
      if (updates.phone) updateData.phone = updates.phone;
      if (updates.status) updateData.status = updates.status;
      if (updates.leadScore !== undefined) updateData.lead_score = updates.leadScore;
      if (updates.notes) updateData.notes = updates.notes;

      const { error } = await supabase
        .from('crm_leads')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      if (!supabase) throw new Error("Database not available");

      const { error } = await supabase
        .from('crm_leads')
        .delete()
        .eq('id', input.id);

      if (error) throw error;
      return { success: true };
    }),

  addInteraction: adminProcedure
    .input(z.object({
      leadId: z.number(),
      interactionType: z.string(),
      subject: z.string().optional(),
      message: z.string().optional(),
      status: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      if (!supabase) throw new Error("Database not available");

      const { data, error } = await supabase.from('lead_interactions').insert({
        lead_id: input.leadId,
        interaction_type: input.interactionType,
        subject: input.subject,
        message: input.message,
        status: input.status,
        created_by: ctx.user?.id || null,
      }).select().single();

      if (error) throw error;
      return data;
    }),

  getStats: adminProcedure.query(async () => {
    if (!supabase) throw new Error("Database not available");

    const { data: leads, error } = await supabase
      .from('crm_leads')
      .select('status, lead_score');

    if (error) throw error;

    const totalLeads = leads?.length || 0;
    const qualifiedLeads = leads?.filter(l => l.status === 'qualified').length || 0;
    const enrolledLeads = leads?.filter(l => l.status === 'enrolled').length || 0;
    const avgLeadScore = totalLeads > 0
      ? Math.round(leads!.reduce((sum, l) => sum + l.lead_score, 0) / totalLeads)
      : 0;

    return {
      totalLeads,
      qualifiedLeads,
      enrolledLeads,
      avgLeadScore,
      conversionRate: totalLeads > 0 ? ((enrolledLeads / totalLeads) * 100).toFixed(2) : "0",
    };
  }),
});

/**
 * Enrollment Router
 */
export const enrollmentRouter = router({
  getAll: publicProcedure.query(async () => {
    if (!supabase) throw new Error("Database not available");

    const { data, error } = await supabase
      .from('enrollments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }),

  getById: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      if (!supabase) throw new Error("Database not available");

      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('id', input.id)
        .single();

      if (error) throw error;
      return data;
    }),

  updateStatus: adminProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
    }))
    .mutation(async ({ input }) => {
      if (!supabase) throw new Error("Database not available");

      const { error } = await supabase
        .from('enrollments')
        .update({ status: input.status })
        .eq('id', input.id);

      if (error) throw error;
      return { success: true };
    }),
});
