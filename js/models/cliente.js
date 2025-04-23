// models/cliente.js
class Cliente {
    constructor({
      id=null,
      email,
      nombre,
      telefono,
      tipoDocumento,
      numeroDocumento,
      observaciones = '',
      fechaRegistro =null
    }) {
      this.id = id; // se asignará desde el Store
      this.email = email;
      this.nombre = nombre;
      this.telefono = telefono;
      this.tipoDocumento = tipoDocumento; // 'DNI' o 'RUC'
      this.numeroDocumento = numeroDocumento;
      this.observaciones = observaciones;
      this.fechaRegistro = fechaRegistro;
    }

  }

 