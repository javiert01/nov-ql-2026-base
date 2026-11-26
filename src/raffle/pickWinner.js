export const MIN_PARTICIPANTS = 2;

export function canDraw(participants) {
  return participants.length >= MIN_PARTICIPANTS;
}

/**
 * Elige un único ganador al azar.
 * `random` es cualquier función que devuelva un número en [0, 1).
 */
export function pickWinner(participants, random) {
  if (participants.length === 0) {
    throw new Error('No hay participantes para sortear');
  }
  const index = Math.floor(random() * participants.length);
  return participants[index];
}
