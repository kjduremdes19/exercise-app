import { PilatesSequence } from "./pilates-sequence";

type Props = { size?: number; label?: string };

export function TeaserAnim({ size = 100, label }: Props) {
  return (
    <PilatesSequence
      size={size}
      label={label ?? "Step-by-step demonstration: Teaser"}
      frame1={
        <>
          {/* Start: lying flat, arms reaching overhead */}
          <line x1="6" y1="86" x2="94" y2="86" strokeWidth={1.5} opacity={0.35} />
          <circle cx="22" cy="78" r="5" />
          <line x1="27" y1="79" x2="86" y2="80" />
          <line x1="22" y1="78" x2="6" y2="74" />
        </>
      }
      frame2={
        <>
          {/* End: V-shape balanced on sit bones, hands reaching toes */}
          <line x1="6" y1="86" x2="94" y2="86" strokeWidth={1.5} opacity={0.35} />
          {/* hips/sit-bones at floor */}
          <circle cx="32" cy="34" r="5" />
          {/* upper body angling down to hips */}
          <line x1="34" y1="38" x2="50" y2="80" />
          {/* legs angling up from hips */}
          <line x1="50" y1="80" x2="92" y2="34" />
          {/* arms reaching toward toes */}
          <line x1="34" y1="36" x2="86" y2="38" />
        </>
      }
    />
  );
}
