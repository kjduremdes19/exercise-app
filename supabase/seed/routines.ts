import type { RoutineSeed } from "./types";

export const routines: RoutineSeed[] = [
  {
    slug: "full-body-a",
    name: "Full Body A",
    description:
      "Balanced bodyweight routine hitting legs, push, pull/posterior chain, and core. ~20 minutes.",
    estimated_duration_min: 20,
    muscle_group: "full-body",
    exercises: [
      { exercise_slug: "bodyweight-squat" },
      { exercise_slug: "pushup" },
      { exercise_slug: "glute-bridge" },
      { exercise_slug: "superman" },
      { exercise_slug: "plank" },
    ],
  },
  {
    slug: "lower-focus",
    name: "Lower Focus",
    description: "Legs and glutes. Slower pace, longer rests.",
    estimated_duration_min: 20,
    muscle_group: "legs",
    exercises: [
      { exercise_slug: "bodyweight-squat", sets: 4, reps: 15, rest_sec: 60 },
      { exercise_slug: "lunge", sets: 3, reps: 12, rest_sec: 60 },
      { exercise_slug: "glute-bridge", sets: 3, reps: 20, rest_sec: 45 },
      { exercise_slug: "wall-sit", sets: 3, duration_sec: 40, rest_sec: 45 },
    ],
  },
  {
    slug: "upper-focus",
    name: "Upper Focus",
    description: "Push, shoulders, and core. Bodyweight only.",
    estimated_duration_min: 20,
    muscle_group: "push",
    exercises: [
      { exercise_slug: "pushup", sets: 4, reps: 10, rest_sec: 60 },
      { exercise_slug: "pike-pushup", sets: 3, reps: 8, rest_sec: 60 },
      { exercise_slug: "plank", sets: 3, duration_sec: 40, rest_sec: 30 },
      { exercise_slug: "side-plank", sets: 2, duration_sec: 25, rest_sec: 25 },
    ],
  },
  {
    slug: "barbell-push-day",
    name: "Barbell Push Day",
    description:
      "Heavy compound work for the chest, shoulders, and back. Load the bar, warm up first.",
    estimated_duration_min: 35,
    muscle_group: "push",
    exercises: [
      { exercise_slug: "barbell-bench-press", sets: 4, reps: 6, rest_sec: 120 },
      { exercise_slug: "barbell-overhead-press", sets: 4, reps: 6, rest_sec: 120 },
      { exercise_slug: "barbell-row", sets: 4, reps: 8, rest_sec: 90 },
    ],
  },
  {
    slug: "barbell-lower-day",
    name: "Barbell Lower Day",
    description:
      "Squat, hinge, pull. Prioritize form over load. Warm up thoroughly before the first working set.",
    estimated_duration_min: 35,
    muscle_group: "legs",
    exercises: [
      { exercise_slug: "barbell-back-squat", sets: 4, reps: 6, rest_sec: 150 },
      { exercise_slug: "barbell-romanian-deadlift", sets: 4, reps: 8, rest_sec: 90 },
      { exercise_slug: "barbell-row", sets: 3, reps: 8, rest_sec: 90 },
    ],
  },
  {
    slug: "pilates-core-20",
    name: "Pilates Core 20",
    description:
      "Classic mat sequence. Control over speed, breath with each movement.",
    estimated_duration_min: 20,
    muscle_group: "core",
    exercises: [
      { exercise_slug: "the-hundred", sets: 1, duration_sec: 60, rest_sec: 20 },
      { exercise_slug: "roll-up", sets: 2, reps: 8, rest_sec: 20 },
      { exercise_slug: "single-leg-circles", sets: 2, reps: 10, rest_sec: 20 },
      { exercise_slug: "teaser", sets: 2, reps: 6, rest_sec: 30 },
      { exercise_slug: "bridge-with-leg-lift", sets: 2, reps: 10, rest_sec: 25 },
      { exercise_slug: "swan", sets: 2, reps: 8, rest_sec: 20 },
    ],
  },
  {
    slug: "seven-min-hiit",
    name: "7-Minute HIIT",
    description:
      "Quick conditioning circuit. 30s work / 10s rest, one round.",
    estimated_duration_min: 8,
    muscle_group: "cardio",
    exercises: [
      { exercise_slug: "jumping-jacks", sets: 1, duration_sec: 30, rest_sec: 10 },
      { exercise_slug: "high-knees", sets: 1, duration_sec: 30, rest_sec: 10 },
      { exercise_slug: "bodyweight-squat", sets: 1, reps: 20, rest_sec: 10 },
      { exercise_slug: "mountain-climbers", sets: 1, duration_sec: 30, rest_sec: 10 },
      { exercise_slug: "pushup", sets: 1, reps: 12, rest_sec: 10 },
      { exercise_slug: "plank", sets: 1, duration_sec: 30, rest_sec: 10 },
      { exercise_slug: "lunge", sets: 1, reps: 16, rest_sec: 10 },
    ],
  },
  {
    slug: "yoga-flow-15",
    name: "Yoga Flow 15",
    description:
      "Gentle flow through foundational poses. Move with breath, hold long, and reset between standing poses.",
    estimated_duration_min: 15,
    muscle_group: "full-body",
    exercises: [
      { exercise_slug: "cat-cow", sets: 2, reps: 10, rest_sec: 15 },
      { exercise_slug: "downward-dog", sets: 2, duration_sec: 30, rest_sec: 15 },
      { exercise_slug: "warrior-ii", sets: 2, duration_sec: 30, rest_sec: 20 },
      { exercise_slug: "tree-pose", sets: 2, duration_sec: 20, rest_sec: 10 },
      { exercise_slug: "childs-pose", sets: 1, duration_sec: 60, rest_sec: 0 },
    ],
  },
  {
    slug: "pull-day",
    name: "Pull Day",
    description:
      "Back, biceps, and posterior chain. Mix of bodyweight rows and barbell work if available.",
    estimated_duration_min: 25,
    muscle_group: "pull",
    exercises: [
      { exercise_slug: "inverted-row", sets: 3, reps: 8, rest_sec: 60 },
      { exercise_slug: "barbell-row", sets: 3, reps: 8, rest_sec: 90 },
      { exercise_slug: "superman", sets: 3, reps: 12, rest_sec: 30 },
      { exercise_slug: "prone-y-raise", sets: 2, reps: 10, rest_sec: 30 },
      { exercise_slug: "bird-dog", sets: 2, reps: 10, rest_sec: 30 },
    ],
  },
];
