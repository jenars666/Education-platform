import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { cmsRouter, analyticsRouter, calendarRouter, crmRouter, enrollmentRouter } from "./routers/admin";
import { z } from "zod";
import { supabase } from "./supabase";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(async () => {
      // Supabase handles logout on client side
      return { success: true } as const;
    }),
  }),

  // Admin module routers
  cms: cmsRouter,
  analytics: analyticsRouter,
  calendar: calendarRouter,
  crm: crmRouter,
  enrollment: enrollmentRouter,

  // Public enrollment submission
  enrollmentPublic: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(2).max(255),
          email: z.string().email().max(320),
          mobileNo: z.string().regex(/^[0-9]{10}$/),
          gender: z.string().nullable(),
          dateOfBirth: z.string().nullable(),
          state: z.string().min(2).max(120),
          district: z.string().min(2).max(120),
          area: z.string().nullable(),
          currentStatus: z.string().min(2).max(120),

          course: z.string().nullable(),
          specialization: z.string().nullable(),
          collegeName: z.string().nullable(),
          university: z.string().nullable(),
          yearOfStudy: z.string().nullable(),

          degreeCompleted: z.string().nullable(),
          subjectMajor: z.string().nullable(),
          yearOfGraduation: z.string().nullable(),
          interestedInTeaching: z.string().nullable(),

          teachingLevel: z.string().nullable(),
          subjectTeaching: z.string().nullable(),
          yearsExperience: z.string().nullable(),
          instituteName: z.string().nullable(),

          joiningReason: z.string().nullable(),
          preferredTeachingSubject: z.string().nullable(),
          preferredJobLocation: z.string().nullable(),
          learningMode: z.string().nullable(),

          skills: z.string().nullable(),
          languagesKnown: z.string().nullable(),
          technicalSkills: z.string().nullable(),

          jobAlerts: z.string().nullable(),
          preferredSalaryRange: z.string().nullable(),
          teachingConfidence: z.string().nullable(),

          resumeFileName: z.string().nullable(),
          certificateFileName: z.string().nullable(),
          batch: z.string().min(1).max(100),
          batchStartDate: z.string().min(1).max(50),
          batchEndDate: z.string().min(1).max(50),
          price: z.number().int().nonnegative(),
        })
      )
      .mutation(async ({ input }) => {
        if (!supabase) {
          throw new Error("Database not available");
        }

        const { data, error } = await supabase
          .from("enrollments")
          .insert({
            name: input.name,
            email: input.email,
            mobile_no: input.mobileNo,
            gender: input.gender,
            date_of_birth: input.dateOfBirth,
            state: input.state,
            district: input.district,
            place: input.area,
            current_status: input.currentStatus,

            batch: input.batch,
            batch_start_date: input.batchStartDate,
            batch_end_date: input.batchEndDate,
            price: input.price,
            status: "pending",
            email_sent: 0,

            profile_data: {
              student: {
                course: input.course,
                specialization: input.specialization,
                collegeName: input.collegeName,
                university: input.university,
                yearOfStudy: input.yearOfStudy,
              },
              graduate: {
                degreeCompleted: input.degreeCompleted,
                subjectMajor: input.subjectMajor,
                yearOfGraduation: input.yearOfGraduation,
                interestedInTeaching: input.interestedInTeaching,
              },
              teacher: {
                teachingLevel: input.teachingLevel,
                subjectTeaching: input.subjectTeaching,
                yearsExperience: input.yearsExperience,
                instituteName: input.instituteName,
              },
              careerGoals: {
                joiningReason: input.joiningReason,
                preferredTeachingSubject: input.preferredTeachingSubject,
                preferredJobLocation: input.preferredJobLocation,
                learningMode: input.learningMode,
              },
              skills: {
                skills: input.skills,
                languagesKnown: input.languagesKnown,
                technicalSkills: input.technicalSkills,
              },
              recommendation: {
                jobAlerts: input.jobAlerts,
                preferredSalaryRange: input.preferredSalaryRange,
                teachingConfidence: input.teachingConfidence,
              },
              documents: {
                resumeFileName: input.resumeFileName,
                certificateFileName: input.certificateFileName,
              },
            },
          })
          .select("id")
          .single();

        if (error) {
          throw error;
        }

        return {
          success: true,
          enrollmentId: data.id,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
