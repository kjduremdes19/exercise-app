import type { MergedStep } from "@/lib/db/types";

export type Phase = "active" | "resting" | "done";

export type State = {
  currentIndex: number;
  currentSet: number; // 1-based
  phase: Phase;
};

export type Action = { type: "NEXT" } | { type: "TIMER_DONE" };

export function initialState(): State {
  return { currentIndex: 0, currentSet: 1, phase: "active" };
}

export function reduce(
  state: State,
  action: Action,
  steps: MergedStep[],
): State {
  if (state.phase === "done") return state;

  // Resting phase: any action means "rest is over, go to next set".
  if (state.phase === "resting") {
    return advanceToNextSet(state, steps);
  }

  // Active phase. NEXT (strength click) and TIMER_DONE (timed expire)
  // both signal that the current set is complete. Treat them identically.
  return completeCurrentSet(state, steps);
}

function completeCurrentSet(state: State, steps: MergedStep[]): State {
  const step = steps[state.currentIndex];
  const totalSets = step.sets ?? 1;

  // More sets to do on this step?
  if (state.currentSet < totalSets) {
    if ((step.rest_sec ?? 0) > 0) {
      return { ...state, phase: "resting" };
    }
    return { ...state, currentSet: state.currentSet + 1, phase: "active" };
  }

  // Last set of this step → advance to next step (or done).
  return advanceToNextStep(state, steps);
}

function advanceToNextSet(state: State, steps: MergedStep[]): State {
  const step = steps[state.currentIndex];
  const totalSets = step.sets ?? 1;
  if (state.currentSet < totalSets) {
    return { ...state, currentSet: state.currentSet + 1, phase: "active" };
  }
  return advanceToNextStep(state, steps);
}

function advanceToNextStep(state: State, steps: MergedStep[]): State {
  const nextIndex = state.currentIndex + 1;
  if (nextIndex >= steps.length) {
    return { currentIndex: nextIndex, currentSet: 1, phase: "done" };
  }
  return { currentIndex: nextIndex, currentSet: 1, phase: "active" };
}
