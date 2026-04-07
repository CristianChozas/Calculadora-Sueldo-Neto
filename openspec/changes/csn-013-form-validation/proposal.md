# CSN-013 Implementar validacion y mensajes de error del formulario

## Objetivo

Validar correctamente los datos ya recogidos por el formulario base y mostrar mensajes de error inline antes de activar el calculo reactivo completo.

## Alcance

- Mantener estado controlado en la UI actual.
- Validar campos requeridos y formato numerico en los inputs actuales.
- Validar el rango del salario bruto anual.
- Mostrar mensajes de error inline bajo cada campo numerico relevante.

## Fuera de alcance

- Introducir `react-hook-form`.
- Validacion de submit con backend.
- Nuevas reglas fiscales fuera de los datos ya existentes.
