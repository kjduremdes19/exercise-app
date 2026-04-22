type Props = { size?: number; label?: string };

export function BodyweightSquatAnim({ size = 100, label }: Props) {
  return (
    <svg
      role="img"
      aria-label={label ?? "Animated demonstration: bodyweight squat"}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Pose A: standing tall */}
      <g className="ex-anim__pose-a">
        <circle cx="50" cy="20" r="6" />
        <line x1="50" y1="26" x2="50" y2="55" />
        <line x1="50" y1="32" x2="38" y2="50" />
        <line x1="50" y1="32" x2="62" y2="50" />
        <line x1="50" y1="55" x2="44" y2="85" />
        <line x1="50" y1="55" x2="56" y2="85" />
      </g>
      {/* Pose B: deep squat — hips low, arms forward, knees bent */}
      <g className="ex-anim__pose-b">
        <circle cx="50" cy="36" r="6" />
        <line x1="50" y1="42" x2="50" y2="62" />
        <line x1="50" y1="46" x2="36" y2="56" />
        <line x1="50" y1="46" x2="64" y2="56" />
        <line x1="50" y1="62" x2="40" y2="74" />
        <line x1="40" y1="74" x2="44" y2="85" />
        <line x1="50" y1="62" x2="60" y2="74" />
        <line x1="60" y1="74" x2="56" y2="85" />
      </g>
    </svg>
  );
}
