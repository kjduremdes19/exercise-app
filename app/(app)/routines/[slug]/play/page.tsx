import { notFound } from "next/navigation";
import { WorkoutPlayer } from "@/components/workout/WorkoutPlayer";
import { getRoutineBySlug } from "@/lib/db/queries";

export default async function PlayPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const routine = await getRoutineBySlug(slug);
  if (!routine || routine.steps.length === 0) notFound();

  const resume = sp.resume === "1";

  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-1 flex-col">
      <WorkoutPlayer routine={routine} resume={resume} />
    </main>
  );
}
