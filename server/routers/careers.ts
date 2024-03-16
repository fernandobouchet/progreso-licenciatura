import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/trpc';
import { z } from 'zod';

export const careersRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input: { id }, ctx }) => {
      return ctx.db.career.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          periods: {
            orderBy: { order: 'asc' },
            select: {
              id: true,
              order: true,
              courses: {
                orderBy: { order: 'asc' },
                select: {
                  id: true,
                  name: true,
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
      return ctx.db.career.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          periods: {
            orderBy: { order: 'asc' },
            select: {
              id: true,
              order: true,
              courses: {
                orderBy: { order: 'asc' },
                select: {
                  id: true,
                  name: true,
                  progress: { where: { userId: currentUserId } },
                },
              },
            },
          },
        },
      });
    }),
});
