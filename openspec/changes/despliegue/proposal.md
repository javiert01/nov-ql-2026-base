# Proposal

## Why

Cualquier persona debe poder usar el selector de ganadores desde el navegador sin instalar nada, y cada versión aprobada en `main` debe publicarse sin pasos manuales (Ticket #5).

## What Changes

- Nuevo trabajo `deploy` en `.github/workflows/ci.yml` que construye la aplicación y la publica en GitHub Pages.
- Solo se ejecuta en `push` a `main` y solo si los trabajos `check` (formato, lint, tipos, pruebas) y `e2e` pasan. Los pull requests nunca despliegan.
- Vite genera rutas relativas para que la aplicación funcione en el subdirectorio `/nov-ql-2026-base/`.
- `README.md` enlaza a la aplicación publicada: https://javiert01.github.io/nov-ql-2026-base/

## Capabilities

### New Capabilities

- `despliegue`: cuándo se publica la aplicación, qué condiciones debe cumplir y qué pasa si algo falla.

### Modified Capabilities

Ninguna.

## Impact

- `.github/workflows/ci.yml`, `vite.config.ts`, `README.md`.
- Configuración del repositorio: GitHub Pages con origen «GitHub Actions» (una sola vez).
