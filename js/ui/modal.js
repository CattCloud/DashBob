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


const contentBodyModal={
  pendiente:`<p id="saldo-final-cliente" class="md:col-span-2 text-gray-700 font-bold">Saldo cliente: S/ 0.00</p>
  `,
  facturado:`
  `,
  "saldo a favor":`
  `  
}



// === Modal reutilizable ===



const botonesRegistrarFormReutilizable=
        `
        <div class="md:col-span-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto">Registrar</button>
          <button type="reset" onclick="cerrarModalReutilizable()" class="bg-gray-300 px-4 py-2 rounded w-full sm:w-auto">Cancelar</button>
        </div>
        `

const botonesEditarFormReutilizable=
        `
          <div id="btns-form" class="mt-6 flex justify-end space-x-2 w-full">
          <button type="reset" class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
                  onclick="cerrarModalReutilizable()">Cancelar</button>
          <button id="btn-aceptar" type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Aceptar
          </button>
          </div>
        `



function getHTMLFormModal(casoModal){
  return FormTemplatesModal[casoModal] || `<p>Error:No se reconoce el caso para abrir el modal</p>`;
}

function getHTMLBodyModal(estado){
  return contentBodyModal[estado] || `<p>Error:No se reconoce el estado para abrir el modal</p>`;
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


function abrirModalEditarTransaccion(tipo, titulo, casoModal, onAceptar, transaccion, campos) {
  const modal = document.getElementById("modal-reutilizable");
  document.getElementById("modal-reutilizable-tittle").textContent = titulo;

  // Reemplazar el form-modal con uno nuevo limpio
  const oldForm = document.getElementById("form-modal");
  const newForm = oldForm.cloneNode(false); // Sin hijos ni eventos
  newForm.innerHTML = getHTMLFormModal(casoModal) + botonesEditarFormReutilizable;
  oldForm.replaceWith(newForm);
  newForm.id = "form-modal";
  modal.classList.remove("hidden");
  // Cargar datos según el tipo (ingreso o egreso)
  cargarDatosEditarTransaccion(`editar-${tipo}`, campos, transaccion);
  newForm.addEventListener("submit", (e) => {
    e.preventDefault();
    onAceptar(transaccion.id); // Ejecuta la lógica del botón Aceptar
    modal.classList.add("hidden");
  });
}




function abrirModalRegistrar(titulo, casoModal, onAceptar) {
  const modal = document.getElementById("modal-reutilizable");
  document.getElementById("modal-reutilizable-tittle").textContent = titulo;
  // Reemplazar el form-modal con uno nuevo limpio
  const oldForm = document.getElementById("form-modal");
  const newForm = oldForm.cloneNode(false); // Sin hijos ni eventos
  newForm.innerHTML = getHTMLFormModal(casoModal) + botonesRegistrarFormReutilizable;
  oldForm.replaceWith(newForm);
  newForm.id = "form-modal";
  modal.classList.remove("hidden");
  newForm.addEventListener("submit", (e) => {
    e.preventDefault();
    onAceptar(); // Ejecuta la lógica del botón Aceptar
    modal.classList.add("hidden");
  });
}


function abrirModalEditarCliente(titulo, casoModal, onAceptar,cliente) {
  const modal = document.getElementById("modal-reutilizable");
  document.getElementById("modal-reutilizable-tittle").textContent = titulo;
  // Reemplazar el form-modal con uno nuevo limpio
  const oldForm = document.getElementById("form-modal");
  const newForm = oldForm.cloneNode(false); // Sin hijos ni eventos
  newForm.innerHTML = getHTMLFormModal(casoModal) + botonesEditarFormReutilizable;
  oldForm.replaceWith(newForm);
  newForm.id = "form-modal";
  modal.classList.remove("hidden");
  cargarDatosEditarCliente(cliente);
  newForm.addEventListener("submit", (e) => {
    e.preventDefault();
    onAceptar(cliente.id); // Ejecuta la lógica del botón Aceptar
    modal.classList.add("hidden");
  });
}


function abrirModalEditarIngreso(titulo, casoModal, onAceptar, ingreso, campos) {
  abrirModalEditarTransaccion("ingreso", titulo, casoModal, onAceptar, ingreso, campos);
}

function abrirModalEditarEgreso(titulo, casoModal, onAceptar, egreso, campos) {
  abrirModalEditarTransaccion("egreso", titulo, casoModal, onAceptar, egreso, campos);
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
  newForm.innerHTML = getHTMLFormModal(casoModal) + botonesRegistrarFormReutilizable;
  oldForm.replaceWith(newForm);
  newForm.id = "form-modal";
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
    document.getElementById("btn-remover-filtros-cliente").classList.remove("hidden");
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
    document.getElementById("btn-remover-filtros-ingreso").classList.remove("hidden");
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
    document.getElementById("btn-remover-filtros-egreso").classList.remove("hidden");
  });

  if (window.egresoFilter.hasFilters()) {
    cargarDatosFiltroEgreso();
  }
}

function cerrarModalReutilizable() {
  document.getElementById("modal-reutilizable").classList.add("hidden");
}


