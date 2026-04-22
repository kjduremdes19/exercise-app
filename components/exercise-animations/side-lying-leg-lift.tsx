import { PilatesSequence } from "./pilates-sequence";

type Props = { size?: number; label?: string };

export function SideLyingLegLiftAnim({ size = 100, label }: Props) {
  return (
    <PilatesSequence
      size={size}
      label={label ?? "Step-by-step demonstration: Side-lying leg lift"}
      frame1={
        <>
          {/* Start: side-lying, both legs together along the floor */}
          <line x1="6" y1="86" x2="94" y2="86" strokeWidth={1.5} opacity={0.35} />
          <circle cx="14" cy="74" r="5" />
          <line x1="19" y1="76" x2="55" y2="78" />
          {/* both legs stacked along the floor */}
          <line x1="55" y1="78" x2="92" y2="80" />
          {/* bottom arm under head */}
          <line x1="14" y1="74" x2="6" y2="78" />
        </>
      }
      frame2={
        <>
          {/* End: top leg lifted to about hip height */}
          <line x1="6" y1="86" x2="94" y2="86" strokeWidth={1.5} opacity={0.35} />
          <circle cx="14" cy="74" r="5" />
          <line x1="19" y1="76" x2="55" y2="78" />
          {/* bottom leg along floor */}
          <line x1="55" y1="78" x2="92" y2="80" />
          {/* top leg lifted, angling up */}
          <line x1="55" y1="76" x2="92" y2="58" />
          <line x1="14" y1="74" x2="6" y2="78" />
        </>
      }
    />
  );
}
