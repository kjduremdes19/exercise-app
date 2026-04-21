"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const SnapshotStepSchema = z.object({
  position: z.number().int().nonnegative(),
  exercise_slug: z.string().min(1),
  exercise_name: z.string().min(1),
  kind: z.enum(["strength", "timed"]),
  sets: z.number().int().positive().nullable(),
  reps: z.number().int().positive().nullable(),
  duration_sec: z.number().int().positive().nullable(),
  rest_sec: z.number().int().nonnegative(),
});

const CompleteSessionSchema = z.object({
  routine_slug: z.string().min(1),
  started_at: z.string().datetime(),
  completed_at: z.string().datetime(),
  snapshot: z.object({
    routine_name: z.string().min(1),
    steps: z.array(SnapshotStepSchema).min(1),
  }),
});

export type CompleteSessionInput = z.infer<typeof CompleteSessionSchema>;

export async function completeSession(
  input: CompleteSessionInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const parsed = CompleteSessionSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid session payload." };
  }
  const data = parsed.data;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not authenticated." };

  // Resolve the routine_id from the slug. Fall back to null if the routine
  // has been retired since the workout started — RLS-safe because the
  // catalog is public-read for authenticated users.
  const { data: routine } = await supabase
    .from("routines")
    .select("id")
    .eq("slug", data.routine_slug)
    .maybeSingle();

  const { error } = await supabase.from("workout_sessions").insert({
    user_id: user.id,
    routine_id: routine?.id ?? null,
    routine_name: data.snapshot.routine_name,
    routine_snapshot: data.snapshot,
    started_at: data.started_at,
    completed_at: data.completed_at,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/history");
  return { ok: true };
}
