# Ticket #4 — Pantalla de historial de sorteos

> **Opcional:** este reto es para quienes terminen los retos #1 y #2 antes de tiempo, o para continuar después del dojo.

## Descripción

Ahora que los sorteos se guardan, queremos **verlos**. Necesitamos una pantalla de **historial** con las jugadas pasadas: cuándo se jugaron, quiénes participaron y quiénes ganaron.

Primero crea el cambio con OpenSpec (`/openspec-propose`) con el comportamiento de la pantalla; revísalo y después impleméntalo.

## Reglas

### R1 — Navegación

- Desde la pantalla principal hay un enlace o botón **"Historial"**.
- Desde el historial se puede volver al sorteo.

### R2 — Lista de sorteos

- Se muestran los sorteos del más reciente al más antiguo.
- Cada sorteo muestra: fecha y hora (en formato local, por ejemplo `21/11/2026 19:30`), cantidad de participantes y los ganadores con su posición.
- Se muestran **10 sorteos por página**, con botones para ver la página anterior y la siguiente.

### R3 — Detalle de un sorteo

- Al seleccionar un sorteo se ve su detalle: todos los participantes y los ganadores (como podio si hubo más de uno).

### R4 — Estados de la pantalla

| Situación         | Qué se muestra                                                |
| ----------------- | ------------------------------------------------------------- |
| Cargando          | `Cargando historial…`                                         |
| Sin sorteos       | `Todavía no hay sorteos. ¡Haz el primero!`                    |
| Error del backend | `No se pudo cargar el historial.` y un botón **"Reintentar"** |

## Criterios de aceptación

- El cambio se propuso, implementó y archivó con OpenSpec.
- La pantalla de historial cumple las reglas R1 a R4.
- La pantalla usa los endpoints `GET /api/sorteos` y `GET /api/sorteos/{id}` del Ticket #2.
- La pantalla usa el **color base** de la aplicación.
- Existen pruebas automáticas para la lista, el detalle y los tres estados, sin depender de un backend real.
- Todo lo que funcionaba antes sigue funcionando y el CI pasa.

## Buenas prácticas

- **Reutilizar componentes:** el podio del detalle es el mismo componente del Reto #2.
- **Estados explícitos:** cargando, vacío, error y con datos son estados distintos y probados, no casos olvidados.
- **Accesibilidad:** la lista y la navegación se pueden usar con teclado y tienen textos legibles por lectores de pantalla.

## Ejemplo

```
Historial de sorteos

21/11/2026 19:30 · 5 participantes · 🥇 María  🥈 Luis  🥉 Ana
21/11/2026 19:12 · 8 participantes · 🥇 Pedro
20/11/2026 18:45 · 3 participantes · 🥇 Sofía

            ← Anterior   Página 1   Siguiente →
```

¡El objetivo es aprovechar los datos guardados para que el usuario vea las jugadas pasadas!
