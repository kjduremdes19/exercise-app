import { useSyncExternalStore } from "react";
import type { StepLog } from "@/lib/db/types";

const KEY = "workout_draft_v1";
const STALE_MS = 14 * 24 * 60 * 60 * 1000;

export type DraftState = {
  currentIndex: number;
  currentSet: number;
  phase: "active" | "resting";
};

export type WorkoutDraft = {
  routineSlug: string;
  startedAt: string;
  state: DraftState;
  savedAt: string;
  // Optional: in-progress per-set logs. Older drafts (pre-set-logs) won't have
  // this field; readDraft tolerates its absence.
  setLogs?: StepLog[];
};

function hasStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function saveDraft(draft: WorkoutDraft): void {
  if (!hasStorage()) return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(draft));
    invalidateDraftCache();
  } catch {
    // Quota exceeded or storage disabled — silently no-op.
  }
}

export function readDraft(): WorkoutDraft | null {
  if (!hasStorage()) return null;
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
  if (!raw) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!isWorkoutDraft(parsed)) return null;
  // Drop drafts that ran past the active phase — shouldn't be saved, but be safe.
  if (parsed.state.phase !== "active" && parsed.state.phase !== "resting") {
    return null;
  }
  // Drop stale drafts.
  const savedTime = Date.parse(parsed.savedAt);
  if (!Number.isFinite(savedTime)) return null;
  if (Date.now() - savedTime > STALE_MS) return null;
  return parsed;
}

export function clearDraft(): void {
  if (!hasStorage()) return;
  try {
    window.localStorage.removeItem(KEY);
    invalidateDraftCache();
  } catch {
    // no-op
  }
}

// =========================================================================
// React hook for live-reading the draft. Cached so useSyncExternalStore can
// rely on a stable reference between calls when nothing has changed.
// =========================================================================

let cachedRaw: string | null = null;
let cachedDraft: WorkoutDraft | null = null;

function getSnapshot(): WorkoutDraft | null {
  if (!hasStorage()) return null;
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
  if (raw === cachedRaw) return cachedDraft;
  cachedRaw = raw;
  cachedDraft = readDraft();
  return cachedDraft;
}

function getServerSnapshot(): null {
  return null;
}

function subscribe(callback: () => void) {
  if (!hasStorage()) return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

/**
 * React hook returning the live workout draft from localStorage, or null.
 * Updates when the storage event fires (changes from other tabs). Same-tab
 * mutations should also call `invalidateDraftCache()` so other consumers
 * pick up the change on next render.
 */
export function useDraft(): WorkoutDraft | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Reset the snapshot cache after a same-tab write or clear. */
export function invalidateDraftCache(): void {
  cachedRaw = null;
  cachedDraft = null;
}

function isWorkoutDraft(v: unknown): v is WorkoutDraft {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  if (typeof o.routineSlug !== "string") return false;
  if (typeof o.startedAt !== "string") return false;
  if (typeof o.savedAt !== "string") return false;
  if (!o.state || typeof o.state !== "object") return false;
  const s = o.state as Record<string, unknown>;
  if (typeof s.currentIndex !== "number") return false;
  if (typeof s.currentSet !== "number") return false;
  if (typeof s.phase !== "string") return false;
  return true;
}
