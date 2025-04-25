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
  
//Boton para registrar cliente
  document.getElementById("nuevo-cliente-btn").addEventListener("click", () => {
    console.log("Botón 'Nuevo Cliente' clickeado.");
    registrarCliente();
  });

