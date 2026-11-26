# Ticket #2 — Endpoints para guardar y consultar sorteos

> **Opcional:** este reto es para quienes terminen los retos #1 y #2 antes de tiempo, o para continuar después del dojo.

## Descripción

Con la base de datos lista, necesitamos que el frontend pueda **guardar** cada sorteo y **consultar** los sorteos anteriores a través de la API.

Primero crea el cambio con OpenSpec (`/openspec-propose`) con los endpoints, las validaciones y los errores; revísalo y después impleméntalo.

## Endpoints

| Método | Ruta                | Descripción                                        | Respuesta exitosa                  |
| ------ | ------------------- | -------------------------------------------------- | ---------------------------------- |
| `POST` | `/api/sorteos`      | Guarda un sorteo                                   | `201 Created` + el sorteo guardado |
| `GET`  | `/api/sorteos`      | Lista los sorteos, del más reciente al más antiguo | `200 OK` + lista paginada          |
| `GET`  | `/api/sorteos/{id}` | Obtiene el detalle de un sorteo                    | `200 OK` + el sorteo               |

### `POST /api/sorteos`

Petición:

```json
{
  "participantes": ["Ana", "Pedro", "María", "Luis", "Sofía"],
  "ganadores": ["María", "Luis", "Ana"]
}
```

Respuesta (`201 Created`):

```json
{
  "id": 42,
  "creadoEn": "2026-11-21T19:30:00Z",
  "participantes": ["Ana", "Pedro", "María", "Luis", "Sofía"],
  "ganadores": [
    { "posicion": 1, "nombre": "María" },
    { "posicion": 2, "nombre": "Luis" },
    { "posicion": 3, "nombre": "Ana" }
  ]
}
```

### `GET /api/sorteos?pagina=1&porPagina=10`

Devuelve los sorteos con un resumen (fecha, cantidad de participantes y ganadores) e información de paginación.

## Reglas de validación

El backend **no confía** en el frontend. Una petición es inválida si:

- no hay participantes, hay nombres vacíos, o hay nombres duplicados (sin distinguir mayúsculas de minúsculas);
- no hay ganadores, o hay más de 3;
- algún ganador no está en la lista de participantes, o está repetido;
- la cantidad de ganadores no es menor que la cantidad de participantes.

## Errores

Todos los errores usan el mismo formato:

```json
{
  "error": {
    "codigo": "GANADOR_NO_PARTICIPA",
    "mensaje": "«Carlos» no está en la lista de participantes."
  }
}
```

| Situación            | Código HTTP                                         |
| -------------------- | --------------------------------------------------- |
| Petición inválida    | `400 Bad Request`                                   |
| Sorteo no encontrado | `404 Not Found`                                     |
| Error inesperado     | `500 Internal Server Error` (sin detalles internos) |

## Criterios de aceptación

- Los tres endpoints funcionan según las tablas y ejemplos anteriores.
- Las validaciones rechazan las peticiones inválidas con `400` y un mensaje claro.
- Los errores siguen el formato común.
- Los tres endpoints, sus parámetros, cuerpos, respuestas y errores están documentados en **Swagger** (`/api/docs`), con ejemplos.
- Existen pruebas automáticas para cada endpoint, incluyendo los casos de error, y el CI pasa.

## Buenas prácticas

- **Códigos HTTP correctos:** `201` al crear, `400` para datos inválidos, `404` si no existe. No respondas `200` con un error dentro.
- **Validar en el borde:** valida la petición antes de que llegue al servicio, idealmente a partir del esquema OpenAPI.
- **No filtrar detalles internos:** los errores `500` no muestran _stack traces_ ni consultas SQL.
- **Paginar las listas:** nunca devuelvas una tabla completa sin límite.
- **El documento OpenAPI es el contrato:** si cambia la API, cambia Swagger en el mismo commit.

¡El objetivo es una API predecible, validada y documentada!
