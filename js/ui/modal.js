function mostrarModalEliminacion({ titulo, mensaje, onConfirm }) {
  const modal = document.getElementById("modal-confirmacion");
  const tituloEl = document.getElementById("modal-titulo");
  const mensajeEl = document.getElementById("modal-mensaje");
  const btnCancelar = document.getElementById("btn-cancelar");
  const btnConfirmar = document.getElementById("btn-confirmar");

  tituloEl.textContent = titulo;
  mensajeEl.textContent = mensaje;

  // Mostrar modal
  modal.classList.remove("hidden");

  // Limpiar eventos anteriores
  btnConfirmar.onclick = null;
  btnCancelar.onclick = null;

  // Cerrar y cancelar
  btnCancelar.onclick = () => {
    modal.classList.add("hidden");
  };

  // Confirmar acción
  btnConfirmar.onclick = () => {
    onConfirm();
    modal.classList.add("hidden");
  };
}



// === Modal reutilizable ===




const botonesFormReutilizable= 
    `
        <button type="reset" form="form-modal" class="bg-red-700 hover:bg-red-400 text-white  px-4 py-2 rounded w-full sm:w-1/2"
                  onclick="cerrarModalReutilizable()">Cancelar</button>
        <button  id="btn-aceptar-form-modal" type="submit" form="form-modal" class="bg-[#f8a703] hover:bg-yellow-300 text-white px-4 py-2 rounded w-full sm:w-1/2">
            Aceptar
        </button>
    `

    

function getHTMLFormModal(casoModal){
  return FormTemplatesModal[casoModal] || `<p>Error:No se reconoce el caso para abrir el modal</p>`;
}



function cargarDatosEditarTransaccion(prefijo, campos, transaccion) {
  campos.forEach(campo => {
    document.getElementById(`${prefijo}-${campo}`).value = transaccion[campo];
  });
}


function cargarDatosEditarCliente(dataCliente){
  document.getElementById("cliente-email").value = dataCliente.email;
  document.getElementById("cliente-nombre").value = dataCliente.nombre;
  document.getElementById("cliente-telefono").value = dataCliente.telefono;
  document.getElementById("cliente-tipoDocumento").value = dataCliente.tipoDocumento;
  document.getElementById("cliente-numeroDocumento").value = dataCliente.numeroDocumento;
  document.getElementById("cliente-observaciones").value = dataCliente.observaciones;
}


function abrirModalEditarTransaccion(tipo, titulo, casoModal, onAceptar, transaccion, campos,isDetalle=false) {
  const modal = document.getElementById("modal-reutilizable");
  document.getElementById("modal-reutilizable-tittle").textContent = titulo;

  // Reemplazar el form-modal con uno nuevo limpio
  const oldForm = document.getElementById("form-modal");
  const newForm = oldForm.cloneNode(false); // Sin hijos ni eventos
  newForm.innerHTML = getHTMLFormModal(casoModal);
  oldForm.replaceWith(newForm);
  newForm.id = "form-modal";
  document.getElementById("modal-foot").innerHTML=botonesFormReutilizable;
  modal.classList.remove("hidden");
  // Cargar datos según el tipo (ingreso o egreso)
  cargarDatosEditarTransaccion(`editar-${tipo}`, campos, transaccion);
  newForm.addEventListener("submit", (e) => {
    e.preventDefault();
    onAceptar(transaccion.id); // Ejecuta la lógica del botón Aceptar
    modal.classList.add("hidden");
    if(isDetalle){
      console.log(isDetalle);
      cargarDetalleCliente(transaccion.clienteId);
    }
  });
}




function abrirModalRegistrar(titulo, casoModal, onAceptar,content="") {
  const modal = document.getElementById("modal-reutilizable");
  document.getElementById("modal-reutilizable-tittle").textContent = titulo;
  // Reemplazar el form-modal con uno nuevo limpio
  const oldForm = document.getElementById("form-modal");
  const newForm = oldForm.cloneNode(false); // Sin hijos ni eventos
  newForm.innerHTML = getHTMLFormModal(casoModal);
  oldForm.replaceWith(newForm);
  newForm.id = "form-modal";
  document.getElementById("modal-content").innerHTML=content;
  document.getElementById("modal-foot").innerHTML=botonesFormReutilizable;
  modal.classList.remove("hidden");
  newForm.addEventListener("submit", (e) => {
    e.preventDefault();
    onAceptar(); // Ejecuta la lógica del botón Aceptar
    modal.classList.add("hidden");
    document.getElementById("modal-content").innerHTML="";
    document.getElementById("modal-foot").innerHTML=""
  });
}


