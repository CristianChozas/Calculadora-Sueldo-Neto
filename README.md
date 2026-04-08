# Calculadora Sueldo Neto 2025

Aplicacion web en Next.js para estimar sueldo neto anual y mensual en Espana, con calculo de IRPF, Seguridad Social y desglose visual del resultado.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Vitest

## Funcionalidades

- Calcula sueldo neto anual y mensual en tiempo real
- Aplica cotizaciones de Seguridad Social del trabajador
- Estima IRPF 2025 con una base fiscal mantenible y testeada
- Permite configurar contrato, pagas, comunidad autonoma, estado civil, hijos y discapacidad
- Muestra el desglose del salario con tarjetas y grafico
- Incluye validaciones y una UI responsive

## Requisitos

- Node.js 20 o superior
- npm

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Scripts

- `npm run dev`: arranca el servidor de desarrollo
- `npm run build`: genera la build de produccion
- `npm run start`: ejecuta la app compilada
- `npm run lint`: revisa el codigo con ESLint
- `npm run test`: ejecuta los tests con Vitest

## Estructura

- `app/`: layout, pagina principal y metadatos
- `components/`: UI reutilizable
- `lib/`: logica fiscal y tipos compartidos
- `tests/`: tests unitarios
- `documents/`: roadmap tecnico del proyecto

## Aviso

El resultado es orientativo y no sustituye el criterio de un asesor fiscal.
