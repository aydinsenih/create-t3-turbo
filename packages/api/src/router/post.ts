import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod/v4";

import { eq, sql } from "@atlas/db";
import { CreatePostSchema, Like, Post } from "@atlas/db/schema";

import { protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = {
  all: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db
      .select({
        id: Post.id,
        title: Post.title,
        content: Post.content,
        createdAt: Post.createdAt,
        updatedAt: Post.updatedAt,
        likeCount: sql<number>`cast(count(${Like.id}) as integer)`,
      })
      .from(Post)
      .leftJoin(Like, eq(Post.id, Like.postId))
      .groupBy(Post.id);

    return posts;
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.Post.findFirst({
        where: eq(Post.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(CreatePostSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(Post).values(input);
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.delete(Post).where(eq(Post.id, input));
  }),
} satisfies TRPCRouterRecord;
