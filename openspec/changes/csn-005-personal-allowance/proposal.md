# CSN-005 Implementar calculo del minimo personal y familiar

## Objetivo

Reducir la base imponible mediante una funcion pura que modele el minimo personal y familiar a partir de edad, descendientes y discapacidad.

## Alcance

- Mantener el calculo en `lib/irpf.ts`.
- Aplicar minimo personal base y escalado por edad.
- Aplicar minimo por descendientes usando el numero informado en el formulario.
- Aplicar minimo adicional por discapacidad.

## Fuera de alcance

- Ascendientes a cargo.
- Hijos menores de tres anos.
- Tributacion conjunta u otros ajustes autonomicos.
