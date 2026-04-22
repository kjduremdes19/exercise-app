import { PilatesSequence } from "./pilates-sequence";

type Props = { size?: number; label?: string };

export function SwanAnim({ size = 100, label }: Props) {
  return (
    <PilatesSequence
      size={size}
      label={label ?? "Step-by-step demonstration: Swan"}
      frame1={
        <>
          {/* Start: lying face-down, arms tucked in at sides */}
          <line x1="6" y1="86" x2="94" y2="86" strokeWidth={1.5} opacity={0.35} />
          <circle cx="14" cy="80" r="5" />
          <line x1="19" y1="80" x2="86" y2="82" />
          <line x1="22" y1="80" x2="40" y2="82" />
        </>
      }
      frame2={
        <>
          {/* Lifted: chest off mat, arms pressing, hips on floor */}
          <line x1="6" y1="86" x2="94" y2="86" strokeWidth={1.5} opacity={0.35} />
          <circle cx="20" cy="58" r="5" />
          {/* spine arching from chest up to hips on floor */}
          <line x1="24" y1="62" x2="40" y2="74" />
          <line x1="40" y1="74" x2="60" y2="80" />
          {/* hips → legs along floor */}
          <line x1="60" y1="80" x2="92" y2="82" />
          {/* arms pressing into floor */}
          <line x1="22" y1="64" x2="22" y2="80" />
          <line x1="22" y1="80" x2="32" y2="82" />
        </>
      }
    />
  );
}
