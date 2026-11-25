import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App.jsx';

async function addNames(user, text) {
  await user.type(screen.getByLabelText('Nombre del participante'), text);
  await user.click(screen.getByRole('button', { name: 'Agregar' }));
}

function participantNames() {
  const list = screen.queryByRole('list');
  if (!list) return [];
  return within(list)
    .getAllByRole('listitem')
    .map((item) => item.querySelector('span').textContent);
}

describe('App', () => {
  it('sortea entre los participantes y muestra al ganador', async () => {
    const user = userEvent.setup();
    render(<App random={() => 0.5} />);

    for (const name of ['Ana', 'Pedro', 'María', 'Luis', 'Sofía']) {
      await addNames(user, name);
    }
    expect(participantNames()).toEqual(['Ana', 'Pedro', 'María', 'Luis', 'Sofía']);

    await user.click(screen.getByRole('button', { name: 'Sortear ganador' }));

    const result = screen.getByRole('status');
    expect(result).toHaveTextContent('¡Tenemos un ganador!');
    expect(result).toHaveTextContent('María');
  });

  it('permite agregar varios nombres a la vez e ignora repetidos', async () => {
    const user = userEvent.setup();
    render(<App />);

    await addNames(user, 'Ana, Pedro');
    await addNames(user, 'ana');

    expect(participantNames()).toEqual(['Ana', 'Pedro']);
  });

  it('no deja sortear con menos de dos participantes', async () => {
    const user = userEvent.setup();
    render(<App />);
    const drawButton = screen.getByRole('button', { name: 'Sortear ganador' });

    expect(drawButton).toBeDisabled();
    await addNames(user, 'Ana');
    expect(drawButton).toBeDisabled();
    await addNames(user, 'Pedro');
    expect(drawButton).toBeEnabled();
  });

  it('quitar a un participante lo saca del sorteo', async () => {
    const user = userEvent.setup();
    render(<App random={() => 0} />);

    await addNames(user, 'Ana, Pedro, María');
    await user.click(screen.getByRole('button', { name: 'Quitar a Ana' }));
    await user.click(screen.getByRole('button', { name: 'Sortear ganador' }));

    expect(participantNames()).toEqual(['Pedro', 'María']);
    expect(screen.getByRole('status')).toHaveTextContent('Pedro');
  });
});
