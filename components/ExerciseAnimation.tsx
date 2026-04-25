import { createElement } from "react";
import { ExerciseLogo } from "./ExerciseLogo";
import { ExerciseVideo } from "./ExerciseVideo";
import { getExerciseAnimation } from "./exercise-animations";

type Props = {
  slug: string;
  name: string;
  size?: number;
  videoUrl?: string | null;
};

export function ExerciseAnimation({ slug, name, size = 100, videoUrl }: Props) {
  // Precedence: hand-built SVG > uploaded video > dumbbell-icon fallback.
  const component = getExerciseAnimation(slug);
  if (component) {
    return createElement(component, {
      size,
      label: `Animated demonstration: ${name}`,
    });
  }
  if (videoUrl) {
    return (
      <ExerciseVideo
        src={videoUrl}
        size={size}
        label={`Video demonstration: ${name}`}
      />
    );
  }
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
