# Spec Delta

## Purpose

Define cómo el usuario arma la lista de participantes del sorteo: agregar nombres, evitar entradas inválidas o repetidas, quitar participantes y reiniciar la lista.

## ADDED Requirements

### Requirement: Agregar participantes
El sistema SHALL permitir escribir un nombre en el campo «Nombre del participante» y agregarlo a la lista con el botón «Agregar» o con la tecla Enter. Los participantes se muestran en el orden en que se agregaron. Tras agregar, el campo queda vacío.

#### Scenario: Agregar con el botón
- **WHEN** el usuario escribe «Ana» y presiona «Agregar»
- **THEN** «Ana» aparece en la lista de participantes
- **AND** el campo de texto queda vacío

#### Scenario: Agregar con Enter
- **WHEN** el usuario escribe «Ana» y presiona Enter
- **THEN** «Ana» aparece en la lista de participantes

#### Scenario: Orden de llegada
- **GIVEN** la lista contiene «Ana»
- **WHEN** el usuario agrega «Pedro»
- **THEN** la lista muestra «Ana» y después «Pedro»

### Requirement: Varios nombres a la vez
El sistema SHALL aceptar varios nombres en una sola entrada, separados por comas o saltos de línea, y agregarlos en el orden escrito.

#### Scenario: Nombres separados por comas
- **WHEN** el usuario escribe «Ana, Pedro, María» y presiona «Agregar»
- **THEN** la lista muestra «Ana», «Pedro» y «María» en ese orden

### Requirement: Limpieza de nombres
El sistema SHALL quitar los espacios al inicio y al final de cada nombre e ignorar los nombres vacíos. Si la entrada no contiene ningún nombre válido, no se agrega nada y el texto escrito se mantiene en el campo.

#### Scenario: Espacios alrededor
- **WHEN** el usuario agrega « Ana , Pedro »
- **THEN** la lista muestra «Ana» y «Pedro» sin espacios extra

#### Scenario: Entrada sin nombres
- **WHEN** el usuario escribe « , , » y presiona «Agregar»
- **THEN** la lista no cambia
- **AND** el campo conserva el texto escrito

### Requirement: Sin participantes repetidos
El sistema SHALL ignorar un nombre que ya está en la lista, sin distinguir mayúsculas de minúsculas, y conservar la forma en que se escribió la primera vez.

#### Scenario: Repetido con otra capitalización
- **GIVEN** la lista contiene «Ana»
- **WHEN** el usuario agrega «ana»
- **THEN** la lista sigue teniendo un solo participante «Ana»

#### Scenario: Repetido dentro de la misma entrada
- **WHEN** el usuario agrega «Luis, LUIS»
- **THEN** la lista contiene un solo «Luis»

### Requirement: Quitar un participante
El sistema SHALL permitir quitar a cualquier participante de la lista con un botón «Quitar» propio de su fila; el resto de la lista mantiene su orden.

#### Scenario: Quitar a un participante
- **GIVEN** la lista contiene «Ana», «Pedro» y «María»
- **WHEN** el usuario presiona «Quitar» en la fila de «Pedro»
- **THEN** la lista muestra «Ana» y «María»

### Requirement: Reiniciar
El sistema SHALL ofrecer un botón «Reiniciar» solo cuando hay al menos un participante. Al presionarlo se vacían la lista, el resultado del sorteo y el texto escrito en el campo.

#### Scenario: Sin participantes no hay botón Reiniciar
- **WHEN** la lista está vacía
- **THEN** no se muestra el botón «Reiniciar»

#### Scenario: Reiniciar borra todo
- **GIVEN** hay participantes, un ganador mostrado y texto escrito en el campo
- **WHEN** el usuario presiona «Reiniciar»
- **THEN** la lista queda vacía
- **AND** no se muestra ningún ganador
- **AND** el campo de texto queda vacío
