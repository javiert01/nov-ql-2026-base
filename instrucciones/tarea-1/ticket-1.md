# Ticket #1 — Crear una aplicación web para seleccionar un ganador

## Descripción

Necesitamos desarrollar una aplicación web que permita realizar un sorteo entre un grupo de participantes y seleccionar aleatoriamente a un único ganador.

El usuario debe poder ingresar los nombres de los participantes y ejecutar el sorteo mediante una acción en la interfaz. Una vez realizado, la aplicación debe mostrar claramente quién fue el ganador.

El objetivo es construir una primera versión funcional y sencilla del selector de ganadores.

Parte del **proyecto base del dojo**: un proyecto de Node.js casi vacío, con `AGENTS.md` (vacío) y OpenSpec ya configurados. En este reto no los uses todavía: pídele a la IA que genere la aplicación y acepta lo que proponga (_vibe coding_).

Puedes utilizar cualquier framework o herramienta de inteligencia artificial que consideres conveniente para desarrollar el frontend, siempre dentro del proyecto base. No es necesario implementar un backend.

## Criterios de aceptación

- La aplicación presenta una interfaz web para ingresar los nombres de los participantes.
- El usuario puede agregar varios participantes al sorteo.
- La aplicación permite iniciar el sorteo mediante un botón o acción claramente identificable.
- Al ejecutar el sorteo, se selecciona aleatoriamente a un único participante.
- El ganador se muestra de manera clara y destacada en la interfaz.
- Antes de generar la aplicación, el asistente de IA le pregunta al desarrollador qué color base usar para la interfaz gráfica (por ejemplo: rojo, azul, verde, etc.) y lo aplica a la interfaz. El usuario final no elige el color.
- La aplicación puede ejecutarse localmente siguiendo las instrucciones del proyecto.

## Ejemplo de uso

Al pedirle la aplicación, el asistente de IA pregunta qué color base usar y el desarrollador responde, por ejemplo, **azul**. Luego:

1. El usuario abre la aplicación, que ya usa el color **azul**.
2. Ingresa los siguientes participantes:

   - Ana
   - Pedro
   - María
   - Luis
   - Sofía

3. Presiona el botón **"Sortear ganador"**.
4. La aplicación muestra el resultado:

   **¡Tenemos un ganador!**

   María

El resultado puede ser diferente en cada ejecución.

## Consideraciones

- La solución debe ser exclusivamente frontend (no se requiere backend).
- Puedes utilizar cualquier framework, biblioteca o herramienta para desarrollar la interfaz.
- No es necesario guardar los participantes ni los resultados entre sesiones.
- No es necesario implementar múltiples ganadores.
- Puedes tomar tus propias decisiones sobre el diseño visual y la experiencia de usuario, siempre que se respete el color base que elegiste cuando el asistente te lo preguntó.

¡El objetivo es conseguir una primera versión funcional utilizando desarrollo asistido por IA!
