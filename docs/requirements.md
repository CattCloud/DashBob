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
- Código fuente comentado y organizado

## 3. Wireframes y Flujos Básicos

### 3.1 Mapa del Sitio

```
- Página de Inicio (Dashboard)
  |-- Resumen de Balance General
  |-- Acceso rápido a últimas transacciones
  |-- Accesos directos a secciones principales

- Gestión de Clientes
  |-- Listado de Clientes
  |-- Formulario de Nuevo Cliente
  |-- Vista Detalle de Cliente
      |-- Datos del cliente
      |-- Balance del cliente
      |-- Historial de transacciones

- Gestión de Ingresos (Garantías)
  |-- Listado de Ingresos
  |-- Formulario de Nuevo Ingreso
      |-- Información del cliente
      |-- Información del vehículo y subasta
      |-- Detalles del pago
      |-- Datos de facturación
  |-- Filtros y búsqueda

- Gestión de Egresos (Devoluciones)
  |-- Listado de Egresos
  |-- Formulario de Nuevo Egreso
  |-- Filtros y búsqueda

- Reportes
  |-- Selector de cliente
  |-- Filtros de fecha
  |-- Vista previa de reporte
  |-- Opciones de exportación
```

### 3.2 Interfaces Clave

#### Dashboard Principal
- Header con logo de Bob Subastas y menú de navegación
- Panel resumen con total de ingresos, egresos y balance general
- Lista de últimas transacciones (5 más recientes)
- Accesos directos a "Nuevo Ingreso", "Nuevo Egreso" y "Nuevo Cliente"
- Buscador rápido de clientes

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
  - Datos de facturación (RUC/DNI, nombre o razón social)
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
- Sección de información del vehículo:
  - Placa
  - Empresa del vehículo (Santander, Acceso, Otro)
  - Fecha de subasta
  - Número de lote
- Sección de información del pago:
  - Entidad financiera
  - Número de cuenta origen
  - Monto de la garantía
  - Indicación de comprobante (sí/no)
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

#### Reporte de Cliente
- Encabezado con datos del cliente
- Período del reporte
- Tabla de ingresos con detalle
- Tabla de egresos con detalle
- Balance final destacado
- Opción para imprimir o exportar

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

#### Flujo: Generación de Reporte para Cliente
1. Usuario accede a la vista detalle de un cliente
2. Hace clic en "Generar Reporte"
3. Selecciona el rango de fechas (opcional)
4. Sistema genera un reporte con el historial de transacciones y balance
5. Usuario puede exportar, imprimir o enviar el reporte

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
  facturacionRuc: "20123456789", // Opcional
  facturacionNombre: "Empresa SAC", // Opcional
  observaciones: "Cliente frecuente",
  fechaRegistro: "2023-07-15T10:30:00"
}
```

### 4.2 Estructura de Datos para Ingresos (Garantías)
```javascript
{
  id: "I001", // Autogenerado
  clienteId: "C001", // Referencia al cliente
  fecha: "2023-07-16T15:20:00",
  // Información del vehículo
  placaVehiculo: "ABC123",
  empresaVehiculo: "Santander", // Santander, Acceso, Otro
  fechaSubasta: "2023-07-30",
  numeroLote: "L01176_SL11_V01",
  // Información del pago
  entidadFinanciera: "BCP",
  numeroCuentaOrigen: "00320000300638595534",
  moneda: "PEN", // PEN, USD
  importe: 1000.00,
  tieneComprobante: true,
  // Datos adicionales
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
  fecha: "2023-07-20T11:45:00",
  medio: "Transferencia", // Transferencia, Depósito, etc.
  banco: "BCP",
  numeroCuentaDestino: "19326367750-1-89",
  moneda: "PEN", // PEN, USD
  importe: 500.00,
  concepto: "Devolución parcial de garantía",
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

## 6. Entregables Adicionales (Opcionales)

### 6.1 Características de Valor Agregado
- Modo oscuro/claro para la interfaz
- Exportación de reportes en formato PDF o CSV
- Gráficos visuales de ingresos vs egresos
- Notificaciones para saldos bajos o negativos
- Importación de datos desde CSV/Excel
- Respaldo y restauración de datos

### 6.2 Consideraciones de Seguridad
- Encriptación básica de datos sensibles en localStorage
- Protección contra manipulación de datos en el cliente
- Validación de todos los inputs para prevenir inyecciones
- Sistema simple de usuarios y permisos para distinguir diferentes áreas (ventas, post-venta, contabilidad)
