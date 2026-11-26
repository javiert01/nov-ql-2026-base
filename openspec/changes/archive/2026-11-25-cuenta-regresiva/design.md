# Design

## Context

Hoy `draw()` en `useRaffle` calcula y muestra los ganadores al instante. Ver `proposal.md` para el motivo.

## Goals / Non-Goals

**Goals:** cuenta 3-2-1 de un segundo por número, bloqueo total mientras dura, pruebas deterministas.

**Non-Goals:** sonido; cancelar una cuenta ya iniciada.

## Decisions

- **Los ganadores se eligen al iniciar la cuenta** y se guardan ocultos hasta que termina. Así el resultado no depende de cuándo corre cada temporizador y nada puede cambiarlo, porque los datos están bloqueados. Alternativa descartada: elegir al final, que obliga a leer el estado vigente dentro del temporizador.
- **Un `useEffect` por número**: mientras `countdown` no es `null`, un `setTimeout` de 1000 ms lo reduce; al pasar de 1 se revela el resultado. El efecto limpia su temporizador al desmontar.
- **El hook también ignora las acciones bloqueadas** (agregar, quitar, cambiar cantidad, reiniciar, sortear) durante la cuenta, además de que la interfaz deshabilita los controles: la regla no depende solo de la UI.
- **Pruebas con temporizadores falsos de Vitest**; `userEvent` recibe `advanceTimers` para no quedarse esperando.
- **Movimiento reducido con la variante `motion-safe:` de Tailwind** en las animaciones de la cuenta y de los resultados.

## Risks / Trade-offs

- [Las pruebas existentes esperaban el resultado al instante] → Un helper `draw()` en las pruebas presiona el botón y avanza 3 segundos.
