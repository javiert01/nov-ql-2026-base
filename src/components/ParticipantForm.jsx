import { useRef } from 'react';

const ERROR_ID = 'participant-name-error';

export default function ParticipantForm({ value, error, onChange, onSubmit }) {
  const inputRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
    inputRef.current?.focus();
  }

  return (
    <form className="mb-6 flex flex-col gap-1.5" onSubmit={handleSubmit}>
      <label htmlFor="participant-name" className="font-semibold">
        Nombre del participante
      </label>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          id="participant-name"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Ej.: Ana, Pedro, María"
          autoComplete="off"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? ERROR_ID : undefined}
          className="min-w-0 flex-1 rounded-lg border-2 border-red-100 px-3 py-2.5 text-base outline-none focus:border-red-600 aria-invalid:border-red-600"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-red-100 px-4 py-2.5 font-semibold text-red-900 transition hover:bg-red-200 active:scale-[0.98]"
        >
          Agregar
        </button>
      </div>
      {error ? (
        <p id={ERROR_ID} role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : (
        <small className="text-gray-500">Puedes agregar varios nombres separados por comas.</small>
      )}
    </form>
  );
}
