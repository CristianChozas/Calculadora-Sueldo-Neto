# CSN-014 Implementar calculo reactivo en tiempo real

## Objetivo

Actualizar la estimacion salarial automaticamente a medida que cambian los datos del formulario, sin boton manual de calculo.

## Alcance

- Conectar el formulario actual con `calculateNetSalary`.
- Mostrar un bloque de resultado que se actualice al instante cuando los datos sean validos.
- Mantener un estado de espera mientras existan errores de validacion.
- Incorporar la edad al formulario porque el motor fiscal actual la necesita para el minimo personal.

## Fuera de alcance

- Rediseño final del panel de resultados de los tickets 015 y 016.
- Optimizaciones de rendimiento complejas.
- Persistencia del formulario.
