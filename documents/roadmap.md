## Calculadora Sueldo Neto 2025

### Resumen técnico

**Datos fiscales confirmados (fuentes oficiales 2025):**

- Tramos IRPF 2025:
  - Hasta 12.450 EUR -> 19%
  - Hasta 20.199 EUR -> 24%
  - Hasta 35.199 EUR -> 30%
  - Hasta 59.999 EUR -> 37%
  - Hasta 299.999 EUR -> 45%
  - Mas de 300.000 EUR -> 47%
- Cotizaciones a cargo del trabajador en 2025:
  - Contingencias comunes: 4,70%
  - Desempleo indefinido: 1,55%
  - Desempleo temporal: 1,60%
  - Formacion profesional: 0,10%
  - MEI: 0,13%
- Base maxima de cotizacion mensual: 4.909,50 EUR

### Directrices de ejecucion

- Ejecutar primero los epics 1 y 2 por completo.
- La logica fiscal debe quedar correcta y testeada antes de desarrollar la UI final.
- `CSN-005` es especialmente sensible y requiere tests exhaustivos.
- Antes del deploy se debe detener el flujo para revisarlo junto al usuario.
- El trabajo se ejecuta con metodologia SDD y commit por ticket completado.

### Arquitectura objetivo

- Estilo: monolito modular.
- Patron: Clean Architecture con puertos y adaptadores.
- Stack base esperado: Next.js + TypeScript + Tailwind CSS + ESLint.
- Prioridad tecnica: aislar la logica fiscal en modulos puros y testeables dentro de `lib/` y tipos compartidos tipados.

## Backlog

### EPIC-1 Setup e infraestructura

#### CSN-001 Inicializar proyecto Next.js con TypeScript
- Tipo: chore
- Puntos: 2
- Objetivo: crear la base del proyecto con `create-next-app` usando TypeScript, Tailwind CSS y ESLint.
- Alcance:
  - Estructura inicial con `app/`, `lib/` y `components/`
  - Configuracion inicial lista para continuar el desarrollo

#### CSN-002 Configurar fuentes, paleta de colores y tokens de diseno
- Tipo: chore
- Puntos: 2
- Objetivo: definir identidad visual base del proyecto.
- Alcance:
  - `tailwind.config.ts`
  - Colores corporativos
  - Tipografia `Inter` o `Geist`
  - Espaciados y tokens base
  - Estetica elegante y profesional

#### CSN-003 Crear estructura de tipos TypeScript para los datos del formulario
- Tipo: task
- Puntos: 3
- Objetivo: definir la base tipada que reutilizaran todos los modulos.
- Alcance:
  - Interfaces `FormData`, `IRPFResult`, `SSResult`, `CalculationResult`

### EPIC-2 Logica de negocio fiscal

#### CSN-004 Implementar motor de calculo de tramos IRPF 2025
- Tipo: story
- Puntos: 5
- Objetivo: implementar una funcion pura en `lib/irpf.ts` que reciba la base liquidable y devuelva la cuota integra estatal.
- Alcance:
  - Aplicar los 6 tramos progresivos del 19% al 47%
  - Diseno testeable de forma aislada

#### CSN-005 Implementar calculo del minimo personal y familiar
- Tipo: story
- Puntos: 3
- Objetivo: reducir la base imponible por minimo personal, descendientes y discapacidad.
- Alcance:
  - Base personal: 5.550 EUR
  - Ajustes por edad, descendientes y discapacidad
  - Datos provenientes del formulario

#### CSN-006 Implementar calculo de cotizaciones SS del trabajador
- Tipo: story
- Puntos: 3
- Objetivo: implementar `lib/seguridadSocial.ts` con las cotizaciones del trabajador.
- Alcance:
  - Contingencias comunes 4,70%
  - Desempleo 1,55% o 1,60%
  - Formacion profesional 0,10%
  - MEI 0,13%
  - Aplicar tope maximo de base mensual 4.909,50 EUR
  - Distinguir contrato indefinido vs temporal

#### CSN-007 Implementar orquestador principal de calculo
- Tipo: story
- Puntos: 3
- Objetivo: crear `lib/calculadora.ts` que reciba `FormData`, llame a IRPF y Seguridad Social y devuelva el resultado consolidado.
- Alcance:
  - Resultado con bruto, neto, `%IRPF`, `%SS` y desglose

#### CSN-008 Escribir tests unitarios de la logica fiscal
- Tipo: task
- Puntos: 2
- Objetivo: asegurar la precision del motor fiscal con `Jest` o `Vitest`.
- Alcance:
  - Casos conocidos, por ejemplo salario 30.000 EUR
  - Edge cases: salario minimo, base maxima SS, minimo no sujeto
  - Tolerancia aproximada de +-1 EUR

### EPIC-3 Formulario de entrada

#### CSN-009 Crear campo de salario bruto anual
- Tipo: story
- Puntos: 2
- Objetivo: implementar input numerico con formato moneda.
- Alcance:
  - Formato EUR
  - Validacion min 0, max 999.999
  - Label descriptivo
  - Componente reutilizable `CurrencyInput.tsx`

