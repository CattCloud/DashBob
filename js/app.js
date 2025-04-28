// app.js


// === Secciones SPA ===
const secciones = document.querySelectorAll("main > section");
document.querySelectorAll("aside .section-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const seccion = btn.dataset.section;

    //Oculta las secciones
    secciones.forEach((s) => s.classList.add("hidden"));
    //Muestra solo la seccion seleccionada
    document.getElementById(seccion).classList.remove("hidden");

    if (["ingresos", "egresos", "reportes"].includes(seccion)) {
      cargarClientesSelect();
    }
    if (seccion === "dashboard-general") {
      renderDashboard();
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
console.log(window.templatesStore.getIngresosByCliente("C000"));
console.log(window.templatesStore.getEgresosByCliente("C000"));

