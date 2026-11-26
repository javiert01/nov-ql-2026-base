export interface Place {
  medal: string;
  label: string;
}

/** Medalla y nombre de cada lugar del podio, en orden (1.º primero). */
export const PLACES: readonly Place[] = [
  { medal: '🥇', label: '1.er lugar' },
  { medal: '🥈', label: '2.º lugar' },
  { medal: '🥉', label: '3.er lugar' },
];
