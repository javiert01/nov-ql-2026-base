import { useState } from 'react';
import { addParticipants, canDraw, pickWinner, removeParticipant, type Random } from '../raffle';

/**
 * Estado del sorteo. Recibe el generador aleatorio desde fuera
 * para que pueda reemplazarse en las pruebas.
 */
export function useRaffle(random: Random) {
  const [participants, setParticipants] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);

  function add(names: string[]) {
    if (names.length === 0) return;
    setParticipants((current) => addParticipants(current, names));
    setWinner(null);
  }

  function remove(name: string) {
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
