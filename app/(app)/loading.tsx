import Image from "next/image";

export default function Loading() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-16">
      <Image
        src="/brand/fitwork-mark.png"
        alt="FITWORK"
        width={96}
        height={96}
        priority
        className="h-24 w-24 animate-lift"
      />

      <div className="mt-8 h-1.5 w-48 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div className="h-full w-1/3 animate-slide-bar rounded-full bg-zinc-900 dark:bg-zinc-100" />
      </div>

      <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">Warming up…</p>
    </main>
  );
}
