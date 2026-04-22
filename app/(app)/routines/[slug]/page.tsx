import Link from "next/link";
import { notFound } from "next/navigation";
import { RoutineExerciseAccordion } from "@/components/RoutineExerciseAccordion";
import { getRoutineBySlug } from "@/lib/db/queries";

export default async function RoutineDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const routine = await getRoutineBySlug(slug);
  if (!routine) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:py-12">
      <Link
        href="/"
        className="text-sm text-zinc-500 underline-offset-2 hover:underline"
      >
        ← Back
      </Link>

      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">
          {routine.name}
        </h1>
        {routine.estimated_duration_min !== null && (
          <span className="text-sm text-zinc-500">
            ~{routine.estimated_duration_min} min
          </span>
        )}
      </div>
      {routine.description && (
        <p className="mt-1 text-zinc-600">{routine.description}</p>
      )}

      <div className="mt-6">
        <RoutineExerciseAccordion steps={routine.steps} />
      </div>

      <Link
        href={`/routines/${routine.slug}/play`}
        className="mt-6 block w-full rounded-md bg-zinc-900 py-3 text-center text-base font-semibold text-white hover:bg-zinc-800"
      >
        Start workout
      </Link>
    </main>
  );
}
