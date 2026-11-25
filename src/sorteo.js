/**
 * Convierte el texto ingresado en una lista de nombres.
 * Acepta varios nombres separados por comas o saltos de línea.
 */
export function parseNames(text) {
  return text
    .split(/[,\n]/)
    .map((name) => name.trim())
    .filter((name) => name.length > 0);
}

/**
 * Agrega los nombres nuevos a la lista, ignorando los repetidos
 * (sin distinguir mayúsculas ni minúsculas).
 */
export function addParticipants(participants, names) {
  const seen = new Set(participants.map((p) => p.toLocaleLowerCase()));
  const result = [...participants];
  for (const name of names) {
    const key = name.toLocaleLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(name);
    }
  }
  return result;
}

/**
 * Elige un único ganador al azar.
 * `random` devuelve un número en [0, 1); se puede inyectar para pruebas.
 */
export function pickWinner(participants, random = Math.random) {
  if (participants.length === 0) {
    throw new Error('No hay participantes para sortear');
  }
  const index = Math.floor(random() * participants.length);
  return participants[index];
}
