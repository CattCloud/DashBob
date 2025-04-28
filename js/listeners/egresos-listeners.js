// === Egresos listeners===

//Boton para registrar egreso
document.getElementById("nuevo-egreso-btn").addEventListener("click", () => {
  registrarEgreso();
});



document.getElementById('input-csv-egresos').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    importarEgresosDesdeCSV({ target: { files: [file] } }); // 🔹 Ejecuta la importación automáticamente
  } else {
    notyf.error("Por favor, selecciona un archivo CSV válido."); // 🔹 Manejo de error si no selecciona archivo
  }
});


document.getElementById('importar-egreso-btn').addEventListener('click', function() {
  document.getElementById('input-csv-egresos').click(); // 🔹 Activa la ventana para seleccionar archivo
});