function abrirModalEditarCliente(titulo, casoModal, onAceptar,cliente) {
  const modal = document.getElementById("modal-reutilizable");
  document.getElementById("modal-reutilizable-tittle").textContent = titulo;
  // Reemplazar el form-modal con uno nuevo limpio
  const oldForm = document.getElementById("form-modal");
  const newForm = oldForm.cloneNode(false); // Sin hijos ni eventos
  newForm.innerHTML = getHTMLFormModal(casoModal);
  oldForm.replaceWith(newForm);
  newForm.id = "form-modal";
  document.getElementById("modal-foot").innerHTML=botonesFormReutilizable;

  modal.classList.remove("hidden");
  cargarDatosEditarCliente(cliente);
  newForm.addEventListener("submit", (e) => {
    e.preventDefault();
    onAceptar(cliente.id); // Ejecuta la lógica del botón Aceptar
    modal.classList.add("hidden");
  });
}


function abrirModalEditarIngreso(titulo, casoModal, onAceptar, ingreso, campos,isDetalle=false) {
  abrirModalEditarTransaccion("ingreso", titulo, casoModal, onAceptar, ingreso, campos,isDetalle);
}




function abrirModalEditarEgreso(titulo, casoModal, onAceptar, egreso, campos,isDetalle=false) {
  abrirModalEditarTransaccion("egreso", titulo, casoModal, onAceptar, egreso, campos,isDetalle);
}


function cargarDatosFiltroCliente(){
    document.getElementById("filtro-fecha-desde").value=window.clienteFilter.filters.fechaDesde;
    document.getElementById("filtro-fecha-hasta").value=window.clienteFilter.filters.fechaHasta;
    document.getElementById("filtro-tipo-documento").value=window.clienteFilter.filters.tipoDocumento;
    document.getElementById("filtro-observaciones").value=window.clienteFilter.filters.observaciones;
    document.getElementById("filtro-estado-cliente").value=window.clienteFilter.filters.estadoCliente;
}


function abrirModalFiltros(titulo, casoModal, onAceptar) {
  const modal = document.getElementById("modal-reutilizable");
  document.getElementById("modal-reutilizable-tittle").textContent = titulo;
  // Reemplazar el form-modal con uno nuevo limpio
  const oldForm = document.getElementById("form-modal");
  const newForm = oldForm.cloneNode(false); // Sin hijos ni eventos
  newForm.innerHTML = getHTMLFormModal(casoModal);
  oldForm.replaceWith(newForm);
  newForm.id = "form-modal";
  document.getElementById("modal-foot").innerHTML=botonesFormReutilizable;
  modal.classList.remove("hidden");
  newForm.addEventListener("submit", (e) => {
    e.preventDefault();
    onAceptar(); // Ejecuta la lógica del botón Aceptar
    modal.classList.add("hidden");
  });
}



function abrirModalFiltrosCliente() {
  abrirModalFiltros("Filtros de Cliente", "filtrosCliente", () => {
    window.clienteFilter.setFechaDesde(document.getElementById("filtro-fecha-desde").value);
    window.clienteFilter.setFechaHasta(document.getElementById("filtro-fecha-hasta").value);
    window.clienteFilter.setTipoDocumento(document.getElementById("filtro-tipo-documento").value);
    window.clienteFilter.setObservaciones(document.getElementById("filtro-observaciones").value);
    window.clienteFilter.setEstadoCliente(document.getElementById("filtro-estado-cliente").value);
    console.log("Filtros aplicados",window.clienteFilter);
    window.clienteFilter.applyFilters();
    renderClientes(); // función que actualiza la tabla
    if(window.clienteFilter.hasFilters()){
      document.getElementById("btn-remover-filtros-cliente").classList.remove("hidden");
    }
  });
  if(window.clienteFilter.hasFilters()){
    //En caso ya hallan filtros aplicado,se cargaran eso filtros en los campos
    cargarDatosFiltroCliente();
  }
}



function cargarDatosFiltroIngreso() {
  //console.log(window.ingresoFilter.filters);
  document.getElementById("filtro-ingreso-fecha-desde").value = window.ingresoFilter.filters.fechaDesde;
  document.getElementById("filtro-ingreso-fecha-hasta").value = window.ingresoFilter.filters.fechaHasta;
  document.getElementById("filtro-ingreso-importe-min").value = window.ingresoFilter.filters.importeMin;
  document.getElementById("filtro-ingreso-importe-max").value = window.ingresoFilter.filters.importeMax;
  document.getElementById("filtro-ingreso-concepto").value = window.ingresoFilter.filters.concepto;
  document.getElementById("filtro-ingreso-estado").value = window.ingresoFilter.filters.estado;
  document.getElementById("filtro-ingreso-moneda").value = window.ingresoFilter.filters.moneda;
  document.getElementById("filtro-ingreso-medio").value = window.ingresoFilter.filters.medio;
}


