import { PLACES } from './places';

interface PodiumProps {
  /** Ganadores ordenados por lugar: 1.º, 2.º y, si existe, 3.º. */
  winners: readonly string[];
}

/** Orden visual de izquierda a derecha: 2.º, 1.º, 3.º. */
const VISUAL_ORDER = [1, 0, 2] as const;

const PEDESTAL_HEIGHT = ['h-28', 'h-20', 'h-14'] as const;

export default function Podium({ winners }: PodiumProps) {
  return (
    <section
      role="status"
      aria-live="polite"
      className="mt-6 motion-safe:animate-pop rounded-xl bg-red-50 p-6 text-center"
    >
      <p className="text-lg font-semibold tracking-wide text-red-800">¡Tenemos un podio!</p>
      <ol className="mt-4 grid grid-cols-3 items-end gap-2">
        {VISUAL_ORDER.map((place) => {
          const winner = winners[place];
          if (!winner) return <li key={place} aria-hidden="true" />;
          const { medal, label } = PLACES[place];
          return (
            <li key={place} data-place={place + 1} className="flex flex-col items-center gap-1">
              <span className="text-3xl" aria-hidden="true">
                {medal}
              </span>
              <span className="w-full font-bold break-words text-gray-800">{winner}</span>
              <span className="sr-only">{label}</span>
              <div
                className={`flex w-full items-start justify-center rounded-t-lg pt-2 text-2xl font-extrabold text-white ${PEDESTAL_HEIGHT[place]} ${
                  place === 0 ? 'bg-red-600' : 'bg-red-400'
                }`}
                aria-hidden="true"
              >
                {place + 1}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
