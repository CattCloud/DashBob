



// === Editar cliente (rellena el formulario) ===
function editarCliente(id) {
    const clienteActual = window.templatesStore.getClienteById(id);
    //console.log(clienteActual);
    document.getElementById("cliente-email").value = clienteActual.email;
    document.getElementById("cliente-nombre").value = clienteActual.nombre;
    document.getElementById("cliente-telefono").value = clienteActual.telefono;
    document.getElementById("cliente-tipo-documento").value = clienteActual.tipoDocumento;
    document.getElementById("cliente-numero-documento").value = clienteActual.numeroDocumento;
    //document.getElementById("cliente-facturacion-ruc").value = clienteActual.facturacionRuc;
    //document.getElementById("cliente-facturacion-nombre").value = clienteActual.facturacionNombre;
    document.getElementById("cliente-observaciones").value = clienteActual.observaciones;
    // Agrega atributo para saber que se está editando
    document.getElementById("form-cliente").dataset.editando = id;
    // Cambia el texto del botón al editar
    document.querySelector("#form-cliente button[type='submit']").textContent = "Actualizar Datos";
  }




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
        cargarClientesSelect();
        renderDashboard();
      }
    });
}

