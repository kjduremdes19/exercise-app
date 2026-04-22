import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { clearDraft, readDraft, saveDraft, type WorkoutDraft } from "./draft";

const KEY = "workout_draft_v1";

// In-memory localStorage shim (vitest defaults to the node environment, which
// lacks `window` / `localStorage`). The draft module itself just touches
// `window.localStorage`, so this is enough.
const memStore = new Map<string, string>();
const fakeStorage = {
  getItem: (k: string) => memStore.get(k) ?? null,
  setItem: (k: string, v: string) => {
    memStore.set(k, v);
  },
  removeItem: (k: string) => {
    memStore.delete(k);
  },
  clear: () => {
    memStore.clear();
  },
  length: 0,
  key: () => null,
};

beforeAll(() => {
  // @ts-expect-error -- minimal globalThis shim for the test
  globalThis.window = globalThis.window ?? {};
  // @ts-expect-error -- attaching fake storage onto the shim
  globalThis.window.localStorage = fakeStorage;
});

function fresh(overrides: Partial<WorkoutDraft> = {}): WorkoutDraft {
  return {
    routineSlug: "pilates-core-20",
    startedAt: new Date().toISOString(),
    state: { currentIndex: 2, currentSet: 1, phase: "active" },
    savedAt: new Date().toISOString(),
    ...overrides,
  };
}

describe("workout draft store", () => {
  beforeEach(() => {
    memStore.clear();
  });

  afterEach(() => {
    memStore.clear();
  });

  it("save then read returns the same draft", () => {
    const d = fresh();
    saveDraft(d);
    expect(readDraft()).toEqual(d);
  });

  it("read returns null when nothing saved", () => {
    expect(readDraft()).toBeNull();
  });

  it("read returns null for malformed JSON", () => {
    memStore.set(KEY, "{not json");
    expect(readDraft()).toBeNull();
  });

  it("read returns null for valid JSON missing required fields", () => {
    memStore.set(KEY, JSON.stringify({ routineSlug: "x" }));
    expect(readDraft()).toBeNull();
  });

  it("read returns null for stale drafts (>14 days old)", () => {
    const fifteenDaysAgo = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
    saveDraft(fresh({ savedAt: fifteenDaysAgo.toISOString() }));
    expect(readDraft()).toBeNull();
  });

  it("read returns null when phase is unexpected (e.g. 'done')", () => {
    memStore.set(
      KEY,
      JSON.stringify({
        ...fresh(),
        state: { currentIndex: 0, currentSet: 1, phase: "done" },
      }),
    );
    expect(readDraft()).toBeNull();
  });

  it("clear removes the entry", () => {
    saveDraft(fresh());
    clearDraft();
    expect(readDraft()).toBeNull();
    expect(memStore.get(KEY)).toBeUndefined();
  });
});
