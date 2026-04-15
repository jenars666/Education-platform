import { integer, pgEnum, pgTable, text, timestamp, varchar, uuid } from "drizzle-orm/pg-core";

/**
 * Core user table backing Supabase auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const roleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable("users", {
  /**
   * UUID primary key from Supabase auth.id
   */
  id: uuid("id").primaryKey(),
  /** Email from Supabase auth */
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: text("name"),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn", { withTimezone: true }).defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Enrollments table for tracking teacher training program enrollments
 */
export const enrollmentStatusEnum = pgEnum("enrollment_status", ["pending", "confirmed", "completed", "cancelled"]);

export const enrollments = pgTable("enrollments", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  batch: varchar("batch", { length: 100 }).notNull(),
  batchStartDate: varchar("batchStartDate", { length: 20 }).notNull(),
  batchEndDate: varchar("batchEndDate", { length: 20 }).notNull(),
  price: integer("price").notNull(),
  status: enrollmentStatusEnum("status").default("pending").notNull(),
  emailSent: integer("emailSent").default(0).notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
});

export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = typeof enrollments.$inferInsert;

/**
 * Email subscriptions table for managing user notification preferences
 */
export const emailSubscriptions = pgTable("emailSubscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  enrollmentUpdates: integer("enrollmentUpdates").default(1).notNull(),
  courseUpdates: integer("courseUpdates").default(1).notNull(),
  promotionalEmails: integer("promotionalEmails").default(0).notNull(),
  weeklyNewsletter: integer("weeklyNewsletter").default(0).notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
});

export type EmailSubscription = typeof emailSubscriptions.$inferSelect;
export type InsertEmailSubscription = typeof emailSubscriptions.$inferInsert;

/**
 * CMS Content table for managing website content
 */
export const cmsContentStatusEnum = pgEnum("cms_status", ["draft", "published"]);

export const cmsContent = pgTable("cmsContent", {
  id: uuid("id").primaryKey().defaultRandom(),
  contentType: varchar("contentType", { length: 50 }).notNull(),
  contentKey: varchar("contentKey", { length: 255 }).notNull(),
  title: text("title"),
  description: text("description"),
  content: text("content"),
  imageUrl: text("imageUrl"),
  metadata: text("metadata"),
  status: cmsContentStatusEnum("status").default("draft").notNull(),
  createdBy: uuid("createdBy").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
});

export type CmsContent = typeof cmsContent.$inferSelect;
export type InsertCmsContent = typeof cmsContent.$inferInsert;

/**
 * Analytics Events table for tracking user interactions
 */
export const analyticsEvents = pgTable("analyticsEvents", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventType: varchar("eventType", { length: 50 }).notNull(),
  eventName: varchar("eventName", { length: 255 }).notNull(),
  userId: varchar("userId", { length: 255 }),
  sessionId: varchar("sessionId", { length: 255 }).notNull(),
  pageUrl: text("pageUrl"),
  referrer: text("referrer"),
  metadata: text("metadata"),
  timestamp: timestamp("timestamp", { withTimezone: true }).defaultNow().notNull(),
});

export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type InsertAnalyticsEvent = typeof analyticsEvents.$inferInsert;

/**
 * Calendar Events table for batches, webinars, and schedules
 */
export const calendarEventStatusEnum = pgEnum("calendar_status", ["scheduled", "ongoing", "completed", "cancelled"]);

export const calendarEvents = pgTable("calendarEvents", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventType: varchar("eventType", { length: 50 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  startDate: timestamp("startDate", { withTimezone: true }).notNull(),
  endDate: timestamp("endDate", { withTimezone: true }).notNull(),
  location: varchar("location", { length: 255 }),
  instructorId: uuid("instructorId"),
  maxCapacity: integer("maxCapacity"),
  currentEnrollment: integer("currentEnrollment").default(0).notNull(),
  status: calendarEventStatusEnum("status").default("scheduled").notNull(),
  metadata: text("metadata"),
  createdBy: uuid("createdBy").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
});

export type CalendarEvent = typeof calendarEvents.$inferSelect;
export type InsertCalendarEvent = typeof calendarEvents.$inferInsert;

/**
 * CRM Leads table for tracking potential students
 */
export const crmLeadStatusEnum = pgEnum("crm_lead_status", ["new", "contacted", "interested", "qualified", "enrolled", "rejected"]);

export const crmLeads = pgTable("crmLeads", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  source: varchar("source", { length: 100 }).notNull(),
  status: crmLeadStatusEnum("status").default("new").notNull(),
  leadScore: integer("leadScore").default(0).notNull(),
  notes: text("notes"),
  metadata: text("metadata"),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
});

export type CrmLead = typeof crmLeads.$inferSelect;
export type InsertCrmLead = typeof crmLeads.$inferInsert;

/**
 * Lead Interactions table for tracking communication history
 */
export const leadInteractions = pgTable("leadInteractions", {
  id: uuid("id").primaryKey().defaultRandom(),
  leadId: uuid("leadId").notNull(),
  interactionType: varchar("interactionType", { length: 50 }).notNull(),
  subject: varchar("subject", { length: 255 }),
  message: text("message"),
  status: varchar("status", { length: 50 }).notNull(),
  createdBy: uuid("createdBy"),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
});

export type LeadInteraction = typeof leadInteractions.$inferSelect;
export type InsertLeadInteraction = typeof leadInteractions.$inferInsert;