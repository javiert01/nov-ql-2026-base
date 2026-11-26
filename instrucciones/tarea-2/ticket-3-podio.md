# Ticket #3 — Podio: varios ganadores

## Descripción

En los eventos de la comunidad solemos entregar más de un premio. Queremos que el sorteo pueda elegir **varios ganadores** y mostrarlos como un **podio**: 1.er, 2.º y 3.er lugar.

**No empieces por el código.** Primero crea un cambio con OpenSpec (`/openspec-propose`) con las reglas de este ticket, los casos límite y las decisiones que tomen. Revisa la propuesta y, cuando estés de acuerdo, impleméntala con `/openspec-apply-change`.

## Reglas

### R1 — Cantidad de ganadores

- El usuario elige cuántos ganadores quiere: **1, 2 o 3**. El valor por defecto es **1**.
- La cantidad de ganadores debe ser **menor** que el número de participantes (un sorteo donde todos ganan no es un sorteo).
- Si no hay suficientes participantes, no se puede sortear y se muestra el motivo.

### R2 — Resultado

- Los ganadores son **todos distintos**: nadie puede ganar dos veces en el mismo sorteo.
- Todos los participantes tienen **la misma probabilidad** de ganar cualquier lugar.
- Con **1 ganador**, el resultado se muestra como en el Reto #1: **«¡Tenemos un ganador!»**.
- Con **2 o 3 ganadores**, se muestra **«¡Tenemos un podio!»** y los ganadores en forma de podio:
  - 🥇 1.er lugar en el centro y más alto;
  - 🥈 2.º lugar a la izquierda;
  - 🥉 3.er lugar a la derecha.
- El podio usa el **color base** de la aplicación.

### R3 — Resultados vigentes

- Si se cambia la lista de participantes o la cantidad de ganadores, el resultado anterior deja de mostrarse.

## Mensajes

| Situación                   | Mensaje                                                                     |
| --------------------------- | --------------------------------------------------------------------------- |
| Participantes insuficientes | `Se necesitan al menos {N + 1} participantes para sortear {N} ganador(es).` |

## Criterios de aceptación

- El cambio se propuso, implementó y archivó con OpenSpec, y `openspec/specs/` incluye las reglas R1, R2 y R3, los casos límite y las decisiones tomadas.
- Se puede elegir entre 1, 2 o 3 ganadores.
- El sorteo elige exactamente la cantidad indicada, todos distintos y todos de la lista.
- Con 2 o 3 ganadores, el resultado se muestra como un podio.
- No se puede sortear si hay participantes insuficientes, y se muestra el mensaje de la tabla.
- Existen pruebas automáticas para las nuevas reglas y el CI del Ticket #2 pasa.
- Todo lo que funcionaba antes sigue funcionando.

## Ejemplo

1. Participantes: Ana, Pedro, María, Luis y Sofía.
2. Cantidad de ganadores: **3**.
3. Presiona **"Sortear ganador"**.
4. Resultado posible:

   **¡Tenemos un podio!**

   ```
            🥇 María
   🥈 Luis  ┌───────┐  🥉 Ana
   ┌──────┐ │   1   │ ┌──────┐
   │  2   │ │       │ │  3   │
   └──────┘ └───────┘ └──────┘
   ```

## Consideraciones

- Si encuentran una situación que estas reglas no cubren, decidan un comportamiento razonable y documéntenlo en la propuesta.
- Pídanle a la IA que revise la propuesta y señale ambigüedades **antes** de implementar.

¡El objetivo es ver cómo una especificación clara mejora lo que genera la IA!
