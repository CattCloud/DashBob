document.getElementById('input-csv-clientes').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    importarClientesDesdeCSV({ target: { files: [file] } }); // 🔹 Ejecuta la importación automáticamente
  } else {
    notyf.error("Por favor, selecciona un archivo CSV válido."); // 🔹 Manejo de error si no selecciona archivo
  }
});

// === Evento al hacer clic en el botón "Importar CSV" ===
document.getElementById('importar-btn').addEventListener('click', function() {
  document.getElementById('input-csv-clientes').click(); // 🔹 Activa la ventana para seleccionar archivo
});

  
//Boton para registrar cliente
  document.getElementById("nuevo-cliente-btn").addEventListener("click", () => {
    console.log("Botón 'Nuevo Cliente' clickeado.");
    registrarCliente();
  });



