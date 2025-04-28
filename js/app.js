// app.js


// === Secciones SPA ===
const secciones = document.querySelectorAll("main > section");
document.querySelectorAll("aside .section-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const seccion = btn.dataset.section;
    console.log("SI");
    //Oculta las secciones
    secciones.forEach((s) => s.classList.add("hidden"));
    //Muestra solo la seccion seleccionada
    document.getElementById(seccion).classList.remove("hidden");

 
    if (seccion === "dashboard-general") {
      renderDashboard();
    }
    if(seccion === "dashboard-cliente"){
      document.getElementById("cliente-dashboard-select").innerHTML = getOpcionesClientes();
      cargarDashboardCliente(document.getElementById("cliente-dashboard-select").value);
    }
    if(seccion === "detalle-cliente"){
      //console.log("asa");
      document.getElementById("cliente-detalle-select").innerHTML = getOpcionesClientes();
      cargarDetalleCliente(document.getElementById("cliente-detalle-select").value);
    }
    if (seccion === "ingresos") {
      renderIngresos();
    }
    if (seccion === "egresos") {
      renderEgresos();
    }
    if (seccion === "clientes") {
      renderClientes();
    }
  });
});




// === Inicialización ===
inicializarApp();



//localStorage.clear();
console.log(window.templatesStore.getClientes());
//console.log(window.templatesStore.getIngresosByCliente("C000"));
//console.log(window.templatesStore.getEgresosByCliente("C000"));

