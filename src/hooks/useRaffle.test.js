import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useRaffle } from './useRaffle.js';

function setup(random = () => 0) {
  const { result } = renderHook(() => useRaffle(random));
  act(() => result.current.add(['Ana', 'Pedro', 'María']));
  return result;
}

describe('useRaffle', () => {
  it('sortea con el generador aleatorio que recibe', () => {
    const result = setup(() => 0.5);
    act(() => result.current.draw());
    expect(result.current.winner).toBe('Pedro');
  });

  it('agregar participantes borra el ganador anterior', () => {
    const result = setup();
    act(() => result.current.draw());
    act(() => result.current.add(['Luis']));
    expect(result.current.winner).toBeNull();
  });

  it('quitar participantes borra el ganador anterior', () => {
    const result = setup();
    act(() => result.current.draw());
    act(() => result.current.remove('Pedro'));
    expect(result.current.winner).toBeNull();
    expect(result.current.participants).toEqual(['Ana', 'María']);
  });

  it('reiniciar deja el sorteo vacío', () => {
    const result = setup();
    act(() => result.current.draw());
    act(() => result.current.reset());
    expect(result.current.participants).toEqual([]);
    expect(result.current.winner).toBeNull();
    expect(result.current.canDraw).toBe(false);
  });
});
