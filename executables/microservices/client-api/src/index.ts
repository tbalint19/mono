import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { users } from 'models'

console.log(users.id)

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;

const appRouter = router({
  userList: publicProcedure
    .query(async () => {
      // Retrieve users from a datasource, this is an imaginary database
      const users = [ "alma", "korte" ]

      return users;
    }),
});

const server = createHTTPServer({
  router: appRouter,
});
 
server.listen(3000);

export type AppRouter = typeof appRouter;