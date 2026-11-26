# Ticket #5 — Despliegue automático con GitHub Actions

## Descripción

Queremos que cualquier persona pueda usar el selector de ganadores desde el navegador, sin tener que instalar nada. Para eso, la aplicación debe publicarse automáticamente en **GitHub Pages** usando **GitHub Actions**.

Este ticket se construye sobre el **Ticket #2**: solo se debe desplegar una versión que haya pasado las pruebas.

Antes de implementar, crea un cambio con OpenSpec (`/openspec-propose`) que describa el despliegue: cuándo se ejecuta, qué pasos tiene y qué pasa si algo falla.

## Criterios de aceptación

- El cambio se propuso, implementó y archivó con OpenSpec.
- Existe un workflow de GitHub Actions que despliega la aplicación en **GitHub Pages**.
- El despliegue se ejecuta automáticamente con cada `push` a la rama `main`.
- El despliegue **solo** ocurre si el linter y las pruebas del Ticket #2 pasan.
- Los pull requests **no** despliegan; solo ejecutan las verificaciones.
- La aplicación publicada funciona igual que en local (participantes, color base, podio y cuenta regresiva).
- El `README.md` incluye el enlace a la aplicación publicada.

## Ejemplo

1. Se aprueba y fusiona un pull request en `main`.
2. GitHub Actions ejecuta el linter y las pruebas.
3. Si pasan, la aplicación se construye y se publica en GitHub Pages.
4. Unos minutos después, la nueva versión está disponible en:

   `https://<tu-usuario>.github.io/<tu-repositorio>/`

## Consideraciones

- Habilita GitHub Pages en el repositorio usando **GitHub Actions** como origen (_Settings → Pages_).
- Algunos frameworks necesitan configurar la ruta base (`base`) para que funcionen en un subdirectorio.
- Puedes usar `gh` para revisar las ejecuciones: `gh run list` y `gh run watch`.
- No guardes secretos ni tokens en el código.

¡El objetivo es que cada cambio aprobado llegue a producción sin pasos manuales!
