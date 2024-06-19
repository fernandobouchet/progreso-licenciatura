import { createTRPCRouter, protectedProcedure } from "@/server/trpc";
import { CourseStatus } from "@prisma/client";
import { z } from "zod";

export const usersRouter = createTRPCRouter({
  updateUserCourse: protectedProcedure
    .input(
      z.object({
        courseId: z.number(),
        status: z.nativeEnum(CourseStatus),
        qualification: z.number().nullable(),
      })
    )
    .mutation(async ({ input: { courseId, status, qualification }, ctx }) => {
      const userId = ctx.session.user.id;
      const existingCourse = await ctx.db.userCourse.findUnique({
        where: {
          courseId_userId: {
            userId,
            courseId,
          },
        },
      });
      if (existingCourse === null) {
        if (status === "APROBADA") {
          await ctx.db.userCourse.create({
            data: {
              userId,
              courseId,
              status,
              qualification,
            },
          });
        } else {
          await ctx.db.userCourse.create({
            data: {
              userId,
              courseId,
              status,
              qualification,
            },
          });
        }
        return {
          courseId,
          status,
          qualification,
        };
      } else if (status === "PENDIENTE") {
        await ctx.db.userCourse.delete({
          where: {
            id: existingCourse.id,
          },
        });
      } else if (status === "APROBADA") {
        await ctx.db.userCourse.update({
          where: {
            courseId_userId: {
              userId,
              courseId,
            },
          },
          data: {
            userId,
            courseId,
            status,
            qualification,
          },
        });
      } else {
        await ctx.db.userCourse.update({
          where: {
            courseId_userId: {
              userId,
              courseId,
            },
          },
          data: { userId, courseId, status, qualification },
        });
        return { courseId, status, qualification };
      }
    }),
  getUserCareers: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.db.userCareer.findMany({
      where: {
        userId: userId,
      },
      select: { careerId: true },
    });
  }),
  updateUserCareers: protectedProcedure
    .input(
      z.object({
        careerIds: z.array(z.number()),
      })
    )
    .mutation(async ({ input: { careerIds }, ctx }) => {
      const userId = ctx.session.user.id;

      const existingCareers = await ctx.db.userCareer.findMany({
        where: {
          userId,
        },
        select: {
          careerId: true,
        },
      });

      const newCareers = careerIds.filter(
        (careerId) => !existingCareers.some((ec) => ec.careerId === careerId)
      );

      const careersToDelete = existingCareers
        .filter((careerId) => !careerIds.some((ec) => ec === careerId.careerId))
        .map((c) => c.careerId);

      await ctx.db.$transaction(async (tx) => {
        await Promise.all(
          careersToDelete.map(async (careerId) => {
            await tx.userCareer.delete({
              where: {
                careerId_userId: {
                  careerId,
                  userId,
                },
              },
            });
          })
        );

        await Promise.all(
          newCareers.map(async (careerId) => {
            await tx.userCareer.create({
              data: { userId, careerId },
            });
          })
        );
      });

      return { careerIds };
    }),
});
