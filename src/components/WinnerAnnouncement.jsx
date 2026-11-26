export default function WinnerAnnouncement({ winner }) {
  return (
    <section
      role="status"
      aria-live="polite"
      className="mt-6 animate-pop rounded-xl bg-linear-135 from-red-600 to-red-900 p-6 text-center text-white"
    >
      <p className="text-lg tracking-wide">¡Tenemos un ganador!</p>
      <p className="mt-2 text-4xl font-extrabold break-words">{winner}</p>
    </section>
  );
}
