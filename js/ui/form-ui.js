
function getOpcionesClientes() {
    return window.templatesStore.getClientes().map(c =>
        `<option value="${c.id}">${c.nombre}</option>`
    ).join('');
}

function getOpcionesBanco() {
    return bancosValidos.map(banco =>
        `<option value="${banco}">${banco.charAt(0).toUpperCase() + banco.slice(1)}</option>`
    ).join('');
}

function getOpcionesConceptoIngreso() {
    return conceptosIngresoValidos.map(concepto =>
        `<option value="${concepto}">${concepto.charAt(0).toUpperCase() + concepto.slice(1)}</option>`
    ).join('');
}

function getOpcionesConceptoEgreso() {
    return conceptosEgresoValidos.map(concepto =>
        `<option value="${concepto}">${concepto.charAt(0).toUpperCase() + concepto.slice(1)}</option>`
    ).join('');
}

function getOpcionesMediosPago() {
    return mediosValidos.map(medio =>
        `<option value="${medio}">${medio.charAt(0).toUpperCase() + medio.slice(1)}</option>`
    ).join('');
}

function getOpcionesMonedas() {
    return monedasValidas.map(moneda =>
        `<option value="${moneda}">${moneda.toUpperCase()}</option>`
    ).join('');
}

function getOpcionesTiposDocumento() {
    return tipoDocumentoValidos.map(tipo =>
        `<option value="${tipo}">${tipo.toUpperCase()}</option>`
    ).join('');
}

function getOpcionesEstadoIngreso() {
    return estadosIngresoValidos.map(estado =>
        `<option value="${estado}">${estado.charAt(0).toUpperCase() + estado.slice(1)}</option>`
    ).join('');
}
function getOpcionesEstadoIngreso() {
    return estadosIngresoValidos.map(estado =>
        `<option value="${estado}">${estado.charAt(0).toUpperCase() + estado.slice(1)}</option>`
    ).join('');
}

function getOpcionesEstadoIngresoNoDevuelto() {
    return estadosIngresoValidosNodevuelto.map(estado =>
        `<option value="${estado}">${estado.charAt(0).toUpperCase() + estado.slice(1)}</option>`
    ).join('');
}

function getOpcionesEstadoEgreso() {
    return estadosEgresoValidos.map(estado =>
        `<option value="${estado}">${estado.charAt(0).toUpperCase() + estado.slice(1)}</option>`
    ).join('');
}

// Formulario registrar cliente
document.getElementById("cliente-detalle-select").innerHTML = `<option value="">Seleccione cliente</option>`+getOpcionesClientes();
document.getElementById("cliente-dashboard-select").innerHTML = `<option value="">Seleccione cliente</option>`+getOpcionesClientes();


//Formulario registrar ingreso
/*
document.getElementById("ingreso-medio").innerHTML = `<option value="">Seleccione medio de pago</option>`+getOpcionesMediosPago();
document.getElementById("ingreso-banco").innerHTML = `<option value="">Seleccione banco</option>`+getOpcionesBanco();
document.getElementById("ingreso-moneda").innerHTML = getOpcionesMonedas();
document.getElementById("ingreso-concepto").innerHTML = getOpcionesConceptoIngreso();
*/


//Formulario registrar egreso
/*
document.getElementById("egreso-medio").innerHTML = `<option value="">Seleccione medio de pago</option>`+getOpcionesMediosPago();
document.getElementById("egreso-banco").innerHTML = `<option value="">Seleccione banco</option>`+getOpcionesBanco();
document.getElementById("egreso-moneda").innerHTML = getOpcionesMonedas();
document.getElementById("egreso-concepto").innerHTML = getOpcionesConceptoEgreso();
*/