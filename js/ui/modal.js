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




// Ejemplo de uso:
function abrirModalEditarIngreso(titulo, casoModal, onAceptar, ingreso, campos) {
  abrirModalEditarTransaccion("ingreso", titulo, casoModal, onAceptar, ingreso, campos);
}

function abrirModalEditarEgreso(titulo, casoModal, onAceptar, egreso, campos) {
  abrirModalEditarTransaccion("egreso", titulo, casoModal, onAceptar, egreso, campos);
}

function cerrarModalReutilizable() {
  document.getElementById("modal-reutilizable").classList.add("hidden");
}


