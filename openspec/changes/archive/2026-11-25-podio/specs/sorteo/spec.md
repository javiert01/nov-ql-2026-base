# Spec Delta

## ADDED Requirements

### Requirement: Cantidad de ganadores
El sistema SHALL permitir elegir cuántos ganadores tendrá el sorteo: 1, 2 o 3. El valor por defecto es 1.

#### Scenario: Valor por defecto
- **WHEN** el usuario abre la aplicación
- **THEN** la cantidad de ganadores seleccionada es 1

#### Scenario: Elegir tres ganadores
- **WHEN** el usuario elige 3 ganadores
- **THEN** la cantidad de ganadores seleccionada es 3

### Requirement: Ganadores distintos
El sistema SHALL elegir exactamente la cantidad de ganadores seleccionada, todos distintos y todos de la lista: nadie gana dos lugares en el mismo sorteo.

#### Scenario: Podio de tres
- **GIVEN** la lista tiene «Ana», «Pedro», «María», «Luis» y «Sofía» y se eligieron 3 ganadores
- **WHEN** el usuario sortea
- **THEN** se muestran 3 ganadores distintos, todos de la lista

### Requirement: Misma probabilidad en cada lugar
El sistema SHALL dar a cada participante la misma probabilidad de quedar en cualquier lugar del resultado.

#### Scenario: Frecuencias parejas
- **GIVEN** 5 participantes y 3 ganadores
- **WHEN** se realizan muchos sorteos con un generador uniforme
- **THEN** cada participante ocupa cada lugar en aproximadamente un 20 % de los sorteos

## MODIFIED Requirements

### Requirement: Mínimo de participantes
El sistema SHALL exigir al menos N + 1 participantes para sortear N ganadores. Con menos, el botón «Sortear ganador» está deshabilitado y se muestra «Se necesitan al menos {N + 1} participantes para sortear {N} ganador.» (con N = 1) o «… {N} ganadores.» (con N = 2 o 3).

#### Scenario: Sin participantes
- **WHEN** la lista está vacía y la cantidad de ganadores es 1
- **THEN** el botón «Sortear ganador» está deshabilitado
- **AND** se muestra «Se necesitan al menos 2 participantes para sortear 1 ganador.»

#### Scenario: Un solo participante
- **GIVEN** la lista contiene solo «Ana»
- **THEN** el botón «Sortear ganador» está deshabilitado

#### Scenario: Dos participantes
- **GIVEN** la lista contiene «Ana» y «Pedro» y la cantidad de ganadores es 1
- **THEN** el botón «Sortear ganador» está habilitado
- **AND** no se muestra el mensaje de participantes insuficientes

#### Scenario: Tres ganadores con tres participantes
- **GIVEN** la lista contiene «Ana», «Pedro» y «María»
- **WHEN** el usuario elige 3 ganadores
- **THEN** el botón «Sortear ganador» está deshabilitado
- **AND** se muestra «Se necesitan al menos 4 participantes para sortear 3 ganadores.»

### Requirement: El resultado deja de mostrarse al cambiar la lista
El sistema SHALL dejar de mostrar el resultado cuando se agrega o se quita un participante, o cuando cambia la cantidad de ganadores, después del sorteo.

#### Scenario: Agregar después del sorteo
- **GIVEN** se mostró un ganador
- **WHEN** el usuario agrega un participante
- **THEN** ya no se muestra ningún ganador

#### Scenario: Quitar después del sorteo
- **GIVEN** se mostró un ganador
- **WHEN** el usuario quita a un participante
- **THEN** ya no se muestra ningún ganador

#### Scenario: Cambiar la cantidad después del sorteo
- **GIVEN** se mostró un resultado
- **WHEN** el usuario cambia la cantidad de ganadores
- **THEN** ya no se muestra ningún resultado
