import { useEffect, useState } from 'react';
import {
  addParticipants,
  canDraw,
  minParticipantsFor,
  pickWinners,
  removeParticipant,
  type Random,
  type WinnerCount,
} from '../raffle';

export const COUNTDOWN_START = 3;
export const COUNTDOWN_STEP_MS = 1000;

/**
 * Estado del sorteo. Recibe el generador aleatorio desde fuera
 * para que pueda reemplazarse en las pruebas.
 *
 * Al sortear, los ganadores se eligen enseguida pero se revelan
 * después de una cuenta regresiva; mientras dura, nada se puede cambiar.
 */
export function useRaffle(random: Random) {
  const [participants, setParticipants] = useState<string[]>([]);
  const [winnerCount, setWinnerCountState] = useState<WinnerCount>(1);
  const [winners, setWinners] = useState<string[]>([]);
  const [pendingWinners, setPendingWinners] = useState<string[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);

  const isCountingDown = countdown !== null;

  useEffect(() => {
    if (countdown === null) return;
    const timer = setTimeout(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
        return;
      }
      setWinners(pendingWinners);
      setPendingWinners([]);
      setCountdown(null);
    }, COUNTDOWN_STEP_MS);
    return () => clearTimeout(timer);
  }, [countdown, pendingWinners]);

  function add(names: string[]) {
    if (isCountingDown || names.length === 0) return;
    setParticipants((current) => addParticipants(current, names));
    setWinners([]);
  }

  function remove(name: string) {
    if (isCountingDown) return;
    setParticipants((current) => removeParticipant(current, name));
    setWinners([]);
  }

  function setWinnerCount(count: WinnerCount) {
    if (isCountingDown) return;
    setWinnerCountState(count);
    setWinners([]);
  }

  function draw() {
    if (isCountingDown || !canDraw(participants, winnerCount)) return;
    setPendingWinners(pickWinners(participants, winnerCount, random));
    setWinners([]);
    setCountdown(COUNTDOWN_START);
  }

  function reset() {
    if (isCountingDown) return;
    setParticipants([]);
    setWinners([]);
  }

  return {
    participants,
    winners,
    winnerCount,
    countdown,
    isCountingDown,
    minParticipants: minParticipantsFor(winnerCount),
    hasEnoughParticipants: canDraw(participants, winnerCount),
    canDraw: !isCountingDown && canDraw(participants, winnerCount),
    add,
    remove,
    setWinnerCount,
    draw,
    reset,
  };
}
