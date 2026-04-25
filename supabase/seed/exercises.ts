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
    instructions: [
      "Start in a high plank with hands shoulder-width apart, body in a straight line.",
      "Brace your core and squeeze your glutes.",
      "Lower your chest toward the floor by bending your elbows to about 45° from your body.",
      "Stop when your chest is just above the floor, then press back up to the start.",
    ],
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
    instructions: [
      "Stand with feet shoulder-width apart, toes pointed slightly out.",
      "Brace your core and look straight ahead.",
      "Sit your hips back and bend your knees, lowering until thighs are parallel to the floor.",
      "Drive through your mid-foot to stand back up, squeezing your glutes at the top.",
    ],
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
    instructions: [
      "Stand tall with hands on hips or held at your chest.",
      "Step one foot back about 2–3 feet, lowering your back knee toward the floor.",
      "Stop when both knees are at ~90°; keep your front shin vertical.",
      "Push through your front heel to return to the start. Alternate legs each rep.",
    ],
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
    instructions: [
      "Lie on your back, knees bent, feet flat about hip-width and close to your glutes.",
      "Press your lower back into the floor and brace your core.",
      "Drive through your heels to lift your hips until shoulders, hips, and knees form a straight line.",
      "Squeeze your glutes hard at the top for one count, then lower with control.",
    ],
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
    instructions: [
      "Lie face-down with arms extended overhead and legs straight.",
      "Squeeze your glutes and lower back to lift your arms, chest, and legs at the same time.",
      "Hold for one count at the top with a long, neutral neck.",
      "Lower with control. Keep the lift small — don't over-arch.",
    ],
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
    instructions: [
      "Start in a downward-dog position: hands and feet on the floor, hips piked high, body forming an inverted V.",
      "Bend your elbows to lower the top of your head toward the floor between your hands.",
      "Stop just before your head touches, then press back up to the start.",
      "Keep your hips high and weight shifted over your hands the whole time.",
    ],
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
    instructions: [
      "Place your forearms on the floor, elbows directly under your shoulders.",
      "Extend your legs back, balancing on your toes — body in a straight line from heels to head.",
      "Brace your core, squeeze your glutes, and don't let your hips sag or pike up.",
      "Breathe steadily and hold for the full duration.",
    ],
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
    instructions: [
      "Lie on your side with your forearm on the floor, elbow under your shoulder.",
      "Stack your feet and lift your hips so your body forms a straight line on its side.",
      "Brace your obliques and don't let your hips drop.",
      "Hold for the full duration, then switch sides on the next set.",
    ],
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
    instructions: [
      "Stand with your back against a wall, feet about 2 feet out.",
      "Slide down the wall until your thighs are parallel to the floor — knees stacked over ankles.",
      "Press your back flat into the wall and keep weight in your heels.",
      "Hold for the full duration without resting hands on your thighs.",
    ],
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
    instructions: [
      "Stand tall with feet together and arms at your sides.",
      "Jump your feet out wide as you swing your arms overhead.",
      "Jump back to the start in one smooth motion.",
      "Keep a steady, brisk pace and land softly on the balls of your feet.",
    ],
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
    instructions: [
      "Stand tall with feet hip-width and arms bent at 90°.",
      "Run in place, driving each knee up to hip height.",
      "Pump your arms in opposition to your legs.",
      "Stay light on the balls of your feet and keep a quick pace.",
    ],
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
    instructions: [
      "Start in a high plank position with hands under shoulders.",
      "Drive one knee toward your chest while keeping your hips low.",
      "Quickly switch legs in a running motion — the other knee comes in as the first goes back.",
      "Keep your core braced and shoulders stacked over your wrists.",
    ],
  },
  {
    slug: "burpees",
    name: "Burpees",
    description:
      "Squat down, kick the feet back to a plank, do a push-up (optional), jump the feet back in, then explode up into a vertical jump. Repeat at a steady pace.",
    kind: "timed",
    category: "cardio",
    equipment: "none",
    default_duration_sec: 30,
    default_rest_sec: 15,
    instructions: [
      "Stand with feet shoulder-width apart, arms at your sides.",
      "Squat down, plant your hands, and kick both feet back into a high plank.",
      "Optionally drop into a push-up, then jump the feet forward to your hands.",
      "Drive up into a vertical jump with arms overhead, then land soft and repeat.",
    ],
  },
  {
    slug: "skater-jumps",
    name: "Skater jumps",
    description:
      "Bound side-to-side from one foot to the other, mimicking a speed skater. Land softly on the outside foot and let the trailing leg cross behind.",
    kind: "timed",
    category: "cardio",
    equipment: "none",
    default_duration_sec: 30,
    default_rest_sec: 15,
    instructions: [
      "Stand on your right foot with a slight knee bend, left foot lifted behind you.",
      "Push off the right foot and bound laterally to land on your left foot.",
      "Let the right leg cross behind the left for balance, arms swinging in opposition.",
      "Reverse direction and continue bounding side-to-side at a steady pace.",
    ],
  },
  {
    slug: "squat-jumps",
    name: "Squat jumps",
    description:
      "Drop into a bodyweight squat, then explode straight up into a jump. Land soft with bent knees and immediately descend into the next rep.",
    kind: "timed",
    category: "cardio",
    equipment: "none",
    default_duration_sec: 30,
    default_rest_sec: 15,
    instructions: [
      "Stand with feet shoulder-width, toes pointed slightly out.",
      "Sit hips back and down into a bodyweight squat, arms loaded behind you.",
      "Drive through your mid-foot and swing your arms up to jump straight up.",
      "Land softly with bent knees and immediately descend into the next squat.",
    ],
  },
  {
    slug: "butt-kicks",
    name: "Butt kicks",
    description:
      "Run in place, kicking your heels back to touch your glutes on each step. Stay light on the balls of your feet and pump the arms.",
    kind: "timed",
    category: "cardio",
    equipment: "none",
    default_duration_sec: 30,
    default_rest_sec: 15,
    instructions: [
      "Stand tall with feet hip-width and arms bent at 90°.",
      "Run in place, flicking each heel up to touch (or nearly touch) your glutes.",
      "Pump your arms in opposition to your legs, keeping your torso upright.",
      "Stay light on the balls of your feet and maintain a quick, even cadence.",
    ],
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
    instructions: [
      "Set the bar in a rack at upper-chest height. Position the bar across your upper back, not your neck.",
      "Unrack, step back, and stand with feet shoulder-width, toes slightly out.",
      "Brace your core, sit your hips back and down until thighs break parallel.",
      "Drive through your mid-foot to stand back up, keeping chest proud and knees tracking over toes.",
    ],
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
    instructions: [
      "Lie on the bench with eyes directly under the bar; plant feet flat on the floor.",
      "Grip the bar just outside shoulder width with wrists stacked over elbows.",
      "Unrack, then lower the bar to your mid-chest with control, elbows tucked at ~45°.",
      "Press back up explosively to lockout, keeping shoulders pinned to the bench.",
    ],
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
    instructions: [
      "Stand with the bar over your mid-foot, feet hip-width.",
      "Hinge at the hips and bend slightly at the knees to grip the bar just outside your knees.",
      "Brace your whole torso, drag the bar up your shins, and stand tall by pushing the floor away.",
      "Lower under control, keeping the bar close to your body the whole way down.",
    ],
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
    instructions: [
      "Stand with feet hip-width, bar resting in the front rack at your shoulders, elbows in front of the bar.",
      "Brace your core and squeeze your glutes.",
      "Press the bar straight overhead, moving your head forward as the bar passes your face.",
      "Stand tall with the bar stacked over the middle of your foot at lockout.",
    ],
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
    instructions: [
      "Stand with the bar over your mid-foot. Hinge at the hips to ~45° with a slight knee bend.",
      "Grip the bar just outside shoulder width and let it hang at arms' length.",
      "Drive your elbows back to row the bar to your lower ribs.",
      "Lower under control to a full stretch. Keep your back flat the whole time.",
    ],
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
    instructions: [
      "Stand tall holding the bar at hip height, slight bend in the knees.",
      "Push your hips straight back, lowering the bar along your thighs and shins.",
      "Stop when you feel a deep stretch in your hamstrings — usually just below the knee.",
      "Drive your hips forward to stand tall again, squeezing your glutes at the top.",
    ],
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
    instructions: [
      "Lie on your back, curl your head and shoulders off the mat, and extend your legs at 45°.",
      "Reach long arms by your hips, palms down.",
      "Pump your arms straight up and down in a small range while breathing in for 5 counts and out for 5.",
      "Continue for 10 breath cycles (100 pumps), keeping your low back imprinted on the mat.",
    ],
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
    instructions: [
      "Lie flat on your back with arms extended overhead and legs straight.",
      "Inhale to bring your arms toward the ceiling.",
      "Exhale and slowly peel your spine off the mat one vertebra at a time, reaching for your toes.",
      "Reverse with the same control, articulating your spine back down to the start.",
    ],
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
    instructions: [
      "Lie on your back, one leg pointed at the ceiling and the other extended along the mat.",
      "Anchor your pelvis and shoulders — they shouldn't move.",
      "Draw small, controlled circles in the air with the raised leg.",
      "Reverse direction halfway through. Switch legs on the next set.",
    ],
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
    instructions: [
      "Lie on your back with legs straight and arms extended overhead.",
      "In one smooth motion, lift your legs and torso simultaneously, reaching your hands toward your toes.",
      "Balance on your sit bones in a V-shape for one count.",
      "Lower with control to the start. Bend the knees to scale the move easier.",
    ],
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
    instructions: [
      "Lie face-down with hands under your shoulders and elbows tucked at your sides.",
      "Press through your hands to lengthen the spine and lift the chest off the mat.",
      "Keep your lower ribs and pelvis on the mat — only go as high as feels good in your back.",
      "Lower with control, articulating the spine back down.",
    ],
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
    instructions: [
      "Lie on your side with your body in one long line, head resting on your bottom arm.",
      "Stack your hips and shoulders — don't let them roll forward or back.",
      "Lift the top leg with control to about hip height, leading with the heel.",
      "Lower with the same control. Switch sides on the next set.",
    ],
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
    instructions: [
      "Set up in a glute bridge: lie on your back, knees bent, feet flat, hips lifted.",
      "Keeping hips level, extend one leg straight out so it's in line with your raised thigh.",
      "Hold for a beat, then return the foot to the floor.",
      "Alternate legs. Don't let the hips drop or twist as the leg moves.",
    ],
  },

  // -----------------------------------------------------------------------
  // Yoga
  // -----------------------------------------------------------------------
  {
    slug: "downward-dog",
    name: "Downward-facing dog",
    description:
      "Inverted V-shape: hands and feet on the mat, hips high. Press the floor away, lengthen the spine, and let the heels reach toward the mat.",
    kind: "timed",
    category: "yoga",
    equipment: "mat",
    default_duration_sec: 30,
    default_rest_sec: 20,
    instructions: [
      "Start on hands and knees, wrists under shoulders, knees under hips.",
      "Tuck your toes and lift your hips up and back, straightening your legs into an inverted V.",
      "Press the mat away through your palms and lengthen your spine — heels reaching toward the mat but not forced down.",
      "Breathe steadily for the full hold; pedal the feet if needed to find ease.",
    ],
  },
  {
    slug: "warrior-ii",
    name: "Warrior II",
    description:
      "Wide stance, front knee bent over ankle. Arms extended parallel to the floor, gaze over the front hand. Hold each side.",
    kind: "timed",
    category: "yoga",
    equipment: "mat",
    default_duration_sec: 30,
    default_rest_sec: 20,
    instructions: [
      "Step feet wide apart, front foot pointing forward, back foot turned in slightly.",
      "Bend the front knee to stack it over your ankle — aim for a 90° bend.",
      "Extend arms parallel to the floor, front arm forward, back arm behind.",
      "Gaze over the front hand and hold. Switch sides on the next set.",
    ],
  },
  {
    slug: "childs-pose",
    name: "Child's pose",
    description:
      "Kneel with big toes together, knees wide. Sink hips toward heels, stretch arms forward on the mat, and rest your forehead down. Reset pose.",
    kind: "timed",
    category: "yoga",
    equipment: "mat",
    default_duration_sec: 30,
    default_rest_sec: 10,
    instructions: [
      "Kneel on the mat with big toes touching and knees out wide.",
      "Sink your hips back toward your heels.",
      "Walk your hands forward and rest your forehead on the mat.",
      "Breathe deeply into the back of your ribcage for the full hold.",
    ],
  },
  {
    slug: "cat-cow",
    name: "Cat-cow",
    description:
      "On hands and knees, alternate between arching the spine (cow) and rounding it (cat) with your breath. One rep is one full cycle.",
    kind: "strength",
    category: "yoga",
    equipment: "mat",
    default_sets: 2,
    default_reps: 10,
    default_rest_sec: 15,
    instructions: [
      "Start on hands and knees with wrists under shoulders and knees under hips.",
      "Inhale to drop your belly, lift your chest and tailbone (cow).",
      "Exhale to round your spine, tuck your chin and tailbone (cat).",
      "Move with your breath — one inhale + exhale is one rep.",
    ],
  },
  {
    slug: "tree-pose",
    name: "Tree pose",
    description:
      "Stand on one leg, place the other foot on the inner calf or thigh (not the knee). Find a focal point and press hands to heart center. Hold each side.",
    kind: "timed",
    category: "yoga",
    equipment: "mat",
    default_duration_sec: 20,
    default_rest_sec: 10,
    instructions: [
      "Stand tall on one leg, shoulders stacked over hips.",
      "Place the sole of the other foot on your inner calf or inner thigh — avoid the knee.",
      "Press hands together at your chest and fix your gaze on a still point.",
      "Hold for the full duration, breathing steadily. Switch sides on the next set.",
    ],
  },

  // -----------------------------------------------------------------------
  // Pull (bodyweight)
  // -----------------------------------------------------------------------
  {
    slug: "inverted-row",
    name: "Inverted row",
    description:
      "Lie under a sturdy bar or table edge, heels on the floor. Pull your chest up to the bar by driving elbows back, then lower with control.",
    kind: "strength",
    category: "strength",
    equipment: "none",
    default_sets: 3,
    default_reps: 8,
    default_rest_sec: 60,
    instructions: [
      "Position yourself under a sturdy bar or the edge of a solid table, heels on the floor.",
      "Grip the bar just outside shoulder-width with arms fully extended, body in a straight line.",
      "Pull your chest toward the bar by driving your elbows back and squeezing your shoulder blades.",
      "Lower under control to a full arm extension. Keep your hips up the whole rep.",
    ],
  },
  {
    slug: "bird-dog",
    name: "Bird dog",
    description:
      "From hands and knees, extend opposite arm and leg until both are parallel to the floor. Hold briefly, then return and switch sides.",
    kind: "strength",
    category: "strength",
    equipment: "none",
    default_sets: 2,
    default_reps: 10,
    default_rest_sec: 30,
    instructions: [
      "Start on hands and knees, wrists under shoulders, knees under hips, spine neutral.",
      "Extend your right arm forward and left leg back until both are parallel to the floor.",
      "Hold for one count without letting your hips twist or sag.",
      "Return to the start and switch sides. One rep = one side.",
    ],
  },
  {
    slug: "prone-y-raise",
    name: "Prone Y-raise",
    description:
      "Lie face-down, arms overhead in a Y. Lift the arms a few inches off the floor by squeezing your upper back, then lower with control.",
    kind: "strength",
    category: "strength",
    equipment: "none",
    default_sets: 2,
    default_reps: 10,
    default_rest_sec: 30,
    instructions: [
      "Lie face-down with arms extended overhead in a Y-shape, thumbs pointing up.",
      "Squeeze your upper back and shoulder blades to lift your arms a few inches off the mat.",
      "Hold briefly at the top without shrugging your shoulders up to your ears.",
      "Lower with control. Keep your forehead on or near the mat.",
    ],
  },
];
