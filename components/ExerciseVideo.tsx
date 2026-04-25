type Props = {
  src: string;
  size: number;
  label: string;
};

export function ExerciseVideo({ src, size, label }: Props) {
  return (
    <video
      src={src}
      width={size}
      height={size}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      className="rounded-md object-cover"
    />
  );
}
