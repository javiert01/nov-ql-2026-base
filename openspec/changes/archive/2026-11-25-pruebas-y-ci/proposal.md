# Proposal

## Why

Hoy nada avisa si un cambio rompe el selector de ganadores: las pruebas solo corren si alguien las ejecuta a mano, no hay linter ni formateador, y el escenario «Botón principal en rojo» de `interfaz` no tiene prueba. Antes de agregar el podio y la cuenta regresiva necesitamos verificaciones automáticas en cada cambio.

## What Changes

- El código pasa a TypeScript estricto (sin `any`); `npm run typecheck` lo verifica.
- ESLint (reglas de TypeScript y de hooks de React) con `npm run lint`, y Prettier con `npm run format` / `npm run format:check`.
- Una prueba end-to-end con Playwright (Chromium) sobre la versión compilada: recorre el flujo principal y comprueba que el botón «Sortear ganador» es rojo. Se ejecuta con `npm run test:e2e`.
- Workflow de GitHub Actions `ci.yml` en cada `push` y en cada pull request hacia `main`, con dos trabajos: `check` (formato, lint, tipos, pruebas unitarias) y `e2e`. Si algo falla, el workflow falla.
- `README.md` y `AGENTS.md` explican los nuevos comandos.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

Ninguna: el comportamiento no cambia (`skip_specs: true`). Las pruebas verifican los escenarios existentes de `participantes`, `sorteo` e `interfaz`.

## Impact

- Todos los archivos de `src/` cambian de `.js/.jsx` a `.ts/.tsx`.
- Nuevas dependencias de desarrollo: `typescript`, `@types/react`, `@types/react-dom`, `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`, `prettier`, `eslint-config-prettier`, `@playwright/test`.
- Nuevo directorio `e2e/` y `.github/workflows/ci.yml`.
