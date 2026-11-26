interface CountdownProps {
  value: number;
}

export default function Countdown({ value }: CountdownProps) {
  return (
    <section
      role="timer"
      aria-label="Cuenta regresiva"
      aria-live="assertive"
      className="mt-6 flex h-40 items-center justify-center rounded-xl bg-red-50"
    >
      <span
        key={value}
        className="text-8xl font-extrabold text-red-600 tabular-nums motion-safe:animate-pop"
      >
        {value}
      </span>
    </section>
  );
}
