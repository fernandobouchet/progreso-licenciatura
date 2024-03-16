import { createCallerFactory, createTRPCRouter } from '@/server/trpc';
import { usersRouter } from '@/server/routers/users';
import { careersRouter } from '@/server/routers/careers';
import { coursesRouter } from '@/server/routers/courses';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  careers: careersRouter,
  courses: coursesRouter,
  user: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
