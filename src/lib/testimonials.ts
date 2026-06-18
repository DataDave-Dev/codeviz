"use server";

import { desc, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { testimonials, users } from "@/db/schema";
import { testimonialSchema } from "./validation";

export async function listTestimonials() {
  return db
    .select({
      id: testimonials.id,
      body: testimonials.body,
      createdAt: testimonials.createdAt,
      userName: users.name,
      userImage: users.image,
    })
    .from(testimonials)
    .innerJoin(users, eq(testimonials.userId, users.id))
    .orderBy(desc(testimonials.createdAt))
    .limit(50);
}

export type TestimonialFormState = { ok: boolean; error?: string };

export async function postTestimonial(
  _prev: TestimonialFormState,
  formData: FormData,
): Promise<TestimonialFormState> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "UNAUTHORIZED" };

  const parsed = testimonialSchema.safeParse({ body: formData.get("body") });
  if (!parsed.success) return { ok: false, error: "INVALID" };

  await db.insert(testimonials).values({
    userId: session.user.id,
    body: parsed.data.body,
  });

  return { ok: true };
}
