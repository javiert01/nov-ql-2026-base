# Tasks

## 1. Estado

- [x] 1.1 Agregar a `useRaffle` la cuenta regresiva: elegir ganadores al iniciar, ocultarlos, reducir la cuenta cada segundo, revelar al final e ignorar acciones durante la cuenta; probar con temporizadores falsos; verificar con `npm test`.

## 2. Interfaz

- [x] 2.1 Componente de cuenta regresiva en el lugar del resultado, en rojo y anunciado a lectores de pantalla; deshabilitar formulario, lista, selector, «Sortear ganador» y «Reiniciar» durante la cuenta; cubrir los escenarios con pruebas de la app; verificar con `npm test`.
- [x] 2.2 Usar `motion-safe:` en las animaciones de la cuenta y de los resultados; verificar en el navegador con «reducir movimiento» emulado.
- [x] 2.3 Actualizar la prueba end-to-end para comprobar que se ve la cuenta antes del resultado; verificar con `npm run test:e2e`.

## 3. Verificación

- [x] 3.1 Ejecutar `npm run lint`, `npm run format:check`, `npm run typecheck` y `npx openspec validate cuenta-regresiva --strict`.

## Workflow follow-up

- Archivar el cambio con `/openspec-archive-change`.
