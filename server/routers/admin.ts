import { z } from "zod";
import { adminProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { 
  cmsContent, 
  analyticsEvents, 
  calendarEvents, 
  crmLeads, 
  leadInteractions,
  enrollments 
} from "../../drizzle/schema";
import { eq, desc, and, gte, lte, SQL } from "drizzle-orm";

/**
 * CMS Content Management Router
 */
export const cmsRouter = router({
  // Get all CMS content with optional filtering
  getAll: adminProcedure
    .input(z.object({ contentType: z.string().optional() }).optional())
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const conditions = [];
      if (input?.contentType) {
        conditions.push(eq(cmsContent.contentType, input.contentType));
      }
      
      let query = db.select().from(cmsContent) as any;
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
      return await query.orderBy(desc(cmsContent.updatedAt));
    }),

  // Get single content item
  getById: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db
        .select()
        .from(cmsContent)
        .where(eq(cmsContent.id, input.id))
        .limit(1);

      return result[0] || null;
    }),

  // Create new content
  create: adminProcedure
    .input(z.object({
      contentType: z.string(),
      contentKey: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
      content: z.string().optional(),
      imageUrl: z.string().optional(),
      metadata: z.string().optional(),
      status: z.enum(["draft", "published"]).default("draft"),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db.insert(cmsContent).values({
        ...input,
        createdBy: ctx.user?.id || 1,
      });

      return { id: result[0].insertId, ...input };
    }),

  // Update content
  update: adminProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
      description: z.string().optional(),
      content: z.string().optional(),
      imageUrl: z.string().optional(),
      metadata: z.string().optional(),
      status: z.enum(["draft", "published"]).optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const { id, ...updates } = input;
      await db.update(cmsContent).set(updates).where(eq(cmsContent.id, id));

      return { success: true };
    }),

  // Delete content
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.delete(cmsContent).where(eq(cmsContent.id, input.id));
      return { success: true };
    }),

  // Publish content
  publish: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .update(cmsContent)
        .set({ status: "published" })
        .where(eq(cmsContent.id, input.id));

      return { success: true };
    }),
});

/**
 * Analytics Router
 */
export const analyticsRouter = router({
  // Track event
  trackEvent: adminProcedure
    .input(z.object({
      eventType: z.string(),
      eventName: z.string(),
      sessionId: z.string(),
      pageUrl: z.string().optional(),
      referrer: z.string().optional(),
      metadata: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.insert(analyticsEvents).values(input);
      return { success: true };
    }),

  // Get analytics summary
  getSummary: adminProcedure
    .input(z.object({
      startDate: z.date().optional(),
      endDate: z.date().optional(),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      let query = db.select().from(analyticsEvents) as any;

      if (input?.startDate && input?.endDate) {
        query = query.where(
          and(
            gte(analyticsEvents.timestamp, input.startDate),
            lte(analyticsEvents.timestamp, input.endDate)
          )
        );
      }

      const events = await query;

      // Calculate summary stats
      const pageViews = events.filter((e: any) => e.eventType === "page_view").length;
      const ctaClicks = events.filter((e: any) => e.eventType === "cta_click").length;
      const formSubmits = events.filter((e: any) => e.eventType === "form_submit").length;

      return {
        totalEvents: events.length,
        pageViews,
        ctaClicks,
        formSubmits,
        conversionRate: formSubmits > 0 ? ((formSubmits / pageViews) * 100).toFixed(2) : "0",
      };
    }),

  // Get events by type
  getEventsByType: adminProcedure
    .input(z.object({
      eventType: z.string(),
      limit: z.number().default(100),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      return await (db
        .select()
        .from(analyticsEvents)
        .where(eq(analyticsEvents.eventType, input.eventType))
        .orderBy(desc(analyticsEvents.timestamp))
        .limit(input.limit) as any);
    }),
});

/**
 * Calendar Router
 */
export const calendarRouter = router({
  // Get all events
  getAll: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    return await db
      .select()
      .from(calendarEvents)
      .orderBy(desc(calendarEvents.startDate));
  }),

  // Get events by date range
  getByDateRange: adminProcedure
    .input(z.object({
      startDate: z.date(),
      endDate: z.date(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      return await db
        .select()
        .from(calendarEvents)
        .where(
          and(
            gte(calendarEvents.startDate, input.startDate),
            lte(calendarEvents.endDate, input.endDate)
          )
        )
        .orderBy(calendarEvents.startDate);
    }),

  // Create event
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
      metadata: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db.insert(calendarEvents).values({
        ...input,
        createdBy: ctx.user?.id || 1,
      });

      return { id: result[0].insertId, ...input };
    }),

  // Update event
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
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const { id, ...updates } = input;
      await db.update(calendarEvents).set(updates).where(eq(calendarEvents.id, id));

      return { success: true };
    }),

  // Delete event
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.delete(calendarEvents).where(eq(calendarEvents.id, input.id));
      return { success: true };
    }),
});

