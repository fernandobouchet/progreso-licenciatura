import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/trpc";
import { z } from "zod";

export const careersRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input: { id }, ctx }) => {
      return await ctx.db.career.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          periods: {
            orderBy: { order: "asc" },
            select: {
              id: true,
              order: true,
              courses: {
                orderBy: { order: "asc" },
                select: {
                  id: true,
                  name: true,
                  infoUrl: true,
                  progress: false,
                },
              },
            },
          },
        },
      });
    }),
  getByIdWithUser: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input: { id }, ctx }) => {
      const currentUserId = ctx.session.user.id;
      const careerWithProgress = await ctx.db.career.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          periods: {
            orderBy: { order: "asc" },
            select: {
              id: true,
              order: true,
              courses: {
                orderBy: { order: "asc" },
                select: {
                  id: true,
                  name: true,
                  infoUrl: true,
                  progress: {
                    where: { userId: currentUserId },
                  },
                },
              },
            },
          },
        },
      });

      const careerWithModifiedProgress = JSON.parse(
        JSON.stringify(careerWithProgress)
      );
      careerWithModifiedProgress.periods.forEach((period: PeriodData) => {
        // Verificar si period.courses es null o undefined
        if (period.courses) {
          period.courses.forEach((course) => {
            // Verificar si course.progress es un array y no está vacío
            if (Array.isArray(course.progress) && course.progress.length > 0) {
              course.progress = course.progress[0];
            } else {
              course.progress = null;
            }
          });
        }
      });

      return careerWithModifiedProgress;
    }),
});
