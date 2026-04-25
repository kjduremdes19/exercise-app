import { describe, expect, it } from "vitest";
import type { MergedStep } from "@/lib/db/types";
import { initialState, reduce, type State } from "./machine";

// Test fixtures: minimal MergedStep shapes (only fields the reducer reads).
function strengthStep(opts: {
  position: number;
  sets: number;
  rest_sec: number;
}): MergedStep {
  return {
    position: opts.position,
    exercise: {
      id: `ex-${opts.position}`,
      slug: `s-${opts.position}`,
      name: `Strength ${opts.position}`,
      description: "",
      kind: "strength",
      category: null,
      equipment: null,
      default_sets: null,
      default_reps: null,
      default_duration_sec: null,
      default_rest_sec: null,
      instructions: [],
      created_at: "",
    },
    kind: "strength",
    sets: opts.sets,
    reps: 10,
    duration_sec: null,
    rest_sec: opts.rest_sec,
  };
}

function timedStep(opts: {
  position: number;
  sets: number;
  duration_sec: number;
  rest_sec: number;
}): MergedStep {
  return {
    position: opts.position,
    exercise: {
      id: `ex-${opts.position}`,
      slug: `t-${opts.position}`,
      name: `Timed ${opts.position}`,
      description: "",
      kind: "timed",
      category: null,
      equipment: null,
      default_sets: null,
      default_reps: null,
      default_duration_sec: null,
      default_rest_sec: null,
      instructions: [],
      created_at: "",
    },
    kind: "timed",
    sets: opts.sets,
    reps: null,
    duration_sec: opts.duration_sec,
    rest_sec: opts.rest_sec,
  };
}

const initial = (): State => initialState();

describe("workout reducer", () => {
  describe("initial state", () => {
    it("starts at index 0, set 1, active", () => {
      expect(initial()).toEqual({
        currentIndex: 0,
        currentSet: 1,
        phase: "active",
      });
    });
  });

  describe("strength step with rest between sets", () => {
    const steps = [strengthStep({ position: 0, sets: 2, rest_sec: 30 })];

    it("NEXT after set 1 enters resting", () => {
      const s = reduce(initial(), { type: "NEXT" }, steps);
      expect(s).toEqual({ currentIndex: 0, currentSet: 1, phase: "resting" });
    });

    it("TIMER_DONE during rest advances to next set, active", () => {
      const resting: State = {
        currentIndex: 0,
        currentSet: 1,
        phase: "resting",
      };
      const s = reduce(resting, { type: "TIMER_DONE" }, steps);
      expect(s).toEqual({ currentIndex: 0, currentSet: 2, phase: "active" });
    });

    it("NEXT during rest skips to next set, active", () => {
      const resting: State = {
        currentIndex: 0,
        currentSet: 1,
        phase: "resting",
      };
      const s = reduce(resting, { type: "NEXT" }, steps);
      expect(s).toEqual({ currentIndex: 0, currentSet: 2, phase: "active" });
    });

    it("NEXT after the last set of the only step ends the workout", () => {
      const lastSet: State = {
        currentIndex: 0,
        currentSet: 2,
        phase: "active",
      };
      const s = reduce(lastSet, { type: "NEXT" }, steps);
      expect(s).toEqual({ currentIndex: 1, currentSet: 1, phase: "done" });
    });
  });

  describe("strength step with no rest (rest_sec === 0)", () => {
    const steps = [strengthStep({ position: 0, sets: 3, rest_sec: 0 })];

    it("NEXT goes straight to next set, no resting phase", () => {
      const s = reduce(initial(), { type: "NEXT" }, steps);
      expect(s).toEqual({ currentIndex: 0, currentSet: 2, phase: "active" });
    });
  });

  describe("timed step", () => {
    const steps = [
      timedStep({ position: 0, sets: 2, duration_sec: 30, rest_sec: 15 }),
    ];

    it("TIMER_DONE on timed set with rest enters resting", () => {
      const s = reduce(initial(), { type: "TIMER_DONE" }, steps);
      expect(s).toEqual({ currentIndex: 0, currentSet: 1, phase: "resting" });
    });

    it("TIMER_DONE on last timed set ends the workout", () => {
      const lastSet: State = {
        currentIndex: 0,
        currentSet: 2,
        phase: "active",
      };
      const s = reduce(lastSet, { type: "TIMER_DONE" }, steps);
      expect(s).toEqual({ currentIndex: 1, currentSet: 1, phase: "done" });
    });

    it("NEXT mid-timed skips the rest of the interval and rests", () => {
      const s = reduce(initial(), { type: "NEXT" }, steps);
      // Same effect as TIMER_DONE: completes the set.
      expect(s).toEqual({ currentIndex: 0, currentSet: 1, phase: "resting" });
    });
  });

  describe("multi-step routine", () => {
    const steps = [
      strengthStep({ position: 0, sets: 1, rest_sec: 0 }),
      timedStep({ position: 1, sets: 1, duration_sec: 30, rest_sec: 0 }),
      strengthStep({ position: 2, sets: 1, rest_sec: 0 }),
    ];

    it("walks through every step and ends done", () => {
      let s = initial();
      // Step 0 (strength, 1 set, no rest) → next step
      s = reduce(s, { type: "NEXT" }, steps);
      expect(s).toEqual({ currentIndex: 1, currentSet: 1, phase: "active" });
      // Step 1 (timed, 1 set, no rest) → next step
      s = reduce(s, { type: "TIMER_DONE" }, steps);
      expect(s).toEqual({ currentIndex: 2, currentSet: 1, phase: "active" });
      // Step 2 (strength, 1 set, last) → done
      s = reduce(s, { type: "NEXT" }, steps);
      expect(s.phase).toBe("done");
    });
  });

  describe("done state", () => {
    const steps = [strengthStep({ position: 0, sets: 1, rest_sec: 0 })];

    it("ignores further actions", () => {
      const done: State = { currentIndex: 1, currentSet: 1, phase: "done" };
      expect(reduce(done, { type: "NEXT" }, steps)).toEqual(done);
      expect(reduce(done, { type: "TIMER_DONE" }, steps)).toEqual(done);
    });
  });
});
