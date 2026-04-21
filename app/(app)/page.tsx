import { redirect } from "next/navigation";
import { RoutineCard } from "@/components/RoutineCard";
import { TodaysPickCard } from "@/components/TodaysPickCard";
import { getRoutines, getTodaysPick } from "@/lib/db/queries";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [routines, pick] = await Promise.all([
    getRoutines(),
    getTodaysPick(user.id),
  ]);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Today</h1>

      {pick && (
        <div className="mt-4">
          <TodaysPickCard routine={pick} />
        </div>
      )}

      <h2 className="mt-10 text-lg font-semibold tracking-tight">All routines</h2>
      {routines.length === 0 ? (
        <p className="mt-2 text-sm text-zinc-500">
          No routines yet. Run <code className="font-mono">npm run db:seed</code>{" "}
          to populate.
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {routines.map((r) => (
            <li key={r.id}>
              <RoutineCard routine={r} />
            </li>
          ))}
        </ul>
      )}

    </main>
  );
}
