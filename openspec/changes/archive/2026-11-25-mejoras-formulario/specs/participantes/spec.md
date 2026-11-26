# Spec Delta

## ADDED Requirements

### Requirement: Foco en el campo tras agregar
Después de agregar participantes, con el botón «Agregar» o con Enter, el sistema SHALL dejar el foco en el campo «Nombre del participante» para escribir el siguiente nombre sin usar el ratón.

#### Scenario: Agregar con el botón devuelve el foco
- **WHEN** el usuario escribe «Ana» y hace clic en «Agregar»
- **THEN** el campo «Nombre del participante» tiene el foco

### Requirement: Longitud máxima del nombre
El sistema SHALL rechazar la entrada completa si algún nombre, ya sin espacios alrededor, tiene más de 40 caracteres: no agrega ningún nombre, conserva el texto y muestra «Cada nombre puede tener hasta 40 caracteres». El mensaje desaparece cuando el usuario edita el campo.

#### Scenario: Nombre de 40 caracteres
- **WHEN** el usuario agrega un nombre de exactamente 40 caracteres
- **THEN** el nombre aparece en la lista

#### Scenario: Un nombre demasiado largo rechaza toda la entrada
- **WHEN** el usuario escribe «Ana, <nombre de 41 caracteres>, Pedro» y presiona «Agregar»
- **THEN** la lista no cambia
- **AND** el campo conserva el texto escrito
- **AND** se muestra «Cada nombre puede tener hasta 40 caracteres»

#### Scenario: Editar el campo quita el mensaje
- **GIVEN** se muestra «Cada nombre puede tener hasta 40 caracteres»
- **WHEN** el usuario escribe en el campo
- **THEN** el mensaje deja de mostrarse
