import { useState } from 'react';
import { MAX_NAME_LENGTH, hasNameTooLong, parseNames } from '../raffle/index.js';

export const NAME_TOO_LONG_MESSAGE = `Cada nombre puede tener hasta ${MAX_NAME_LENGTH} caracteres`;

/**
 * Texto del campo de participantes y su mensaje de error.
 * `submit` entrega los nombres válidos a `onAdd` y limpia el campo.
 */
export function useParticipantDraft(onAdd) {
  const [draft, setDraft] = useState('');
  const [error, setError] = useState(null);

  function change(value) {
    setDraft(value);
    setError(null);
  }

  function submit() {
    const names = parseNames(draft);
    if (names.length === 0) return;
    if (hasNameTooLong(names)) {
      setError(NAME_TOO_LONG_MESSAGE);
      return;
    }
    onAdd(names);
    setDraft('');
  }

  function clear() {
    setDraft('');
    setError(null);
  }

  return { draft, error, change, submit, clear };
}
