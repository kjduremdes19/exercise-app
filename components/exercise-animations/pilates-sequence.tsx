import type { ReactNode } from "react";

type Props = {
  size?: number;
  label?: string;
  /** Two key positions: typically "start" → "end" of the movement. */
  frame1: ReactNode;
  frame2: ReactNode;
};

/**
 * Shared layout for pilates exercises. Renders two static SVG poses
 * side-by-side with an arrow between them. At thumbnail sizes (≤60px) we
 * collapse to just the more demonstrative pose so it stays legible.
 *
 * Each frame is rendered inside its own 100×100 cell; coordinates inside
 * the frame should treat (0,0) as the top-left of that cell.
 */
export function PilatesSequence({ size = 100, label, frame1, frame2 }: Props) {
  const ariaLabel = label ?? "Step-by-step pilates demonstration";

  if (size <= 60) {
    return (
      <svg
        role="img"
        aria-label={ariaLabel}
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {frame2}
      </svg>
    );
  }

  const vbW = 220;
  const vbH = 100;
  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox={`0 0 ${vbW} ${vbH}`}
      width={size}
      height={(size * vbH) / vbW}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform="translate(0 0)">{frame1}</g>
      <text
        x="110"
        y="58"
        fill="currentColor"
        stroke="none"
        fontSize="22"
        opacity={0.4}
        textAnchor="middle"
      >
        →
      </text>
      <g transform="translate(120 0)">{frame2}</g>
    </svg>
  );
}
