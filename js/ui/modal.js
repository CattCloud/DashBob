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
const FormTemplatesModal = {
  editarIngresoPendiente: `

      <div>
        <label class="block mb-1 font-bold" for="editar-ingreso-banco">Banco</label>
        <select id="editar-ingreso-banco" class="p-2 border rounded w-full" name="banco" required>
          ${getOpcionesBanco()}
        </select>
      </div>

      <div>
        <label class="block mb-1 font-bold" for="editar-ingreso-medio">Medio de pago</label>
        <select id="editar-ingreso-medio" class="p-2 border rounded w-full" name="medio" required>
          ${getOpcionesMediosPago()}
        </select>
      </div>

      <div>
        <label class="block mb-1 font-bold" for="editar-ingreso-concepto">Concepto</label>
        <select id="editar-ingreso-concepto" class="p-2 border rounded w-full" name="concepto" required>
          ${getOpcionesConceptoIngreso()}
        </select>
      </div>

      <div>
        <label class="block mb-1 font-bold" for="editar-ingreso-importe">Importe</label>
        <input type="number" id="editar-ingreso-importe" class="p-2 border rounded w-full" name="importe" placeholder="Importe" required>
      </div>
  `,

  editarIngresoFacturado: `
    <div>
      <label class="block mb-1 font-bold" for="editar-ingreso-banco">Banco</label>
      <select id="editar-ingreso-banco" class="p-2 border rounded w-full" name="banco" required>
        ${getOpcionesBanco()}
      </select>
    </div>

    <div>
      <label class="block mb-1 font-bold" for="editar-ingreso-medio">Medio de pago</label>
      <select id="editar-ingreso-medio" class="p-2 border rounded w-full" name="medio" required>
        ${getOpcionesMediosPago()}
      </select>
    </div>

    <div>
      <label class="block mb-1 font-bold" for="editar-ingreso-concepto">Concepto</label>
      <select id="editar-ingreso-concepto" class="p-2 border rounded w-full" name="concepto" required>
        ${getOpcionesConceptoIngreso()}
      </select>
    </div>
`,


editarIngresoSaldoFavor: `
    <div>
      <label class="block mb-1 font-bold" for="editar-ingreso-importe">Importe</label>
      <input type="number" id="editar-ingreso-importe" class="p-2 border rounded w-full" name="importe" placeholder="Importe" required>
    </div>

    <div>
      <label class="block mb-1 font-bold" for="editar-ingreso-banco">Banco</label>
      <select id="editar-ingreso-banco" class="p-2 border rounded w-full" name="banco" required>
        ${getOpcionesBanco()}
      </select>
    </div>

    <div>
      <label class="block mb-1 font-bold" for="editar-ingreso-medio">Medio de pago</label>
      <select id="editar-ingreso-medio" class="p-2 border rounded w-full" name="medio" required>
        ${getOpcionesMediosPago()}
      </select>
    </div>

    <div>
      <label class="block mb-1 font-bold" for="editar-ingreso-concepto">Concepto</label>
      <select id="editar-ingreso-concepto" class="p-2 border rounded w-full" name="concepto" required>
        ${getOpcionesConceptoIngreso()}
      </select>
    </div>
  `
,
editarEgresoPendiente: `
  <div>
    <label class="block mb-1 font-bold" for="editar-egreso-banco">Banco</label>
    <select id="editar-egreso-banco" class="p-2 border rounded w-full" name="banco" required>
      ${getOpcionesBanco()}
    </select>
  </div>

  <div>
    <label class="block mb-1 font-bold" for="editar-egreso-medio">Medio de pago</label>
    <select id="editar-egreso-medio" class="p-2 border rounded w-full" name="medio" required>
      ${getOpcionesMediosPago()}
    </select>
  </div>

  <div>
    <label class="block mb-1 font-bold" for="editar-egreso-concepto">Concepto</label>
    <select id="editar-egreso-concepto" class="p-2 border rounded w-full" name="concepto" required>
      ${getOpcionesConceptoEgreso()}
    </select>
  </div>

  <div>
    <label class="block mb-1 font-bold" for="editar-egreso-importe">Importe</label>
    <input type="number" id="editar-egreso-importe" class="p-2 border rounded w-full" name="importe" placeholder="Importe" required>
  </div>
  `,
  editarEgresoCompletado: `
    <div>
      <label class="block mb-1 font-bold" for="editar-egreso-banco">Banco</label>
      <select id="editar-egreso-banco" class="p-2 border rounded w-full" name="banco" required>
        ${getOpcionesBanco()}
      </select>
    </div>

    <div>
      <label class="block mb-1 font-bold" for="editar-egreso-medio">Medio de pago</label>
      <select id="editar-egreso-medio" class="p-2 border rounded w-full" name="medio" required>
        ${getOpcionesMediosPago()}
      </select>
    </div>

    <div>
      <label class="block mb-1 font-bold" for="editar-egreso-concepto">Concepto</label>
      <select id="editar-egreso-concepto" class="p-2 border rounded w-full" name="concepto" required>
        ${getOpcionesConceptoEgreso()}
      </select>
    </div>
  `
};




const botonesFormReutilizable=
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

function abrirModalEditar(tipo, titulo, casoModal, onAceptar, transaccion, campos) {
  const modal = document.getElementById("modal-reutilizable");
  document.getElementById("modal-reutilizable-tittle").textContent = titulo;

  // Reemplazar el form-modal con uno nuevo limpio
  const oldForm = document.getElementById("form-modal");
  const newForm = oldForm.cloneNode(false); // Sin hijos ni eventos
  newForm.innerHTML = getHTMLFormModal(casoModal) + botonesFormReutilizable;
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


// Ejemplo de uso:
function abrirModalEditarIngreso(titulo, casoModal, onAceptar, ingreso, campos) {
  abrirModalEditar("ingreso", titulo, casoModal, onAceptar, ingreso, campos);
}

function abrirModalEditarEgreso(titulo, casoModal, onAceptar, egreso, campos) {
  abrirModalEditar("egreso", titulo, casoModal, onAceptar, egreso, campos);
}

function cerrarModalReutilizable() {
  document.getElementById("modal-reutilizable").classList.add("hidden");
}