#### CSN-010 Crear selector de tipo de contrato y numero de pagas
- Tipo: story
- Puntos: 2
- Objetivo: permitir configurar tipo de contrato y pagas anuales.
- Alcance:
  - Radio o select para `indefinido` y `temporal`
  - Toggle o selector para 12 o 14 pagas
  - Impacto en desempleo SS y calculo mensual

#### CSN-011 Crear selector de comunidad autonoma
- Tipo: story
- Puntos: 2
- Objetivo: recoger la comunidad autonoma del contribuyente.
- Alcance:
  - Dropdown con 17 CC.AA. + Ceuta y Melilla
  - Aviso inicial indicando que el IRPF autonomico puede variar y que se usa referencia estatal como estimacion

#### CSN-012 Crear campos de situacion personal y familiar
- Tipo: story
- Puntos: 3
- Objetivo: recoger datos que afectan al minimo personal y familiar.
- Alcance:
  - Estado civil: soltero o casado
  - Numero de hijos o descendientes a cargo
  - Discapacidad: No / 33%+ / 65%+

#### CSN-013 Implementar validacion y mensajes de error del formulario
- Tipo: task
- Puntos: 3
- Objetivo: validar correctamente la entrada del usuario.
- Alcance:
  - `react-hook-form` o estado controlado
  - Campo requerido, rango de valores y formato numerico
  - Mostrar errores en linea bajo cada campo

#### CSN-014 Implementar calculo reactivo en tiempo real
- Tipo: story
- Puntos: 3
- Objetivo: recalcular automaticamente al cambiar cualquier campo.
- Alcance:
  - Sin boton manual de calcular
  - Resultado actualizado al instante
  - Uso de `useMemo` o `useEffect` segun convenga al diseno final del componente

### EPIC-4 Panel de resultados

#### CSN-015 Crear tarjeta de sueldo neto destacada
- Tipo: story
- Puntos: 2
- Objetivo: mostrar el sueldo neto anual y mensual como dato principal de la pantalla.
- Alcance:
  - Componente `ResultCard.tsx`
  - Tipografia grande, prominente y clara

#### CSN-016 Crear desglose de deducciones con porcentajes
- Tipo: story
- Puntos: 3
- Objetivo: mostrar el detalle de bruto, IRPF, SS y neto.
- Alcance:
  - Bruto
  - IRPF en EUR y %
  - Contingencias comunes en EUR y %
  - Desempleo en EUR y %
  - Formacion profesional en EUR y %
  - MEI en EUR y %
  - Neto

#### CSN-017 Crear grafico de distribucion del salario
- Tipo: story
- Puntos: 3
- Objetivo: visualizar la proporcion entre neto, IRPF y SS.
- Alcance:
  - Grafico de barras horizontal o donut chart
  - Implementacion con `recharts` o SVG nativo

#### CSN-018 Anadir link a Hacienda y disclaimer legal
- Tipo: task
- Puntos: 1
- Objetivo: reforzar transparencia y advertencia legal.
- Alcance:
  - Enlace `Como se calcula el IRPF?` a `https://sede.agenciatributaria.gob.es`
  - Texto: `Calculo orientativo. Consulta a un asesor fiscal para casos especificos.`

### EPIC-5 UX, diseno y accesibilidad

#### CSN-019 Crear layout principal, header y footer
- Tipo: story
- Puntos: 3
- Objetivo: definir la estructura principal de la app.
- Alcance:
  - Dos columnas en desktop: formulario izquierda y resultados derecha
  - Stack vertical en movil
  - Header con titulo de la app
  - Footer con `Cristian Chozas Diaz - 2025`

#### CSN-020 Revision de accesibilidad, responsive y dark mode
- Tipo: task
- Puntos: 2
- Objetivo: asegurar usabilidad, accesibilidad y adaptacion visual.
- Alcance:
  - Labels ARIA en inputs
  - Contraste WCAG AA
  - Breakpoints movil 375px y tablet 768px
  - Soporte dark mode con `dark:` de Tailwind

### EPIC-6 Deploy en produccion (gratis)

#### CSN-021 Conectar repositorio GitHub a Vercel y configurar proyecto
- Tipo: chore
- Puntos: 1
- Objetivo: dejar preparado el despliegue continuo en Vercel Hobby.
- Alcance:
  - Crear repo en GitHub
  - Importar en Vercel
  - Activar auto-deploy en `main`
  - HTTPS, CDN y dominio `vercel.app`

#### CSN-022 Configurar metadatos SEO, favicon y Open Graph
- Tipo: task
- Puntos: 2
- Objetivo: completar el cierre de calidad para lanzamiento publico.
- Alcance:
  - `next/metadata` con title, description y og:image
  - Favicon personalizado
  - Objetivo Lighthouse > 90 en Performance, A11y y SEO antes de publicar
