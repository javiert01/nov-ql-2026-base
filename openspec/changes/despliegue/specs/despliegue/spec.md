# Spec Delta

## Purpose

Define cuándo y bajo qué condiciones la aplicación se publica en GitHub Pages, y qué ocurre cuando una verificación o el despliegue fallan.

## ADDED Requirements

### Requirement: Publicación automática desde main
Cada `push` a la rama `main` SHALL construir la aplicación y publicarla en GitHub Pages, en https://javiert01.github.io/nov-ql-2026-base/, sin pasos manuales.

#### Scenario: Push a main con verificaciones en verde
- **WHEN** se hace `push` a `main` y pasan el formato, el lint, los tipos, las pruebas y la prueba end-to-end
- **THEN** la nueva versión queda publicada en GitHub Pages

### Requirement: Solo se publican versiones verificadas
El despliegue SHALL ejecutarse solo si todas las verificaciones de CI pasan. Si alguna falla, no se publica nada y queda la versión anterior.

#### Scenario: Falla una prueba
- **WHEN** se hace `push` a `main` y falla una prueba
- **THEN** el workflow falla y la versión publicada no cambia

### Requirement: Los pull requests no despliegan
Los pull requests y los `push` a otras ramas SHALL ejecutar solo las verificaciones, nunca el despliegue.

#### Scenario: Pull request hacia main
- **WHEN** se abre un pull request hacia `main`
- **THEN** se ejecutan las verificaciones y no se publica nada

### Requirement: Misma aplicación que en local
La aplicación publicada SHALL funcionar igual que en local: participantes, color base, podio y cuenta regresiva.

#### Scenario: Sorteo en la versión publicada
- **WHEN** el usuario abre la URL publicada, agrega participantes y sortea
- **THEN** ve la cuenta regresiva y el resultado como en local
