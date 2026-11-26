import { useState } from 'react';
import { addParticipants, canDraw, pickWinner, removeParticipant } from '../raffle/index.js';

/**
 * Estado del sorteo. Recibe el generador aleatorio desde fuera
 * para que pueda reemplazarse en las pruebas.
 */
export function useRaffle(random) {
  const [participants, setParticipants] = useState([]);
  const [winner, setWinner] = useState(null);

  function add(names) {
    if (names.length === 0) return;
    setParticipants((current) => addParticipants(current, names));
    setWinner(null);
  }

  function remove(name) {
    setParticipants((current) => removeParticipant(current, name));
    setWinner(null);
  }

  function draw() {
    setWinner(pickWinner(participants, random));
  }

  function reset() {
    setParticipants([]);
    setWinner(null);
  }

  return {
    participants,
    winner,
    canDraw: canDraw(participants),
    add,
    remove,
    draw,
    reset,
  };
}
