# Ticket #0 — Reglas del proyecto para la IA (`AGENTS.md`)

## Descripción

En el Reto #1 la IA tomó todas las decisiones: estructura, estilo, pruebas (o la falta de ellas). Antes de seguir agregando funcionalidades, queremos que la IA trabaje **con nuestras reglas**.

Para eso vamos a completar el archivo `AGENTS.md` que viene **vacío** en el proyecto base. Es un archivo de instrucciones que los agentes de IA leen automáticamente antes de trabajar en el código. Es el primer **guard rail** del proyecto.

Este ticket se construye **sobre la aplicación del Reto #1** (`instrucciones/tarea-1/`), no desde cero. Una vez escritas las reglas, la IA las aplica al código que ya existe.

**El contenido lo decide el equipo.** No le pidas a la IA que invente las reglas: discútanlas y escríbanlas ustedes. La IA puede ayudarles a redactarlas o a revisar si son claras.

## Criterios de aceptación

- El archivo `AGENTS.md` de la raíz del proyecto tiene las reglas del equipo.
- `AGENTS.md` incluye, como mínimo, una sección para cada uno de estos temas:
  - **Descripción del proyecto:** qué es la aplicación y qué tecnologías usa.
  - **Comandos:** cómo instalar, ejecutar, probar y revisar el código.
  - **Pruebas:** cuándo y cómo se escriben.
  - **Diseño del código:** principios y patrones que se deben seguir.
  - **Lo que la IA no debe hacer.**
- Cada regla es **concreta y verificable** (ver ejemplos abajo).
- El agente que usa el equipo lee el archivo (ver _Consideraciones_).
- El código actual cumple las reglas de `AGENTS.md`: la IA lo refactoriza para aplicarlas (ver _Flujo de trabajo_).
- El refactor **no cambia el comportamiento**: la aplicación funciona igual que al terminar el Reto #1.
- El equipo revisa el resultado y confirma que cada regla se cumple.

## Ejemplos de reglas

Estas son ideas para inspirarse; elijan, cambien o agreguen las suyas:

- **Pruebas:** todo cambio de comportamiento incluye pruebas automáticas. No se da por terminada una tarea si las pruebas fallan.
- **SOLID:** cada módulo tiene una sola responsabilidad. Por ejemplo, la lógica del sorteo no conoce la interfaz gráfica.
- **Interfaces:** los componentes dependen de interfaces (o tipos) y no de implementaciones concretas.
- **Inyección de dependencias:** las dependencias se reciben desde fuera. Por ejemplo, el generador de números aleatorios se inyecta para poder reemplazarlo en las pruebas.
- **Estilo:** TypeScript estricto, sin `any`; nombres en español o en inglés, pero no mezclados.
- **Límites:** no agregar dependencias nuevas sin preguntar; no modificar el workflow de CI sin pedirlo.

**Regla vaga ❌:** «Escribe buen código».

**Regla concreta ✅:** «La función que elige al ganador recibe el generador de números aleatorios como parámetro».

## Ejemplo

```markdown
# AGENTS.md

## Proyecto

Selector de ganadores para sorteos. Solo frontend, con Vite + TypeScript.

## Comandos

- Instalar: `npm install`
- Ejecutar: `npm run dev`
- Pruebas: `npm test`

## Reglas

- Todo cambio incluye pruebas.
- La lógica del sorteo vive en `src/sorteo/` y no importa nada de la UI.
- El generador aleatorio se inyecta; nunca se llama a `Math.random()` directamente.
```

## Flujo de trabajo

1. **Escribir las reglas:** el equipo completa `AGENTS.md`.
2. **Revisar el código actual:** pídanle a la IA que compare el código con `AGENTS.md` y liste qué reglas no se cumplen. Por ejemplo:

   > Lee `AGENTS.md` y revisa el código del proyecto. Lista qué reglas no se cumplen y dónde. No cambies nada todavía.

3. **Aplicar las reglas:** pídanle que refactorice el código para cumplirlas, sin cambiar el comportamiento:

   > Refactoriza el código para que cumpla todas las reglas de `AGENTS.md`. No cambies el comportamiento de la aplicación.

4. **Revisar el resultado:** comprueben que la aplicación funciona igual y que cada regla se cumple. Si la IA ignoró una regla, aclárenla en `AGENTS.md` y repitan el paso 3.

## Consideraciones

- **OpenCode**, **Codex** y **GitHub Copilot** leen `AGENTS.md` automáticamente.
- **Claude Code** lee `CLAUDE.md`: el proyecto base ya incluye uno con la línea `@AGENTS.md`, así que usa las mismas reglas.
- Si una regla depende de algo que llega en un ticket posterior (por ejemplo, las pruebas automáticas del Ticket #2), déjenla escrita: se aplicará en ese ticket.
- Mantén el archivo corto: reglas claras y pocas son mejores que muchas reglas genéricas.
- `AGENTS.md` es un documento vivo: actualízalo cuando la IA cometa un error que una regla habría evitado.

¡El objetivo es que la IA trabaje con las reglas del equipo y no con las suyas!
