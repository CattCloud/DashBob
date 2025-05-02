# Requerimientos: Sistema de Gestión de Ingresos, Egresos y Balance de Bob Subastas

## 1. Análisis del Problema

### 1.1 Descripción del Negocio
Bob Subastas es una empresa de economía circular especializada en la intermediación de venta de activos en desuso, principalmente vehículos. La empresa facilita subastas entre 3 proveedores de vehículos y clientes finales, ofreciendo una plataforma tecnológica web donde se exponen los vehículos y los clientes pueden realizar pujas, previo registro y transferencia de un monto en garantía.

### 1.2 Pain Point Principal
Actualmente, la gestión de datos de ingresos y egresos entre Bob Subastas y sus clientes se realiza mediante Google Forms y cálculos manuales en hojas de cálculo. Esto genera:

- Ineficiencia en el procesamiento de la información
- Mayor probabilidad de errores en los cálculos de saldos
- Dificultad para dar seguimiento a los saldos a favor de los clientes
- Imposibilidad de generar reportes automáticos para clientes
- Proceso manual y tedioso para calcular el balance de cada cliente
- Falta de centralización en la gestión de garantías de subasta y sus devoluciones

### 1.3 Beneficios Esperados
La implementación de una solución web para este problema permitirá:

- Centralizar la información de ingresos y egresos en un solo sistema
- Automatizar los cálculos de balance por cliente
- Reducir errores humanos en el manejo de datos financieros
- Mejorar la experiencia de usuario tanto para el equipo interno como para los clientes
- Generar reportes personalizados para los clientes sobre su historial financiero
- Optimizar el tiempo dedicado a estas tareas administrativas
- Mayor transparencia en las transacciones
- Facilitar el seguimiento del estado de las garantías (FACTURADO, DEVUELTO, etc.)

## 2. Alcance del Proyecto

### 2.1 Funcionalidades Core

#### Gestión de Clientes
- Registro de nuevos clientes con información completa (correo, nombre, DNI/RUC, teléfono)
- Visualización de listado de clientes
- Edición de datos de clientes
- Búsqueda y filtrado de clientes

#### Gestión de Ingresos (Garantías)
- Registro de nuevos ingresos (garantías recibidas)
- Captura de información detallada según formulario actual:
  - Fecha y hora
  - Cliente asociado
  - Información del vehículo (placa, empresa)
  - Información de la subasta (fecha, número de lote)
  - Detalles del pago (entidad financiera, número de cuenta, monto)
  - Comprobante de pago (indicación de que se ha recibido)
  - Datos de facturación
- Visualización de historial de ingresos
- Filtrado de ingresos por cliente, fecha, concepto, estado
- Edición de ingresos registrados

#### Gestión de Egresos (Devoluciones)
- Registro de nuevos egresos (devoluciones de garantías)
- Campos específicos para egresos:
  - Fecha y hora
  - Cliente asociado
  - Monto a devolver
  - Medio de devolución
  - Banco destino
  - Número de cuenta destino
  - Concepto/motivo de la devolución
- Visualización de historial de egresos
- Filtrado de egresos por cliente, fecha, concepto
- Edición de egresos registrados

#### Gestión de Estados
- Asignación de estados a las transacciones (PENDIENTE, FACTURADO, DEVUELTO, SALDO A FAVOR)
- Cambio de estado según el flujo de la operación
- Filtrado de transacciones por estado

#### Cálculo de Balance
- Visualización del balance actual por cliente
- Cálculo automático del saldo disponible
- Resumen general de ingresos y egresos
- Validación para evitar devoluciones superiores al saldo disponible

#### Reportes
- Generación de reportes de balance por cliente
- Exportación de datos en formato amigable (CSV)
- Vista de histórico de transacciones
- Reporte personalizado para clientes con detalle de ingresos, egresos y balance final

### 2.2 Restricciones Técnicas

#### Restricciones de Desarrollo
- **Frontend-only**: La solución debe ser completamente desarrollada en el frontend, sin backend ni bases de datos externos
- **Persistencia Local**: Todos los datos se almacenarán en LocalStorage del navegador
- **Compatibilidad**: Debe funcionar en navegadores modernos (Chrome, Firefox, Safari, Edge)
- **Responsive**: Diseño adaptable a dispositivos móviles y desktop

