import ParticipantChip from './ParticipantChip.jsx';

export default function ParticipantList({ participants, winner, onRemove }) {
  return (
    <section aria-labelledby="participants-title">
      <h2 id="participants-title" className="mb-3 flex items-center gap-2 text-lg font-bold">
        Participantes
        <span className="rounded-full bg-red-600 px-2.5 py-0.5 text-sm text-white">
          {participants.length}
        </span>
      </h2>
      {participants.length === 0 ? (
        <p className="text-gray-500">Todavía no hay participantes.</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {participants.map((name) => (
            <ParticipantChip
              key={name}
              name={name}
              highlighted={name === winner}
              onRemove={onRemove}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
