# Design

## Context

`ci.yml` ya tiene los trabajos `check` y `e2e` en cada `push` y en pull requests hacia `main`. Ver `proposal.md` para el motivo.

## Goals / Non-Goals

**Goals:** publicar automáticamente solo versiones verificadas.

**Non-Goals:** entornos de vista previa por pull request; dominio propio.

## Decisions

- **Trabajo `deploy` en el mismo workflow** con `needs: [check, e2e]` y `if: github.event_name == 'push' && github.ref == 'refs/heads/main'`. Una sola cadena de dependencias visible; alternativa descartada: un `deploy.yml` con `workflow_run`, más difícil de seguir.
- **Acciones oficiales de Pages** (`configure-pages`, `upload-pages-artifact`, `deploy-pages`) con permisos mínimos (`pages: write`, `id-token: write`) solo en ese trabajo. No hay secretos en el código.
- **`concurrency: pages` sin cancelar en curso**: si llegan dos `push` seguidos, el segundo espera y se publica la versión más reciente.
- **`base: './'` en Vite**: los recursos se cargan con rutas relativas, así funciona igual en `/nov-ql-2026-base/` y en local. La app no tiene rutas, así que no hace falta más.

## Risks / Trade-offs

- [Pages no está habilitado en el repositorio] → El trabajo `deploy` falla con un error claro; se habilita una vez con origen «GitHub Actions».
- [Si falla el despliegue queda publicada la versión anterior] → Es el comportamiento deseado; el workflow queda en rojo y se puede volver a ejecutar.
