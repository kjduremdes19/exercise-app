type Props = {
  className?: string;
};

export function ExerciseLogo({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-12 w-12"}
      aria-hidden="true"
    >
      {/* Dumbbell: two weights connected by a bar */}
      <rect x="1" y="9" width="3" height="6" rx="1" />
      <rect x="4" y="7" width="3" height="10" rx="1" />
      <line x1="7" y1="12" x2="17" y2="12" strokeWidth="2.4" />
      <rect x="17" y="7" width="3" height="10" rx="1" />
      <rect x="20" y="9" width="3" height="6" rx="1" />
    </svg>
  );
}
