import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!url) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL. Run via `npm run db:gen-types` so .env.local is loaded.",
  );
  process.exit(1);
}

// Project URLs look like https://<project-ref>.supabase.co
const match = url.match(/^https:\/\/([a-z0-9-]+)\.supabase\.co\/?$/);
if (!match) {
  console.error(
    `Could not parse a project ref from NEXT_PUBLIC_SUPABASE_URL=${url}.\n` +
      `Expected format: https://<project-ref>.supabase.co`,
  );
  process.exit(1);
}
const projectRef = match[1];

const result = spawnSync(
  "npx",
  [
    "supabase",
    "gen",
    "types",
    "typescript",
    "--project-id",
    projectRef,
    "--schema",
    "public",
  ],
  { encoding: "utf-8", shell: true },
);

if (result.error) {
  console.error("Failed to launch supabase CLI:", result.error.message);
  process.exit(1);
}
if (result.status !== 0) {
  console.error(result.stderr || "supabase gen types failed.");
  process.exit(result.status ?? 1);
}

const outPath = "lib/db/database.types.ts";
writeFileSync(outPath, result.stdout, "utf-8");
console.log(`Wrote ${outPath} (${result.stdout.length} bytes).`);