#### Restricciones Tecnológicas
- HTML5, CSS3 y JavaScript puro (sin frameworks de backend)
- Uso de frameworks CSS permitidos: Bootstrap o Tailwind
- Arquitectura basada en el patrón Storage para la gestión de datos
- Sin integraciones externas complejas ni APIs
- Sin procesamiento pesado en el navegador

#### Restricciones de Tiempo
- El proyecto debe completarse en el marco del Bootcamp
- Priorizando la funcionalidad sobre características avanzadas

### 2.3 Entregables Mínimos
- Sistema web funcional para gestión de ingresos, egresos y balance
- Interfaz para registro y gestión de clientes
- Formularios para registro de ingresos y egresos basados en los actuales
- Vista de balance por cliente
- Función de cambio de estado para las transacciones
- Documentación de uso básico del sistema
- Código fuente comentado y organizado# Requerimientos Actualizados: Sistema de Gestión de Ingresos, Egresos y Balance de Bob Subastas

## 1. Descripción General del Sistema

Bob Subastas es una empresa de economía circular que facilita la subasta de activos en desuso (vehículos) entre proveedores y clientes. El sistema desarrollado permite la gestión integral de clientes, ingresos (garantías), egresos (devoluciones) y balances financieros, resolviendo los problemas de control manual y falta de automatización.

### 1.2 Pain Point Principal
Actualmente, la gestión de datos de ingresos y egresos entre Bob Subastas y sus clientes se realiza mediante Google Forms y cálculos manuales en hojas de cálculo. Esto genera:

- Ineficiencia en el procesamiento de la información
- Mayor probabilidad de errores en los cálculos de saldos
- Dificultad para dar seguimiento a los saldos a favor de los clientes
- Imposibilidad de generar reportes automáticos para clientes
- Proceso manual y tedioso para calcular el balance de cada cliente
- Falta de centralización en la gestión de garantías de subasta y sus devoluciones

### 1.3 Beneficios Esperados
La implementación de una solución web para este problema permitirá:

- Centralizar la información de ingresos y egresos en un solo sistema
- Automatizar los cálculos de balance por cliente
- Reducir errores humanos en el manejo de datos financieros
- Mejorar la experiencia de usuario tanto para el equipo interno como para los clientes
- Generar reportes personalizados para los clientes sobre su historial financiero
- Optimizar el tiempo dedicado a estas tareas administrativas
- Mayor transparencia en las transacciones
- Facilitar el seguimiento del estado de las garantías (FACTURADO, DEVUELTO, etc.)

## 2. Características Funcionales Principales

### 2.1 Gestión de Clientes

* Registro manual de clientes a través de formulario
* Importación masiva desde archivo CSV
* Edición de clientes
* Eliminación solo si no tiene transacciones asociadas
* Búsqueda, ordenamiento y filtros:

  * Nombre, documento, email
  * Fechas desde-hasta
  * Observaciones (con/sin)
  * Tipo documento
  * Estado cliente (activo, sin transacciones, saldo positivo/cero)
* Exportación a CSV

### 2.2 Gestión de Ingresos

* Registro manual de ingresos
* Importación masiva desde CSV
* Asociación directa al cliente (no a subasta ni vehículo)
* Campos: banco, medio, moneda, importe, concepto, estado, fecha
* Edición de ingresos según estado:

  * PENDIENTE: todos los campos editables excepto ID y fecha
  * FACTURADO: solo medio, banco y concepto
  * SALDO A FAVOR: medio, banco, concepto e importe
  * DEVUELTO: no editable
* Eliminación permitida si no deja saldo negativo
* Búsqueda, ordenamiento y filtros
* Exportación a CSV

### 2.3 Gestión de Egresos

* Registro manual de egresos
* Importación desde CSV
* Asociado solo al cliente
* Campos: banco, medio, moneda, importe, concepto, estado, fecha
* Edición permitida según estado:

  * PENDIENTE: se puede editar medio, banco, concepto e importe
  * COMPLATADO: no editable
* Eliminación permitida si no deja saldo negativo
* Búsqueda, ordenamiento y filtros
* Exportación a CSV

### 2.4 Balance y Cálculos

* Cálculo automático de saldo por cliente: suma ingresos válidos - suma egresos
* Estados de ingresos considerados en el balance:

  * PENDIENTE, FACTURADO, SALDO A FAVOR (cuentan)
  * DEVUELTO (no cuenta)
* Validación de saldo antes de egreso o edición/eliminación

### 2.5 Dashboards

#### Dashboard General

