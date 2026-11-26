# Proposal

## Why

Al agregar participantes con el botón «Agregar», el foco queda en el botón y hay que volver a hacer clic en el campo para escribir el siguiente nombre. Además, no hay límite de longitud: un nombre muy largo rompe la lista y el anuncio del ganador.

## What Changes

- Después de agregar participantes (con el botón o con Enter), el foco vuelve al campo «Nombre del participante».
- Cada nombre puede tener como máximo 40 caracteres. Si algún nombre de la entrada supera el límite, no se agrega ninguno, el texto se conserva y se muestra «Cada nombre puede tener hasta 40 caracteres». El mensaje desaparece al editar el campo.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `participantes`: se agregan los requisitos de foco tras agregar y de longitud máxima del nombre.

## Impact

- Lógica de participantes en `src/raffle/` (validación de longitud).
- Estado del campo de texto y componente del formulario.
- Pruebas de la app.
