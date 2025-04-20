// app.js

// === Utilidades ===
// Genera un ID con prefijo y los últimos 6 dígitos del timestamp actual
const generarId = (prefijo) => `${prefijo}${Date.now().toString().slice(-6)}`;

// Devuelve la fecha y hora actual en formato ISO
const obtenerFechaHoraActual = () => new Date().toISOString();

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
      actualizarDashboard();
    }
  });
});

// === Datos principales ===
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let ingresos = JSON.parse(localStorage.getItem("ingresos")) || [];
let egresos = JSON.parse(localStorage.getItem("egresos")) || [];

// === Registrar o editar cliente ===
document.getElementById("form-cliente").addEventListener("submit", (e) => {
  e.preventDefault();
  const idEditando = e.target.dataset.editando;

  const clienteData = {
    id: idEditando || generarId("C"),
    email: document.getElementById("cliente-email").value,
    nombre: document.getElementById("cliente-nombre").value,
    telefono: document.getElementById("cliente-telefono").value,
    tipoDocumento: document.getElementById("cliente-tipo-documento").value,
    numeroDocumento: document.getElementById("cliente-numero-documento").value,
    facturacionRuc: document.getElementById("cliente-facturacion-ruc").value,
    facturacionNombre: document.getElementById("cliente-facturacion-nombre").value,
    observaciones: document.getElementById("cliente-observaciones").value,
    fechaRegistro: obtenerFechaHoraActual()
  };

  if (idEditando) {
    const index = clientes.findIndex(c => c.id === idEditando);
    clientes[index] = clienteData;
    delete e.target.dataset.editando;
  } else {
    clientes.push(clienteData);
  }

  localStorage.setItem("clientes", JSON.stringify(clientes));
  e.target.reset();
  mostrarClientes();
  cargarClientesSelect();

  // Restaura el botón al estado original
  document.querySelector("#form-cliente button[type='submit']").textContent = "Registrar Cliente";
});

