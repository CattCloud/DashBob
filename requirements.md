# Requerimientos para Sistema de Gestión Financiera - BOB Subastas

## 1. Análisis del Problema

### Descripción del Negocio
BOB es una empresa especializada en subastas industriales que opera como intermediario en la compraventa de vehículos, maquinarias y materiales de segundo uso provenientes de grandes empresas. Siguiendo un modelo de economía circular, BOB facilita que estos activos industriales encuentren una segunda vida útil a través de su marketplace de subastas.

El modelo de negocio funciona de la siguiente manera:
1. Los clientes transfieren dinero a BOB para la compra de equipos específicos
2. BOB realiza la compra y transfiere una parte del dinero al vendedor original
3. BOB retiene un porcentaje como comisión por su servicio de intermediación

### Pain Point Principal
Actualmente, BOB carece de un sistema centralizado para el seguimiento y gestión de los flujos financieros relacionados con las transacciones de subasta. Esto dificulta:
- El registro sistemático de los ingresos recibidos de los clientes
- El cálculo preciso de las comisiones generadas
- La trazabilidad del dinero de los clientes durante todo el proceso
- La visualización clara del estado de cada transacción financiera
- La generación de reportes financieros precisos para la toma de decisiones

### Beneficios Esperados
La implementación de una solución web para gestión financiera proporcionará:
- Mayor transparencia en el seguimiento de los fondos de los clientes
- Reducción de errores manuales en el cálculo de comisiones
- Mejora en la eficiencia administrativa y contable
- Incremento en la satisfacción del cliente mediante información oportuna sobre el estado de sus fondos
- Toma de decisiones basada en datos financieros precisos y actualizados
- Escalabilidad para gestionar un mayor volumen de transacciones sin incrementar proporcionalmente el esfuerzo administrativo

## 2. Definición del Alcance del Proyecto

### Funcionalidades Core
1. **Registro de transacciones entrantes**
   - Captura de transferencias recibidas de clientes
   - Asociación de fondos con clientes específicos
   - Asignación de fondos a subastas o compras específicas

2. **Seguimiento de estado de fondos**
   - Categorización de fondos según su estado (disponible, asignado, gastado, retornado)
   - Historial de movimientos para cada transacción
   - Alertas para transacciones incompletas o que requieren acción

3. **Cálculo y registro de comisiones**
   - Determinación automática de comisiones según reglas de negocio
   - Registro detallado de comisiones por cada transacción
   - Acumulación de comisiones por período, cliente o categoría

4. **Gestión de devoluciones y reasignaciones**
   - Proceso para retornar fondos a clientes cuando sea necesario
   - Mecanismo para reasignar fondos a otras compras
   - Registro y justificación de cada reasignación o devolución

5. **Reportes y visualización**
   - Dashboard con indicadores clave financieros
   - Reportes por subasta, cliente o período
   - Exportación de datos para integración con otros sistemas

### Restricciones Técnicas
- El sistema debe estar operativo en un plazo no mayor a 3 meses
- Se requiere integración con el sistema actual de subastas de BOB
- La solución debe ser accesible desde dispositivos móviles y de escritorio
- Se debe priorizar la seguridad en el manejo de la información financiera
- El sistema debe poder escalarse para manejar hasta 500 transacciones diarias

### Entregables Mínimos
1. Sistema web funcional con acceso seguro para administradores y operadores
2. Módulo de registro y seguimiento de transferencias de clientes
3. Sistema de categorización y seguimiento del estado de los fondos
4. Calculadora automática de comisiones con parámetros configurables
5. Dashboard básico con las métricas financieras principales
6. Documentación técnica y manual de usuario
7. Capacitación al personal de BOB

## 3. Wireframes y Flujos Básicos

### Mapa del Sitio
```
- Login/Acceso
- Dashboard Principal
  - Resumen financiero
  - Alertas y notificaciones
- Gestión de Transferencias
  - Registro de nuevas transferencias
  - Listado de transferencias
  - Detalle de transferencia
- Seguimiento de Fondos
  - Fondos disponibles
  - Fondos asignados
  - Fondos gastados
  - Fondos devueltos
- Gestión de Comisiones
  - Registro de comisiones
  - Reportes de comisiones
- Reportes
  - Por período
  - Por cliente
  - Por subasta
- Configuración
  - Usuarios y permisos
  - Parámetros del sistema
  - Reglas de comisión
```

### Interfaces Clave (Baja Fidelidad)

#### 1. Dashboard Principal
```
[HEADER: Logo BOB + Menú Principal + Usuario actual]

[SECCIÓN PRINCIPAL]
- Tarjetas de resumen:
  * Total transferencias recibidas (período actual)
  * Comisiones generadas (período actual)
  * Fondos pendientes de asignación
  * Devoluciones pendientes

[GRÁFICO PRINCIPAL]
- Visualización de ingresos vs comisiones (últimos 6 meses)

[PANEL LATERAL]
- Alertas y acciones pendientes
- Subastas activas con movimientos recientes

[FOOTER: Enlaces a soporte y documentación]
```

