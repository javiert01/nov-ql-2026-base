# Proposal

## Why

La aplicación del selector de ganadores funciona, pero su comportamiento solo está descrito en el código y en las pruebas. Los próximos cambios (podio, cuenta regresiva, despliegue) necesitan una especificación base sobre la cual proponer deltas, y el equipo quiere que todo cambio nuevo se especifique primero con OpenSpec.

## What Changes

- Se documenta el comportamiento **actual** de la aplicación en `openspec/specs/`, sin cambiar el comportamiento.
- Se registran como requisitos los detalles que hoy tiene la aplicación aunque el Reto #1 no los pedía: varios nombres separados por comas o saltos de línea, duplicados sin distinguir mayúsculas, mínimo de 2 participantes y la etiqueta «Ganador» en la fila del ganador.
- Se verifica que cada escenario de las especificaciones tiene una prueba automática; se agregan las que falten.
- `AGENTS.md` agrega la regla de que todo cambio nuevo se especifica primero con OpenSpec (propuesta → implementación → archivo).

## Capabilities

### New Capabilities

- `participantes`: cómo se arma la lista de participantes: agregar uno o varios nombres, limpiar espacios, ignorar vacíos y repetidos, quitar y reiniciar.
- `sorteo`: cuándo se puede sortear, cómo se elige a un único ganador al azar y cuándo deja de mostrarse el resultado.
- `interfaz`: cómo se presenta la aplicación: color base rojo, anuncio del ganador y lista numerada con el ganador resaltado.

### Modified Capabilities

Ninguna: no existen especificaciones previas.

## Impact

- Nuevos archivos en `openspec/specs/` (al archivar el cambio).
- `AGENTS.md`: nueva regla de trabajo con OpenSpec.
- Pruebas en `src/`: solo se agregan pruebas para escenarios que hoy no están cubiertos; no cambia el código de la aplicación.
- La prueba de que el color base se aplica a la interfaz queda para el Ticket #2 (pruebas end-to-end con navegador real).
