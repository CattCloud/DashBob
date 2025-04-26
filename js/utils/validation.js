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
  return fecha.getFullYear() + "-" + 
         (fecha.getMonth() + 1).toString().padStart(2, "0") + "-" + 
         fecha.getDate().toString().padStart(2, "0");
}

