






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
    abrirModalVista(getCardCliente(id));
}
