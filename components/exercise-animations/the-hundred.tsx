import { PilatesSequence } from "./pilates-sequence";

type Props = { size?: number; label?: string };

export function TheHundredAnim({ size = 100, label }: Props) {
  return (
    <PilatesSequence
      size={size}
      label={label ?? "Step-by-step demonstration: The Hundred"}
      frame1={
        <>
          {/* Start: lying flat on back, arms at sides */}
          <line x1="6" y1="86" x2="94" y2="86" strokeWidth={1.5} opacity={0.35} />
          <circle cx="14" cy="78" r="5" />
          <line x1="19" y1="79" x2="86" y2="80" />
          <line x1="28" y1="80" x2="58" y2="81" />
        </>
      }
      frame2={
        <>
          {/* Working: head/shoulders curled, legs at 45°, arms pumping by hips */}
          <line x1="6" y1="86" x2="94" y2="86" strokeWidth={1.5} opacity={0.35} />
          <circle cx="18" cy="68" r="5" />
          <line x1="22" y1="71" x2="36" y2="78" />
          <line x1="36" y1="78" x2="55" y2="82" />
          <line x1="55" y1="82" x2="92" y2="58" />
          <line x1="28" y1="76" x2="50" y2="80" />
        </>
      }
    />
  );
}
