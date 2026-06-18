"use server";

import { and, desc, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { graphs } from "@/db/schema";
import { graphMetaSchema, graphSchema, sourceSchema } from "./validation";

async function requireUserId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("UNAUTHORIZED");
  return session.user.id;
}

export async function saveGraph(input: {
  title: string;
  language: string;
  graph: unknown;
  source: unknown;
}): Promise<{ id: string }> {
  const userId = await requireUserId();
  const meta = graphMetaSchema.parse({
    title: input.title,
    language: input.language,
  });
  const graph = graphSchema.parse(input.graph);
  const source = sourceSchema.parse(input.source);

  const [row] = await db
    .insert(graphs)
    .values({
      userId,
      title: meta.title,
      language: meta.language,
      graph: JSON.stringify(graph),
      source: JSON.stringify(source),
    })
    .returning({ id: graphs.id });

  return { id: row.id };
}

export async function listGraphs() {
  const userId = await requireUserId();
  return db
    .select({
      id: graphs.id,
      title: graphs.title,
      language: graphs.language,
      createdAt: graphs.createdAt,
    })
    .from(graphs)
    .where(eq(graphs.userId, userId))
    .orderBy(desc(graphs.createdAt));
}

export async function getGraph(id: string) {
  const userId = await requireUserId();
  // Ownership is enforced in the query: a graph that isn't the caller's simply
  // isn't returned.
  const [row] = await db
    .select()
    .from(graphs)
    .where(and(eq(graphs.id, id), eq(graphs.userId, userId)))
    .limit(1);
  return row ?? null;
}

export async function deleteGraph(id: string): Promise<void> {
  const userId = await requireUserId();
  await db
    .delete(graphs)
    .where(and(eq(graphs.id, id), eq(graphs.userId, userId)));
}
