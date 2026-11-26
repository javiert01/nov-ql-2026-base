# Design

## Context

Hoy `pickWinner(participants, random)` elige un índice con `floor(random() * n)` y el estado guarda un solo `winner`. Ver `proposal.md` para el motivo.

## Goals / Non-Goals

**Goals:** ganadores distintos, misma probabilidad por lugar, generador inyectado como hasta ahora.

**Non-Goals:** más de 3 ganadores; guardar resultados.

## Decisions

- **Fisher–Yates parcial** para elegir N ganadores: para cada lugar `i`, se elige un índice al azar entre los participantes que quedan y se intercambia. Da ganadores distintos y la misma probabilidad para cada participante en cada lugar, con N llamadas al generador. Con N = 1 la elección es idéntica a la actual (`floor(random() * n)`), así que los escenarios existentes siguen valiendo. Alternativa descartada: volver a sortear si sale repetido, que no tiene un número de llamadas acotado.
- **El estado guarda una lista de ganadores ordenada por lugar** (vacía = sin resultado) en lugar de un solo ganador.
- **Concordancia en el mensaje**: «1 ganador» y «2 ganadores» en lugar del literal «ganador(es)» del ticket, que se lee como marcador de plural.
- **Probabilidad uniforme probada con un generador con semilla**: 30 000 sorteos deterministas; cada participante debe aparecer en cada lugar con una frecuencia dentro de ±2 puntos del valor esperado. Es determinista porque la semilla es fija.
- **Botones de cantidad con `aria-pressed`** dentro de un grupo con nombre «Cantidad de ganadores».

## Risks / Trade-offs

- [El mensaje de mínimo cambia de texto] → El delta de `sorteo` lo modifica explícitamente y las pruebas se actualizan.
