import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';
import { 
  cmsContent, 
  analyticsEvents, 
  calendarEvents, 
  crmLeads, 
  leadInteractions,
  enrollments 
} from "../drizzle/schema";
import { desc, gte, lte, and } from "drizzle-orm";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * CMS Content helpers
 */
export async function getCmsContentByType(contentType: string) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await (db
      .select()
      .from(cmsContent)
      .where(eq(cmsContent.contentType, contentType)) as any);
  } catch (error) {
    console.error("[Database] Failed to get CMS content:", error);
    return [];
  }
}

/**
 * Analytics helpers
 */
export async function getAnalyticsEventsByType(eventType: string, limit: number = 100) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await (db
      .select()
      .from(analyticsEvents)
      .where(eq(analyticsEvents.eventType, eventType))
      .orderBy(desc(analyticsEvents.timestamp))
      .limit(limit) as any);
  } catch (error) {
    console.error("[Database] Failed to get analytics events:", error);
    return [];
  }
}

/**
 * Calendar helpers
 */
export async function getCalendarEventsByDateRange(startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await (db
      .select()
      .from(calendarEvents)
      .where(
        and(
          gte(calendarEvents.startDate, startDate),
          lte(calendarEvents.endDate, endDate)
        )
      )
      .orderBy(calendarEvents.startDate) as any);
  } catch (error) {
    console.error("[Database] Failed to get calendar events:", error);
    return [];
  }
}

/**
 * CRM helpers
 */
export async function getCrmLeadsByStatus(status: string) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await (db
      .select()
      .from(crmLeads)
      .where(eq(crmLeads.status, status as any))
      .orderBy(desc(crmLeads.createdAt)) as any);
  } catch (error) {
    console.error("[Database] Failed to get CRM leads:", error);
    return [];
  }
}

export async function getCrmLeadWithInteractions(leadId: number) {
  const db = await getDb();
  if (!db) return null;

  try {
    const lead = await (db
      .select()
      .from(crmLeads)
      .where(eq(crmLeads.id, leadId))
      .limit(1) as any);

    if (!lead.length) return null;

    const interactions = await (db
      .select()
      .from(leadInteractions)
      .where(eq(leadInteractions.leadId, leadId))
      .orderBy(desc(leadInteractions.createdAt)) as any);

    return { ...lead[0], interactions };
  } catch (error) {
    console.error("[Database] Failed to get CRM lead with interactions:", error);
    return null;
  }
}

export async function getCrmLeadStats() {
  const db = await getDb();
  if (!db) {
    return {
      totalLeads: 0,
      qualifiedLeads: 0,
      enrolledLeads: 0,
      avgLeadScore: 0,
      conversionRate: "0",
    };
  }

  try {
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
  } catch (error) {
    console.error("[Database] Failed to get CRM lead stats:", error);
    return {
      totalLeads: 0,
      qualifiedLeads: 0,
      enrolledLeads: 0,
      avgLeadScore: 0,
      conversionRate: "0",
    };
  }
}

/**
 * Enrollment helpers
 */
export async function getEnrollmentsByStatus(status: string) {
  const db = await getDb();
  if (!db) return [];

  try {
    return await (db
      .select()
      .from(enrollments)
      .where(eq(enrollments.status, status as any))
      .orderBy(desc(enrollments.createdAt)) as any);
  } catch (error) {
    console.error("[Database] Failed to get enrollments:", error);
    return [];
  }
}
