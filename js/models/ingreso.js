// models/ingreso.js

export class Ingreso {
    constructor({
      clienteId,
      placaVehiculo,
      empresaVehiculo,
      fechaSubasta,
      numeroLote,
      entidadFinanciera,
      numeroCuentaOrigen,
      moneda = 'PEN', // por defecto
      importe,
      tieneComprobante = false,
      concepto,
      registradoPor = 'Admin' // valor por defecto
    }) {
      this.id = null; // se asignará desde el Store
      this.clienteId = clienteId;
      this.fecha = new Date().toISOString();
  
      // Datos del vehículo y subasta
      this.placaVehiculo = placaVehiculo;
      this.empresaVehiculo = empresaVehiculo;
      this.fechaSubasta = fechaSubasta;
      this.numeroLote = numeroLote;
  
      // Información del pago
      this.entidadFinanciera = entidadFinanciera;
      this.numeroCuentaOrigen = numeroCuentaOrigen;
      this.moneda = moneda;
      this.importe = parseFloat(importe);
      this.tieneComprobante = tieneComprobante;
  
      // Información adicional
      this.concepto = concepto;
      this.estado = 'PENDIENTE'; // valor inicial por defecto
      this.registradoPor = registradoPor;
      this.fechaRegistro = new Date().toISOString();
    }
  }
  