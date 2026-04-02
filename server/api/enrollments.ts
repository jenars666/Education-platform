import { Router } from "express";
import { getDb } from "../db";
import { enrollments, emailSubscriptions } from "../../drizzle/schema";
import { sendEnrollmentConfirmation } from "../emailService";
import { eq } from "drizzle-orm";

const router = Router();

/**
 * POST /api/enrollments
 * Create a new enrollment and send confirmation email
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, batch, batchStartDate, batchEndDate, price } = req.body;

    // Validate required fields
    if (!name || !email || !batch) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database connection unavailable" });
    }

    // Insert enrollment into database
    const result = await db.insert(enrollments).values({
      name,
      email,
      batch,
      batchStartDate,
      batchEndDate,
      price: parseInt(price) || 0,
      status: "pending",
      emailSent: 0,
    });

    // Get the last inserted ID
    const [lastInsert] = await db.execute("SELECT LAST_INSERT_ID() as id");
    const enrollmentId = (lastInsert as any)[0]?.id || 1;

    // Ensure email subscription exists
    await db
      .insert(emailSubscriptions)
      .values({
        email,
        enrollmentUpdates: 1,
        courseUpdates: 1,
        promotionalEmails: 0,
        weeklyNewsletter: 0,
      })
      .onDuplicateKeyUpdate({
        set: { enrollmentUpdates: 1, courseUpdates: 1 },
      });

    // Send confirmation email
    const emailSent = await sendEnrollmentConfirmation({
      name,
      email,
      batch,
      batchStartDate,
      batchEndDate,
      enrollmentId: `EP-${enrollmentId}`,
      price: parseInt(price) || 0,
    });

    // Update email sent status
    if (emailSent) {
      await db
        .update(enrollments)
        .set({ emailSent: 1 })
        .where(eq(enrollments.id, enrollmentId));
    }

    res.status(201).json({
      success: true,
      enrollmentId: `EP-${enrollmentId}`,
      message: "Enrollment created successfully. Confirmation email sent.",
      emailSent,
    });
  } catch (error) {
    console.error("[Enrollments API] Error creating enrollment:", error);
    res.status(500).json({
      error: "Failed to create enrollment",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * GET /api/enrollments
 * Get all enrollments (admin only)
 */
router.get("/", async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database connection unavailable" });
    }

    const allEnrollments = await db.select().from(enrollments);
    res.json({
      success: true,
      count: allEnrollments.length,
      enrollments: allEnrollments,
    });
  } catch (error) {
    console.error("[Enrollments API] Error fetching enrollments:", error);
    res.status(500).json({ error: "Failed to fetch enrollments" });
  }
});

/**
 * GET /api/enrollments/:id
 * Get a specific enrollment
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const enrollmentId = parseInt(id);

    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database connection unavailable" });
    }

    const enrollment = await db
      .select()
      .from(enrollments)
      .where(eq(enrollments.id, enrollmentId));

    if (enrollment.length === 0) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    res.json({ success: true, enrollment: enrollment[0] });
  } catch (error) {
    console.error("[Enrollments API] Error fetching enrollment:", error);
    res.status(500).json({ error: "Failed to fetch enrollment" });
  }
});

/**
 * PUT /api/enrollments/:id
 * Update enrollment status
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const enrollmentId = parseInt(id);

    if (!["pending", "confirmed", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database connection unavailable" });
    }

    await db
      .update(enrollments)
      .set({ status })
      .where(eq(enrollments.id, enrollmentId));

    res.json({ success: true, message: "Enrollment updated successfully" });
  } catch (error) {
    console.error("[Enrollments API] Error updating enrollment:", error);
    res.status(500).json({ error: "Failed to update enrollment" });
  }
});

/**
 * DELETE /api/enrollments/:id
 * Delete an enrollment
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const enrollmentId = parseInt(id);

    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "Database connection unavailable" });
    }

    await db.delete(enrollments).where(eq(enrollments.id, enrollmentId));

    res.json({ success: true, message: "Enrollment deleted successfully" });
  } catch (error) {
    console.error("[Enrollments API] Error deleting enrollment:", error);
    res.status(500).json({ error: "Failed to delete enrollment" });
  }
});

export default router;
