import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { postLikeRouter } from "./router/post-like";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  like: postLikeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
