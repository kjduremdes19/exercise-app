"use client";

import { useCallback, useReducer, useState } from "react";
import { DoneScreen } from "./DoneScreen";
import { RestTimer } from "./RestTimer";
import { StrengthStep } from "./StrengthStep";
import { TimedStep } from "./TimedStep";
import type { RoutineDetail } from "@/lib/db/types";
import { initialState, reduce, type Action, type State } from "@/lib/workout/machine";
import { primeAudio } from "@/lib/workout/sound";
import { useWakeLock } from "@/lib/workout/useWakeLock";
import type { CompleteSessionInput } from "@/app/(app)/routines/[slug]/play/actions";

type Props = {
  routine: RoutineDetail;
};

type PlayerStatus = "idle" | "playing";

export function WorkoutPlayer({ routine }: Props) {
  const [status, setStatus] = useState<PlayerStatus>("idle");
  const [startedAt, setStartedAt] = useState<string | null>(null);

  const [state, rawDispatch] = useReducer(
    (s: State, a: Action) => reduce(s, a, routine.steps),
    initialState(),
  );

  // runKey bumps every transition so timers reset their anchors cleanly.
  const [runKey, setRunKey] = useState(0);
  const dispatch = useCallback((a: Action) => {
    rawDispatch(a);
    setRunKey((k) => k + 1);
  }, []);

  // Wake lock held for the lifetime of the player (idle + playing).
  // Cheap no-op if the browser lacks the API.
  useWakeLock();

  const handleStart = useCallback(() => {
    primeAudio();
    setStartedAt(new Date().toISOString());
    setStatus("playing");
  }, []);

  // ---------------------------------------------------------------------
  // Idle screen — gives us the user gesture for audio + wake lock.
  // ---------------------------------------------------------------------
  if (status === "idle") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">{routine.name}</h2>
        <p className="mt-2 text-sm text-zinc-600">
          {routine.steps.length} exercise{routine.steps.length === 1 ? "" : "s"}
          {routine.estimated_duration_min !== null && (
            <> · ~{routine.estimated_duration_min} min</>
          )}
        </p>
        <button
          type="button"
          onClick={handleStart}
          className="mt-10 w-full max-w-xs rounded-md bg-zinc-900 py-4 text-base font-semibold text-white hover:bg-zinc-800"
        >
          Start
        </button>
      </div>
    );
  }

  // ---------------------------------------------------------------------
  // Done screen — fires the save effect once, then shows result.
  // ---------------------------------------------------------------------
  if (state.phase === "done") {
    const payload = buildSessionPayload({
      routine,
      startedAt: startedAt ?? new Date().toISOString(),
    });
    return <DoneScreen payload={payload} routineName={routine.name} />;
  }

  // ---------------------------------------------------------------------
  // Active or resting on a real step.
  // ---------------------------------------------------------------------
  const step = routine.steps[state.currentIndex];
  const totalSets = step.sets ?? 1;

  if (state.phase === "resting") {
    const nextStep =
      state.currentSet < totalSets ? step : routine.steps[state.currentIndex + 1];
    const nextLabel = nextStep
      ? state.currentSet < totalSets
        ? `${nextStep.exercise.name} · set ${state.currentSet + 1}`
        : nextStep.exercise.name
      : "Done";
    return (
      <RestTimer
        key={runKey}
        durationSec={step.rest_sec ?? 0}
        nextLabel={nextLabel}
        onDone={() => dispatch({ type: "TIMER_DONE" })}
        onSkip={() => dispatch({ type: "NEXT" })}
      />
    );
  }

  // active
  if (step.kind === "strength") {
    return (
      <StrengthStep
        step={step}
        currentSet={state.currentSet}
        totalSets={totalSets}
        onComplete={() => dispatch({ type: "NEXT" })}
      />
    );
  }
  return (
    <TimedStep
      key={runKey}
      step={step}
      currentSet={state.currentSet}
      totalSets={totalSets}
      onComplete={() => dispatch({ type: "TIMER_DONE" })}
      onSkip={() => dispatch({ type: "NEXT" })}
    />
  );
}

// =========================================================================
// Helpers
// =========================================================================

function buildSessionPayload({
  routine,
  startedAt,
}: {
  routine: RoutineDetail;
  startedAt: string;
}): CompleteSessionInput {
  return {
    routine_slug: routine.slug,
    started_at: startedAt,
    completed_at: new Date().toISOString(),
    snapshot: {
      routine_name: routine.name,
      steps: routine.steps.map((s) => ({
        position: s.position,
        exercise_slug: s.exercise.slug,
        exercise_name: s.exercise.name,
        kind: s.kind,
        sets: s.sets,
        reps: s.reps,
        duration_sec: s.duration_sec,
        rest_sec: s.rest_sec,
      })),
    },
  };
}

