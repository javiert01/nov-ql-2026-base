# Tasks

## 1. Construcción

- [x] 1.1 Configurar `base: './'` en `vite.config.ts`; verificar que `npm run build` genera rutas relativas en `dist/index.html` y que `npm run test:e2e` pasa.

## 2. Workflow

- [x] 2.1 Agregar el trabajo `deploy` a `.github/workflows/ci.yml` (needs `check` y `e2e`, solo `push` a `main`, permisos mínimos, acciones oficiales de Pages); verificar en GitHub que el workflow publica.
- [x] 2.2 Habilitar GitHub Pages con origen «GitHub Actions» en el repositorio; verificar con `gh api repos/javiert01/nov-ql-2026-base/pages`.

## 3. Documentación y verificación

- [x] 3.1 Agregar a `README.md` el enlace a la aplicación publicada y explicar cuándo se despliega; verificar abriendo la URL y haciendo un sorteo.

## Workflow follow-up

- Archivar el cambio con `/openspec-archive-change`.
