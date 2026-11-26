export default function ParticipantForm({ value, onChange, onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="mb-6 flex flex-col gap-1.5" onSubmit={handleSubmit}>
      <label htmlFor="participant-name" className="font-semibold">
        Nombre del participante
      </label>
      <div className="flex gap-2">
        <input
          id="participant-name"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Ej.: Ana, Pedro, María"
          autoComplete="off"
          className="min-w-0 flex-1 rounded-lg border-2 border-red-100 px-3 py-2.5 text-base outline-none focus:border-red-600"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-red-100 px-4 py-2.5 font-semibold text-red-900 transition hover:bg-red-200 active:scale-[0.98]"
        >
          Agregar
        </button>
      </div>
      <small className="text-gray-500">Puedes agregar varios nombres separados por comas.</small>
    </form>
  );
}
