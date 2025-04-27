






// === Eliminar cliente ===
function eliminarCliente(id) {
    mostrarModalEliminacion({
      titulo: "¿Eliminar cliente?",
      mensaje: "Esta acción eliminará al cliente permanentemente.",
      onConfirm: () => {
        try {
          if(window.templatesStore.deleteCliente(id)){
            notyf.success("Cliente eliminado exitosamente");
            window.clienteFilter.refreshFromStore();
            // renderClientes();
             //cargarClientesSelect();
             renderDashboard();
            //console.log("Cliente eliminado exitosamente:");
          }
        } catch (error) {
          notyf.error(error.message);
          //console.error("Error al eliminar cliente:", error.message);
        }

      }
    });
}


function aplicarregistroCliente(){
  const clienteData = {
    email: document.getElementById("cliente-email").value,
    nombre: document.getElementById("cliente-nombre").value,
    telefono: document.getElementById("cliente-telefono").value,
    tipoDocumento: document.getElementById("cliente-tipoDocumento").value,
    numeroDocumento: document.getElementById("cliente-numeroDocumento").value,
    observaciones: document.getElementById("cliente-observaciones").value,
  };
  //console.log("DataCliente",clienteData);
  try {
    const nuevoCliente=window.templatesStore.addCliente(clienteData);
    console.log(window.templatesStore.getClientes());
    notyf.success("Cliente agregado exitosamente"); 
    window.clienteFilter.refreshFromStore();
    //renderClientes();
    //cargarClientesSelect();
  } catch (error) {
      notyf.error(error.message);
  }
}

function aplicareditarCliente(idEditando){
  const clienteData = {
    email: document.getElementById("cliente-email").value,
    nombre: document.getElementById("cliente-nombre").value,
    telefono: document.getElementById("cliente-telefono").value,
    tipoDocumento: document.getElementById("cliente-tipoDocumento").value,
    numeroDocumento: document.getElementById("cliente-numeroDocumento").value,
    observaciones: document.getElementById("cliente-observaciones").value,
  };

  console.log("DataCliente",clienteData);
  try {
    const editCliente=window.templatesStore.updateCliente(idEditando,clienteData);
    notyf.success("Cliente editado exitosamente");
    window.clienteFilter.refreshFromStore();
    //renderClientes();
    //cargarClientesSelect();
  } catch (error) {
      notyf.error(error.message);
  }

}

function registrarCliente(){
  abrirModalRegistrar("Registrar Cliente","registrar_editar_Cliente",aplicarregistroCliente);
}


function editarCliente(id){
  const clienteActual = window.templatesStore.getClienteById(id);
  abrirModalEditarCliente("Editar Cliente","registrar_editar_Cliente",aplicareditarCliente,clienteActual);
}


function vistaCliente(id){
    abrirModalSoloBody(getCardCliente(id));
}


function searchDetalleCliente(){
  abrirModalSoloBody(getbusquedaClienteDetalle());
}




function filtrarDetalleClientes() {
  const termino = document.getElementById('input-buscar-detalle-cliente').value.toLowerCase().trim();
  const resultados = window.templatesStore.getClientes().filter(cliente => 
    cliente.nombre.toLowerCase().includes(termino) ||
    cliente.numeroDocumento.toLowerCase().includes(termino)
  );

  const tbody = document.getElementById('tabla-resultados-detalle-clientes');
  if (resultados.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="text-center py-4">No se encontraron clientes.</td></tr>`;
    return;
  }

  tbody.innerHTML = resultados.map(cliente => `
    <tr class="border-t hover:bg-gray-100">
      <td class="px-4 py-2">${cliente.nombre}</td>
      <td class="px-4 py-2">${cliente.numeroDocumento}</td>
      <td class="px-4 py-2">
        <button onclick="seleccionarClienteDesdeModal('${cliente.id}')" class="text-blue-600 hover:underline">
          Seleccionar
        </button>
      </td>
    </tr>
  `).join('');
}

function seleccionarClienteDesdeModal(clienteId) {
  const select = document.getElementById('cliente-detalle-select');
  select.value = clienteId; // Asigna el id al select
  cerrarModalSoloBody();
  cargarDetalleCliente(clienteId); // Cargas la información del cliente seleccionado
}




function irADashboardClienteActual() {
  if (!document.getElementById('cliente-detalle-select')) {
    notyf.error("Primero seleccione un cliente p");
    return;
  }
  document.querySelectorAll("main > section").forEach(s => s.classList.add("hidden"));
  document.getElementById("dashboard-cliente").classList.remove("hidden");

  // (Opcional) Puedes cargar automáticamente los datos del dashboard cliente aquí
  //cargarDashboardCliente(clienteSeleccionadoDetalle);
}
