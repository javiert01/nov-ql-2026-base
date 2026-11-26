# Spec Delta

## Purpose

Define cuándo se puede realizar el sorteo, cómo se elige al azar a un único ganador entre los participantes y cuándo deja de ser válido un resultado.

## ADDED Requirements

### Requirement: Mínimo de participantes
El sistema SHALL exigir al menos 2 participantes para sortear. Con menos de 2, el botón «Sortear ganador» está deshabilitado y se muestra el mensaje «Agrega al menos 2 participantes para sortear.».

#### Scenario: Sin participantes
- **WHEN** la lista está vacía
- **THEN** el botón «Sortear ganador» está deshabilitado
- **AND** se muestra «Agrega al menos 2 participantes para sortear.»

#### Scenario: Un solo participante
- **GIVEN** la lista contiene solo «Ana»
- **THEN** el botón «Sortear ganador» está deshabilitado

#### Scenario: Dos participantes
- **GIVEN** la lista contiene «Ana» y «Pedro»
- **THEN** el botón «Sortear ganador» está habilitado
- **AND** no se muestra el mensaje de participantes insuficientes

### Requirement: Un único ganador de la lista
Al presionar «Sortear ganador», el sistema SHALL elegir exactamente un ganador, que siempre es uno de los participantes de la lista en ese momento.

#### Scenario: El ganador pertenece a la lista
- **GIVEN** la lista contiene «Ana», «Pedro», «María», «Luis» y «Sofía»
- **WHEN** el usuario presiona «Sortear ganador»
- **THEN** se muestra un único ganador
- **AND** el ganador es uno de esos cinco participantes

#### Scenario: Participante quitado no puede ganar
- **GIVEN** la lista contenía «Ana», «Pedro» y «María» y se quitó a «Ana»
- **WHEN** el usuario presiona «Sortear ganador»
- **THEN** el ganador es «Pedro» o «María»

### Requirement: Elección al azar con generador reemplazable
El sistema SHALL elegir al ganador con un generador de números aleatorios en [0, 1) recibido desde fuera, de modo que cada participante tiene la misma probabilidad de ganar y las pruebas pueden fijar el resultado.

#### Scenario: El número aleatorio determina la posición
- **GIVEN** la lista contiene «Ana», «Pedro», «María», «Luis» y «Sofía»
- **WHEN** el generador devuelve 0.5
- **THEN** el ganador es «María»

#### Scenario: Todos pueden ganar
- **GIVEN** una lista de N participantes
- **WHEN** el generador devuelve cada valor i/N para i de 0 a N−1
- **THEN** cada participante resulta ganador exactamente una vez

### Requirement: El resultado deja de mostrarse al cambiar la lista
El sistema SHALL dejar de mostrar al ganador cuando se agrega o se quita un participante después del sorteo.

#### Scenario: Agregar después del sorteo
- **GIVEN** se mostró un ganador
- **WHEN** el usuario agrega un participante
- **THEN** ya no se muestra ningún ganador

#### Scenario: Quitar después del sorteo
- **GIVEN** se mostró un ganador
- **WHEN** el usuario quita a un participante
- **THEN** ya no se muestra ningún ganador

### Requirement: Volver a sortear
El sistema SHALL permitir presionar «Sortear ganador» de nuevo sin cambiar la lista; el nuevo resultado reemplaza al anterior.

#### Scenario: Segundo sorteo
- **GIVEN** se mostró un ganador
- **WHEN** el usuario presiona «Sortear ganador» otra vez
- **THEN** se muestra un único ganador, elegido con un nuevo número aleatorio
