# Tasks

## 1. TypeScript

- [x] 1.1 Agregar `tsconfig.json` estricto y renombrar `src/` a `.ts/.tsx` con tipos explícitos (sin `any`); verificar con `npm run typecheck`, `npm test` y `npm run build`.

## 2. Lint y formato

- [x] 2.1 Configurar ESLint (flat config con TypeScript, hooks de React y react-refresh) y Prettier; agregar los scripts `lint`, `format`, `format:check`; verificar que `npm run lint` y `npm run format:check` pasan.

## 3. Prueba end-to-end

- [x] 3.1 Configurar Playwright (Chromium, servidor con la versión compilada) y escribir la prueba que cubre «Botón principal en rojo» y el flujo principal de sorteo; verificar con `npm run test:e2e`.
- [x] 3.2 Cambiar a propósito el color del botón y comprobar que `npm run test:e2e` falla; deshacer.

## 4. CI y documentación

- [x] 4.1 Crear `.github/workflows/ci.yml` con los trabajos `check` y `e2e` en `push` y en pull requests hacia `main`; verificar que el workflow pasa en GitHub al subir la rama.
- [x] 4.2 Actualizar `README.md` (cómo ejecutar pruebas, lint y formato) y `AGENTS.md` (comandos y rutas `.ts/.tsx`); verificar leyendo ambos archivos.

## Workflow follow-up

- Archivar el cambio con `/openspec-archive-change`.
