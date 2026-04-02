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