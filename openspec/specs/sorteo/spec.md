# sorteo Specification

## Purpose

Define cuándo se puede realizar el sorteo, cómo se elige al azar a un único ganador entre los participantes y cuándo deja de ser válido un resultado.

## Requirements

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

### Requirement: Volver a sortear
El sistema SHALL permitir presionar «Sortear ganador» de nuevo sin cambiar la lista; el nuevo resultado reemplaza al anterior.

#### Scenario: Segundo sorteo
- **GIVEN** se mostró un ganador
- **WHEN** el usuario presiona «Sortear ganador» otra vez
- **THEN** se muestra un único ganador, elegido con un nuevo número aleatorio

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

### Requirement: Cuenta regresiva antes del resultado
Al presionar «Sortear ganador» con un sorteo válido, el sistema SHALL mostrar una cuenta regresiva 3, 2, 1, con un segundo entre cada número, y mostrar el resultado (un ganador o el podio) solo después del 1.

#### Scenario: Cuenta completa
- **GIVEN** la lista tiene «Ana», «Pedro», «María», «Luis» y «Sofía» y la cantidad de ganadores es 1
- **WHEN** el usuario presiona «Sortear ganador»
- **THEN** se muestra «3»; al segundo, «2»; al otro segundo, «1»
- **AND** al tercer segundo se muestra «¡Tenemos un ganador!» con el ganador

#### Scenario: El resultado no aparece antes de tiempo
- **WHEN** han pasado menos de 3 segundos desde que se presionó «Sortear ganador»
- **THEN** no se muestra ningún ganador

### Requirement: Datos bloqueados durante la cuenta regresiva
Mientras dura la cuenta regresiva, el sistema SHALL impedir sortear de nuevo, agregar o quitar participantes, cambiar la cantidad de ganadores y reiniciar; el resultado anterior, si existía, deja de mostrarse.

#### Scenario: Controles deshabilitados
- **WHEN** la cuenta regresiva está en curso
- **THEN** están deshabilitados «Sortear ganador», el campo de nombre, «Agregar», los botones «Quitar», los botones de cantidad y «Reiniciar»

#### Scenario: Se oculta el resultado anterior
- **GIVEN** se mostró un ganador
- **WHEN** el usuario sortea de nuevo
- **THEN** el ganador anterior deja de mostrarse durante la cuenta regresiva

#### Scenario: Al terminar se desbloquea
- **WHEN** termina la cuenta regresiva
- **THEN** los controles vuelven a estar habilitados

### Requirement: Sorteo inválido sin cuenta regresiva
Si el sorteo no se puede realizar, el sistema SHALL NOT mostrar la cuenta regresiva; el botón «Sortear ganador» sigue deshabilitado y se muestra el mensaje de participantes insuficientes.

#### Scenario: Participantes insuficientes
- **GIVEN** la lista contiene solo «Ana»
- **THEN** no es posible iniciar la cuenta regresiva
- **AND** se muestra el mensaje de participantes insuficientes
