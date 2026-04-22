import type { ExerciseSeed } from "./types";

export const exercises: ExerciseSeed[] = [
  // -----------------------------------------------------------------------
  // Bodyweight strength
  // -----------------------------------------------------------------------
  {
    slug: "pushup",
    name: "Push-up",
    description:
      "Hands shoulder-width, body in a straight line. Lower until elbows are at ~90°, then press back up.",
    kind: "strength",
    category: "strength",
    equipment: "none",
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
    category: "strength",
    equipment: "none",
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
    category: "strength",
    equipment: "none",
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
    category: "strength",
    equipment: "none",
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
    category: "strength",
    equipment: "none",
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
    category: "strength",
    equipment: "none",
    default_sets: 3,
    default_reps: 8,
    default_rest_sec: 60,
  },

  // -----------------------------------------------------------------------
  // Bodyweight isometric (kind: timed, but category: strength)
  // -----------------------------------------------------------------------
  {
    slug: "plank",
    name: "Forearm plank",
    description:
      "Forearms on the floor, body in a straight line from shoulders to heels. Brace abs and glutes. Don't let hips sag.",
    kind: "timed",
    category: "strength",
    equipment: "none",
    default_duration_sec: 30,
    default_rest_sec: 30,
  },
  {
    slug: "side-plank",
    name: "Side plank",
    description:
      "Forearm on the floor, body in a straight line on its side. Hold. Switch sides on the next set.",
    kind: "timed",
    category: "strength",
    equipment: "none",
    default_duration_sec: 20,
    default_rest_sec: 20,
  },
  {
    slug: "wall-sit",
    name: "Wall sit",
    description:
      "Back against a wall, slide down until thighs are parallel to the floor. Hold. Keep weight in heels.",
    kind: "timed",
    category: "strength",
    equipment: "none",
    default_duration_sec: 30,
    default_rest_sec: 30,
  },

  // -----------------------------------------------------------------------
  // Cardio (bodyweight)
  // -----------------------------------------------------------------------
  {
    slug: "jumping-jacks",
    name: "Jumping jacks",
    description:
      "Jump feet wide as arms reach overhead, then back to start. Steady, brisk pace.",
    kind: "timed",
    category: "cardio",
    equipment: "none",
    default_duration_sec: 30,
    default_rest_sec: 15,
  },
  {
    slug: "high-knees",
    name: "High knees",
    description: "Run in place, driving knees up to hip height. Pump arms.",
    kind: "timed",
    category: "cardio",
    equipment: "none",
    default_duration_sec: 30,
    default_rest_sec: 15,
  },
  {
    slug: "mountain-climbers",
    name: "Mountain climbers",
    description:
      "From a high plank, drive knees alternately toward your chest at a steady pace. Keep hips low and core engaged.",
    kind: "timed",
    category: "cardio",
    equipment: "none",
    default_duration_sec: 30,
    default_rest_sec: 15,
  },

  // -----------------------------------------------------------------------
  // Barbell compound lifts
  // -----------------------------------------------------------------------
  {
    slug: "barbell-back-squat",
    name: "Barbell back squat",
    description:
      "Bar across upper back. Brace, sit back and down until hips break parallel, then drive up through mid-foot. Keep chest proud, knees tracking over toes.",
    kind: "strength",
    category: "strength",
    equipment: "barbell",
    default_sets: 4,
    default_reps: 6,
    default_rest_sec: 120,
  },
  {
    slug: "barbell-bench-press",
    name: "Barbell bench press",
    description:
      "Lie on a flat bench, eyes under the bar. Grip just outside shoulder width, lower the bar to your mid-chest with control, then press back up to lockout.",
    kind: "strength",
    category: "strength",
    equipment: "barbell",
    default_sets: 4,
    default_reps: 6,
    default_rest_sec: 120,
  },
  {
    slug: "barbell-deadlift",
    name: "Barbell deadlift",
    description:
      "Bar over mid-foot. Hinge at the hips, grip just outside your knees, brace your whole torso, then stand up by pushing the floor away. Keep the bar close.",
    kind: "strength",
    category: "strength",
    equipment: "barbell",
    default_sets: 4,
    default_reps: 5,
    default_rest_sec: 150,
  },
  {
    slug: "barbell-overhead-press",
    name: "Barbell overhead press",
    description:
      "Bar in the front rack, feet hip-width. Press the bar straight overhead, moving your head forward as the bar passes. Stand tall at lockout.",
    kind: "strength",
    category: "strength",
    equipment: "barbell",
    default_sets: 4,
    default_reps: 6,
    default_rest_sec: 120,
  },
  {
    slug: "barbell-row",
    name: "Barbell bent-over row",
    description:
      "Hinge to ~45°, bar hanging at arms' length. Row the bar to your lower ribs by driving elbows back. Lower under control.",
    kind: "strength",
    category: "strength",
    equipment: "barbell",
    default_sets: 4,
    default_reps: 8,
    default_rest_sec: 90,
  },
  {
    slug: "barbell-romanian-deadlift",
    name: "Romanian deadlift",
    description:
      "Bar at the hips, slight knee bend. Push hips back to lower the bar along your legs until you feel a stretch in the hamstrings, then drive hips forward to stand.",
    kind: "strength",
    category: "strength",
    equipment: "barbell",
    default_sets: 4,
    default_reps: 8,
    default_rest_sec: 90,
  },

  // -----------------------------------------------------------------------
  // Pilates mat
  // -----------------------------------------------------------------------
  {
    slug: "the-hundred",
    name: "The Hundred",
    description:
      "Lie on your back, head and shoulders curled up, legs extended at 45°. Pump straight arms up and down by your hips while breathing in 5 and out 5.",
    kind: "timed",
    category: "pilates",
    equipment: "mat",
    default_duration_sec: 60,
    default_rest_sec: 20,
  },
  {
    slug: "roll-up",
    name: "Roll-up",
    description:
      "Lie flat, arms overhead. Slowly peel your spine off the mat one vertebra at a time to reach for your toes, then roll back down with the same control.",
    kind: "strength",
    category: "pilates",
    equipment: "mat",
    default_sets: 2,
    default_reps: 8,
    default_rest_sec: 20,
  },
  {
    slug: "single-leg-circles",
    name: "Single-leg circles",
    description:
      "Lie on your back, one leg pointed at the ceiling. Draw small, controlled circles with the leg while keeping the pelvis anchored. Reverse direction halfway.",
    kind: "strength",
    category: "pilates",
    equipment: "mat",
    default_sets: 2,
    default_reps: 10,
    default_rest_sec: 20,
  },
  {
    slug: "teaser",
    name: "Teaser",
    description:
      "From lying, lift legs and torso simultaneously into a V-shape balanced on your sit bones. Lower with control. Scale by bending the knees.",
    kind: "strength",
    category: "pilates",
    equipment: "mat",
    default_sets: 2,
    default_reps: 6,
    default_rest_sec: 30,
  },
  {
    slug: "swan",
    name: "Swan",
    description:
      "Lie face-down, hands under shoulders. Lengthen the spine and lift the chest up, keeping the lower ribs on the mat. Lower with control.",
    kind: "strength",
    category: "pilates",
    equipment: "mat",
    default_sets: 2,
    default_reps: 8,
    default_rest_sec: 20,
  },
  {
    slug: "side-lying-leg-lift",
    name: "Side-lying leg lift",
    description:
      "Lie on your side, body in one long line. Lift the top leg with control — no tipping forward or back. Switch sides on the next set.",
    kind: "strength",
    category: "pilates",
    equipment: "mat",
    default_sets: 2,
    default_reps: 12,
    default_rest_sec: 20,
  },
  {
    slug: "bridge-with-leg-lift",
    name: "Bridge with leg lift",
    description:
      "From a glute bridge position, extend one leg straight while keeping hips level. Lower the leg, alternate sides. Keep glutes engaged the whole time.",
    kind: "strength",
    category: "pilates",
    equipment: "mat",
    default_sets: 2,
    default_reps: 10,
    default_rest_sec: 25,
  },
];
