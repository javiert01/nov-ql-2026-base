# Proposal

## Why

El sorteo es más emocionante con suspenso: antes de mostrar a los ganadores la aplicación debe contar 3… 2… 1… (Ticket #4).

## What Changes

- Al presionar «Sortear ganador» se muestra una cuenta regresiva 3, 2, 1 con un segundo entre números; después se muestran los ganadores (uno o un podio).
- Durante la cuenta regresiva no se puede sortear, ni cambiar la lista, ni la cantidad de ganadores, ni reiniciar, y el resultado anterior deja de mostrarse.
- Un sorteo inválido no muestra cuenta regresiva: el botón sigue deshabilitado con su mensaje.
- Con «reducir movimiento» activado en el sistema, la cuenta se muestra igual pero sin animaciones.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `sorteo`: cuenta regresiva antes del resultado, bloqueo durante la cuenta y sorteo inválido sin cuenta.
- `interfaz`: presentación de la cuenta regresiva y movimiento reducido.

## Impact

- Estado del sorteo en `src/hooks/useRaffle.ts` (fase de cuenta regresiva y temporizador).
- Nuevo componente de cuenta regresiva; el formulario, la lista, el selector y los controles se deshabilitan durante la cuenta.
- Las pruebas de la app usan temporizadores falsos para avanzar la cuenta.
