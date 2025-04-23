// === Egresos listeners===
document.getElementById("nuevo-egreso-btn").addEventListener("click", () => {
    document.getElementById("form-egreso").classList.remove("hidden");
  });
  
document.getElementById("cancelar-egreso").addEventListener("click", () => {
    document.getElementById("form-egreso").classList.add("hidden");
});


document.getElementById('input-csv-egresos').addEventListener('change', function(event) {
  const archivoNombreEgreso = document.getElementById('archivo-nombre-egreso');
  const file = event.target.files[0];
  if (file) {
    archivoNombreEgreso.textContent = file.name; // Muestra el nombre del archivo seleccionado
  } else {
    archivoNombreEgreso.textContent = "Ningún archivo seleccionado"; // Muestra un mensaje predeterminado
  }
});


document.getElementById('importar-egreso-btn').addEventListener('click', function() {
  const inputFileEgreso=document.getElementById('input-csv-egresos')
  if (inputFileEgreso.files.length > 0) { 
    importarEgresosDesdeCSV({ target: { files: inputFileEgreso.files } });
  } else {
    notyf.error("Por favor, selecciona el archivo que desea importar.");
  }
});



document.getElementById("egreso-select-cliente").addEventListener("change", function() {
  const selectedValue = this.value;
  if (selectedValue !== "") { // Comprobamos que no sea la opción por defecto
     const container_saldo=document.getElementById("saldo-disponible");
     let balance=window.templatesStore.calcularBalanceCliente(this.value);
     container_saldo.textContent=`Saldo Disponible: S/ ${balance}`;
  } else {
    const container_saldo=document.getElementById("saldo-disponible");
    container_saldo.textContent=`Saldo disponible: S/ 0.00`;
  }
 });



//Listener para registrar un egreso
document.getElementById("form-egreso").addEventListener("submit", (e) => {
  e.preventDefault();
  const nuevoEgreso = {
    clienteId: document.getElementById("egreso-select-cliente").value,
    moneda: document.getElementById("egreso-moneda").value,
    medio : document.getElementById("egreso-medio").value,
    banco: document.getElementById("egreso-banco").value,
    importe: document.getElementById("egreso-monto").value,
    concepto: document.getElementById("egreso-concepto").value
  };
  try {
    const newEgreso=window.templatesStore.addEgreso(nuevoEgreso);
    //console.log(newEgreso);
    notyf.success("Egreso registrado exitosamente");
  } catch (error) {
    notyf.error(error.message);
  }
  e.target.reset();
  e.target.classList.add("hidden");
  renderClientes();
  renderIngresos();
  renderEgresos();
  renderDashboard();
});