# Historias de Usuario - Sistema de Gestión Financiera BOB Subastas

## 1. Registro de transacciones entrantes

### 📝 Historia de Usuario: Registro de nueva transferencia de cliente
Como operador financiero  
Quiero registrar las transferencias recibidas de los clientes  
Para mantener un control exacto de los ingresos y poder darles seguimiento posterior

#### Criterios de Aceptación:
1. Dado que soy un operador financiero autenticado  
   Cuando accedo a la sección "Nueva Transferencia"  
   Entonces el sistema me muestra un formulario con los campos: cliente, monto, fecha de recepción, método de pago, comprobante, propósito y notas adicionales

2. Dado que estoy registrando una transferencia  
   Cuando selecciono "Subasta específica" como propósito  
   Entonces aparece un campo adicional para indicar el ID de la subasta

3. Dado que he completado todos los campos obligatorios  
   Cuando hago clic en "Guardar"  
   Entonces la transferencia se registra, se etiqueta como "Fondos Disponibles" y aparece en el listado de transferencias

4. Dado que se ha registrado una transferencia  
   Cuando reviso el dashboard  
   Entonces el monto se refleja en el total de ingresos del período actual

#### Notas Técnicas:
- Componentes necesarios: Formulario de registro, validación de campos, selector de clientes, cargador de archivos
- Modelos de datos: Transferencia (id, cliente_id, monto, fecha, método_pago, ruta_comprobante, propósito, subasta_id, estado, notas, creado_por, fecha_creación)
- Interacciones: Integración con el listado de clientes existentes, validación de montos positivos, verificación de formatos de comprobantes
---

### 📝 Historia de Usuario: Importar transacciones desde hojas de cálculo

Como operador financiero
Quiero poder importar transacciones desde hojas de cálculo (Excel, CSV)
Para registrarlas en el sistema de forma rápida y eficiente

#### Criterios de Aceptación:

1. Dado que estoy en la sección de "Nueva Transferencia"
   Cuando selecciono la opción "Importar desde archivo"
   Entonces se me muestra un cuadro de diálogo para elegir el archivo de hoja de cálculo.
2. Dado que he seleccionado un archivo de hoja de cálculo válido
   Cuando hago clic en "Importar"
   Entonces el sistema analiza el archivo, identifica las columnas relevantes (cliente, monto, fecha, etc.) y muestra una vista previa de los datos para su confirmación.
3. Dado que he confirmado la vista previa de los datos
   Cuando hago clic en "Registrar"
   Entonces el sistema crea las transacciones en la base de datos, asociándolas a los clientes y subastas correspondientes, y actualiza el estado de los fondos.
4. Dado que se ha importado un archivo con errores de formato o datos inválidos
   Entonces el sistema muestra un mensaje de error con detalles específicos sobre los problemas encontrados, permitiendo al usuario corregir el archivo y volver a intentarlo.

#### Notas Técnicas:

- Componentes necesarios: Módulo de importación de archivos, parser de hojas de cálculo (Excel, CSV), sistema de validación de datos, mapeo de columnas, vista previa de datos, registro de errores.
- Modelos de datos: Transferencia (id, cliente_id, monto, fecha, método_pago, ruta_comprobante, propósito, subasta_id, estado, notas, creado_por, fecha_creación).
- Interacciones: Integración con el sistema de archivos, validación de formatos de archivo, mapeo automático de columnas, alertas de errores, registro de eventos de importación. 


## 2. Seguimiento de estado de fondos

### 📝 Historia de Usuario: Visualización del estado actual de los fondos
Como operador financiero  
Quiero visualizar el estado actual de los fondos de cada transferencia  
Para conocer rápidamente su disponibilidad y tomar decisiones operativas

#### Criterios de Aceptación:
1. Dado que estoy en el listado de transferencias  
   Cuando reviso las entradas  
   Entonces puedo ver claramente el estado de cada transferencia (Disponible, Asignado, Gastado, Retornado) con indicadores visuales diferenciados

2. Dado que estoy en el dashboard  
   Cuando reviso la sección de resumen  
   Entonces puedo ver totales segregados por estado de fondos

3. Dado que selecciono filtrar por estado  
   Cuando aplico el filtro "Fondos Disponibles"  
   Entonces solo se muestran las transferencias que tienen fondos aún no asignados o utilizados

#### Notas Técnicas:
- Componentes necesarios: Etiquetas de estado con colores, filtros rápidos, contadores de totales
- Modelos de datos: Estado (enum: disponible, asignado, gastado, retornado, mixto), relación con Transferencia
- Interacciones: Actualización en tiempo real de contadores, cálculos de totales por estado


## 3. Cálculo y registro de comisiones

### 📝 Historia de Usuario: Cálculo automático de comisiones
Como administrador  
Quiero que el sistema calcule automáticamente las comisiones según reglas predefinidas  
Para garantizar precisión en los cálculos y reducir errores manuales

