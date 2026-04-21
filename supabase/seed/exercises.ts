import type { ExerciseSeed } from "./types";

export const exercises: ExerciseSeed[] = [
  // -----------------------------------------------------------------------
  // Strength (bodyweight)
  // -----------------------------------------------------------------------
  {
    slug: "pushup",
    name: "Push-up",
    description:
      "Hands shoulder-width, body in a straight line. Lower until elbows are at ~90°, then press back up.",
    kind: "strength",
    default_sets: 3,
    default_reps: 10,
    default_rest_sec: 45,
  },
  {
    slug: "bodyweight-squat",
    name: "Bodyweight squat",
    description:
      "Feet shoulder-width, toes slightly out. Sit back and down until thighs are roughly parallel to the floor, then drive up.",
    kind: "strength",
    default_sets: 3,
    default_reps: 15,
    default_rest_sec: 45,
  },
  {
    slug: "lunge",
    name: "Reverse lunge",
    description:
      "Step one foot back, lower until both knees are ~90°, then push through the front heel to return. Alternate legs each rep.",
    kind: "strength",
    default_sets: 3,
    default_reps: 12,
    default_rest_sec: 45,
  },
  {
    slug: "glute-bridge",
    name: "Glute bridge",
    description:
      "Lie on your back, knees bent, feet flat. Squeeze glutes and lift hips until shoulders, hips, and knees form a straight line.",
    kind: "strength",
    default_sets: 3,
    default_reps: 15,
    default_rest_sec: 30,
  },
  {
    slug: "superman",
    name: "Superman",
    description:
      "Lie face-down. Lift arms, chest, and legs off the floor by squeezing your back and glutes. Hold briefly, then lower.",
    kind: "strength",
    default_sets: 3,
    default_reps: 12,
    default_rest_sec: 30,
  },
  {
    slug: "pike-pushup",
    name: "Pike push-up",
    description:
      "Form an inverted V with hips high. Bend elbows to lower the top of your head toward the floor, then press back up. Targets shoulders.",
    kind: "strength",
    default_sets: 3,
    default_reps: 8,
    default_rest_sec: 60,
  },

  // -----------------------------------------------------------------------
  // Timed / cardio / isometric
  // -----------------------------------------------------------------------
  {
    slug: "plank",
    name: "Forearm plank",
    description:
      "Forearms on the floor, body in a straight line from shoulders to heels. Brace abs and glutes. Don't let hips sag.",
    kind: "timed",
    default_duration_sec: 30,
    default_rest_sec: 30,
  },
  {
    slug: "side-plank",
    name: "Side plank",
    description:
      "Forearm on the floor, body in a straight line on its side. Hold. Switch sides on the next set.",
    kind: "timed",
    default_duration_sec: 20,
    default_rest_sec: 20,
  },
  {
    slug: "wall-sit",
    name: "Wall sit",
    description:
      "Back against a wall, slide down until thighs are parallel to the floor. Hold. Keep weight in heels.",
    kind: "timed",
    default_duration_sec: 30,
    default_rest_sec: 30,
  },
  {
    slug: "jumping-jacks",
    name: "Jumping jacks",
    description:
      "Jump feet wide as arms reach overhead, then back to start. Steady, brisk pace.",
    kind: "timed",
    default_duration_sec: 30,
    default_rest_sec: 15,
  },
  {
    slug: "high-knees",
    name: "High knees",
    description:
      "Run in place, driving knees up to hip height. Pump arms.",
    kind: "timed",
    default_duration_sec: 30,
    default_rest_sec: 15,
  },
  {
    slug: "mountain-climbers",
    name: "Mountain climbers",
    description:
      "From a high plank, drive knees alternately toward your chest at a steady pace. Keep hips low and core engaged.",
    kind: "timed",
    default_duration_sec: 30,
    default_rest_sec: 15,
  },
];
