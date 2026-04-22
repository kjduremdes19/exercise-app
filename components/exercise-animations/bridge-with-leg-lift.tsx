import { PilatesSequence } from "./pilates-sequence";

type Props = { size?: number; label?: string };

export function BridgeWithLegLiftAnim({ size = 100, label }: Props) {
  return (
    <PilatesSequence
      size={size}
      label={label ?? "Step-by-step demonstration: Bridge with leg lift"}
      frame1={
        <>
          {/* Start: bridge with both feet planted on floor */}
          <line x1="6" y1="86" x2="94" y2="86" strokeWidth={1.5} opacity={0.35} />
          <circle cx="14" cy="78" r="5" />
          {/* shoulders on floor → hips lifted */}
          <line x1="19" y1="78" x2="56" y2="58" />
          {/* hips → bent knees */}
          <line x1="56" y1="58" x2="74" y2="64" />
          {/* shins down to floor */}
          <line x1="74" y1="64" x2="76" y2="80" />
          {/* second leg same */}
          <line x1="56" y1="58" x2="78" y2="68" />
          <line x1="78" y1="68" x2="82" y2="80" />
        </>
      }
      frame2={
        <>
          {/* End: bridge with one leg extended straight out from hips */}
          <line x1="6" y1="86" x2="94" y2="86" strokeWidth={1.5} opacity={0.35} />
          <circle cx="14" cy="78" r="5" />
          <line x1="19" y1="78" x2="56" y2="58" />
          {/* one leg extended straight out, in line with the lifted thigh */}
          <line x1="56" y1="58" x2="92" y2="48" />
          {/* other leg still bent on floor */}
          <line x1="56" y1="58" x2="74" y2="64" />
          <line x1="74" y1="64" x2="76" y2="80" />
        </>
      }
    />
  );
}
