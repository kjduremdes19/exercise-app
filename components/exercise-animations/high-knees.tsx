type Props = { size?: number; label?: string };

export function HighKneesAnim({ size = 100, label }: Props) {
  return (
    <svg
      role="img"
      aria-label={label ?? "Animated demonstration: high knees"}
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
      {/* Pose A: right knee up high, left arm bent up */}
      <g className="ex-anim__pose-a">
        <circle cx="50" cy="20" r="6" />
        <line x1="50" y1="26" x2="50" y2="55" />
        {/* arms in opposition: left up, right back */}
        <line x1="50" y1="32" x2="40" y2="20" />
        <line x1="50" y1="32" x2="60" y2="44" />
        {/* standing leg */}
        <line x1="50" y1="55" x2="48" y2="85" />
        {/* lifted leg: thigh up to hip height, shin down */}
        <line x1="50" y1="55" x2="62" y2="50" />
        <line x1="62" y1="50" x2="58" y2="68" />
      </g>
      {/* Pose B: left knee up (mirrored) */}
      <g className="ex-anim__pose-b">
        <circle cx="50" cy="20" r="6" />
        <line x1="50" y1="26" x2="50" y2="55" />
        <line x1="50" y1="32" x2="60" y2="20" />
        <line x1="50" y1="32" x2="40" y2="44" />
        <line x1="50" y1="55" x2="52" y2="85" />
        <line x1="50" y1="55" x2="38" y2="50" />
        <line x1="38" y1="50" x2="42" y2="68" />
      </g>
    </svg>
  );
}
