import { PilatesSequence } from "./pilates-sequence";

type Props = { size?: number; label?: string };

export function SingleLegCirclesAnim({ size = 100, label }: Props) {
  return (
    <PilatesSequence
      size={size}
      label={label ?? "Step-by-step demonstration: Single-leg circles"}
      frame1={
        <>
          {/* Lying on back, one leg pointed straight up */}
          <line x1="6" y1="86" x2="94" y2="86" strokeWidth={1.5} opacity={0.35} />
          <circle cx="14" cy="78" r="5" />
          <line x1="19" y1="79" x2="55" y2="80" />
          <line x1="55" y1="80" x2="86" y2="80" />
          <line x1="55" y1="80" x2="58" y2="40" />
          <circle cx="58" cy="40" r="9" strokeDasharray="2 3" opacity={0.5} />
        </>
      }
      frame2={
        <>
          {/* Same lying position, leg circled out to the side */}
          <line x1="6" y1="86" x2="94" y2="86" strokeWidth={1.5} opacity={0.35} />
          <circle cx="14" cy="78" r="5" />
          <line x1="19" y1="79" x2="55" y2="80" />
          <line x1="55" y1="80" x2="86" y2="80" />
          <line x1="55" y1="80" x2="80" y2="48" />
          <circle cx="80" cy="48" r="9" strokeDasharray="2 3" opacity={0.5} />
        </>
      }
    />
  );
}
