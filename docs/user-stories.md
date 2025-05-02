# Historias de Usuario - Sistema de Gestión de Ingresos, Egresos y Balance - Bob Subastas

## Módulo: Gestión de Clientes

### HU01 - Registrar nuevo cliente
**Como** administrador  
**Quiero** registrar un cliente de forma manual o por CSV  
**Para** tener una base actualizada de participantes en subastas.

#### Criterios de Aceptación:
- Permite registrar cliente manualmente llenando un formulario con validaciones.
- Permite importar múltiples clientes desde un archivo CSV con validación automática de duplicados.
- No permite registrar clientes con telefono, emails o nro de documentos(DNI-RUC) repetidos.

### HU02 - Visualizar clientes
**Como** usuario  
**Quiero** ver un listado filtrable y ordenable de clientes  
**Para** tener acceso rápido a la información.

#### Funcionalidades:
- Búsqueda por nombre, documento, email o teléfono.
- Orden por fecha, nombre, saldo, total de ingresos o egresos.
- Filtros por: tipo documento, observaciones, estado del cliente, fechas.
- Exportación a CSV con filtros aplicados.

### HU03 - Editar o eliminar cliente
**Como** administrador  
**Quiero** editar información de clientes existentes o eliminarlos si es válido  
**Para** mantener la base de datos limpia y actualizada.

#### Reglas:
- Solo pueden eliminarse clientes sin transacciones asociadas.
- El sistema muestra advertencias antes de eliminar.
- Al editar se mantiene la validación de datos únicos (email/documento).

### HU04 - Vista detalle del cliente
**Como** usuario  
**Quiero** ver todos los datos y movimientos de un cliente específico  
**Para** conocer su historial y estado financiero.

#### Funcionalidades:
- Vista con ficha del cliente y tarjetas de resumen (saldo, ingresos, egresos, transacciones, último movimiento).
- Tablas de ingresos y egresos del cliente con filtros.
- Acceso directo al Dashboard del cliente o para registrar ingreso/egreso.

---

## Módulo: Ingresos

### HU05 - Registrar ingreso
**Como** administrador  
**Quiero** registrar un nuevo ingreso manualmente o desde CSV  
**Para** llevar un control financiero detallado.

#### Reglas:
- Estados posibles: pendiente, facturado, saldo a favor, devuelto.
- Validaciones según estado y saldo.
- Importación CSV masiva con reporte de errores y omisiones.

### HU06 - Visualizar ingresos
**Como** usuario  
**Quiero** consultar ingresos registrados con filtros y ordenamientos  
**Para** revisar movimientos y generar reportes.

#### Funcionalidades:
- Filtros por cliente, fecha, estado, moneda, importe, concepto, medio, banco.
- Tabla dividida entre ingresos devueltos y no devueltos.
- Exportación CSV con filtros aplicados.

### HU07 - Editar/eliminar ingreso
**Como** usuario  
**Quiero** editar o eliminar ingresos  
**Para** corregir errores y mantener la integridad del sistema.

#### Reglas:
- Solo estados permitidos: pendiente, saldo a favor, facturado.
- Validar que el nuevo importe no deje al cliente con saldo negativo.
- Los ingresos devueltos no pueden editarse ni eliminarse.

---

## Módulo: Egresos

### HU08 - Registrar egreso
**Como** usuario  
**Quiero** registrar egresos manualmente o desde CSV  
**Para** devolver saldos o pagar proveedores.

#### Reglas:
- Solo se permite registrar si el cliente tiene saldo disponible suficiente.
- Importación masiva con validaciones.

### HU09 - Visualizar egresos
**Como** usuario  
**Quiero** consultar egresos con filtros  
**Para** conocer pagos y devoluciones realizadas.

#### Funcionalidades:
- Filtros por fecha, cliente, estado, concepto, importe, banco.
- Ordenamiento por fecha, cliente o monto.
- Exportación a CSV.

### HU10 - Editar o eliminar egreso
**Como** administrador  
**Quiero** modificar o eliminar egresos  
**Para** mantener los datos correctos.

#### Reglas:
- Solo se permiten cambios si el estado es pendiente.
- No se puede editar clienteId ni moneda.
- La eliminación recalcula el saldo del cliente y verifica que no quede negativo.

---

## Módulo: Dashboards

### HU11 - Dashboard General
**Como** usuario  
**Quiero** ver un resumen general de ingresos, egresos y clientes  
**Para** tener un panorama global de la situación financiera.

#### Contenido:
- Tarjetas informativas (totales, saldos, clientes sin transacción, ingresos devueltos).
- Gráficos: barras comparativas, pastel por estados, top clientes, balance mensual.

### HU12 - Dashboard por Cliente
**Como** usuario  
**Quiero** seleccionar un cliente y ver su resumen financiero  
**Para** tomar decisiones individualizadas.

#### Contenido:
- Tarjetas informativas del cliente.
- Gráficos de distribución por concepto y estado.
- Evolución del saldo.

---

## Módulo: Reportes

### HU13 - Exportar reportes
**Como** usuario  
**Quiero** generar reportes CSV de las secciones del sistema  
**Para** descargar y compartir información financiera.

#### Secciones con botón de reporte:
- Gestión de Clientes → Exporta tabla filtrada
- Ingresos → Exporta tabla filtrada
- Egresos → Exporta tabla filtrada
- Detalle del Cliente → Exporta su ficha y sus transacciones
- Dashboards → Exportación CSV (implementado) y PDF (pendiente)

---

## Módulo: Sistema y Funcionalidad

### HU14 - Persistencia y performance
**Como** usuario  
**Quiero** que los datos no se pierdan al cerrar el navegador  
**Para** mantener el registro sin base de datos externa.

- LocalStorage como base de datos.
- Control y modularización con StoreManager.

### HU15 - Interfaz Responsive
**Como** usuario  
**Quiero** que el sistema funcione correctamente en móvil y escritorio  
**Para** acceder desde cualquier dispositivo.

---

## Estados de Ingresos y Egresos (Referencia rápida)

| Transacción | Estado        | Cuenta en saldo | Editable | Eliminable |
|-------------|---------------|------------------|----------|-------------|
| Ingreso     | Pendiente     | ✅ Sí            | ✅ Sí    | ✅ Sí (con validación) |
| Ingreso     | Facturado     | ✅ Sí            | ✅ Parcial | ✅ Sí (con validación) |
| Ingreso     | Saldo a favor | ✅ Sí            | ✅ Parcial | ✅ Sí (con validación) |
| Ingreso     | Devuelto      | ❌ No            | ❌ No     | ❌ No |
| Egreso      | Pendiente     | ✅ Sí            | ✅ Parcial | ✅ Sí (con validación) |
| Egreso      | Completado    | ✅ Sí            | ❌ No     | ❌ No |