/**
 * CRM Router
 */
export const crmRouter = router({
  // Get all leads
  getAll: adminProcedure
    .input(z.object({
      status: z.string().optional(),
      source: z.string().optional(),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const conditions = [];
      if (input?.status) {
        conditions.push(eq(crmLeads.status, input.status as any));
      }
      if (input?.source) {
        conditions.push(eq(crmLeads.source, input.source));
      }

      let query = db.select().from(crmLeads) as any;
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }

      return await query.orderBy(desc(crmLeads.createdAt));
    }),

  // Get lead by ID with interactions
  getById: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const lead = await db
        .select()
        .from(crmLeads)
        .where(eq(crmLeads.id, input.id))
        .limit(1);

      if (!lead.length) return null;

      const interactions = await db
        .select()
        .from(leadInteractions)
        .where(eq(leadInteractions.leadId, input.id))
        .orderBy(desc(leadInteractions.createdAt));

      return { ...lead[0], interactions };
    }),

  // Create lead
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
      metadata: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db.insert(crmLeads).values(input);
      return { id: result[0].insertId, ...input };
    }),

  // Update lead
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
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const { id, ...updates } = input;
      await db.update(crmLeads).set(updates).where(eq(crmLeads.id, id));

      return { success: true };
    }),

  // Delete lead
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.delete(crmLeads).where(eq(crmLeads.id, input.id));
      return { success: true };
    }),

  // Add interaction
  addInteraction: adminProcedure
    .input(z.object({
      leadId: z.number(),
      interactionType: z.string(),
      subject: z.string().optional(),
      message: z.string().optional(),
      status: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db.insert(leadInteractions).values({
        ...input,
        createdBy: ctx.user?.id || 1,
      });

      return { id: result[0].insertId, ...input };
    }),

  // Get lead statistics
  getStats: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const leads = await (db.select() as any).from(crmLeads);
    const totalLeads = leads.length;
    const qualifiedLeads = leads.filter((l: any) => l.status === "qualified").length;
    const enrolledLeads = leads.filter((l: any) => l.status === "enrolled").length;
    const avgLeadScore = leads.length > 0
      ? Math.round(leads.reduce((sum: number, l: any) => sum + l.leadScore, 0) / leads.length)
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
 * Enrollment Router for tracking enrollments and linking to CRM
 */
export const enrollmentRouter = router({
  // Get all enrollments
  getAll: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    return await db
      .select()
      .from(enrollments)
      .orderBy(desc(enrollments.createdAt));
  }),

  // Get enrollment by ID
  getById: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const result = await db
        .select()
        .from(enrollments)
        .where(eq(enrollments.id, input.id))
        .limit(1);

      return result[0] || null;
    }),

  // Update enrollment status
  updateStatus: adminProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .update(enrollments)
        .set({ status: input.status })
        .where(eq(enrollments.id, input.id));

      return { success: true };
    }),
});
