# interfaz Specification

## Purpose

Define cómo se presenta la aplicación al usuario: el color base elegido por el desarrollador, el anuncio del ganador y la lista de participantes.

## Requirements

### Requirement: Color base rojo
La interfaz SHALL usar el rojo como color base, definido por el desarrollador y no elegible por el usuario final. Como mínimo, el botón «Sortear ganador», el anuncio del ganador y la fila del ganador usan tonos rojos.

#### Scenario: Botón principal en rojo
- **WHEN** el usuario abre la aplicación con al menos 2 participantes
- **THEN** el fondo del botón «Sortear ganador» es rojo

#### Scenario: El usuario no elige el color
- **WHEN** el usuario abre la aplicación
- **THEN** no existe ningún control para cambiar el color de la interfaz

### Requirement: Anuncio del ganador
Tras el sorteo, la interfaz SHALL mostrar de forma destacada el texto «¡Tenemos un ganador!» seguido del nombre del ganador, y anunciarlo a lectores de pantalla.

#### Scenario: Ganador anunciado
- **GIVEN** el sorteo eligió a «María»
- **THEN** se muestra «¡Tenemos un ganador!» y «María» en un área anunciada a lectores de pantalla

#### Scenario: Antes del sorteo no hay anuncio
- **WHEN** todavía no se ha sorteado
- **THEN** no se muestra «¡Tenemos un ganador!»

### Requirement: Lista numerada de participantes
La interfaz SHALL mostrar a los participantes como una lista numerada desde 1 en orden de llegada, junto con un contador del total. Con la lista vacía se muestra «Todavía no hay participantes.».

#### Scenario: Lista vacía
- **WHEN** no hay participantes
- **THEN** se muestra «Todavía no hay participantes.»
- **AND** el contador muestra 0

#### Scenario: Lista con participantes
- **GIVEN** se agregaron «Ana» y «Pedro»
- **THEN** «Ana» aparece en la posición 1 y «Pedro» en la posición 2
- **AND** el contador muestra 2

### Requirement: Ganador resaltado en la lista
Tras el sorteo, la interfaz SHALL resaltar la fila del ganador en la lista y mostrar en ella la etiqueta «Ganador». Ninguna otra fila lleva la etiqueta.

#### Scenario: Solo la fila del ganador lleva la etiqueta
- **GIVEN** la lista contiene «Ana», «Pedro» y «María»
- **WHEN** el sorteo elige a «Pedro»
- **THEN** solo la fila de «Pedro» muestra la etiqueta «Ganador»
