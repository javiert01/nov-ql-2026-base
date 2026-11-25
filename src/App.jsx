import { useState } from 'react';
import { addParticipants, parseNames, pickWinner } from './sorteo.js';

const MIN_PARTICIPANTS = 2;

export default function App({ random = Math.random }) {
  const [input, setInput] = useState('');
  const [participants, setParticipants] = useState([]);
  const [winner, setWinner] = useState(null);

  const canDraw = participants.length >= MIN_PARTICIPANTS;

  function handleAdd(event) {
    event.preventDefault();
    const names = parseNames(input);
    if (names.length === 0) return;
    setParticipants((current) => addParticipants(current, names));
    setInput('');
    setWinner(null);
  }

  function handleRemove(name) {
    setParticipants((current) => current.filter((p) => p !== name));
    setWinner(null);
  }

  function handleDraw() {
    setWinner(pickWinner(participants, random));
  }

  function handleReset() {
    setParticipants([]);
    setWinner(null);
    setInput('');
  }

  return (
    <main className="app">
      <header className="app__header">
        <h1>Selector de ganadores</h1>
        <p>Agrega a los participantes y sortea un único ganador.</p>
      </header>

      <form className="add-form" onSubmit={handleAdd}>
        <label htmlFor="participant-name">Nombre del participante</label>
        <div className="add-form__row">
          <input
            id="participant-name"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ej.: Ana, Pedro, María"
            autoComplete="off"
          />
          <button type="submit" className="button button--secondary">
            Agregar
          </button>
        </div>
        <small>Puedes agregar varios nombres separados por comas.</small>
      </form>

      <section className="participants" aria-labelledby="participants-title">
        <h2 id="participants-title">
          Participantes <span className="badge">{participants.length}</span>
        </h2>
        {participants.length === 0 ? (
          <p className="empty">Todavía no hay participantes.</p>
        ) : (
          <ul>
            {participants.map((name) => (
              <li key={name} className={name === winner ? 'is-winner' : undefined}>
                <span>{name}</span>
                <button
                  type="button"
                  className="remove"
                  onClick={() => handleRemove(name)}
                  aria-label={`Quitar a ${name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="actions">
        <button
          type="button"
          className="button button--primary"
          onClick={handleDraw}
          disabled={!canDraw}
        >
          Sortear ganador
        </button>
        {participants.length > 0 && (
          <button type="button" className="button button--ghost" onClick={handleReset}>
            Reiniciar
          </button>
        )}
      </div>
      {!canDraw && (
        <p className="hint">Agrega al menos {MIN_PARTICIPANTS} participantes para sortear.</p>
      )}

      {winner && (
        <section className="winner" role="status" aria-live="polite">
          <p className="winner__title">¡Tenemos un ganador!</p>
          <p className="winner__name">{winner}</p>
        </section>
      )}
    </main>
  );
}