#### 2. Registro de Transferencia
```
[HEADER: Título "Nueva Transferencia" + Breadcrumbs]

[FORMULARIO]
- Cliente: [Selector desplegable]
- Monto: [Campo numérico]
- Fecha de recepción: [Selector de fecha]
- Método de pago: [Selector desplegable]
- Comprobante: [Carga de archivo]
- Propósito: [Selector: "Subasta específica" / "Fondos generales"]
- ID de Subasta: [Campo condicional, solo visible si se selecciona "Subasta específica"]
- Notas adicionales: [Área de texto]

[BOTONES]
- "Guardar" (primario)
- "Cancelar" (secundario)
```

#### 3. Detalle de Seguimiento de Fondos
```
[HEADER: Título "Seguimiento de Fondos - [ID Transferencia]" + Breadcrumbs]

[PANEL DE ESTADO]
- Estado actual: [Etiqueta colorizada: Disponible/Asignado/Gastado/Retornado]
- Cliente: [Nombre e información de contacto]
- Monto original: [Valor]
- Fecha de recepción: [Fecha]

[PANEL DE MOVIMIENTOS]
- Tabla cronológica de movimientos:
  * Fecha | Acción | Monto | Responsable | Notas

[PANEL DE ACCIONES]
- "Asignar a Subasta" (visible si fondos disponibles)
- "Registrar Gasto" (visible si fondos asignados)
- "Registrar Devolución" (siempre visible si hay fondos)
- "Reasignar" (visible según estados)

[PANEL DE DOCUMENTOS]
- Lista de comprobantes y documentos asociados
```

#### 4. Reporte de Comisiones
```
[HEADER: Título "Reporte de Comisiones" + Filtros de período]

[FILTROS ADICIONALES]
- Por cliente: [Selector]
- Por tipo de subasta: [Selector múltiple]
- Por estado: [Selector múltiple]

[VISUALIZACIÓN PRINCIPAL]
- Gráfico de barras/líneas mostrando comisiones por período

[TABLA DE DETALLE]
- Columnas: Fecha | ID Subasta | Cliente | Monto Transacción | % Comisión | Monto Comisión | Estado

[TOTALES]
- Resumen de totales filtrados
- Comparativa con períodos anteriores

[BOTONES DE EXPORTACIÓN]
- "Exportar a Excel"
- "Generar PDF"
- "Imprimir"
```

### Flujos Básicos de Usuario

#### 1. Registro y Seguimiento de una Transferencia
1. Operador accede al sistema y selecciona "Nueva Transferencia"
2. Completa el formulario con datos del cliente y transferencia
3. El sistema registra la transferencia y la marca como "Fondos Disponibles"
4. Operador puede asignar inmediatamente los fondos a una subasta o dejarlos como disponibles
5. El sistema notifica al administrador sobre la nueva transferencia
6. El operador puede acceder al detalle de la transferencia para realizar seguimiento
7. A medida que avanza la subasta, el operador actualiza el estado de los fondos
8. El sistema calcula automáticamente la comisión cuando se registra un gasto

#### 2. Devolución de Fondos al Cliente
1. Operador accede al detalle de la transferencia del cliente
2. Selecciona la opción "Registrar Devolución"
3. Completa formulario especificando monto a devolver y razón
4. Carga comprobante de transferencia de devolución
5. El sistema actualiza el estado de los fondos y genera alerta para contabilidad
6. El cliente recibe notificación automática sobre la devolución
7. La transacción queda registrada en el historial con estado "Fondos Devueltos"

#### 3. Generación de Reporte Financiero
1. Administrador accede a la sección "Reportes"
2. Selecciona tipo de reporte y establece filtros de período
3. Aplica filtros adicionales por cliente o tipo de subasta
4. El sistema genera visualización gráfica y tabla de detalle
5. Administrador puede explorar datos específicos haciendo clic en elementos del gráfico
6. Exporta reporte en formato deseado
7. El sistema guarda configuración del reporte para uso futuro

## 4. Consideraciones Adicionales

### Integraciones Necesarias
- Sistema actual de subastas de BOB
- Posible integración con sistema contable
- Pasarelas de pago para verificación de transferencias

### Roles y Permisos
- Administrador: acceso completo a todas las funcionalidades
- Operador Financiero: gestión de transferencias y seguimiento
- Operador de Subastas: visualización limitada de información financiera
- Cliente: potencial acceso futuro a estado de sus fondos (fuera del alcance inicial)

### Escalabilidad
El sistema debe diseñarse considerando el crecimiento proyectado de BOB, permitiendo:
- Incremento en el volumen de transacciones
- Adición de nuevas métricas y reportes
- Expansión con módulos adicionales (ej. acceso a clientes)
- Soporte para múltiples monedas en el futuro
