type Props = { size?: number; label?: string };

export function PushupAnim({ size = 100, label }: Props) {
  return (
    <svg
      role="img"
      aria-label={label ?? "Animated demonstration: push-up"}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Floor reference line */}
      <line
        x1="10"
        y1="86"
        x2="90"
        y2="86"
        strokeWidth={1.5}
        opacity={0.35}
      />
      {/* Pose A: high plank — body high above floor */}
      <g className="ex-anim__pose-a">
        <circle cx="22" cy="50" r="6" />
        <line x1="28" y1="52" x2="78" y2="60" />
        <line x1="32" y1="54" x2="32" y2="80" />
        <line x1="78" y1="60" x2="82" y2="80" />
      </g>
      {/* Pose B: bottom of push-up — body lowered close to floor */}
      <g className="ex-anim__pose-b">
        <circle cx="22" cy="66" r="6" />
        <line x1="28" y1="68" x2="78" y2="74" />
        <line x1="32" y1="70" x2="34" y2="80" />
        <line x1="78" y1="74" x2="82" y2="80" />
      </g>
    </svg>
  );
}
