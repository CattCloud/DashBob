//No es sensible a mayusculas o minusculas
function validarTexto(texto, listaValidos) {
  return listaValidos.includes(texto.toLowerCase());
}

// Funciones de validación utilizando `validarTexto`
validarConceptoIngreso = texto => validarTexto(texto, conceptosIngresoValidos);
validarBanco = texto => validarTexto(texto, bancosValidos);
validarTipoDocumento = texto => validarTexto(texto, tipoDocumentoValidos);
validarMoneda = texto => validarTexto(texto, monedasValidas);
validarMedioPago = texto => validarTexto(texto, mediosValidos);
validarConceptoEgreso = texto => validarTexto(texto, conceptosEgresoValidos);
validarEstadoIngreso = texto => validarTexto(texto, estadosIngresoValidos);
validarEstadoEgreso = texto => validarTexto(texto, estadosEgresoValidos);




function obtenerSoloFecha(fecha) {
  return fecha.getDate().toString().padStart(2, "0")  + "/" + 
         (fecha.getMonth() + 1).toString().padStart(2, "0") + "/" + 
         fecha.getFullYear();
}


function normalizarFecha(fechaInput) {
  const partes = fechaInput.split("-"); // Divide "YYYY-MM-DD"
  return obtenerSoloFecha(new Date(parseInt(partes[0]), parseInt(partes[1]) - 1, parseInt(partes[2]))); // Año, Mes (0-based), Día
}

function crearFechaExacta(fechaStr) {
  const partes = fechaStr.split("/");
  return new Date(parseInt(partes[2]) , parseInt(partes[1]) - 1,parseInt(partes[0]) ); // Año, mes (0-based), día
}