#### Criterios de Aceptación:
1. Dado que se registra un gasto desde una transferencia  
   Cuando indico el monto pagado al vendedor  
   Entonces el sistema calcula automáticamente la comisión como la diferencia entre el monto original y el monto pagado

2. Dado que existen diferentes porcentajes de comisión según tipo de subasta  
   Cuando registro una transferencia para un tipo específico  
   Entonces el sistema aplica el porcentaje correspondiente según las reglas configuradas

3. Dado que necesito ajustar una comisión manualmente  
   Cuando accedo a la opción "Ajustar comisión" en el detalle de la transferencia  
   Entonces puedo modificar el valor calculado y registrar una justificación

#### Notas Técnicas:
- Componentes necesarios: Calculadora de comisiones, reglas configurables, formulario de ajuste manual
- Modelos de datos: ReglasComision (tipo_subasta, porcentaje, fecha_vigencia), ComisionTransferencia (transferencia_id, monto_calculado, monto_ajustado, justificacion_ajuste)
- Interacciones: Fórmulas de cálculo basadas en tipos y montos, historial de ajustes manuales

---

### 📝 Historia de Usuario: Visualización de comisiones por período
Como administrador  
Quiero visualizar un reporte de comisiones generadas por período  
Para analizar el rendimiento financiero y tomar decisiones estratégicas

#### Criterios de Aceptación:
1. Dado que estoy en la sección de reportes  
   Cuando selecciono "Reporte de Comisiones" y establezco un período  
   Entonces veo un gráfico y tabla con todas las comisiones generadas en ese período

2. Dado que estoy viendo el reporte de comisiones  
   Cuando aplico filtros adicionales (por cliente, tipo de subasta, etc.)  
   Entonces los datos se actualizan para mostrar solo las comisiones que cumplen esos criterios

3. Dado que quiero analizar tendencias  
   Cuando selecciono "Comparar con período anterior"  
   Entonces veo una visualización comparativa entre el período actual y el previo

#### Notas Técnicas:
- Componentes necesarios: Filtros de período, gráficos interactivos, tabla de detalles, exportador
- Modelos de datos: Vistas agregadas de comisiones por diferentes dimensiones y períodos
- Interacciones: Filtrado dinámico, recálculo de totales, opciones de agrupación


## 5. Reportes y visualización

### 📝 Historia de Usuario: Dashboard principal con KPIs financieros
Como administrador  
Quiero visualizar un dashboard con indicadores clave de rendimiento financiero  
Para monitorear la salud financiera del negocio y tomar decisiones rápidas

#### Criterios de Aceptación:
1. Dado que accedo al sistema como administrador  
   Cuando ingreso a la pantalla principal  
   Entonces veo tarjetas de resumen con totales de transferencias, comisiones, fondos pendientes y devoluciones

2. Dado que estoy en el dashboard  
   Cuando selecciono un rango de fechas diferente  
   Entonces todos los KPIs se actualizan para reflejar los datos de ese período

3. Dado que quiero analizar tendencias  
   Cuando reviso el gráfico principal  
   Entonces veo una comparativa de ingresos vs comisiones de los últimos 6 meses

#### Notas Técnicas:
- Componentes necesarios: Tarjetas de KPIs, gráficos interactivos, selector de período, sistema de cálculo de métricas
- Modelos de datos: Vistas agregadas para métricas clave, datos históricos para tendencias
- Interacciones: Recálculo en tiempo real, drill-down en gráficos, actualizaciones periódicas automáticas

---

### 📝 Historia de Usuario: Generación de reportes por subasta
Como gerente de operaciones  
Quiero generar reportes financieros detallados por subasta  
Para evaluar la rentabilidad de cada evento y optimizar futuras subastas

#### Criterios de Aceptación:
1. Dado que estoy en la sección de reportes  
   Cuando selecciono "Reporte por Subasta" y elijo una subasta específica  
   Entonces veo un informe completo con todas las transacciones, comisiones y métricas de esa subasta

2. Dado que estoy viendo el reporte de una subasta  
   Cuando analizo la sección "Desglose de Comisiones"  
   Entonces puedo ver el detalle de cómo se calculó cada comisión y el margen efectivo

3. Dado que quiero comparar rendimiento  
   Cuando selecciono "Comparar con subastas similares"  
   Entonces visualizo métricas comparativas entre la subasta actual y otras de la misma categoría

#### Notas Técnicas:
- Componentes necesarios: Generador de reportes por subasta, calculadora de métricas, sistema de comparativas
- Modelos de datos: Relaciones Subasta-Transferencias-Comisiones, métricas predefinidas por tipo de subasta
- Interacciones: Filtrado por características de subasta, múltiples visualizaciones, exportación personalizada


