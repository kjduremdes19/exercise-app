import { notFound } from "next/navigation";
import { WorkoutPlayer } from "@/components/workout/WorkoutPlayer";
import { getRoutineBySlug } from "@/lib/db/queries";

export default async function PlayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const routine = await getRoutineBySlug(slug);
  if (!routine || routine.steps.length === 0) notFound();

  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-1 flex-col">
      <WorkoutPlayer routine={routine} />
    </main>
  );
}
