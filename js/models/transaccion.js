

 class Transaccion{
    constructor({
        id=null,
        clienteId,
        medio,        
        banco,
        moneda = 'PEN',
        importe,
        concepto,
        estado='pendiente',  // valor por defecto de estado
        registradoPor = 'Admin', // valor por defecto
        fechaRegistro = null
      }) {
        this.id = id; // se asignará desde el Store
        this.clienteId = clienteId;
        this.medio = medio;
        this.banco = banco;
        //this.numeroCuentaDestino = numeroCuentaDestino;
        this.moneda = moneda;
        this.importe = parseFloat(importe);
        this.concepto = concepto;
        this.estado = estado;
        this.registradoPor = registradoPor;
        this.fechaRegistro = fechaRegistro;
      }
  }
  