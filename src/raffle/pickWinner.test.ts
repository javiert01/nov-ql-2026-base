import { describe, expect, it } from 'vitest';
import { canDraw, pickWinners, type Random } from './pickWinner';

const participants = ['Ana', 'Pedro', 'María', 'Luis', 'Sofía'];

/** Generador determinista (mulberry32) para pruebas estadísticas reproducibles. */
function seeded(seed: number): Random {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe('pickWinners', () => {
  it('sorteo / El número aleatorio determina la posición (1 ganador)', () => {
    expect(pickWinners(participants, 1, () => 0)).toEqual(['Ana']);
    expect(pickWinners(participants, 1, () => 0.5)).toEqual(['María']);
    expect(pickWinners(participants, 1, () => 0.9999)).toEqual(['Sofía']);
  });

  it('sorteo / Todos pueden ganar', () => {
    const winners = participants.map(
      (_, i) => pickWinners(participants, 1, () => i / participants.length)[0],
    );
    expect([...winners].sort()).toEqual([...participants].sort());
  });

  it('sorteo / Ganadores distintos: nadie gana dos lugares', () => {
    const random = seeded(42);
    for (let i = 0; i < 1000; i++) {
      const winners = pickWinners(participants, 3, random);
      expect(winners).toHaveLength(3);
      expect(new Set(winners).size).toBe(3);
      for (const winner of winners) expect(participants).toContain(winner);
    }
  });

  it('no repite aunque el generador devuelva siempre lo mismo', () => {
    expect(pickWinners(participants, 3, () => 0)).toEqual(['Ana', 'Pedro', 'María']);
    expect(pickWinners(participants, 3, () => 0.9999)).toEqual(['Sofía', 'Ana', 'Pedro']);
  });

  it('sorteo / Frecuencias parejas: cada participante ocupa cada lugar ~20 %', () => {
    const random = seeded(7);
    const draws = 30000;
    const counts = participants.map(() => [0, 0, 0]);
    for (let i = 0; i < draws; i++) {
      pickWinners(participants, 3, random).forEach((winner, place) => {
        counts[participants.indexOf(winner)][place]++;
      });
    }
    for (const byPlace of counts) {
      for (const count of byPlace) {
        expect(count / draws).toBeGreaterThan(0.18);
        expect(count / draws).toBeLessThan(0.22);
      }
    }
  });

  it('falla si no hay suficientes participantes', () => {
    expect(() => pickWinners(['Ana', 'Pedro'], 3, () => 0)).toThrow();
  });
});

describe('canDraw', () => {
  it('sorteo / Mínimo de participantes: exige N + 1', () => {
    expect(canDraw([], 1)).toBe(false);
    expect(canDraw(['Ana'], 1)).toBe(false);
    expect(canDraw(['Ana', 'Pedro'], 1)).toBe(true);
    expect(canDraw(['Ana', 'Pedro', 'María'], 3)).toBe(false);
    expect(canDraw(['Ana', 'Pedro', 'María', 'Luis'], 3)).toBe(true);
  });
});
