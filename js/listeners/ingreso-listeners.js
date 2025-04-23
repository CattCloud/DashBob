// === Ingresos ===
document.getElementById("nuevo-ingreso-btn").addEventListener("click", () => {
    document.getElementById("form-ingreso").classList.remove("hidden");
  });
  
  document.getElementById("cancelar-ingreso").addEventListener("click", () => {
    document.getElementById("form-ingreso").classList.add("hidden");
  });
  

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
  
  

document.getElementById("form-ingreso").addEventListener("submit", (e) => {
  e.preventDefault();
  const nuevoIngreso = {
    clienteId: document.getElementById("ingreso-select-cliente").value,
    moneda: document.getElementById("ingreso-moneda").value,
    medioPago : document.getElementById("ingreso-medio").value,
    banco: document.getElementById("ingreso-banco").value,
    importe: document.getElementById("ingreso-importe").value,
    concepto: document.getElementById("ingreso-concepto").value
  };
  const ingreso= window.templatesStore.addIngreso(nuevoIngreso);
  notyf.success("Ingreso registrado exitosamente");
  //console.log("Ingreso registrado: ",ingreso);
  e.target.reset();
  e.target.classList.add("hidden");
  renderDashboard();
  renderClientes();
  renderIngresos();
  renderEgresos();
});

