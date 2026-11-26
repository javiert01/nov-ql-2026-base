import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Random } from '../raffle';
import { useRaffle } from './useRaffle';

function drawAndWait(result: { current: ReturnType<typeof useRaffle> }) {
  act(() => result.current.draw());
  advanceSeconds(3);
}

function advanceSeconds(seconds: number) {
  for (let i = 0; i < seconds; i++) {
    act(() => {
      vi.advanceTimersByTime(1000);
    });
  }
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

function setup(random: Random = () => 0) {
  const { result } = renderHook(() => useRaffle(random));
  act(() => result.current.add(['Ana', 'Pedro', 'María']));
  return result;
}

describe('useRaffle', () => {
  it('sortea con el generador aleatorio que recibe', () => {
    const result = setup(() => 0.5);
    drawAndWait(result);
    expect(result.current.winners).toEqual(['Pedro']);
  });

  it('agregar participantes borra el ganador anterior', () => {
    const result = setup();
    drawAndWait(result);
    act(() => result.current.add(['Luis']));
    expect(result.current.winners).toEqual([]);
  });

  it('quitar participantes borra el ganador anterior', () => {
    const result = setup();
    drawAndWait(result);
    act(() => result.current.remove('Pedro'));
    expect(result.current.winners).toEqual([]);
    expect(result.current.participants).toEqual(['Ana', 'María']);
  });

  it('reiniciar deja el sorteo vacío', () => {
    const result = setup();
    drawAndWait(result);
    act(() => result.current.reset());
    expect(result.current.participants).toEqual([]);
    expect(result.current.winners).toEqual([]);
    expect(result.current.canDraw).toBe(false);
  });

  it('sorteo / Cambiar la cantidad después del sorteo borra el resultado', () => {
    const result = setup();
    drawAndWait(result);
    act(() => result.current.setWinnerCount(2));
    expect(result.current.winners).toEqual([]);
    expect(result.current.winnerCount).toBe(2);
  });

  it('sorteo / Podio de tres: sortea tantos ganadores como la cantidad elegida', () => {
    const { result } = renderHook(() => useRaffle(() => 0));
    act(() => result.current.add(['Ana', 'Pedro', 'María', 'Luis']));
    act(() => result.current.setWinnerCount(3));
    drawAndWait(result);
    expect(result.current.winners).toEqual(['Ana', 'Pedro', 'María']);
  });

  it('sorteo / Datos bloqueados: el hook ignora cambios durante la cuenta', () => {
    const result = setup(() => 0);
    act(() => result.current.draw());
    expect(result.current.isCountingDown).toBe(true);

    act(() => result.current.add(['Luis']));
    act(() => result.current.remove('Ana'));
    act(() => result.current.setWinnerCount(2));
    act(() => result.current.reset());
    expect(result.current.participants).toEqual(['Ana', 'Pedro', 'María']);
    expect(result.current.winnerCount).toBe(1);

    advanceSeconds(3);
    expect(result.current.winners).toEqual(['Ana']);
    expect(result.current.isCountingDown).toBe(false);
  });
});
