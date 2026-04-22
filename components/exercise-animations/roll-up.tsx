import { PilatesSequence } from "./pilates-sequence";

type Props = { size?: number; label?: string };

export function RollUpAnim({ size = 100, label }: Props) {
  return (
    <PilatesSequence
      size={size}
      label={label ?? "Step-by-step demonstration: Roll-up"}
      frame1={
        <>
          {/* Start: lying flat, arms overhead */}
          <line x1="6" y1="86" x2="94" y2="86" strokeWidth={1.5} opacity={0.35} />
          <circle cx="22" cy="78" r="5" />
          <line x1="27" y1="79" x2="86" y2="80" />
          <line x1="22" y1="78" x2="6" y2="74" />
        </>
      }
      frame2={
        <>
          {/* End: sitting up, reaching toward toes */}
          <line x1="6" y1="86" x2="94" y2="86" strokeWidth={1.5} opacity={0.35} />
          <circle cx="44" cy="46" r="5" />
          <line x1="46" y1="50" x2="55" y2="60" />
          <line x1="55" y1="60" x2="58" y2="74" />
          <line x1="58" y1="74" x2="92" y2="80" />
          <line x1="46" y1="48" x2="84" y2="76" />
        </>
      }
    />
  );
}
