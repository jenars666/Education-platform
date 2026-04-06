import { describe, it, expect, vi, beforeEach } from "vitest";
import { cmsRouter, analyticsRouter, calendarRouter, crmRouter, enrollmentRouter } from "./routers/admin";

// Mock the database
vi.mock("./db", () => ({
  getDb: vi.fn(() => Promise.resolve(null)),
}));

describe("Admin Routers", () => {
  describe("CMS Router", () => {
    it("should have getAll procedure", () => {
      expect(cmsRouter._def.procedures.getAll).toBeDefined();
    });

    it("should have getById procedure", () => {
      expect(cmsRouter._def.procedures.getById).toBeDefined();
    });

    it("should have create procedure", () => {
      expect(cmsRouter._def.procedures.create).toBeDefined();
    });

    it("should have update procedure", () => {
      expect(cmsRouter._def.procedures.update).toBeDefined();
    });

    it("should have delete procedure", () => {
      expect(cmsRouter._def.procedures.delete).toBeDefined();
    });

    it("should have publish procedure", () => {
      expect(cmsRouter._def.procedures.publish).toBeDefined();
    });
  });

  describe("Analytics Router", () => {
    it("should have trackEvent procedure", () => {
      expect(analyticsRouter._def.procedures.trackEvent).toBeDefined();
    });

    it("should have getSummary procedure", () => {
      expect(analyticsRouter._def.procedures.getSummary).toBeDefined();
    });

    it("should have getEventsByType procedure", () => {
      expect(analyticsRouter._def.procedures.getEventsByType).toBeDefined();
    });
  });

  describe("Calendar Router", () => {
    it("should have getAll procedure", () => {
      expect(calendarRouter._def.procedures.getAll).toBeDefined();
    });

    it("should have getByDateRange procedure", () => {
      expect(calendarRouter._def.procedures.getByDateRange).toBeDefined();
    });

    it("should have create procedure", () => {
      expect(calendarRouter._def.procedures.create).toBeDefined();
    });

    it("should have update procedure", () => {
      expect(calendarRouter._def.procedures.update).toBeDefined();
    });

    it("should have delete procedure", () => {
      expect(calendarRouter._def.procedures.delete).toBeDefined();
    });
  });

  describe("CRM Router", () => {
    it("should have getAll procedure", () => {
      expect(crmRouter._def.procedures.getAll).toBeDefined();
    });

    it("should have getById procedure", () => {
      expect(crmRouter._def.procedures.getById).toBeDefined();
    });

    it("should have create procedure", () => {
      expect(crmRouter._def.procedures.create).toBeDefined();
    });

    it("should have update procedure", () => {
      expect(crmRouter._def.procedures.update).toBeDefined();
    });

    it("should have delete procedure", () => {
      expect(crmRouter._def.procedures.delete).toBeDefined();
    });

    it("should have addInteraction procedure", () => {
      expect(crmRouter._def.procedures.addInteraction).toBeDefined();
    });

    it("should have getStats procedure", () => {
      expect(crmRouter._def.procedures.getStats).toBeDefined();
    });
  });

  describe("Enrollment Router", () => {
    it("should have getAll procedure", () => {
      expect(enrollmentRouter._def.procedures.getAll).toBeDefined();
    });

    it("should have getById procedure", () => {
      expect(enrollmentRouter._def.procedures.getById).toBeDefined();
    });

    it("should have updateStatus procedure", () => {
      expect(enrollmentRouter._def.procedures.updateStatus).toBeDefined();
    });
  });
});

describe("Admin Router Integration", () => {
  it("should export all routers", () => {
    expect(cmsRouter).toBeDefined();
    expect(analyticsRouter).toBeDefined();
    expect(calendarRouter).toBeDefined();
    expect(crmRouter).toBeDefined();
    expect(enrollmentRouter).toBeDefined();
  });

  it("routers should be tRPC routers", () => {
    expect(cmsRouter._def).toBeDefined();
    expect(analyticsRouter._def).toBeDefined();
    expect(calendarRouter._def).toBeDefined();
    expect(crmRouter._def).toBeDefined();
    expect(enrollmentRouter._def).toBeDefined();
  });
});
