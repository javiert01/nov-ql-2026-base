/** Devuelve un número en [0, 1), como `Math.random`. */
export type Random = () => number;

export const WINNER_COUNTS = [1, 2, 3] as const;
export type WinnerCount = (typeof WINNER_COUNTS)[number];

/** Participantes necesarios para sortear `count` ganadores: siempre al menos uno que no gane. */
export function minParticipantsFor(count: WinnerCount): number {
  return count + 1;
}

export function canDraw(participants: readonly string[], count: WinnerCount): boolean {
  return participants.length >= minParticipantsFor(count);
}

/**
 * Elige `count` ganadores distintos, ordenados por lugar (1.º primero).
 * Usa Fisher–Yates parcial: cada participante tiene la misma probabilidad en cada lugar.
 */
export function pickWinners(
  participants: readonly string[],
  count: WinnerCount,
  random: Random,
): string[] {
  if (participants.length < count) {
    throw new Error('No hay suficientes participantes para sortear');
  }
  const pool = [...participants];
  for (let place = 0; place < count; place++) {
    const chosen = place + Math.floor(random() * (pool.length - place));
    [pool[place], pool[chosen]] = [pool[chosen], pool[place]];
  }
  return pool.slice(0, count);
}
