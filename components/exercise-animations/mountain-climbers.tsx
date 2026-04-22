type Props = { size?: number; label?: string };

export function MountainClimbersAnim({ size = 100, label }: Props) {
  return (
    <svg
      role="img"
      aria-label={label ?? "Animated demonstration: mountain climbers"}
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
      {/* Pose A: high plank with right knee driven toward chest */}
      <g className="ex-anim__pose-a">
        <circle cx="22" cy="50" r="6" />
        <line x1="28" y1="52" x2="78" y2="60" />
        <line x1="32" y1="54" x2="32" y2="80" />
        {/* back leg straight to floor */}
        <line x1="78" y1="60" x2="84" y2="80" />
        {/* front knee bent in toward chest */}
        <line x1="78" y1="60" x2="62" y2="64" />
        <line x1="62" y1="64" x2="68" y2="80" />
      </g>
      {/* Pose B: high plank with left knee driven in (mirror) */}
      <g className="ex-anim__pose-b">
        <circle cx="22" cy="50" r="6" />
        <line x1="28" y1="52" x2="78" y2="60" />
        <line x1="32" y1="54" x2="32" y2="80" />
        <line x1="78" y1="60" x2="68" y2="80" />
        <line x1="78" y1="60" x2="84" y2="80" />
        {/* front knee bent in (different leg this time, drawn slightly different) */}
        <line x1="50" y1="58" x2="46" y2="68" />
        <line x1="46" y1="68" x2="50" y2="80" />
      </g>
    </svg>
  );
}
