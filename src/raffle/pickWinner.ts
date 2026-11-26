/** Devuelve un número en [0, 1), como `Math.random`. */
export type Random = () => number;

export const MIN_PARTICIPANTS = 2;

export function canDraw(participants: readonly string[]): boolean {
  return participants.length >= MIN_PARTICIPANTS;
}

/**
 * Elige un único ganador al azar.
 * `random` es cualquier función que devuelva un número en [0, 1).
 */
export function pickWinner(participants: readonly string[], random: Random): string {
  if (participants.length === 0) {
    throw new Error('No hay participantes para sortear');
  }
  const index = Math.floor(random() * participants.length);
  return participants[index];
}