* Tarjetas informativas: total clientes, ingresos, egresos, saldos, transacciones
* Gráficos interactivos con ApexCharts:

  * Comparación ingresos/egresos
  * Distribuciones por estado (ingresos y egresos)
  * Balance mensual
  * Top 5 clientes por ingresos
* Exportación a CSV (PDF no implementado)

#### Dashboard por Cliente

* Selección de cliente
* Tarjetas informativas individuales (saldo, ingresos, egresos, último movimiento)
* Gráficos personalizados por cliente

### 2.6 Detalle del Cliente

* Vista detallada de la información del cliente
* Tarjetas con saldos y transacciones
* Botones rápidos: registrar ingreso/egreso, ir a dashboard del cliente
* Tabla de ingresos filtrada solo para ese cliente
* Tabla de egresos filtrada solo para ese cliente
* Filtros por fechas, importe, estado, concepto, etc.
* Exportación a CSV

### 2.7 Reportes

* Exportación de datos filtrados en cada sección (CSV)
* Reportes por sección:

  * Dashboard general
  * Dashboard cliente
  * Tabla clientes, ingresos, egresos
  * Detalle del cliente
* Exportación a PDF planificada (no implementada)

## 3. Estados de Transacciones

### Ingresos

| Estado        | Descripción                                               |
| ------------- | --------------------------------------------------------- |
| PENDIENTE     | Aún no se ha definido su uso. Cuenta como saldo.          |
| FACTURADO     | Ya se emitió factura, pero el dinero sigue en la empresa. |
| SALDO A FAVOR | Dinero disponible que el cliente puede usar.              |
| DEVUELTO      | El dinero ya se devolvió. No cuenta como saldo.           |

### Egresos

| Estado     | Descripción                       |
| ---------- | --------------------------------- |
| PENDIENTE  | Solicitado pero aún no completado |
| COMPLETADO | Ya se hizo la devolución          |


## 3. Wireframes y Flujos Básicos

### 3.1 Mapa del Sitio

```
- Página de Inicio (Dashboard)
  |-- Resumen de Balance General
  |-- Dashboard por cliente

- Gestión de Clientes
  |-- Listado de Clientes
  |-- Detalle de Cliente

- Gestión de Ingresos (Garantías)

- Gestión de Egresos (Devoluciones)


```

### 3.2 Interfaces Clave

#### Dashboard Principal
- Header con logo de Bob Subastas y menú de navegación
- Panel resumen con total de ingresos, egresos y balance general

#### Listado de Clientes
- Barra de búsqueda y filtros
- Tabla con columnas: 
  - Nombre/Razón Social
  - Documento (DNI/RUC)
  - Correo
  - Teléfono
  - Balance Actual
- Botones de acción por cliente: Ver detalle, Editar, Registrar ingreso, Registrar egreso
- Botón para agregar nuevo cliente

#### Formulario de Registro de Cliente
- Campos de entrada:
  - Correo electrónico (requerido)
  - Nombre o razón social (requerido)
  - Celular (requerido)
  - Tipo de documento (DNI/RUC)
  - Número de documento (requerido)
  - Observaciones (opcional)
- Botones de "Guardar" y "Cancelar"

#### Vista Detalle de Cliente
- Datos completos del cliente
- Balance actual destacado
- Historial de transacciones en formato tabla con columnas:
  - Fecha
  - Tipo (Ingreso/Egreso)
  - Concepto
  - Monto
  - Estado (PENDIENTE, FACTURADO, DEVUELTO, etc.)
- Botones para "Registrar ingreso", "Registrar egreso" y "Generar reporte"

#### Formulario de Registro de Ingreso (Garantía)
- Selector de cliente (con búsqueda)
- Fecha y hora (con valor predeterminado actual)
  - Monto de la garantía
- Datos de facturación:
  - RUC/DNI
  - Nombre completo o razón social
- Campo para concepto/observaciones
- Estado inicial (por defecto: PENDIENTE)
- Botones de "Guardar" y "Cancelar"

#### Formulario de Registro de Egreso (Devolución)
- Selector de cliente (con búsqueda)
- Saldo disponible del cliente (mostrado automáticamente)
- Fecha y hora (con valor predeterminado actual)
- Campos para medio de devolución, banco, cuenta destino
- Campo para monto a devolver (con validación para no superar el saldo)
- Campo para concepto/motivo
- Botones de "Guardar" y "Cancelar"


### 3.3 Flujos Básicos de Usuario

