type Props = { size?: number; label?: string };

export function GluteBridgeAnim({ size = 100, label }: Props) {
  return (
    <svg
      role="img"
      aria-label={label ?? "Animated demonstration: glute bridge"}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Floor line */}
      <line
        x1="10"
        y1="86"
        x2="90"
        y2="86"
        strokeWidth={1.5}
        opacity={0.35}
      />
      {/* Pose A: hips down (resting on floor) */}
      <g className="ex-anim__pose-a">
        <circle cx="22" cy="76" r="6" />
        {/* shoulders → hips line, flat on floor */}
        <line x1="28" y1="78" x2="58" y2="80" />
        {/* hips → knees */}
        <line x1="58" y1="80" x2="72" y2="68" />
        {/* knees → feet */}
        <line x1="72" y1="68" x2="80" y2="84" />
      </g>
      {/* Pose B: hips lifted into bridge — straight line shoulders→hips→knees */}
      <g className="ex-anim__pose-b">
        <circle cx="22" cy="76" r="6" />
        <line x1="28" y1="78" x2="58" y2="68" />
        <line x1="58" y1="68" x2="72" y2="68" />
        <line x1="72" y1="68" x2="80" y2="84" />
      </g>
    </svg>
  );
}
