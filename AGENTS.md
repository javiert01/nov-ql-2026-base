# AGENTS.md

## Proyecto

Selector de ganadores para sorteos: el usuario agrega participantes y la app elige un único ganador al azar.
Solo frontend, con React + Vite y Tailwind CSS. El color base de la interfaz es **rojo**.

## Comandos

- Instalar: `npm install`
- Ejecutar: `npm run dev` (http://localhost:5173)
- Pruebas: `npm test`
- Compilar: `npm run build`

## Estructura

- `src/raffle/`: lógica del sorteo (funciones puras). No importa nada de React ni de `src/components/`.
- `src/hooks/`: estado de la aplicación (une la lógica con la UI).
- `src/components/`: un componente por archivo, cada uno con una sola responsabilidad.
- `src/main.jsx`: punto de composición; es el único lugar que crea las dependencias concretas (por ejemplo, `Math.random`).

## Pruebas

- Todo cambio de comportamiento incluye pruebas automáticas que verifican la funcionalidad.
- No se escriben pruebas tautológicas: una prueba que solo repite la implementación, una constante, un mock o que un componente pinta la prop que recibió no aporta y no se agrega. Cada prueba debe fallar si el comportamiento real se rompe.
- Las pruebas de componentes usan Testing Library e interactúan como el usuario (roles y textos visibles), no con detalles internos.
- Una tarea no está terminada si `npm test` falla.

## Diseño del código (SOLID)

- **Responsabilidad única:** cada módulo y cada componente hace una sola cosa. La lógica del sorteo no conoce la interfaz.
- **Abierto/cerrado:** los componentes reciben datos y callbacks por props; para cambiar su comportamiento se pasan otras props, no se edita el componente.
- **Sustitución de Liskov:** cualquier generador aleatorio que devuelva un número en `[0, 1)` funciona igual que `Math.random`.
- **Segregación de interfaces:** cada componente recibe solo las props que usa; no se pasa el estado completo.
- **Inversión de dependencias:** las dependencias se inyectan. La función que elige al ganador recibe el generador aleatorio como parámetro; nada fuera de `src/main.jsx` llama a `Math.random()`.
- Los componentes presentacionales (`src/components/`) no tienen estado del sorteo; el estado vive en `src/hooks/`.

## Estilos

- Todos los estilos se escriben con clases de Tailwind en el JSX. No hay hojas de estilo propias aparte de `src/index.css`, que solo importa Tailwind y define animaciones o tokens del tema.
- Se usa la paleta `red` de Tailwind como color base.

## Lo que la IA no debe hacer

- No cambiar el color base ni el comportamiento de la app sin que se pida.
- No llamar a `Math.random()` fuera de `src/main.jsx`.
- No dar por terminada una tarea con pruebas fallando ni borrar pruebas para que pasen.
