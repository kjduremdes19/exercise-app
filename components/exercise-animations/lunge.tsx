type Props = { size?: number; label?: string };

export function LungeAnim({ size = 100, label }: Props) {
  return (
    <svg
      role="img"
      aria-label={label ?? "Animated demonstration: reverse lunge"}
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
      {/* Pose A: standing tall */}
      <g className="ex-anim__pose-a">
        <circle cx="50" cy="20" r="6" />
        <line x1="50" y1="26" x2="50" y2="55" />
        <line x1="50" y1="32" x2="40" y2="50" />
        <line x1="50" y1="32" x2="60" y2="50" />
        <line x1="50" y1="55" x2="46" y2="85" />
        <line x1="50" y1="55" x2="54" y2="85" />
      </g>
      {/* Pose B: reverse lunge — back leg extended back, front leg bent */}
      <g className="ex-anim__pose-b">
        <circle cx="50" cy="28" r="6" />
        <line x1="50" y1="34" x2="50" y2="60" />
        <line x1="50" y1="40" x2="42" y2="58" />
        <line x1="50" y1="40" x2="58" y2="58" />
        {/* front leg: thigh down to bent knee, shin to floor */}
        <line x1="50" y1="60" x2="46" y2="76" />
        <line x1="46" y1="76" x2="48" y2="86" />
        {/* back leg: thigh angled back, shin angled forward */}
        <line x1="50" y1="60" x2="64" y2="78" />
        <line x1="64" y1="78" x2="74" y2="86" />
      </g>
    </svg>
  );
}