function abrirModalFiltrosIngreso() {
  abrirModalFiltros("Filtros de Ingresos", "filtrosIngreso", () => {
    window.ingresoFilter.setFechaDesde(document.getElementById("filtro-ingreso-fecha-desde").value);
    window.ingresoFilter.setFechaHasta(document.getElementById("filtro-ingreso-fecha-hasta").value);
    window.ingresoFilter.setImporteMin(document.getElementById("filtro-ingreso-importe-min").value);
    window.ingresoFilter.setImporteMax(document.getElementById("filtro-ingreso-importe-max").value);
    window.ingresoFilter.setConcepto(document.getElementById("filtro-ingreso-concepto").value);
    window.ingresoFilter.setEstado(document.getElementById("filtro-ingreso-estado").value);
    window.ingresoFilter.setMoneda(document.getElementById("filtro-ingreso-moneda").value);
    window.ingresoFilter.setMedio(document.getElementById("filtro-ingreso-medio").value);
    window.ingresoFilter.applyFilters();
    //renderTransacciones();
    if(window.ingresoFilter.hasFilters()){
      document.getElementById("btn-remover-filtros-ingreso").classList.remove("hidden");
    }

  });

  if (window.ingresoFilter.hasFilters()) {
    cargarDatosFiltroIngreso();
  }
}


function cargarDatosFiltroEgreso() {
  document.getElementById("filtro-egreso-fecha-desde").value = window.egresoFilter.filters.fechaDesde;
  document.getElementById("filtro-egreso-fecha-hasta").value = window.egresoFilter.filters.fechaHasta;
  document.getElementById("filtro-egreso-importe-min").value = window.egresoFilter.filters.importeMin;
  document.getElementById("filtro-egreso-importe-max").value = window.egresoFilter.filters.importeMax;
  document.getElementById("filtro-egreso-concepto").value = window.egresoFilter.filters.concepto;
  document.getElementById("filtro-egreso-estado").value = window.egresoFilter.filters.estado;
  document.getElementById("filtro-egreso-moneda").value = window.egresoFilter.filters.moneda;
  document.getElementById("filtro-egreso-medio").value = window.egresoFilter.filters.medio;
}


function abrirModalFiltrosEgreso() {
  abrirModalFiltros("Filtros de Egresos", "filtrosEgreso", () => {
    window.egresoFilter.setFechaDesde(document.getElementById("filtro-egreso-fecha-desde").value);
    window.egresoFilter.setFechaHasta(document.getElementById("filtro-egreso-fecha-hasta").value);
    window.egresoFilter.setImporteMin(document.getElementById("filtro-egreso-importe-min").value);
    window.egresoFilter.setImporteMax(document.getElementById("filtro-egreso-importe-max").value);
    window.egresoFilter.setConcepto(document.getElementById("filtro-egreso-concepto").value);
    window.egresoFilter.setEstado(document.getElementById("filtro-egreso-estado").value);
    window.egresoFilter.setMoneda(document.getElementById("filtro-egreso-moneda").value);
    window.egresoFilter.setMedio(document.getElementById("filtro-egreso-medio").value);
    window.egresoFilter.applyFilters();
    //renderTransacciones(); 
    if(window.egresoFilter.hasFilters()){
      document.getElementById("btn-remover-filtros-ingreso").classList.remove("hidden");
    }
  });

  if (window.egresoFilter.hasFilters()) {
    cargarDatosFiltroEgreso();
  }
}

function cerrarModalReutilizable() {
  document.getElementById("modal-content").innerHTML="";
  document.getElementById("modal-reutilizable").classList.add("hidden");

}


function cerrarModalSoloBody() {
  document.getElementById("modal-content").innerHTML="";
  document.getElementById("modal-foot").classList.remove("hidden");
  document.getElementById("modal-reutilizable-tittle").classList.remove("hidden");
  document.getElementById("form-modal").classList.remove("hidden");
  document.getElementById("modal-reutilizable").classList.add("hidden");
}



function abrirModalSoloBody(templateVista) {
  const modal = document.getElementById("modal-reutilizable");
  //document.getElementById("modal-reutilizable-tittle").textContent = titulo;
  document.getElementById("modal-reutilizable-tittle").classList.add("hidden");
  // Reemplazar el form-modal con uno nuevo limpio
  const bodyModal = document.getElementById("modal-content");
  const form = document.getElementById("form-modal");
  const footModal = document.getElementById("modal-foot");
  form.innerHTML="";
  footModal.innerHTML="";
  bodyModal.innerHTML=templateVista;
  document.getElementById("form-modal").classList.add("hidden");
  document.getElementById("modal-foot").classList.add("hidden");
  modal.classList.remove("hidden");
}



