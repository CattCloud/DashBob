// === Ingresos ===
/*document.getElementById("nuevo-ingreso-btn").addEventListener("click", () => {
    document.getElementById("form-ingreso").classList.remove("hidden");
  });
  
  document.getElementById("cancelar-ingreso").addEventListener("click", () => {
    document.getElementById("form-ingreso").classList.add("hidden");
  });
*/  

document.getElementById('input-csv-ingresos').addEventListener('change', function(event) {
    const archivoNombreIngreso = document.getElementById('archivo-nombre-ingreso');
    const file = event.target.files[0];
    if (file) {
      archivoNombreIngreso.textContent = file.name; // Muestra el nombre del archivo seleccionado
    } else {
      archivoNombreIngreso.textContent = "Ningún archivo seleccionado"; // Muestra un mensaje predeterminado
    }
  });
  
  
document.getElementById('importar-ingreso-btn').addEventListener('click', function() {
    const inputFileIngreso = document.getElementById('input-csv-ingresos');
    if (inputFileIngreso.files.length > 0) {
      console.log("sasdas");
      importarIngresosDesdeCSV({ target: { files: inputFileIngreso.files } });
    } else {
      notyf.error("Por favor, selecciona el archivo que desea importar.");
    }
});
  

//Boton para registrar ingresoo
document.getElementById("nuevo-ingreso-btn").addEventListener("click", () => {
  registrarIngreso();
});


