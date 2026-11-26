import { useState } from 'react';
import {
  addParticipants,
  canDraw,
  minParticipantsFor,
  pickWinners,
  removeParticipant,
  type Random,
  type WinnerCount,
} from '../raffle';

/**
 * Estado del sorteo. Recibe el generador aleatorio desde fuera
 * para que pueda reemplazarse en las pruebas.
 */
export function useRaffle(random: Random) {
  const [participants, setParticipants] = useState<string[]>([]);
  const [winnerCount, setWinnerCountState] = useState<WinnerCount>(1);
  const [winners, setWinners] = useState<string[]>([]);

  function add(names: string[]) {
    if (names.length === 0) return;
    setParticipants((current) => addParticipants(current, names));
    setWinners([]);
  }

  function remove(name: string) {
    setParticipants((current) => removeParticipant(current, name));
    setWinners([]);
  }

  function setWinnerCount(count: WinnerCount) {
    setWinnerCountState(count);
    setWinners([]);
  }

  function draw() {
    setWinners(pickWinners(participants, winnerCount, random));
  }

  function reset() {
    setParticipants([]);
    setWinners([]);
  }

  return {
    participants,
    winners,
    winnerCount,
    minParticipants: minParticipantsFor(winnerCount),
    canDraw: canDraw(participants, winnerCount),
    add,
    remove,
    setWinnerCount,
    draw,
    reset,
  };
}
