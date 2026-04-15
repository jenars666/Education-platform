import { eq } from "drizzle-orm";\nimport { drizzle } from "drizzle-orm/postgres-js\";\nimport postgres from \"postgres\";\nimport type { InsertUser, User } from \"../drizzle/schema\";\nimport { users } from \"../drizzle/schema\";\nimport { ENV } from \"./_core/env\";\nimport {\n  cmsContent,\n  analyticsEvents,\n  calendarEvents,\n  crmLeads,\n  leadInteractions,\n  enrollments,\n} from \"../drizzle/schema\";\nimport { desc, gte, lte, and } from \"drizzle-orm\";\n\nlet _db: ReturnType<typeof drizzle> | null = null;\nlet _client: ReturnType<typeof postgres> | null = null;\n\n// Lazily create the drizzle instance so local tooling can run without a DB.\nexport async function getDb() {\n  if (!_db && ENV.databaseUrl) {\n    try {\n      _client = postgres(ENV.databaseUrl);\n      _db = drizzle(_client);\n    } catch (error) {\n      console.warn(\"[Database] Failed to connect:\", error);\n      _db = null;\n      _client = null;\n    }\n  }\n  return _db;\n}\n\nexport async function upsertUser(user: Omit<InsertUser, \"id\">): Promise<User | null> {\n  if (!user.email) {\n    throw new Error(\"User email is required for upsert\");\n  }\n\n  const db = await getDb();\n  if (!db) {\n    console.warn(\"[Database] Cannot upsert user: database not available\");\n    return null;\n  }\n\n  try {\n    // Upsert logic: insert or update based on email\n    const existingUser = await db\n      .select()\n      .from(users)\n      .where(eq(users.email, user.email))\n      .limit(1);\n\n    if (existingUser.length > 0) {\n      const updated = await db\n        .update(users)\n        .set({\n          ...user,\n          updatedAt: new Date(),\n        })\n        .where(eq(users.email, user.email))\n        .returning();\n      return updated[0] || null;\n    } else {\n      const inserted = await db.insert(users).values(user).returning();\n      return inserted[0] || null;\n    }\n  } catch (error) {\n    console.error(\"[Database] User upsert failed:\", error);\n    throw error;\n  }\n}\n\nexport async function getUserByEmail(email: string): Promise<User | null> {\n  const db = await getDb();\n  if (!db) return null;\n\n  try {\n    const result = await db\n      .select()\n      .from(users)\n      .where(eq(users.email, email))\n      .limit(1);\n    return result[0] || null;\n  } catch (error) {\n    console.error(\"[Database] Get user by email failed:\", error);\n    return null;\n  }\n}\n\nexport async function getUserById(id: string): Promise<User | null> {\n  const db = await getDb();\n  if (!db) return null;\n\n  try {\n    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);\n    return result[0] || null;\n  } catch (error) {\n    console.error(\"[Database] Get user by id failed:\", error);\n    return null;\n  }\n}
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

export async function getCrmLeadWithInteractions(leadId: string) {
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