function abrirModalFiltrosIngresoDetalle() {
  abrirModalFiltros("Filtros de Ingresos", "filtrosIngreso", () => {
    window.ingresoDetalleFilter.setFechaDesde(document.getElementById("filtro-ingreso-fecha-desde").value);
    window.ingresoDetalleFilter.setFechaHasta(document.getElementById("filtro-ingreso-fecha-hasta").value);
    window.ingresoDetalleFilter.setImporteMin(document.getElementById("filtro-ingreso-importe-min").value);
    window.ingresoDetalleFilter.setImporteMax(document.getElementById("filtro-ingreso-importe-max").value);
    window.ingresoDetalleFilter.setConcepto(document.getElementById("filtro-ingreso-concepto").value);
    window.ingresoDetalleFilter.setEstado(document.getElementById("filtro-ingreso-estado").value);
    window.ingresoDetalleFilter.setMoneda(document.getElementById("filtro-ingreso-moneda").value);
    window.ingresoDetalleFilter.setMedio(document.getElementById("filtro-ingreso-medio").value);
    window.ingresoDetalleFilter.applyFilters();
    //renderIngresosCliente();
    console.log(window.ingresoDetalleFilter.hasFilters());
    if(window.ingresoDetalleFilter.hasFilters()){
      
      document.getElementById("btn-remover-filtros-ingreso-detalle").classList.remove("hidden");
    }
  });

  if (window.ingresoDetalleFilter.hasFilters()) {
    cargarDatosFiltroIngresoDetalle();
  }
}


function cargarDatosFiltroIngresoDetalle() {
  document.getElementById("filtro-ingreso-fecha-desde").value = window.ingresoDetalleFilter.filters.fechaDesde;
  document.getElementById("filtro-ingreso-fecha-hasta").value = window.ingresoDetalleFilter.filters.fechaHasta;
  document.getElementById("filtro-ingreso-importe-min").value = window.ingresoDetalleFilter.filters.importeMin;
  document.getElementById("filtro-ingreso-importe-max").value = window.ingresoDetalleFilter.filters.importeMax;
  document.getElementById("filtro-ingreso-concepto").value = window.ingresoDetalleFilter.filters.concepto;
  document.getElementById("filtro-ingreso-estado").value = window.ingresoDetalleFilter.filters.estado;
  document.getElementById("filtro-ingreso-moneda").value = window.ingresoDetalleFilter.filters.moneda;
  document.getElementById("filtro-ingreso-medio").value = window.ingresoDetalleFilter.filters.medio;
}


function abrirModalFiltrosEgresoDetalle() {
  abrirModalFiltros("Filtros de Egresos", "filtrosEgreso", () => {
    window.egresoDetalleFilter.setFechaDesde(document.getElementById("filtro-egreso-fecha-desde").value);
    window.egresoDetalleFilter.setFechaHasta(document.getElementById("filtro-egreso-fecha-hasta").value);
    window.egresoDetalleFilter.setImporteMin(document.getElementById("filtro-egreso-importe-min").value);
    window.egresoDetalleFilter.setImporteMax(document.getElementById("filtro-egreso-importe-max").value);
    window.egresoDetalleFilter.setConcepto(document.getElementById("filtro-egreso-concepto").value);
    window.egresoDetalleFilter.setEstado(document.getElementById("filtro-egreso-estado").value);
    window.egresoDetalleFilter.setMoneda(document.getElementById("filtro-egreso-moneda").value);
    window.egresoDetalleFilter.setMedio(document.getElementById("filtro-egreso-medio").value);
    window.egresoDetalleFilter.applyFilters();
    //renderIngresosCliente();
    if(window.egresoDetalleFilter.hasFilters()){
      document.getElementById("btn-remover-filtros-egreso-detalle").classList.remove("hidden");
    }
  });

  if (window.egresoDetalleFilter.hasFilters()) {
    cargarDatosFiltroEgresoDetalle();
  }
}


function cargarDatosFiltroEgresoDetalle() {
  document.getElementById("filtro-egreso-fecha-desde").value = window.egresoDetalleFilter.filters.fechaDesde;
  document.getElementById("filtro-egreso-fecha-hasta").value = window.egresoDetalleFilter.filters.fechaHasta;
  document.getElementById("filtro-egreso-importe-min").value = window.egresoDetalleFilter.filters.importeMin;
  document.getElementById("filtro-egreso-importe-max").value = window.egresoDetalleFilter.filters.importeMax;
  document.getElementById("filtro-egreso-concepto").value = window.egresoDetalleFilter.filters.concepto;
  document.getElementById("filtro-egreso-estado").value = window.egresoDetalleFilter.filters.estado;
  document.getElementById("filtro-egreso-moneda").value = window.egresoDetalleFilter.filters.moneda;
  document.getElementById("filtro-egreso-medio").value = window.egresoDetalleFilter.filters.medio;
}



