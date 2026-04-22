import { createElement } from "react";
import { ExerciseLogo } from "./ExerciseLogo";
import { getExerciseAnimation } from "./exercise-animations";

type Props = {
  slug: string;
  name: string;
  size?: number;
};

export function ExerciseAnimation({ slug, name, size = 100 }: Props) {
  const component = getExerciseAnimation(slug);
  if (component) {
    return createElement(component, {
      size,
      label: `Animated demonstration: ${name}`,
    });
  }
  // Fallback: dumbbell icon scaled to the requested size, centered.
  return (
    <span
      role="img"
      aria-label={`Icon: ${name}`}
      className="inline-flex items-center justify-center text-zinc-400"
      style={{ width: size, height: size }}
    >
      <ExerciseLogo className="h-1/2 w-1/2" />
    </span>
  );
}
