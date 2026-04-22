import type { ComponentType } from "react";
import { BodyweightSquatAnim } from "./bodyweight-squat";
import { GluteBridgeAnim } from "./glute-bridge";
import { HighKneesAnim } from "./high-knees";
import { JumpingJacksAnim } from "./jumping-jacks";
import { LungeAnim } from "./lunge";
import { MountainClimbersAnim } from "./mountain-climbers";
import { PlankAnim } from "./plank";
import { PushupAnim } from "./pushup";

export type ExerciseAnimationProps = {
  size?: number;
  label?: string;
};

const registry: Record<string, ComponentType<ExerciseAnimationProps>> = {
  "bodyweight-squat": BodyweightSquatAnim,
  "glute-bridge": GluteBridgeAnim,
  "high-knees": HighKneesAnim,
  "jumping-jacks": JumpingJacksAnim,
  "lunge": LungeAnim,
  "mountain-climbers": MountainClimbersAnim,
  "plank": PlankAnim,
  "pushup": PushupAnim,
};

export function getExerciseAnimation(
  slug: string,
): ComponentType<ExerciseAnimationProps> | null {
  return registry[slug] ?? null;
}
