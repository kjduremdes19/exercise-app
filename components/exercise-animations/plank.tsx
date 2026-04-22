type Props = { size?: number; label?: string };

export function PlankAnim({ size = 100, label }: Props) {
  return (
    <svg
      role="img"
      aria-label={label ?? "Animated demonstration: forearm plank"}
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
      {/* Plank is isometric — pose A and B are very subtle variations to
          imply 'breathing' (slight torso lift). */}
      <g className="ex-anim__pose-a">
        <circle cx="20" cy="60" r="6" />
        <line x1="26" y1="62" x2="78" y2="66" />
        <line x1="20" y1="66" x2="22" y2="80" />
        <line x1="22" y1="80" x2="32" y2="80" />
        <line x1="78" y1="66" x2="84" y2="80" />
      </g>
      <g className="ex-anim__pose-b">
        <circle cx="20" cy="58" r="6" />
        <line x1="26" y1="60" x2="78" y2="64" />
        <line x1="20" y1="64" x2="22" y2="80" />
        <line x1="22" y1="80" x2="32" y2="80" />
        <line x1="78" y1="64" x2="84" y2="80" />
      </g>
    </svg>
  );
}
