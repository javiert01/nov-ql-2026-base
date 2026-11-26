import { WINNER_COUNTS, type WinnerCount } from '../raffle';

interface WinnerCountSelectorProps {
  value: WinnerCount;
  onChange: (count: WinnerCount) => void;
}

export default function WinnerCountSelector({ value, onChange }: WinnerCountSelectorProps) {
  return (
    <div className="mt-6 flex items-center gap-3">
      <span id="winner-count-label" className="font-semibold">
        Cantidad de ganadores
      </span>
      <div role="group" aria-labelledby="winner-count-label" className="flex gap-1.5">
        {WINNER_COUNTS.map((count) => {
          const selected = count === value;
          return (
            <button
              key={count}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(count)}
              className={`size-10 cursor-pointer rounded-lg border-2 font-semibold transition ${
                selected
                  ? 'border-red-600 bg-red-600 text-white'
                  : 'border-red-100 bg-white text-red-800 hover:bg-red-50'
              }`}
            >
              {count}
            </button>
          );
        })}
      </div>
    </div>
  );
}
