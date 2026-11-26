# Spec Delta

## ADDED Requirements

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
