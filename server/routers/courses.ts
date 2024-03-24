import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/trpc';
import { z } from 'zod';

export const coursesRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input: { id }, ctx }) => {
      return ctx.db.course.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          order: true,
          area: true,
          description: true,
          hsTotal: true,
          hsWeekly: true,
          progress: false,
          correlatives: true,
          optatives: true,
          equivalents: true,
          periods: {
            select: {
              id: true,
              order: true,
              careerID: true,
              courses: false,
              career: true,
            },
          },
        },
      });
    }),
  getByIdWithUser: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input: { id }, ctx }) => {
      const currentUserId = ctx.session.user.id;
      return ctx.db.course.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          order: true,
          area: true,
          description: true,
          hsTotal: true,
          hsWeekly: true,
          correlatives: true,
          optatives: true,
          equivalents: true,
          periods: true,
          progress: { where: { userId: currentUserId } },
        },
      });
    }),
});