// === Mostrar clientes con botones de editar y eliminar ===
function mostrarClientes() {
  const contenedor = document.getElementById("tabla-clientes");
  if (clientes.length === 0) {
    contenedor.innerHTML = "<p>No hay clientes registrados.</p>";
    return;
  }
  contenedor.innerHTML = `
    <table class="min-w-full">
      <thead>
        <tr>
          <th>Email</th><th>Nombre</th><th>Teléfono</th><th>Documento</th><th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${clientes.map(c => `
          <tr>
            <td>${c.email}</td>
            <td>${c.nombre}</td>
            <td>${c.telefono}</td>
            <td>${c.tipoDocumento} ${c.numeroDocumento}</td>
            <td>
              <button onclick="editarCliente('${c.id}')" class="text-blue-500" title="Editar">🖉</button>
              <button onclick="eliminarCliente('${c.id}')" class="text-red-500 ml-2" title="Eliminar">🗑️</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>`;
}

// === Editar cliente (rellena el formulario) ===
function editarCliente(id) {
  const cliente = clientes.find(c => c.id === id);
  if (!cliente) return;

  document.getElementById("cliente-email").value = cliente.email;
  document.getElementById("cliente-nombre").value = cliente.nombre;
  document.getElementById("cliente-telefono").value = cliente.telefono;
  document.getElementById("cliente-tipo-documento").value = cliente.tipoDocumento;
  document.getElementById("cliente-numero-documento").value = cliente.numeroDocumento;
  document.getElementById("cliente-facturacion-ruc").value = cliente.facturacionRuc;
  document.getElementById("cliente-facturacion-nombre").value = cliente.facturacionNombre;
  document.getElementById("cliente-observaciones").value = cliente.observaciones;

  // Agrega atributo para saber que se está editando
  document.getElementById("form-cliente").dataset.editando = id;

  // Cambia el texto del botón al editar
  document.querySelector("#form-cliente button[type='submit']").textContent = "Actualizar Datos";
}

// === Eliminar cliente y sus ingresos/egresos relacionados ===
function eliminarCliente(id) {
  clientes = clientes.filter(c => c.id !== id);
  ingresos = ingresos.filter(i => i.clienteId !== id);
  egresos = egresos.filter(e => e.clienteId !== id);

  localStorage.setItem("clientes", JSON.stringify(clientes));
  localStorage.setItem("ingresos", JSON.stringify(ingresos));
  localStorage.setItem("egresos", JSON.stringify(egresos));

  mostrarClientes();
  cargarClientesSelect();
  actualizarDashboard();
}

// === Ingresos ===
document.getElementById("nuevo-ingreso-btn").addEventListener("click", () => {
  document.getElementById("form-ingreso").classList.remove("hidden");
});

document.getElementById("cancelar-ingreso").addEventListener("click", () => {
  document.getElementById("form-ingreso").classList.add("hidden");
});

document.getElementById("form-ingreso").addEventListener("submit", (e) => {
  e.preventDefault();
  const nuevo = {
    id: generarId("I"),
    clienteId: document.getElementById("ingreso-cliente").value,
    fecha: obtenerFechaHoraActual(),
    placaVehiculo: document.getElementById("vehiculo-datos").value,
    empresaVehiculo: document.getElementById("subasta-detalles").value,
    fechaSubasta: "",
    numeroLote: "",
    entidadFinanciera: "",
    numeroCuentaOrigen: "",
    moneda: "PEN",
    importe: parseFloat(document.getElementById("pago-garantia").value),
    tieneComprobante: true,
    concepto: "Garantía para subasta",
    estado: "PENDIENTE",
    registradoPor: "Admin",
    fechaRegistro: obtenerFechaHoraActual()
  };
  ingresos.push(nuevo);
  localStorage.setItem("ingresos", JSON.stringify(ingresos));
  e.target.reset();
  e.target.classList.add("hidden");
  actualizarDashboard();
});

// === Egresos ===
document.getElementById("nuevo-egreso-btn").addEventListener("click", () => {
  document.getElementById("form-egreso").classList.remove("hidden");
});

document.getElementById("cancelar-egreso").addEventListener("click", () => {
  document.getElementById("form-egreso").classList.add("hidden");
});

document.getElementById("form-egreso").addEventListener("submit", (e) => {
  e.preventDefault();
  const nuevo = {
    id: generarId("E"),
    clienteId: document.getElementById("egreso-cliente").value,
    fecha: obtenerFechaHoraActual(),
    medio: "Transferencia",
    banco: "",
    numeroCuentaDestino: document.getElementById("cuenta-destino").value,
    moneda: "PEN",
    importe: parseFloat(document.getElementById("egreso-monto").value),
    concepto: document.getElementById("concepto").value,
    estado: "COMPLETADO",
    registradoPor: "Admin",
    fechaRegistro: obtenerFechaHoraActual()
  };
  egresos.push(nuevo);
  localStorage.setItem("egresos", JSON.stringify(egresos));
  e.target.reset();
  e.target.classList.add("hidden");
  actualizarDashboard();
});

// === Cargar clientes en los select de ingresos, egresos y reportes ===
function cargarClientesSelect() {
  const selects = [
    document.getElementById("ingreso-cliente"),
    document.getElementById("egreso-cliente"),
    document.getElementById("reporte-cliente")
  ];
  selects.forEach(select => {
    if (!select) return;
    select.innerHTML = '<option value="">Seleccione un cliente</option>' +
      clientes.map(c => `<option value="${c.id}">${c.nombre}</option>`).join("");
  });
}

// === Dashboard: resumen financiero ===
function actualizarDashboard() {
  const totalIngresos = ingresos.reduce((sum, i) => sum + i.importe, 0);
  const totalEgresos = egresos.reduce((sum, e) => sum + e.importe, 0);
  const balance = totalIngresos - totalEgresos;

  document.getElementById("total-ingresos").textContent = `S/ ${totalIngresos.toFixed(2)}`;
  document.getElementById("total-egresos").textContent = `S/ ${totalEgresos.toFixed(2)}`;
  document.getElementById("balance-general").textContent = `S/ ${balance.toFixed(2)}`;
  actualizarGrafico();
}

// === Gráfico de barras con Chart.js ===
let chart;
function actualizarGrafico() {
  const ctx = document.getElementById("chart-ingresos-egresos").getContext("2d");
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Ingresos', 'Egresos'],
      datasets: [{
        label: 'Soles',
        data: [
          ingresos.reduce((sum, i) => sum + i.importe, 0),
          egresos.reduce((sum, e) => sum + e.importe, 0)
        ],
        backgroundColor: ['#22c55e', '#ef4444']
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });
}

// === Inicialización ===
mostrarClientes();
cargarClientesSelect();
actualizarDashboard();
