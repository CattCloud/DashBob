document.getElementById('input-csv-clientes').addEventListener('change', function(event) {
    const archivoNombre = document.getElementById('archivo-nombre');
    const file = event.target.files[0];
    if (file) {
      archivoNombre.textContent = file.name; // Muestra el nombre del archivo seleccionado
    } else {
      archivoNombre.textContent = "Ningún archivo seleccionado"; // Muestra un mensaje predeterminado
    }
  });
  
  document.getElementById('importar-btn').addEventListener('click', function() {
    const inputFile =document.getElementById('input-csv-clientes') ;
    if (inputFile.files.length > 0) {
      importarClientesDesdeCSV({ target: { files: inputFile.files } });
    } else {
      notyf.error("Por favor, selecciona el archivo que desea importar.");
    }
  });
  

// === Boton Registrar o editar cliente ===
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
  