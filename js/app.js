// app.js


// === Secciones SPA ===
const secciones = document.querySelectorAll("main > section");
document.querySelectorAll("aside button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const seccion = btn.dataset.section;
    secciones.forEach((s) => s.classList.add("hidden"));
    document.getElementById(seccion).classList.remove("hidden");
    if (["ingresos", "egresos", "reportes"].includes(seccion)) {
      cargarClientesSelect();
    }
    if (seccion === "dashboard") {
      renderDashboard();
    }
  });
});


// === Inicialización ===
inicializarApp();



//localStorage.clear();
//console.log(window.templatesStore.getClientes());

