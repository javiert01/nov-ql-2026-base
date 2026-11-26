# Spec Delta

## ADDED Requirements

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
