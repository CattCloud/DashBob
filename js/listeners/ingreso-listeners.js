


document.getElementById('input-csv-ingresos').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    importarIngresosDesdeCSV({ target: { files: [file] } }); // 🔹 Ejecuta la importación automáticamente
  } else {
    notyf.error("Por favor, selecciona un archivo CSV válido."); // 🔹 Manejo de error si no selecciona archivo
  }
});


document.getElementById('importar-ingreso-btn').addEventListener('click', function () {
  document.getElementById('input-csv-ingresos').click(); // 🔹 Activa la ventana para seleccionar archivo
});


//Boton para registrar ingresoo
document.getElementById("nuevo-ingreso-btn").addEventListener("click", () => {
  registrarIngreso();
});



