// models/cliente.js
class Cliente {
    constructor({
      email,
      nombre,
      telefono,
      tipoDocumento,
      numeroDocumento,
      facturacionRuc = '',
      facturacionNombre = '',
      observaciones = ''
    }) {
      this.id = null; // se asignará desde el Store
      this.email = email;
      this.nombre = nombre;
      this.telefono = telefono;
      this.tipoDocumento = tipoDocumento; // 'DNI' o 'RUC'
      this.numeroDocumento = numeroDocumento;
      this.facturacionRuc = facturacionRuc;
      this.facturacionNombre = facturacionNombre;
      this.observaciones = observaciones;
      this.fechaRegistro = null;
    }
  }

 