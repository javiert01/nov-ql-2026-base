# Ticket #3 — Conectar el frontend con el backend

> **Opcional:** este reto es para quienes terminen los retos #1 y #2 antes de tiempo, o para continuar después del dojo.

## Descripción

Cada vez que se realiza un sorteo, el frontend debe **guardarlo** en el backend: los participantes y los ganadores.

El sorteo se sigue realizando en el navegador como hasta ahora; el backend solo guarda el resultado.

Primero crea el cambio con OpenSpec (`/openspec-propose`) con el comportamiento esperado, incluyendo qué pasa cuando el backend no responde; revísalo y después impleméntalo.

## Reglas

### R1 — Guardar el sorteo

- Al terminar la cuenta regresiva y mostrar a los ganadores, el frontend envía el sorteo a `POST /api/sorteos`.
- Si se guarda correctamente, se muestra un aviso discreto: `Sorteo guardado.`
- Un sorteo inválido (que no se pudo realizar) **no** se envía.

### R2 — Si el backend falla

- Si el backend no responde o devuelve un error, **el sorteo igual se muestra**. Guardar el historial nunca debe impedir jugar.
- Se muestra el aviso: `No se pudo guardar el sorteo.`
- La aplicación publicada en GitHub Pages (sin backend) sigue funcionando.

### R3 — Configuración

- La URL del backend se configura con una variable de entorno del frontend (por ejemplo, `VITE_API_URL`), no está escrita en el código.

## Criterios de aceptación

- El cambio se propuso, implementó y archivó con OpenSpec.
- Cada sorteo válido se guarda en el backend con sus participantes y ganadores en orden.
- Si el backend falla, el sorteo se muestra igual y aparece el aviso de error.
- La URL del backend es configurable.
- Las pruebas del frontend cubren el caso exitoso y el caso de error **sin** depender de un backend real.
- Todo lo que funcionaba antes sigue funcionando y el CI pasa.

## Buenas prácticas

- **Un cliente del API:** las llamadas HTTP viven en un módulo `apiDeSorteos`, no repartidas por los componentes.
- **Inyección de dependencias:** los componentes reciben el cliente del API; en las pruebas se reemplaza por uno falso (_mock_ o _stub_).
- **CORS:** el backend permite solo el origen del frontend, configurado por variable de entorno; no uses `*`.
- **Tiempo de espera:** la petición tiene un _timeout_; la interfaz no se queda esperando para siempre.

## Ejemplo

1. Participantes: Ana, Pedro, María, Luis y Sofía. Ganadores: 3.
2. Presiona **"Sortear ganador"** → 3… 2… 1…
3. Se muestra el podio y el aviso `Sorteo guardado.`
4. En Swagger, `GET /api/sorteos` muestra el sorteo recién guardado.

¡El objetivo es conectar las dos partes sin que una falla en el backend arruine el sorteo!
