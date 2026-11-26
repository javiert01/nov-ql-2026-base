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
    .map((item) => item.querySelector('span:not([aria-hidden])').textContent);
}

function rowsMarkedAsWinner() {
  return within(screen.getByRole('list'))
    .getAllByRole('listitem')
    .filter((item) => within(item).queryByText('Ganador'));
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

  it('marca en la lista solo la fila del ganador', async () => {
    const user = renderApp(() => 0.5);

    await addNames(user, 'Ana, Pedro, María');
    expect(rowsMarkedAsWinner()).toHaveLength(0);

    await user.click(screen.getByRole('button', { name: 'Sortear ganador' }));

    const marked = rowsMarkedAsWinner();
    expect(marked).toHaveLength(1);
    expect(marked[0]).toHaveTextContent('Pedro');
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

  it('participantes / Entrada sin nombres: no agrega nada y conserva el texto', async () => {
    const user = renderApp();

    await addNames(user, ' , , ');

    expect(participantNames()).toEqual([]);
    expect(screen.getByLabelText('Nombre del participante')).toHaveValue(' , , ');
  });

  it('participantes / Sin participantes no hay botón Reiniciar', async () => {
    const user = renderApp();

    expect(screen.queryByRole('button', { name: 'Reiniciar' })).not.toBeInTheDocument();
    await addNames(user, 'Ana');
    expect(screen.getByRole('button', { name: 'Reiniciar' })).toBeInTheDocument();
  });

  it('sorteo / Sin participantes y Dos participantes: el mensaje de mínimo aparece y desaparece', async () => {
    const user = renderApp();
    const message = 'Agrega al menos 2 participantes para sortear.';

    expect(screen.getByText(message)).toBeInTheDocument();
    await addNames(user, 'Ana');
    expect(screen.getByText(message)).toBeInTheDocument();
    await addNames(user, 'Pedro');
    expect(screen.queryByText(message)).not.toBeInTheDocument();
  });

  it('sorteo / Segundo sorteo: el nuevo resultado reemplaza al anterior', async () => {
    const values = [0, 0.9];
    const user = renderApp(() => values.shift());

    await addNames(user, 'Ana, Pedro');
    await user.click(screen.getByRole('button', { name: 'Sortear ganador' }));
    expect(screen.getByRole('status')).toHaveTextContent('Ana');

    await user.click(screen.getByRole('button', { name: 'Sortear ganador' }));
    expect(screen.getAllByRole('status')).toHaveLength(1);
    expect(screen.getByRole('status')).toHaveTextContent('Pedro');
  });

  it('interfaz / Lista vacía y Lista con participantes: contador y numeración', async () => {
    const user = renderApp();

    expect(screen.getByText('Todavía no hay participantes.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^Participantes\s*0$/ })).toBeInTheDocument();

    await addNames(user, 'Ana, Pedro');

    expect(screen.queryByText('Todavía no hay participantes.')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^Participantes\s*2$/ })).toBeInTheDocument();
    const rows = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(rows[0]).toHaveTextContent(/^1Ana/);
    expect(rows[1]).toHaveTextContent(/^2Pedro/);
  });

  it('interfaz / Antes del sorteo no hay anuncio', async () => {
    const user = renderApp();

    await addNames(user, 'Ana, Pedro');

    expect(screen.queryByText('¡Tenemos un ganador!')).not.toBeInTheDocument();
  });

  it('participantes / Agregar con el botón devuelve el foco', async () => {
    const user = renderApp();

    await addNames(user, 'Ana');

    expect(screen.getByLabelText('Nombre del participante')).toHaveFocus();
  });

  it('participantes / Nombre de 40 caracteres', async () => {
    const user = renderApp();
    const name = 'a'.repeat(40);

    await addNames(user, name);

    expect(participantNames()).toEqual([name]);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('participantes / Un nombre demasiado largo rechaza toda la entrada', async () => {
    const user = renderApp();
    const text = `Ana, ${'a'.repeat(41)}, Pedro`;

    await addNames(user, text);

    expect(participantNames()).toEqual([]);
    expect(screen.getByLabelText('Nombre del participante')).toHaveValue(text);
    expect(screen.getByRole('alert')).toHaveTextContent('Cada nombre puede tener hasta 40 caracteres');
  });

  it('participantes / Editar el campo quita el mensaje', async () => {
    const user = renderApp();

    await addNames(user, 'a'.repeat(41));
    expect(screen.getByRole('alert')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Nombre del participante'), '{Backspace}');

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
