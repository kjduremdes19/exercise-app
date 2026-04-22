import type { ComponentType } from "react";
import { BodyweightSquatAnim } from "./bodyweight-squat";
import { BridgeWithLegLiftAnim } from "./bridge-with-leg-lift";
import { GluteBridgeAnim } from "./glute-bridge";
import { HighKneesAnim } from "./high-knees";
import { JumpingJacksAnim } from "./jumping-jacks";
import { LungeAnim } from "./lunge";
import { MountainClimbersAnim } from "./mountain-climbers";
import { PlankAnim } from "./plank";
import { PushupAnim } from "./pushup";
import { RollUpAnim } from "./roll-up";
import { SideLyingLegLiftAnim } from "./side-lying-leg-lift";
import { SingleLegCirclesAnim } from "./single-leg-circles";
import { SwanAnim } from "./swan";
import { TeaserAnim } from "./teaser";
import { TheHundredAnim } from "./the-hundred";

export type ExerciseAnimationProps = {
  size?: number;
  label?: string;
};

const registry: Record<string, ComponentType<ExerciseAnimationProps>> = {
  // Animated (start ↔ end crossfade)
  "bodyweight-squat": BodyweightSquatAnim,
  "glute-bridge": GluteBridgeAnim,
  "high-knees": HighKneesAnim,
  "jumping-jacks": JumpingJacksAnim,
  "lunge": LungeAnim,
  "mountain-climbers": MountainClimbersAnim,
  "plank": PlankAnim,
  "pushup": PushupAnim,
  // Pilates step-by-step (static start → end side-by-side)
  "the-hundred": TheHundredAnim,
  "roll-up": RollUpAnim,
  "single-leg-circles": SingleLegCirclesAnim,
  "teaser": TeaserAnim,
  "swan": SwanAnim,
  "side-lying-leg-lift": SideLyingLegLiftAnim,
  "bridge-with-leg-lift": BridgeWithLegLiftAnim,
};

export function getExerciseAnimation(
  slug: string,
): ComponentType<ExerciseAnimationProps> | null {
  return registry[slug] ?? null;
}
