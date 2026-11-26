# Tasks

## 1. Lógica

- [x] 1.1 Elegir N ganadores distintos con Fisher–Yates parcial y la regla de mínimo N + 1 en `src/raffle/`, con pruebas de ganadores distintos, compatibilidad con N = 1 y frecuencias parejas con generador con semilla; verificar con `npm test`.

## 2. Estado e interfaz

- [x] 2.1 Guardar la cantidad y la lista de ganadores en `useRaffle`; cambiar la cantidad borra el resultado; verificar con pruebas del hook.
- [x] 2.2 Agregar el selector de cantidad, el podio, el nuevo mensaje de mínimo y las medallas en la lista; cubrir los escenarios nuevos y modificados con pruebas de la app; verificar con `npm test`.
- [x] 2.3 Extender la prueba end-to-end con un podio de 3 que use el color base; verificar con `npm run test:e2e`.

## 3. Verificación

- [x] 3.1 Ejecutar `npm run lint`, `npm run format:check`, `npm run typecheck` y `npx openspec validate podio --strict`.

## Workflow follow-up

- Archivar el cambio con `/openspec-archive-change`.
