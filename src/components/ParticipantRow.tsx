interface ParticipantRowProps {
  position: number;
  name: string;
  /** Etiqueta del resultado («Ganador» o medalla y lugar); `null` si no ganó. */
  badge: string | null;
  onRemove: (name: string) => void;
}

export default function ParticipantRow({ position, name, badge, onRemove }: ParticipantRowProps) {
  const isWinner = badge !== null;
  const rowColors = isWinner ? 'bg-red-600 text-white' : 'bg-white hover:bg-red-50';
  const positionColors = isWinner ? 'bg-white text-red-700' : 'bg-red-100 text-red-800';

  return (
    <li className={`flex items-center gap-3 px-4 py-2.5 transition ${rowColors}`}>
      <span
        aria-hidden="true"
        className={`flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${positionColors}`}
      >
        {position}
      </span>
      <span className="flex-1 truncate font-medium">{name}</span>
      {badge && (
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold tracking-wide uppercase">
          {badge}
        </span>
      )}
      <button
        type="button"
        onClick={() => onRemove(name)}
        aria-label={`Quitar a ${name}`}
        className={`cursor-pointer rounded-md px-2 py-1 text-sm font-medium transition ${
          isWinner ? 'hover:bg-white/20' : 'text-gray-500 hover:bg-red-100 hover:text-red-700'
        }`}
      >
        Quitar
      </button>
    </li>
  );
}
