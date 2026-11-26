# Ticket #1 — Base de datos SQLite

> **Opcional:** este reto es para quienes terminen los retos #1 y #2 antes de tiempo, o para continuar después del dojo.

## Descripción

El backend necesita un lugar donde guardar los sorteos. Vamos a usar **SQLite**: una base de datos en un solo archivo, sin servidor, ideal para empezar.

En este ticket definimos el **modelo de datos** y la capa de acceso a datos (repositorio). Todavía no hay endpoints nuevos.

Primero crea el cambio con OpenSpec (`/openspec-propose`) describiendo el modelo de datos y las decisiones que tomen; revísalo y después impleméntalo.

## Modelo de datos

Cada **sorteo** guarda:

- un identificador único;
- la fecha y hora en que se realizó;
- la cantidad de ganadores solicitada;
- la lista de **participantes**, en el orden en que fueron ingresados;
- la lista de **ganadores**, con su posición (1.º, 2.º, 3.º).

Ejemplo de tablas posibles:

```
sorteos          (id, creado_en, cantidad_ganadores)
participantes    (id, sorteo_id, nombre, orden)
ganadores        (id, sorteo_id, nombre, posicion)
```

El equipo puede proponer otro diseño, siempre que lo documente en la propuesta de OpenSpec.

## Criterios de aceptación

- El esquema de la base de datos se crea con **migraciones** versionadas en el repositorio.
- Las migraciones se ejecutan con un solo comando (o automáticamente al iniciar el backend).
- Existe un **repositorio** de sorteos con, como mínimo, estas operaciones:
  - guardar un sorteo con sus participantes y ganadores;
  - listar sorteos, del más reciente al más antiguo;
  - obtener un sorteo por su identificador.
- Guardar un sorteo es **atómico**: o se guardan el sorteo, sus participantes y sus ganadores, o no se guarda nada.
- Las pruebas del repositorio usan una base de datos SQLite **en memoria** o temporal, nunca la base de datos real.
- El archivo de la base de datos no se sube al repositorio (está en `.gitignore`).

## Buenas prácticas

- **Interfaces e inyección de dependencias:** los servicios dependen de una interfaz `RepositorioDeSorteos`, no de SQLite. En las pruebas se puede inyectar otra implementación.
- **Consultas parametrizadas:** nunca construyas SQL concatenando texto ingresado por el usuario (evita _SQL injection_).
- **Transacciones:** las operaciones que escriben en varias tablas usan una transacción.
- **Restricciones en la base de datos:** claves foráneas, `NOT NULL` y `UNIQUE` donde corresponda; no confíes solo en el código.

## Consideraciones

- Puedes usar el driver de SQLite directamente o un ORM / _query builder_ (Drizzle, Prisma, Knex, SQLAlchemy, etc.).
- La ruta del archivo de la base de datos se configura con una variable de entorno.

¡El objetivo es tener datos persistentes con un diseño fácil de probar!
