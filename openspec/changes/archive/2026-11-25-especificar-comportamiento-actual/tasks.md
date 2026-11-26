# Tasks

## 1. Reglas de trabajo

- [x] 1.1 Agregar a `AGENTS.md` una sección «Especificaciones (OpenSpec)» que indique que todo cambio nuevo se especifica primero con OpenSpec (`/openspec-propose` → revisión → `/openspec-apply-change` → `/openspec-archive-change`), que las especificaciones viven en `openspec/specs/` y que las pruebas verifican los escenarios de las especificaciones; verificar leyendo el archivo que la sección existe y es concreta.

## 2. Pruebas para escenarios sin cubrir

Los escenarios ya cubiertos por las pruebas actuales no se duplican. Cada prueba nueva lleva el nombre del escenario en su descripción.

- [x] 2.1 `participantes` / «Entrada sin nombres»: prueba de la app que escribe « , , », presiona «Agregar» y comprueba que la lista no cambia y el campo conserva el texto; verificar con `npm test`.
- [x] 2.2 `participantes` / «Sin participantes no hay botón Reiniciar»: prueba de la app que comprueba que «Reiniciar» no aparece con la lista vacía y sí con un participante; verificar con `npm test`.
- [x] 2.3 `sorteo` / «Sin participantes» y «Dos participantes»: ampliar la prueba de mínimo de participantes para comprobar que el mensaje «Agrega al menos 2 participantes para sortear.» se muestra con 0 y 1 participantes y desaparece con 2; verificar con `npm test`.
- [x] 2.4 `sorteo` / «Segundo sorteo»: prueba de la app con un generador que devuelve valores distintos en cada llamada y comprueba que el segundo sorteo reemplaza al primer ganador; verificar con `npm test`.
- [x] 2.5 `interfaz` / «Lista vacía» y «Lista con participantes»: prueba de la app que comprueba el mensaje de lista vacía, el contador (0 y 2) y la numeración 1 y 2; verificar con `npm test`.
- [x] 2.6 `interfaz` / «Antes del sorteo no hay anuncio»: comprobar en la prueba del flujo principal que «¡Tenemos un ganador!» no aparece antes de sortear; verificar con `npm test`.
- [x] 2.7 Romper a propósito una regla cubierta por las pruebas nuevas (por ejemplo, mostrar siempre «Reiniciar») y comprobar que `npm test` falla; deshacer el cambio y comprobar que vuelve a pasar.

## 3. Validación

- [x] 3.1 Ejecutar `npx openspec validate especificar-comportamiento-actual --strict` y corregir lo que reporte hasta que pase.

## Workflow follow-up

- Archivar el cambio con `/openspec-archive-change` para crear `openspec/specs/participantes`, `openspec/specs/sorteo` y `openspec/specs/interfaz`.
- La prueba del escenario «Botón principal en rojo» (`interfaz`) se implementa en el Ticket #2 con Playwright.
