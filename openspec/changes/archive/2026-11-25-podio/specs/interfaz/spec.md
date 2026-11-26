# Spec Delta

## ADDED Requirements

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

## MODIFIED Requirements

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
