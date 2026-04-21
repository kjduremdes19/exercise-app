import { ExerciseLogo } from "@/components/ExerciseLogo";

export default function Loading() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-16">
      <ExerciseLogo className="h-16 w-16 animate-lift text-zinc-900" />

      <div className="mt-8 h-1.5 w-48 overflow-hidden rounded-full bg-zinc-200">
        <div className="h-full w-1/3 animate-slide-bar rounded-full bg-zinc-900" />
      </div>

      <p className="mt-4 text-sm text-zinc-500">Warming up…</p>
    </main>
  );
}
