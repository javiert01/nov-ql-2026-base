# Design

## Context

Ver `proposal.md`. La app es React + Vite + Tailwind en JavaScript, con Vitest + Testing Library (30 pruebas). Node 22.20 según `package.json`.

## Goals / Non-Goals

**Goals:**
- Un comando por verificación y las mismas verificaciones en CI.
- Probar el color base en un navegador real.

**Non-Goals:**
- Probar en varios navegadores: solo Chromium.
- Cambiar comportamiento o estilos.

## Decisions

- **TypeScript estricto con resolución `bundler` e importaciones sin extensión**: Vite y TypeScript resuelven igual; `tsc --noEmit` solo verifica tipos. Alternativa descartada: mantener JS con JSDoc, menos estricto.
- **ESLint + Prettier** en lugar de Biome: incluye las reglas de hooks de React y es lo más conocido por el equipo. `eslint-config-prettier` evita reglas de formato en conflicto.
- **Color con Playwright**: jsdom no calcula los estilos de Tailwind. La prueba pinta el color calculado del botón en un canvas de 1×1 y lee el píxel en RGB, así funciona aunque el navegador devuelva el color en `oklch`. Se considera rojo si el canal R supera a G y B por al menos 80.
- **La prueba e2e usa la versión compilada** (`vite build` + `vite preview`), igual que lo que se desplegará en el Ticket #5.
- **Dos trabajos en CI** (`check` y `e2e`): los fallos se leen mejor y el despliegue del Ticket #5 podrá depender de ambos.
- **Vitest solo busca pruebas en `src/`** para no ejecutar las de Playwright.

## Risks / Trade-offs

- [Instalar Chromium en CI tarda] → Solo Chromium y con `--with-deps`; el trabajo corre en paralelo con `check`.
- [Umbral de «rojo» arbitrario] → El rojo de Tailwind (`red-600`) da aproximadamente RGB(231, 0, 11), muy lejos del umbral; un cambio a otro color base lo detecta.
