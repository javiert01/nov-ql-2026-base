import { describe, expect, it } from 'vitest';
import { addParticipants, parseNames, removeParticipant } from './participants.js';

describe('parseNames', () => {
  it('separa por comas y saltos de línea y descarta vacíos', () => {
    expect(parseNames(' Ana, Pedro ,,\nMaría\n ')).toEqual(['Ana', 'Pedro', 'María']);
  });
});

describe('addParticipants', () => {
  it('agrega al final e ignora repetidos sin distinguir mayúsculas', () => {
    expect(addParticipants(['Ana'], ['ana', 'Luis', 'LUIS'])).toEqual(['Ana', 'Luis']);
  });

  it('no modifica la lista original', () => {
    const original = ['Ana'];
    addParticipants(original, ['Luis']);
    expect(original).toEqual(['Ana']);
  });
});

describe('removeParticipant', () => {
  it('quita solo al participante indicado', () => {
    expect(removeParticipant(['Ana', 'Pedro', 'María'], 'Pedro')).toEqual(['Ana', 'María']);
  });
});
