# Ticket #4 — Cuenta regresiva antes de mostrar a los ganadores

## Descripción

El sorteo es más emocionante si hay un poco de suspenso. Antes de mostrar a los ganadores, la aplicación debe mostrar una **cuenta regresiva**: **3… 2… 1…**

Como en los tickets anteriores, primero crea un cambio con OpenSpec (`/openspec-propose`) con estas reglas y las decisiones que tomen, revísalo y después impleméntalo.

## Reglas

### R1 — Cuenta regresiva

- Al presionar **"Sortear ganador"**, se muestra una cuenta regresiva de **3 a 1**, con **un segundo** entre cada número.
- Después del **1**, se muestran los ganadores (uno o un podio, según el Ticket #3).
- La cuenta regresiva se muestra de forma grande y visible, usando el **color base** de la aplicación.

### R2 — Durante la cuenta regresiva

- El botón **"Sortear ganador"** está deshabilitado: no se puede iniciar otro sorteo.
- No se puede modificar la lista de participantes ni la cantidad de ganadores.
- El resultado anterior (si existía) deja de mostrarse.

### R3 — Sorteo inválido

- Si el sorteo no se puede realizar (por ejemplo, por participantes insuficientes), **no** se muestra la cuenta regresiva; se muestra directamente el mensaje de error.

## Criterios de aceptación

- El cambio se propuso, implementó y archivó con OpenSpec, y `openspec/specs/` incluye las reglas R1, R2 y R3 y las decisiones tomadas.
- Al sortear, se muestra la cuenta 3, 2, 1 con un segundo entre cada número.
- Los ganadores aparecen solo al terminar la cuenta regresiva.
- Durante la cuenta regresiva no se puede sortear de nuevo ni modificar los datos.
- Un sorteo inválido no muestra la cuenta regresiva.
- Existen pruebas automáticas para las nuevas reglas y el CI del Ticket #2 pasa.
- Todo lo que funcionaba antes sigue funcionando.

## Ejemplo

1. Participantes: Ana, Pedro, María, Luis y Sofía.
2. Cantidad de ganadores: 1.
3. Presiona **"Sortear ganador"**.
4. La aplicación muestra: **3** → **2** → **1**
5. Luego muestra:

   **¡Tenemos un ganador!**

   Sofía

## Consideraciones

- Las pruebas **no** deben esperar 3 segundos reales: usen _fake timers_ o una técnica similar.
- Pueden agregar animaciones o sonido, siempre que se cumplan las reglas.

¡El objetivo es agregar una funcionalidad nueva sin romper nada de lo anterior!
