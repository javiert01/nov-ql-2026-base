interface DrawControlsProps {
  canDraw: boolean;
  /** Hay menos participantes de los necesarios: se muestra el motivo. */
  insufficient: boolean;
  showReset: boolean;
  resetDisabled: boolean;
  winnerCount: number;
  minParticipants: number;
  onDraw: () => void;
  onReset: () => void;
}

export default function DrawControls({
  canDraw,
  insufficient,
  showReset,
  resetDisabled,
  winnerCount,
  minParticipants,
  onDraw,
  onReset,
}: DrawControlsProps) {
  const winnersText = winnerCount === 1 ? '1 ganador' : `${winnerCount} ganadores`;

  return (
    <div className="mt-4">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onDraw}
          disabled={!canDraw}
          className="cursor-pointer rounded-lg bg-red-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-red-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-red-600"
        >
          Sortear ganador
        </button>
        {showReset && (
          <button
            type="button"
            onClick={onReset}
            disabled={resetDisabled}
            className="cursor-pointer rounded-lg border-2 border-red-100 px-4 py-2.5 font-semibold text-red-700 transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reiniciar
          </button>
        )}
      </div>
      {insufficient && (
        <p className="mt-2 text-sm text-gray-500">
          Se necesitan al menos {minParticipants} participantes para sortear {winnersText}.
        </p>
      )}
    </div>
  );
}
