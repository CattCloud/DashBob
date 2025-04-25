






// === Eliminar cliente ===
function eliminarCliente(id) {
    mostrarModalEliminacion({
      titulo: "¿Eliminar cliente?",
      mensaje: "Esta acción eliminará al cliente permanentemente.",
      onConfirm: () => {
        try {
          if(window.templatesStore.deleteCliente(id)){
            notyf.success("Cliente eliminado exitosamente");
            //console.log("Cliente eliminado exitosamente:");
          }
        } catch (error) {
          notyf.error(error.message);
          //console.error("Error al eliminar cliente:", error.message);
        }
        renderClientes();
        //cargarClientesSelect();
        renderDashboard();
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
    //console.log("CLIENTE NUEVO",nuevoCliente);
    notyf.success("Cliente agregado exitosamente");
    renderClientes();
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
    renderClientes();
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


// === Boton Registrar o editar cliente ===
/*
document.getElementById("form-cliente").addEventListener("submit", (e) => {
  e.preventDefault();
  const idEditando = e.target.dataset.editando;
  const clienteData = {
    email: document.getElementById("cliente-email").value,
    nombre: document.getElementById("cliente-nombre").value,
    telefono: document.getElementById("cliente-telefono").value,
    tipoDocumento: document.getElementById("cliente-tipo-documento").value,
    numeroDocumento: document.getElementById("cliente-numero-documento").value,
    observaciones: document.getElementById("cliente-observaciones").value,
  };


  if (idEditando) { 
    try {
      const editCliente=window.templatesStore.updateCliente(idEditando,clienteData);
      notyf.success("Cliente editado exitosamente");
    } catch (error) {
        notyf.error(error.message);
    }
    delete e.target.dataset.editando;
  } else {
      try {
        const nuevoCliente=window.templatesStore.addCliente(clienteData);
        notyf.success("Cliente agregado exitosamente");
      } catch (error) {
          notyf.error(error.message);
      }
  }
      e.target.reset();
      renderClientes();
      cargarClientesSelect();

      // Restaura el botón al estado original
      document.querySelector("#form-cliente button[type='submit']").textContent = "Registrar Cliente";
});
*/