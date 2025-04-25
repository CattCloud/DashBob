

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
        this.medio = medio.toLowerCase();
        this.banco = banco.toLowerCase();
        //this.numeroCuentaDestino = numeroCuentaDestino;
        this.moneda = moneda.toLowerCase();
        this.importe = parseFloat(importe);
        this.concepto = concepto.toLowerCase();
        this.estado = estado.toLowerCase();
        this.registradoPor = registradoPor;
        this.fechaRegistro = fechaRegistro;
      }
  }
  