import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Enrollments table for tracking teacher training program enrollments
 */
export const enrollments = mysqlTable("enrollments", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  batch: varchar("batch", { length: 100 }).notNull(),
  batchStartDate: varchar("batchStartDate", { length: 20 }).notNull(),
  batchEndDate: varchar("batchEndDate", { length: 20 }).notNull(),
  price: int("price").notNull(),
  status: mysqlEnum("status", ["pending", "confirmed", "completed", "cancelled"]).default("pending").notNull(),
  emailSent: int("emailSent").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = typeof enrollments.$inferInsert;

/**
 * Email subscriptions table for managing user notification preferences
 */
export const emailSubscriptions = mysqlTable("emailSubscriptions", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  enrollmentUpdates: int("enrollmentUpdates").default(1).notNull(),
  courseUpdates: int("courseUpdates").default(1).notNull(),
  promotionalEmails: int("promotionalEmails").default(0).notNull(),
  weeklyNewsletter: int("weeklyNewsletter").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EmailSubscription = typeof emailSubscriptions.$inferSelect;
export type InsertEmailSubscription = typeof emailSubscriptions.$inferInsert;

/**
 * CMS Content table for managing website content
 */
export const cmsContent = mysqlTable("cmsContent", {
  id: int("id").autoincrement().primaryKey(),
  contentType: varchar("contentType", { length: 50 }).notNull(), // 'hero', 'about', 'faq', 'testimonial', 'batch', 'curriculum', 'instructor'
  contentKey: varchar("contentKey", { length: 255 }).notNull(),
  title: text("title"),
  description: text("description"),
  content: text("content"),
  imageUrl: text("imageUrl"),
  metadata: text("metadata"), // JSON string for additional data
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),
  createdBy: int("createdBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CmsContent = typeof cmsContent.$inferSelect;
export type InsertCmsContent = typeof cmsContent.$inferInsert;

/**
 * Analytics Events table for tracking user interactions
 */
export const analyticsEvents = mysqlTable("analyticsEvents", {
  id: int("id").autoincrement().primaryKey(),
  eventType: varchar("eventType", { length: 50 }).notNull(), // 'page_view', 'cta_click', 'form_submit', 'module_view'
  eventName: varchar("eventName", { length: 255 }).notNull(),
  userId: varchar("userId", { length: 255 }),
  sessionId: varchar("sessionId", { length: 255 }).notNull(),
  pageUrl: text("pageUrl"),
  referrer: text("referrer"),
  metadata: text("metadata"), // JSON string for additional data
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type InsertAnalyticsEvent = typeof analyticsEvents.$inferInsert;

/**
 * Calendar Events table for batches, webinars, and schedules
 */
export const calendarEvents = mysqlTable("calendarEvents", {
  id: int("id").autoincrement().primaryKey(),
  eventType: varchar("eventType", { length: 50 }).notNull(), // 'batch', 'webinar', 'session'
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  location: varchar("location", { length: 255 }),
  instructorId: int("instructorId"),
  maxCapacity: int("maxCapacity"),
  currentEnrollment: int("currentEnrollment").default(0).notNull(),
  status: mysqlEnum("status", ["scheduled", "ongoing", "completed", "cancelled"]).default("scheduled").notNull(),
  metadata: text("metadata"), // JSON string for additional data
  createdBy: int("createdBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CalendarEvent = typeof calendarEvents.$inferSelect;
export type InsertCalendarEvent = typeof calendarEvents.$inferInsert;

/**
 * CRM Leads table for tracking potential students
 */
export const crmLeads = mysqlTable("crmLeads", {
  id: int("id").autoincrement().primaryKey(),
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  source: varchar("source", { length: 100 }).notNull(), // 'form', 'gform', 'website', 'referral'
  status: mysqlEnum("status", ["new", "contacted", "interested", "qualified", "enrolled", "rejected"]).default("new").notNull(),
  leadScore: int("leadScore").default(0).notNull(),
  notes: text("notes"),
  metadata: text("metadata"), // JSON string for additional data
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CrmLead = typeof crmLeads.$inferSelect;
export type InsertCrmLead = typeof crmLeads.$inferInsert;

/**
 * Lead Interactions table for tracking communication history
 */
export const leadInteractions = mysqlTable("leadInteractions", {
  id: int("id").autoincrement().primaryKey(),
  leadId: int("leadId").notNull(),
  interactionType: varchar("interactionType", { length: 50 }).notNull(), // 'email', 'call', 'message', 'form_submission'
  subject: varchar("subject", { length: 255 }),
  message: text("message"),
  status: varchar("status", { length: 50 }).notNull(),
  createdBy: int("createdBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type LeadInteraction = typeof leadInteractions.$inferSelect;
export type InsertLeadInteraction = typeof leadInteractions.$inferInsert;