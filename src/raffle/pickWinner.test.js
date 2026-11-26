import { describe, expect, it } from 'vitest';
import { canDraw, pickWinner } from './pickWinner.js';

const participants = ['Ana', 'Pedro', 'María', 'Luis', 'Sofía'];

describe('pickWinner', () => {
  it('usa el número aleatorio inyectado para elegir la posición', () => {
    expect(pickWinner(participants, () => 0)).toBe('Ana');
    expect(pickWinner(participants, () => 0.5)).toBe('María');
    expect(pickWinner(participants, () => 0.9999)).toBe('Sofía');
  });

  it('todos los participantes pueden ganar', () => {
    const winners = new Set();
    for (let i = 0; i < participants.length; i++) {
      winners.add(pickWinner(participants, () => i / participants.length));
    }
    expect([...winners].sort()).toEqual([...participants].sort());
  });

  it('falla si no hay participantes', () => {
    expect(() => pickWinner([], () => 0)).toThrow();
  });
});

describe('canDraw', () => {
  it('exige al menos dos participantes', () => {
    expect(canDraw([])).toBe(false);
    expect(canDraw(['Ana'])).toBe(false);
    expect(canDraw(['Ana', 'Pedro'])).toBe(true);
  });
});
