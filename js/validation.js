//No es sensible a mayusculas o minusculas
function validarConceptoIngreso(texto) {
  // Lista de opciones válidas
  const opcionesValidas = [
    "garantía por participación en subasta",
    "saldo a favor de cliente",
    "reembolso por transferencia excedente",
    "pago adicional para mejorar oferta"
  ];

  // Validar si el texto está en la lista de opciones (todo en minúsculas)
  return opcionesValidas.includes(texto.toLowerCase());
}

function validarBanco(texto) {
  // Lista de opciones válidas
  const bancosValidos = [
    "banbif",
    "mibanco",
    "banco falabella",
    "scotiabank",
    "banco pichincha",
    "banco de la nacion",
    "banco ripley",
    "bcp",
    "bbva"
  ];

  // Validar si el texto está en la lista de opciones (todo en minúsculas)
  return bancosValidos.includes(texto.toLowerCase());
}

function validarMoneda(texto) {
  // Lista de opciones válidas
  const monedasValidas = ["pen", "usd"];

  // Validar si el texto está en la lista de monedas válidas (todo en minúsculas)
  return monedasValidas.includes(texto.toLowerCase());
}

function validarTipoDocumento(texto) {
  // Lista de opciones válidas
  const tipoDocumentoValidas = ["dni", "ruc"];

  // Validar si el texto está en la lista de tipos válidos (todo en minúsculas)
  return tipoDocumentoValidas.includes(texto.toLowerCase());
}

function validarMedioPago(texto) {
  // Lista de opciones válidas
  const mediosValidos = [
    "transferencia bancaria",
    "depósito",
    "pago en efectivo",
    "cheque",
    "tarjeta de crédito"
  ];

  // Validar si el texto está en la lista de medios válidos (todo en minúsculas)
  return mediosValidos.includes(texto.toLowerCase());
}

function validarConceptoEgreso(texto) {
  // Lista de opciones válidas
  const conceptosValidos = [
    "devolución de garantía al cliente",
    "reembolso por cancelación de subasta",
    "pago al proveedor por vehículo adquirido",
    "ajuste de saldo por transacción finalizada",
    "otros egresos relacionados"
  ];

  // Validar si el texto está en la lista de conceptos válidos (todo en minúsculas)
  return conceptosValidos.includes(texto.toLowerCase());
}


function validarEstadoIngreso(texto) {
  // Lista de estados válidos
  const estadosIngresoValidos = [
    "pendiente",
    "facturado",
    "devuelto",
    "saldo a favor"
  ];

  // Validar si el texto está en la lista de estados válidos (ignorar mayúsculas/minúsculas)
  return estadosIngresoValidos.includes(texto.toLowerCase());
}

function validarEstadoEgreso(texto) {
  // Lista de estados válidos
  const estadosEgresoValidos = [
    "pendiente",
    "completado"
  ];

  // Validar si el texto está en la lista de estados válidos (ignorar mayúsculas/minúsculas)
  return estadosEgresoValidos.includes(texto.toLowerCase());
}