#### Flujo: Registro de un Nuevo Cliente
1. Usuario accede a "Gestión de Clientes"
2. Hace clic en "Nuevo Cliente"
3. Completa el formulario con los datos requeridos
4. Guarda el formulario
5. Sistema muestra mensaje de confirmación
6. Redirecciona al listado de clientes actualizado

#### Flujo: Registro de un Nuevo Ingreso (Garantía)
1. Usuario accede a "Gestión de Ingresos" o desde el dashboard
2. Hace clic en "Nuevo Ingreso"
3. Selecciona un cliente existente del listado (o crea uno nuevo)
4. Completa la información del vehículo y la subasta
5. Ingresa los detalles del pago de garantía
6. Completa datos de facturación si corresponde
7. Guarda el formulario
8. Sistema actualiza el balance del cliente
9. Muestra confirmación de la operación

#### Flujo: Registro de un Nuevo Egreso (Devolución)
1. Usuario accede a "Gestión de Egresos" o desde la vista detalle de cliente
2. Hace clic en "Nuevo Egreso"
3. Selecciona un cliente del listado
4. Sistema muestra el saldo disponible del cliente
5. Usuario ingresa monto a devolver (no mayor al saldo disponible)
6. Completa datos de la cuenta destino y concepto
7. Guarda el formulario
8. Sistema actualiza el balance del cliente
9. Muestra confirmación de la operación
    
#### Flujo: Cambio de Estado de una Transacción
1. Usuario accede al listado de ingresos o a la vista detalle de cliente
2. Identifica la transacción y accede a su detalle
3. Modifica el estado según corresponda (PENDIENTE → FACTURADO, PENDIENTE → DEVUELTO, etc.)
4. Guarda los cambios
5. Sistema actualiza el estado y muestra confirmación


## 4. Datos y Estructuras

### 4.1 Estructura de Datos para Clientes
```javascript
{
  id: "C001", // Autogenerado
  email: "cliente@ejemplo.com",
  nombre: "Juan Pérez",
  telefono: "999056488",
  tipoDocumento: "DNI", // DNI o RUC
  numeroDocumento: "12345678",
  observaciones: "Cliente frecuente",
  fechaRegistro: "2023-07-15T10:30:00"
}
```

### 4.2 Estructura de Datos para Ingresos (Garantías)
```javascript
{
  id: "I001", // Autogenerado
  clienteId: "C001", // Referencia al cliente
  moneda: "PEN", // PEN, USD
  importe: 1000.00,
  concepto: "Garantía para subasta de vehículo Toyota",
  estado: "PENDIENTE", // PENDIENTE, FACTURADO, DEVUELTO, SALDO A FAVOR
  registradoPor: "Admin", // Usuario que registra
  fechaRegistro: "2023-07-16T15:25:00"
}
```

### 4.3 Estructura de Datos para Egresos (Devoluciones)
```javascript
{
  id: "E001", // Autogenerado
  clienteId: "C001", // Referencia al cliente
  medio: "Transferencia", // Transferencia, Depósito, etc.
  banco: "BCP",
  moneda: "PEN", // PEN, USD
  importe: 500.00,
  concepto: "Garantía para subasta de vehículo Toyota",
  estado: "COMPLETADO", // PENDIENTE, COMPLETADO
  registradoPor: "Admin", // Usuario que registra
  fechaRegistro: "2023-07-20T11:50:00"
}
```

## 5. Criterios de Aceptación

### 5.1 Funcionales
- El sistema debe permitir registrar, visualizar y editar clientes con todos los campos del formulario actual
- El sistema debe permitir registrar ingresos (garantías) con la información completa del vehículo y la subasta
- El sistema debe permitir registrar egresos (devoluciones) asociados a clientes
- El sistema debe calcular correctamente el balance por cliente
- El sistema debe permitir asignar y cambiar estados a las transacciones
- El sistema debe permitir la generación de reportes por cliente
- Los datos deben persistir en localStorage y mantenerse entre sesiones

### 5.2 No Funcionales
- La interfaz debe ser responsive y funcionar en dispositivos móviles y desktop
- La interfaz debe ser intuitiva y fácil de usar para usuarios internos de diversas áreas
- Los datos deben ser validados antes de almacenarse
- El sistema debe prevenir la pérdida accidental de datos

## 6. Limitaciones y Futuras Mejoras

* PDF no implementado
* Sin autenticación de usuarios
* No hay historial de cambios ni bitácora
* Interacción multiusuario no soportada (solo LocalStorage)
* Posibilidad de dividir ingresos en futuros desarrollos
