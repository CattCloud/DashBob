// models/egreso.js

export class Egreso {
    constructor({
      clienteId,
      medio,               // 'Transferencia', 'Depósito', etc.
      banco,
      numeroCuentaDestino,
      moneda = 'PEN',
      importe,
      concepto,
      registradoPor = 'Admin' // valor por defecto
    }) {
      this.id = null; // se asignará desde el Store
      this.clienteId = clienteId;
      this.fecha = new Date().toISOString();
      this.medio = medio;
      this.banco = banco;
      this.numeroCuentaDestino = numeroCuentaDestino;
      this.moneda = moneda;
      this.importe = parseFloat(importe);
      this.concepto = concepto;
      this.estado = 'PENDIENTE'; // valor inicial
      this.registradoPor = registradoPor;
      this.fechaRegistro = new Date().toISOString();
    }
  }
  