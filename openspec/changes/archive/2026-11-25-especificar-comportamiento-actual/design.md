# Design

## Context

El cambio no modifica código de la aplicación. La lógica vive en `src/raffle/`, el estado en `src/hooks/useRaffle.js` y la interfaz en `src/components/`; ya existen 19 pruebas (Vitest + Testing Library). No hay especificaciones previas en `openspec/specs/`.

## Goals / Non-Goals

**Goals:**
- Que cada escenario de las especificaciones tenga una prueba automática que fallaría si el comportamiento se rompe.
- Que `AGENTS.md` obligue a especificar con OpenSpec antes de implementar.

**Non-Goals:**
- Cambiar comportamiento, textos o estilos.
- Probar el color base: jsdom no calcula los estilos de Tailwind, así que la prueba se hará en el Ticket #2 con un navegador real (Playwright). Los escenarios de «Color base rojo» quedan sin prueba automática hasta entonces.

## Decisions

- **Tres capacidades (`participantes`, `sorteo`, `interfaz`)** en lugar de una sola: el podio (Ticket #3) modificará `sorteo` e `interfaz`, y la cuenta regresiva (Ticket #4) `sorteo` e `interfaz`, con deltas pequeños y legibles. Alternativa descartada: una capacidad `sorteo` que lo cubra todo, más difícil de revisar en cada delta.
- **Registrar los detalles incidentales como requisitos** (comas, duplicados, mínimo de 2, etiqueta «Ganador»): la especificación describe lo que la aplicación hace hoy; el Ticket #3 cambiará el mínimo con un delta explícito en lugar de hacerlo en silencio.
- **Las especificaciones no nombran funciones ni componentes**, solo textos visibles y comportamiento; así una refactorización no obliga a cambiarlas.
- **Trazabilidad escenario → prueba**: las pruebas nuevas usan el nombre del escenario en su descripción para encontrar la relación sin una tabla aparte.

## Risks / Trade-offs

- [La especificación fija detalles que quizá el equipo no quiere conservar] → Revisarla antes de archivar; cualquier requisito que no se quiera puede eliminarse en un cambio posterior.
- [El color base queda sin prueba hasta el Ticket #2] → Se deja anotado en este diseño y en las tareas del Ticket #2.
