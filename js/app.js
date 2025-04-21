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
      actualizarDashboard();
    }
  });
});



// === Boton Registrar o editar cliente ===
document.getElementById("form-cliente").addEventListener("submit", (e) => {
  e.preventDefault();
  const idEditando = e.target.dataset.editando;

  const clienteData = {
    email: document.getElementById("cliente-email").value,
    nombre: document.getElementById("cliente-nombre").value,
    telefono: document.getElementById("cliente-telefono").value,
    tipoDocumento: document.getElementById("cliente-tipo-documento").value,
    numeroDocumento: document.getElementById("cliente-numero-documento").value,
    //facturacionRuc: document.getElementById("cliente-facturacion-ruc").value,
    //facturacionNombre: document.getElementById("cliente-facturacion-nombre").value,
    observaciones: document.getElementById("cliente-observaciones").value,
  };


  if (idEditando) { 
    try {
      const editCliente=window.templatesStore.updateCliente(idEditando,clienteData);
      console.log("Cliente editado exitosamente:", editCliente);
    } catch (error) {
        console.error("Error al editar cliente:", error.message);
    }
    delete e.target.dataset.editando;
  } else {
      try {
        const nuevoCliente=window.templatesStore.addCliente(clienteData);
        console.log("Cliente agregado exitosamente:", nuevoCliente);
        console.log(window.templatesStore.getClientes());
        //return nuevoCliente;
      } catch (error) {
          console.error("Error al agregar cliente:", error.message);
      }
  }

      e.target.reset();
      mostrarClientes();
      cargarClientesSelect();

      // Restaura el botón al estado original
      document.querySelector("#form-cliente button[type='submit']").textContent = "Registrar Cliente";
});


// === Mostrar clientes con botones de editar y eliminar ===
function mostrarClientes() {
  const contenedor = document.getElementById("tabla-clientes");
  const clientes=window.templatesStore.getClientes();
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

  const clienteActual = window.templatesStore.getClienteById(id);

  document.getElementById("cliente-email").value = clienteActual.email;
  document.getElementById("cliente-nombre").value = clienteActual.nombre;
  document.getElementById("cliente-telefono").value = clienteActual.telefono;
  document.getElementById("cliente-tipo-documento").value = clienteActual.tipoDocumento;
  document.getElementById("cliente-numero-documento").value = clienteActual.numeroDocumento;
  //document.getElementById("cliente-facturacion-ruc").value = clienteActual.facturacionRuc;
  //document.getElementById("cliente-facturacion-nombre").value = clienteActual.facturacionNombre;
  document.getElementById("cliente-observaciones").value = clienteActual.observaciones;

  // Agrega atributo para saber que se está editando
  document.getElementById("form-cliente").dataset.editando = id;

  // Cambia el texto del botón al editar
  document.querySelector("#form-cliente button[type='submit']").textContent = "Actualizar Datos";
}


// === Eliminar cliente ===
function eliminarCliente(id) {
  mostrarModalEliminacion({
    titulo: "¿Eliminar cliente?",
    mensaje: "Esta acción eliminará al cliente permanentemente.",
    onConfirm: () => {
      try {
        if(window.templatesStore.deleteCliente(id)){
          console.log("Cliente eliminado exitosamente:");
        }
      } catch (error) {
          console.error("Error al eliminar cliente:", error.message);
      }
      mostrarClientes();
      cargarClientesSelect();
      actualizarDashboard();
    }
  });
  /*
  clientes = clientes.filter(c => c.id !== id);
  ingresos = ingresos.filter(i => i.clienteId !== id);
  egresos = egresos.filter(e => e.clienteId !== id);

  localStorage.setItem("clientes", JSON.stringify(clientes));
  localStorage.setItem("ingresos", JSON.stringify(ingresos));
  localStorage.setItem("egresos", JSON.stringify(egresos));
*/

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

 
  const nuevoIngreso = {
    clienteId: document.getElementById("ingreso-cliente").value,
    moneda: document.getElementById("ingreso-moneda").value,
    medioPago : document.getElementById("ingreso-medio").value,
    banco: document.getElementById("ingreso-banco").value,
    importe: document.getElementById("ingreso-importe").value,
    concepto: document.getElementById("ingreso-concepto").value
  };
  const ingreso= window.templatesStore.addIngreso(nuevoIngreso);
  console.log("Ingreso registrado: ",ingreso);
  e.target.reset();
  e.target.classList.add("hidden");
  actualizarDashboard();
  /*
  const nuevo = {
    clienteId: document.getElementById("ingreso-cliente").value,
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
  };*/
  //ingresos.push(nuevoEgreso);
  //localStorage.setItem("ingresos", JSON.stringify(ingresos));

});


// === Cargar clientes en los select de ingresos, egresos y reportes ===
function cargarClientesSelect() {
  const clientes=window.templatesStore.getClientes();
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

// === Egresos ===
document.getElementById("nuevo-egreso-btn").addEventListener("click", () => {
  document.getElementById("form-egreso").classList.remove("hidden");
});

document.getElementById("cancelar-egreso").addEventListener("click", () => {
  document.getElementById("form-egreso").classList.add("hidden");
});

document.getElementById("form-egreso").addEventListener("submit", (e) => {
  e.preventDefault();
   
  const nuevoEgreso = {
    clienteId: document.getElementById("egreso-cliente").value,
    moneda: document.getElementById("egreso-moneda").value,
    medio : document.getElementById("egreso-medio").value,
    banco: document.getElementById("egreso-banco").value,
    importe: document.getElementById("egreso-monto").value,
    concepto: document.getElementById("egreso-concepto").value
  };

  try {
    const newEgreso=window.templatesStore.addEgreso(nuevoEgreso);
    console.log("Egreso agregado exitosamente:", newEgreso);
  
  } catch (error) {
      console.error("Error al agregar egreso:", error.message);
  }
  /*
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
  localStorage.setItem("egresos", JSON.stringify(egresos));*/
  e.target.reset();
  e.target.classList.add("hidden");
  actualizarDashboard();
});



// === Dashboard: resumen financiero ===
function actualizarDashboard() {
  console.log(window.templatesStore.getEgresos());
  const totalIngresos = window.templatesStore.getIngresos().reduce((sum, i) => sum + parseFloat(i.importe), 0);
  const totalEgresos = window.templatesStore.getEgresos().reduce((sum, e) => sum + parseFloat(e.importe), 0);
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
          window.templatesStore.getIngresos().reduce((sum, i) => sum + parseFloat(i.importe), 0),
          window.templatesStore.getEgresos().reduce((sum, e) => sum + parseFloat(e.importe), 0)
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


