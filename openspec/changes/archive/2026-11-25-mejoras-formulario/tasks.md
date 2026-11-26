# Tasks

## 1. Longitud máxima

- [x] 1.1 Agregar en `src/raffle/` la constante del máximo (40) y una función pura que indica si algún nombre lo supera, con prueba unitaria del límite (40 pasa, 41 no); verificar con `npm test`.
- [x] 1.2 Mover el texto del campo y el mensaje de error a un hook en `src/hooks/` que rechaza la entrada con un nombre demasiado largo y borra el mensaje al editar; cubrir los escenarios «Nombre de 40 caracteres», «Un nombre demasiado largo rechaza toda la entrada» y «Editar el campo quita el mensaje» con pruebas de la app; verificar con `npm test`.
- [x] 1.3 Mostrar el mensaje bajo el campo, asociado a él para lectores de pantalla (`aria-invalid`, `aria-describedby`, `role="alert"`); verificar en el navegador.

## 2. Foco

- [x] 2.1 Devolver el foco al campo tras enviar el formulario; cubrir «Agregar con el botón devuelve el foco» con una prueba de la app; verificar con `npm test`.

## Workflow follow-up

- Archivar el cambio con `/openspec-archive-change`.
