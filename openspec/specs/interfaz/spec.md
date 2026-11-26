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
Tras el sorteo, la interfaz SHALL resaltar en la lista las filas de los ganadores. Con 1 ganador, su fila muestra la etiqueta «Ganador». Con podio, cada fila ganadora muestra su medalla y su lugar («🥇 1.er lugar», «🥈 2.º lugar», «🥉 3.er lugar»). Las demás filas no llevan etiqueta.

#### Scenario: Solo la fila del ganador lleva la etiqueta
- **GIVEN** la lista contiene «Ana», «Pedro» y «María»
- **WHEN** el sorteo elige a «Pedro»
- **THEN** solo la fila de «Pedro» muestra la etiqueta «Ganador»

#### Scenario: Medallas en la lista
- **GIVEN** la lista contiene «Ana», «Pedro», «María» y «Luis» y se eligieron 2 ganadores
- **WHEN** el sorteo elige a «Luis» (1.º) y «Ana» (2.º)
- **THEN** la fila de «Luis» muestra «🥇 1.er lugar» y la de «Ana» «🥈 2.º lugar»
- **AND** las filas de «Pedro» y «María» no muestran etiqueta

### Requirement: Selector de cantidad de ganadores
La interfaz SHALL mostrar, en un grupo llamado «Cantidad de ganadores», tres botones «1», «2» y «3»; el seleccionado se distingue visualmente y se anuncia como presionado.

#### Scenario: Botón seleccionado
- **WHEN** el usuario presiona «2»
- **THEN** «2» se anuncia como presionado y «1» y «3» no

### Requirement: Podio
Con 2 o 3 ganadores, la interfaz SHALL mostrar «¡Tenemos un podio!» y a los ganadores en forma de podio en el color base: 🥇 1.er lugar en el centro y más alto, 🥈 2.º lugar a la izquierda y 🥉 3.er lugar a la derecha. Con 1 ganador se muestra «¡Tenemos un ganador!» como antes.

#### Scenario: Podio de tres
- **GIVEN** el sorteo eligió a «María» (1.º), «Ana» (2.º) y «Luis» (3.º)
- **THEN** se muestra «¡Tenemos un podio!»
- **AND** de izquierda a derecha aparecen «Ana» 🥈, «María» 🥇 y «Luis» 🥉

#### Scenario: Podio de dos
- **GIVEN** el sorteo eligió a «Pedro» (1.º) y «Sofía» (2.º)
- **THEN** se muestra «¡Tenemos un podio!» con «Sofía» 🥈 a la izquierda y «Pedro» 🥇 en el centro, sin 3.er lugar

### Requirement: Cuenta regresiva visible
La interfaz SHALL mostrar la cuenta regresiva en el lugar donde aparece el resultado, con números grandes en el color base, y anunciarla a lectores de pantalla.

#### Scenario: Número grande en el lugar del resultado
- **WHEN** la cuenta regresiva está en «2»
- **THEN** se muestra «2» en grande, en rojo, donde después aparecerá el resultado

### Requirement: Movimiento reducido
Si el sistema del usuario pide reducir el movimiento, la interfaz SHALL mostrar la cuenta regresiva y los resultados sin animaciones, manteniendo los mismos tiempos.

#### Scenario: Reducir movimiento activado
- **GIVEN** el usuario tiene activado «reducir movimiento»
- **WHEN** sortea
- **THEN** ve la cuenta 3, 2, 1 y el resultado sin animación de escala ni aparición
