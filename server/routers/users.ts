import { createTRPCRouter, protectedProcedure } from '@/server/trpc';
import { CourseStatus } from '@prisma/client';
import { z } from 'zod';

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
        await ctx.db.userCourse.create({
          data: { userId, courseId, status, qualification },
        });
        return { courseId, status, qualification };
      } else if (status === 'PENDIENTE') {
        await ctx.db.userCourse.delete({
          where: {
            id: existingCourse.id,
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
});
