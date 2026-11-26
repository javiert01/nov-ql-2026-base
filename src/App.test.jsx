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

function renderApp(random = () => 0) {
  const user = userEvent.setup();
  render(<App random={random} />);
  return user;
}

describe('App', () => {
  it('sortea entre los participantes y muestra al ganador', async () => {
    const user = renderApp(() => 0.5);

    for (const name of ['Ana', 'Pedro', 'María', 'Luis', 'Sofía']) {
      await addNames(user, name);
    }
    expect(participantNames()).toEqual(['Ana', 'Pedro', 'María', 'Luis', 'Sofía']);

    await user.click(screen.getByRole('button', { name: 'Sortear ganador' }));

    const result = screen.getByRole('status');
    expect(result).toHaveTextContent('¡Tenemos un ganador!');
    expect(result).toHaveTextContent('María');
  });

  it('permite agregar varios nombres a la vez, ignora repetidos y limpia el campo', async () => {
    const user = renderApp();

    await addNames(user, 'Ana, Pedro');
    await addNames(user, 'ana');

    expect(participantNames()).toEqual(['Ana', 'Pedro']);
    expect(screen.getByLabelText('Nombre del participante')).toHaveValue('');
  });

  it('agregar con Enter funciona igual que el botón', async () => {
    const user = renderApp();

    await user.type(screen.getByLabelText('Nombre del participante'), 'Ana{Enter}');

    expect(participantNames()).toEqual(['Ana']);
  });

  it('no deja sortear con menos de dos participantes', async () => {
    const user = renderApp();
    const drawButton = screen.getByRole('button', { name: 'Sortear ganador' });

    expect(drawButton).toBeDisabled();
    await addNames(user, 'Ana');
    expect(drawButton).toBeDisabled();
    await addNames(user, 'Pedro');
    expect(drawButton).toBeEnabled();
  });

  it('quitar a un participante lo saca del sorteo', async () => {
    const user = renderApp(() => 0);

    await addNames(user, 'Ana, Pedro, María');
    await user.click(screen.getByRole('button', { name: 'Quitar a Ana' }));
    await user.click(screen.getByRole('button', { name: 'Sortear ganador' }));

    expect(participantNames()).toEqual(['Pedro', 'María']);
    expect(screen.getByRole('status')).toHaveTextContent('Pedro');
  });

  it('reiniciar borra participantes, ganador y el texto escrito', async () => {
    const user = renderApp();

    await addNames(user, 'Ana, Pedro');
    await user.click(screen.getByRole('button', { name: 'Sortear ganador' }));
    await user.type(screen.getByLabelText('Nombre del participante'), 'Luis');
    await user.click(screen.getByRole('button', { name: 'Reiniciar' }));

    expect(participantNames()).toEqual([]);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Nombre del participante')).toHaveValue('');
  });
});
