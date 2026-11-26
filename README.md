# Selector de ganadores — Coding Dojo

Proyecto base para el Coding Dojo de desarrollo asistido por IA.

Viene casi vacío a propósito: la aplicación la generas tú, con ayuda de la IA.

## Requisitos

- Node.js **22.20.0** o superior
- Un asistente de código: OpenCode, Claude Code, Codex o GitHub Copilot
- GitHub CLI (`gh`) y una cuenta de GitHub

## Instrucciones

Los tickets de cada reto están en [`instrucciones/`](instrucciones/):

| Reto | Carpeta                                                | Tema                                          |
| ---- | ------------------------------------------------------ | --------------------------------------------- |
| #1   | [`tarea-1/`](instrucciones/tarea-1/)                   | Vibe coding: generar el selector de ganadores |
| #2   | [`tarea-2/`](instrucciones/tarea-2/)                   | Guard rails y Spec Driven Development         |
| #3   | [`tarea-3-optional/`](instrucciones/tarea-3-optional/) | Backend e historial _(opcional)_              |

## Primeros pasos

```sh
npm install
npx openspec --version
```

## Ejecutar la aplicación

La aplicación es un frontend en React + Vite con Tailwind CSS (sin backend). Las reglas de código están en [`AGENTS.md`](AGENTS.md).

```sh
npm install
npm run dev       # abre http://localhost:5173
```

## Pruebas, lint y formato

La aplicación está escrita en TypeScript estricto. Estas son las verificaciones que también corren en GitHub Actions (`.github/workflows/ci.yml`) en cada `push` y en cada pull request hacia `main`:

| Comando                | Qué hace                                                               |
| ---------------------- | ---------------------------------------------------------------------- |
| `npm test`             | Pruebas unitarias y de componentes (Vitest + Testing Library)          |
| `npm run test:e2e`     | Prueba end-to-end con Playwright (Chromium) sobre la versión compilada |
| `npm run lint`         | ESLint                                                                 |
| `npm run format:check` | Comprueba el formato con Prettier (`npm run format` lo corrige)        |
| `npm run typecheck`    | Verifica los tipos de TypeScript                                       |
| `npm run build`        | Verifica tipos y genera la versión de producción en `dist/`            |
| `npm run preview`      | Sirve localmente la versión de `dist/`                                 |

La primera vez que ejecutes la prueba end-to-end, instala el navegador:

```sh
npx playwright install chromium
```

## ¿Qué incluye?

| Archivo / carpeta                    | Para qué sirve                                                                        |
| ------------------------------------ | ------------------------------------------------------------------------------------- |
| `AGENTS.md`                          | Las reglas del proyecto para la IA. **Está vacío: lo llenas tú.**                     |
| `CLAUDE.md`                          | Hace que Claude Code lea `AGENTS.md`.                                                 |
| `openspec/`                          | Especificaciones del proyecto con [OpenSpec](https://github.com/Fission-AI/OpenSpec). |
| `.agents/skills/`, `.claude/skills/` | Comandos de OpenSpec para OpenCode, Claude Code, Codex y GitHub Copilot.              |
| `instrucciones/`                     | Los tickets de cada reto.                                                             |

## Flujo con OpenSpec

Desde tu agente de IA:

1. `/openspec-propose <cambio>` — crea la propuesta, las specs y las tareas
   (en Codex: `$openspec-propose`)
2. Revisa la propuesta
3. `/openspec-apply-change` — implementa el cambio
4. `/openspec-archive-change` — actualiza `openspec/specs/`

Las especificaciones se escriben en español (ver `openspec/config.yaml`).
