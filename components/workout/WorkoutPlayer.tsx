"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { DoneScreen } from "./DoneScreen";
import { RestTimer } from "./RestTimer";
import { StrengthStep } from "./StrengthStep";
import { TimedStep } from "./TimedStep";
import type { RoutineDetail, SetLog, StepLog } from "@/lib/db/types";
import { initialState, reduce, type Action, type State } from "@/lib/workout/machine";
import { clearDraft, readDraft, saveDraft } from "@/lib/workout/draft";
import { primeAudio } from "@/lib/workout/sound";
import { useWakeLock } from "@/lib/workout/useWakeLock";
import type { CompleteSessionInput } from "@/app/(app)/routines/[slug]/play/actions";

type Props = {
  routine: RoutineDetail;
  resume?: boolean;
};

type PlayerStatus = "idle" | "playing";

/**
 * Validates a stored draft against the current routine. Drops the draft if
 * the routine has changed in a way that would make the saved indices invalid.
 */
function restoreFromDraft(
  routine: RoutineDetail,
): { state: State; startedAt: string; setLogs: StepLog[] } | null {
  const draft = readDraft();
  if (!draft) return null;
  if (draft.routineSlug !== routine.slug) return null;
  if (draft.state.currentIndex < 0 || draft.state.currentIndex >= routine.steps.length) {
    clearDraft();
    return null;
  }
  const step = routine.steps[draft.state.currentIndex];
  const totalSets = step.sets ?? 1;
  if (draft.state.currentSet < 1 || draft.state.currentSet > totalSets) {
    clearDraft();
    return null;
  }
  return {
    state: { ...draft.state },
    startedAt: draft.startedAt,
    setLogs: draft.setLogs ?? [],
  };
}

export function WorkoutPlayer({ routine, resume = false }: Props) {
  const router = useRouter();

  // Compute the starting state once. If resume is requested AND a valid draft
  // exists, jump straight into the saved spot. Otherwise normal idle flow.
  const [bootstrap] = useState(() =>
    resume ? restoreFromDraft(routine) : null,
  );

  const [status, setStatus] = useState<PlayerStatus>(
    bootstrap ? "playing" : "idle",
  );
  const [startedAt, setStartedAt] = useState<string | null>(
    bootstrap?.startedAt ?? null,
  );

  const [state, rawDispatch] = useReducer(
    (s: State, a: Action) => reduce(s, a, routine.steps),
    bootstrap?.state ?? initialState(),
  );

  // Per-set logs collected during this workout. Keyed by step position; each
  // entry is an append-only array of SetLog (sets[0] is set 1, etc).
  const [setLogs, setSetLogs] = useState<StepLog[]>(bootstrap?.setLogs ?? []);

  const handleLogSet = useCallback((position: number, log: SetLog) => {
    setSetLogs((prev) => {
      const next = [...prev];
      const idx = next.findIndex((s) => s.position === position);
      if (idx === -1) {
        next.push({ position, sets: [log] });
      } else {
        next[idx] = { position, sets: [...next[idx].sets, log] };
      }
      return next;
    });
  }, []);

  const [runKey, setRunKey] = useState(0);
  const dispatch = useCallback((a: Action) => {
    rawDispatch(a);
    setRunKey((k) => k + 1);
  }, []);

  useWakeLock();

  // Auto-save: any time we're mid-workout (active or resting), persist a fresh
  // draft. On done, clear it (covered separately below to avoid race with the
  // session insert).
  useEffect(() => {
    if (status !== "playing") return;
    if (state.phase === "done") return;
    if (!startedAt) return;
    saveDraft({
      routineSlug: routine.slug,
      startedAt,
      state: {
        currentIndex: state.currentIndex,
        currentSet: state.currentSet,
        phase: state.phase,
      },
      savedAt: new Date().toISOString(),
      setLogs,
    });
  }, [status, state, startedAt, routine.slug, setLogs]);

  // Clear the draft exactly once when the workout completes.
  const cleared = useRef(false);
  useEffect(() => {
    if (state.phase === "done" && !cleared.current) {
      cleared.current = true;
      clearDraft();
    }
  }, [state.phase]);

  const handleStart = useCallback(() => {
    primeAudio();
    setStartedAt(new Date().toISOString());
    setStatus("playing");
  }, []);

  const handlePause = useCallback(() => {
    // The auto-save effect has already persisted the latest state; just leave.
    router.push("/");
  }, [router]);

  // ---------------------------------------------------------------------
  // Idle screen — gives us the user gesture for audio + wake lock.
  // ---------------------------------------------------------------------
  if (status === "idle") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">{routine.name}</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {routine.steps.length} exercise{routine.steps.length === 1 ? "" : "s"}
          {routine.estimated_duration_min !== null && (
            <> · ~{routine.estimated_duration_min} min</>
          )}
        </p>
        <button
          type="button"
          onClick={handleStart}
          className="mt-10 w-full max-w-xs rounded-md bg-zinc-900 py-4 text-base font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
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
      setLogs,
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
        onPause={handlePause}
      />
    );
  }

  if (step.kind === "strength") {
    // Pre-fill weight with the most recent value already logged for this same
    // step in this session, so subsequent sets only need a tap.
    const lastLogForStep = setLogs.find((s) => s.position === step.position);
    const lastWeight =
      lastLogForStep?.sets[lastLogForStep.sets.length - 1]?.weight ?? null;
    return (
      <StrengthStep
        step={step}
        currentSet={state.currentSet}
        totalSets={totalSets}
        lastWeight={lastWeight}
        onComplete={(log) => {
          handleLogSet(step.position, log);
          dispatch({ type: "NEXT" });
        }}
        onPause={handlePause}
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
      onPause={handlePause}
    />
  );
}

// =========================================================================
// Helpers
// =========================================================================

function buildSessionPayload({
  routine,
  startedAt,
  setLogs,
}: {
  routine: RoutineDetail;
  startedAt: string;
  setLogs: StepLog[];
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
    set_logs: setLogs.length > 0 ? { steps: setLogs } : null,
  };
}
