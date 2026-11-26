import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';
import type { Random } from './raffle';

type User = ReturnType<typeof userEvent.setup>;

async function addNames(user: User, text: string) {
  await user.type(screen.getByLabelText('Nombre del participante'), text);
  await user.click(screen.getByRole('button', { name: 'Agregar' }));
}

/** La lista de participantes (el podio también es una lista). */
function participantRows() {
  const section = screen.getByRole('region', { name: /^Participantes/ });
  const list = within(section).queryByRole('list');
  return list ? within(list).getAllByRole('listitem') : [];
}

function participantNames() {
  const list = within(screen.getByRole('region', { name: /^Participantes/ })).queryByRole('list');
  if (!list) return [];
  return within(list)
    .getAllByRole('listitem')
    .map((item) => item.querySelector('span:not([aria-hidden])')?.textContent ?? '');
}

function rowsMarkedAsWinner() {
  return participantRows().filter((item) => within(item).queryByText('Ganador'));
}

function renderApp(random: Random = () => 0) {
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
    const message = 'Se necesitan al menos 2 participantes para sortear 1 ganador.';

    expect(screen.getByText(message)).toBeInTheDocument();
    await addNames(user, 'Ana');
    expect(screen.getByText(message)).toBeInTheDocument();
    await addNames(user, 'Pedro');
    expect(screen.queryByText(message)).not.toBeInTheDocument();
  });

  it('sorteo / Segundo sorteo: el nuevo resultado reemplaza al anterior', async () => {
    const values = [0, 0.9];
    const user = renderApp(() => values.shift() ?? 0);

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
    const rows = participantRows();
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
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Cada nombre puede tener hasta 40 caracteres',
    );
  });

  it('participantes / Editar el campo quita el mensaje', async () => {
    const user = renderApp();

    await addNames(user, 'a'.repeat(41));
    expect(screen.getByRole('alert')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Nombre del participante'), '{Backspace}');

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('sorteo / Valor por defecto y Elegir tres ganadores', async () => {
    const user = renderApp();
    const group = screen.getByRole('group', { name: 'Cantidad de ganadores' });

    expect(within(group).getByRole('button', { name: '1' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await user.click(within(group).getByRole('button', { name: '3' }));
    expect(within(group).getByRole('button', { name: '3' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(within(group).getByRole('button', { name: '1' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('sorteo / Tres ganadores con tres participantes', async () => {
    const user = renderApp();

    await addNames(user, 'Ana, Pedro, María');
    await user.click(screen.getByRole('button', { name: '3' }));

    expect(screen.getByRole('button', { name: 'Sortear ganador' })).toBeDisabled();
    expect(
      screen.getByText('Se necesitan al menos 4 participantes para sortear 3 ganadores.'),
    ).toBeInTheDocument();

    await addNames(user, 'Luis');
    expect(screen.getByRole('button', { name: 'Sortear ganador' })).toBeEnabled();
  });

  it('interfaz / Podio de tres: 2.º a la izquierda, 1.º al centro, 3.º a la derecha', async () => {
    // 0.5 elige a María (1.º); 0.25 a Ana (2.º) y 0.5 a Luis (3.º) entre los que quedan.
    const values = [0.5, 0.25, 0.5];
    const user = renderApp(() => values.shift() ?? 0);

    await addNames(user, 'Ana, Pedro, María, Luis, Sofía');
    await user.click(screen.getByRole('button', { name: '3' }));
    await user.click(screen.getByRole('button', { name: 'Sortear ganador' }));

    const podium = screen.getByRole('status');
    expect(podium).toHaveTextContent('¡Tenemos un podio!');
    expect(podium).not.toHaveTextContent('¡Tenemos un ganador!');
    const columns = within(podium).getAllByRole('listitem');
    expect(columns.map((column) => column.textContent)).toEqual([
      expect.stringContaining('Ana'),
      expect.stringContaining('María'),
      expect.stringContaining('Luis'),
    ]);
    expect(columns[0]).toHaveTextContent('🥈');
    expect(columns[1]).toHaveTextContent('🥇');
    expect(columns[2]).toHaveTextContent('🥉');
  });

  it('interfaz / Podio de dos: sin 3.er lugar', async () => {
    const user = renderApp(() => 0);

    await addNames(user, 'Pedro, Sofía, Ana');
    await user.click(screen.getByRole('button', { name: '2' }));
    await user.click(screen.getByRole('button', { name: 'Sortear ganador' }));

    const columns = within(screen.getByRole('status')).getAllByRole('listitem');
    expect(columns).toHaveLength(2);
    expect(columns[0]).toHaveTextContent(/🥈.*Sofía/);
    expect(columns[1]).toHaveTextContent(/🥇.*Pedro/);
    expect(screen.getByRole('status')).not.toHaveTextContent('🥉');
  });

  it('interfaz / Medallas en la lista', async () => {
    // 0.75 elige a Luis (1.º); 0.9 elige a Ana (2.º) entre los que quedan.
    const values = [0.75, 0.9];
    const user = renderApp(() => values.shift() ?? 0);

    await addNames(user, 'Ana, Pedro, María, Luis');
    await user.click(screen.getByRole('button', { name: '2' }));
    await user.click(screen.getByRole('button', { name: 'Sortear ganador' }));

    const rows = participantRows();
    const byName = (name: string) => rows.find((row) => row.textContent?.includes(name));
    expect(byName('Luis')).toHaveTextContent('🥇 1.er lugar');
    expect(byName('Ana')).toHaveTextContent('🥈 2.º lugar');
    expect(byName('Pedro')).not.toHaveTextContent('lugar');
    expect(byName('María')).not.toHaveTextContent('lugar');
  });
});
