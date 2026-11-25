import { describe, expect, it } from 'vitest';
import { addParticipants, parseNames, pickWinner } from './sorteo.js';

describe('parseNames', () => {
  it('separa por comas y saltos de línea y descarta vacíos', () => {
    expect(parseNames(' Ana, Pedro ,,\nMaría\n ')).toEqual(['Ana', 'Pedro', 'María']);
  });
});

describe('addParticipants', () => {
  it('ignora nombres repetidos sin distinguir mayúsculas', () => {
    expect(addParticipants(['Ana'], ['ana', 'Luis', 'LUIS'])).toEqual(['Ana', 'Luis']);
  });
});

describe('pickWinner', () => {
  const participants = ['Ana', 'Pedro', 'María', 'Luis', 'Sofía'];

  it('usa el número aleatorio para elegir la posición', () => {
    expect(pickWinner(participants, () => 0)).toBe('Ana');
    expect(pickWinner(participants, () => 0.5)).toBe('María');
    expect(pickWinner(participants, () => 0.9999)).toBe('Sofía');
  });

  it('siempre devuelve a uno de los participantes', () => {
    for (let i = 0; i < 200; i++) {
      expect(participants).toContain(pickWinner(participants));
    }
  });

  it('falla si no hay participantes', () => {
    expect(() => pickWinner([])).toThrow();
  });
});
