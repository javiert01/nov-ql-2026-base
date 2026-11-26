/**
 * Convierte el texto ingresado en una lista de nombres.
 * Acepta varios nombres separados por comas o saltos de línea.
 */
export function parseNames(text: string): string[] {
  return text
    .split(/[,\n]/)
    .map((name) => name.trim())
    .filter((name) => name.length > 0);
}

/**
 * Agrega los nombres nuevos a la lista, ignorando los repetidos
 * (sin distinguir mayúsculas ni minúsculas).
 */
export function addParticipants(
  participants: readonly string[],
  names: readonly string[],
): string[] {
  const seen = new Set(participants.map((participant) => participant.toLocaleLowerCase()));
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

export function removeParticipant(participants: readonly string[], name: string): string[] {
  return participants.filter((participant) => participant !== name);
}

export const MAX_NAME_LENGTH = 40;

export function hasNameTooLong(names: readonly string[]): boolean {
  return names.some((name) => name.length > MAX_NAME_LENGTH);
}
