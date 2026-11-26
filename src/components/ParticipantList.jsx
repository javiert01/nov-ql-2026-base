import ParticipantRow from './ParticipantRow.jsx';

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
        <p className="rounded-lg border-2 border-dashed border-red-100 px-4 py-6 text-center text-gray-500">
          Todavía no hay participantes.
        </p>
      ) : (
        <ol className="max-h-80 divide-y divide-red-100 overflow-y-auto rounded-lg border border-red-100">
          {participants.map((name, index) => (
            <ParticipantRow
              key={name}
              position={index + 1}
              name={name}
              isWinner={name === winner}
              onRemove={onRemove}
            />
          ))}
        </ol>
      )}
    </section>
  );
}
