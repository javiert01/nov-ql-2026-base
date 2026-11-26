# Proposal

## Why

En los eventos de la comunidad se entrega más de un premio. El sorteo debe poder elegir hasta tres ganadores distintos y mostrarlos como un podio (Ticket #3).

## What Changes

- El usuario elige cuántos ganadores quiere: 1, 2 o 3 (por defecto 1), con tres botones.
- El mínimo de participantes pasa de «2» fijo a «cantidad de ganadores + 1». El mensaje cambia a «Se necesitan al menos {N + 1} participantes para sortear {N} ganador/ganadores.» y reemplaza a «Agrega al menos 2 participantes para sortear.».
- Los ganadores son todos distintos y cada participante tiene la misma probabilidad de quedar en cualquier lugar.
- Con 1 ganador el resultado se muestra como hasta ahora. Con 2 o 3 se muestra «¡Tenemos un podio!» con 🥇 en el centro y más alto, 🥈 a la izquierda y 🥉 a la derecha, en el color base.
- En la lista, las filas de los ganadores del podio muestran su medalla y su lugar.
- Cambiar la cantidad de ganadores borra el resultado anterior.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `sorteo`: cantidad de ganadores, nuevo mínimo y mensaje, ganadores distintos con la misma probabilidad, y el resultado se borra también al cambiar la cantidad.
- `interfaz`: selector de cantidad, podio y medallas en la lista.

## Impact

- Lógica del sorteo en `src/raffle/` (elección de varios ganadores).
- Estado en `src/hooks/useRaffle.ts`.
- Componentes nuevos: selector de cantidad y podio; cambian los controles del sorteo, la lista y la fila.
- Pruebas unitarias, de la app y la prueba end-to-end.
