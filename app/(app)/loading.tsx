export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
      <div className="h-7 w-32 animate-pulse rounded bg-zinc-200" />
      <div className="mt-4 h-28 animate-pulse rounded-xl bg-zinc-200" />
      <div className="mt-6 h-5 w-28 animate-pulse rounded bg-zinc-200" />
      <div className="mt-3 space-y-2">
        <div className="h-20 animate-pulse rounded-lg bg-zinc-200" />
        <div className="h-20 animate-pulse rounded-lg bg-zinc-200" />
        <div className="h-20 animate-pulse rounded-lg bg-zinc-200" />
      </div>
    </main>
  );
}
