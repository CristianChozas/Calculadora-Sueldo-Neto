# CSN-004 Implementar motor de calculo de tramos IRPF 2025

## Objetivo

Implementar la funcion pura base para calcular la cuota integra aplicando los tramos progresivos IRPF 2025 sobre una base liquidable anual.

## Alcance

- Crear `lib/irpf.ts`.
- Modelar los seis tramos de IRPF 2025.
- Exponer una funcion pura para calcular la cuota.
- Redondear el resultado a centimos.

## Fuera de alcance

- Minimo personal y familiar.
- IRPF autonomico.
- Orquestacion completa del salario neto.
