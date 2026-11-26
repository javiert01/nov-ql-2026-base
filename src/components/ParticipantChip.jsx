export default function ParticipantChip({ name, highlighted, onRemove }) {
  const colors = highlighted
    ? 'border-red-700 bg-red-600 text-white'
    : 'border-red-100 bg-red-50 text-gray-800';

  return (
    <li className={`flex items-center gap-1 rounded-full border py-1 pr-1.5 pl-3 ${colors}`}>
      <span>{name}</span>
      <button
        type="button"
        onClick={() => onRemove(name)}
        aria-label={`Quitar a ${name}`}
        className="cursor-pointer rounded-full px-1.5 py-0.5 text-lg leading-none hover:bg-black/10"
      >
        ×
      </button>
    </li>
  );
}
