# CSN-006 Implementar calculo de cotizaciones SS del trabajador

## Objetivo

Crear una funcion pura para calcular las cotizaciones de Seguridad Social del trabajador a partir del salario anual, el tipo de contrato y el numero de pagas.

## Alcance

- Crear `lib/seguridadSocial.ts`.
- Aplicar contingencias comunes, desempleo, formacion profesional y MEI.
- Distinguir contrato indefinido y temporal.
- Aplicar tope maximo de base mensual de 4.909,50 EUR.

## Fuera de alcance

- Cotizaciones empresariales.
- Particularidades de convenios o bases especiales.
- Integracion aun con el orquestador final.
