# CSN-003 Crear estructura de tipos TypeScript para los datos del formulario

## Objetivo

Definir contratos tipados compartidos para que el formulario, la logica fiscal y el panel de resultados trabajen sobre el mismo lenguaje ubicuo.

## Alcance

- Crear interfaces `FormData`, `IRPFResult`, `SSResult` y `CalculationResult`.
- Modelar tipos auxiliares para contrato, pagas, discapacidad, estado civil y comunidad autonoma.
- Dejar la base lista para los modulos fiscales de los siguientes tickets.

## Fuera de alcance

- Calculo de negocio.
- Validacion de formulario.
- Persistencia o API.
