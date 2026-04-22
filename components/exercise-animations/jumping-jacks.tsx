type Props = { size?: number; label?: string };

export function JumpingJacksAnim({ size = 100, label }: Props) {
  return (
    <svg
      role="img"
      aria-label={label ?? "Animated demonstration: jumping jacks"}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line
        x1="10"
        y1="86"
        x2="90"
        y2="86"
        strokeWidth={1.5}
        opacity={0.35}
      />
      {/* Pose A: feet together, arms down at sides */}
      <g className="ex-anim__pose-a">
        <circle cx="50" cy="20" r="6" />
        <line x1="50" y1="26" x2="50" y2="55" />
        <line x1="50" y1="30" x2="44" y2="55" />
        <line x1="50" y1="30" x2="56" y2="55" />
        <line x1="50" y1="55" x2="48" y2="85" />
        <line x1="50" y1="55" x2="52" y2="85" />
      </g>
      {/* Pose B: feet wide, arms overhead */}
      <g className="ex-anim__pose-b">
        <circle cx="50" cy="20" r="6" />
        <line x1="50" y1="26" x2="50" y2="55" />
        <line x1="50" y1="30" x2="32" y2="14" />
        <line x1="50" y1="30" x2="68" y2="14" />
        <line x1="50" y1="55" x2="35" y2="85" />
        <line x1="50" y1="55" x2="65" y2="85" />
      </g>
    </svg>
  );
}
