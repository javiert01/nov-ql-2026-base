# Ticket #1 — Especificar la aplicación con OpenSpec

## Descripción

En el Reto #1 le pedimos a la IA lo que queríamos y aceptamos lo que generó. A partir de ahora vamos a trabajar con **especificaciones**: primero acordamos _qué_ se va a construir y después le pedimos a la IA que lo implemente.

Para eso vamos a usar [**OpenSpec**](https://github.com/Fission-AI/OpenSpec), una herramienta de _spec driven development_ que guarda las especificaciones junto al código y se integra con agentes como OpenCode, Claude Code, Codex y GitHub Copilot.

El proyecto base **ya incluye OpenSpec** instalado y configurado para OpenCode, Claude Code, Codex y GitHub Copilot, con las especificaciones en español.

Este ticket se construye sobre el **Ticket #0**: la IA debe seguir las reglas de `AGENTS.md` también al escribir especificaciones. Todos los tickets siguientes se especificarán con OpenSpec.

## Criterios de aceptación

- Los comandos de OpenSpec funcionan en el agente de IA que usa el equipo (OpenCode, Claude Code, Codex o GitHub Copilot).
- Existe una especificación en `openspec/specs/` que describe el comportamiento **actual** de la aplicación:
  - agregar participantes;
  - aplicar el color base definido para la interfaz;
  - sortear y mostrar a un único ganador.
- La especificación se creó siguiendo el flujo de OpenSpec: propuesta → implementación → archivo.
- `AGENTS.md` indica que todo cambio nuevo se especifica primero con OpenSpec.

## Flujo de trabajo

1. **Proponer:** `/openspec-propose <nombre-del-cambio>`

   Crea `openspec/changes/<nombre-del-cambio>/` con `proposal.md`, `specs/`, `design.md` y `tasks.md`.

2. **Revisar:** lee la propuesta, corrígela y pídele a la IA que señale ambigüedades.
3. **Implementar:** `/openspec-apply-change`
4. **Archivar:** `/openspec-archive-change`

   Mueve el cambio a `openspec/changes/archive/` y actualiza `openspec/specs/`.

## Ejemplo

```sh
npm install
npx openspec --version
```

Luego, desde tu agente de IA:

```
/openspec-propose documentar-selector-de-ganadores
```

## Consideraciones

- OpenSpec necesita **Node.js 22.20.0** o superior.
- En Codex los comandos se invocan con `$` en lugar de `/` (por ejemplo, `$openspec-propose`).
- Si usas otro agente, configúralo con `npx openspec init --tools <agente>`.
- Si quieres desactivar la telemetría: `npx openspec config set telemetry.enabled false`.
- En este ticket la especificación describe lo que **ya existe**: la implementación no debería cambiar casi nada.

¡El objetivo es tener la base para especificar cada cambio antes de escribir código!
