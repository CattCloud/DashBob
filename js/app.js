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
      notyf.success("Cliente editado exitosamente");
      //console.log("Cliente editado exitosamente:", editCliente);
    } catch (error) {
        notyf.error(error.message);
        //console.error("Error al editar cliente:", error.message);
    }
    delete e.target.dataset.editando;
  } else {
      try {
        const nuevoCliente=window.templatesStore.addCliente(clienteData);
        notyf.success("Cliente agregado exitosamente");
        //console.log("Cliente agregado exitosamente:", nuevoCliente);
        //console.log(window.templatesStore.getClientes());
        //return nuevoCliente;
      } catch (error) {
          notyf.error(error.message);
          //console.error("Error al agregar cliente:", error.message);
      }
  }
      e.target.reset();
      mostrarClientes();
      cargarClientesSelect();

      // Restaura el botón al estado original
      document.querySelector("#form-cliente button[type='submit']").textContent = "Registrar Cliente";
});


function mostrarClientes() {
  const contenedor = document.getElementById("tabla-clientes");
  const clientes = window.templatesStore.getClientes();

  if (!clientes.length) {
    contenedor.innerHTML = "<p class='text-gray-600'>No hay clientes registrados.</p>";
    return;
  }

  contenedor.innerHTML = `
    <table class="min-w-full divide-y divide-gray-200 text-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-3 py-2 text-left text-gray-600">Nombre</th>
          <th class="px-3 py-2 text-left text-gray-600 hidden sm:table-cell">Email</th>
          <th class="px-3 py-2 text-left text-gray-600 hidden md:table-cell">Teléfono</th>
          <th class="px-3 py-2 text-left text-gray-600 hidden lg:table-cell">Documento</th>
          <th class="px-3 py-2 text-left text-gray-600">Acciones</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        ${clientes.map(c => `
          <tr>
            <td class="px-3 py-2 font-medium">${c.nombre}</td>
            <td class="px-3 py-2 hidden sm:table-cell">${c.email}</td>
            <td class="px-3 py-2 hidden md:table-cell">${c.telefono}</td>
            <td class="px-3 py-2 hidden lg:table-cell">${c.tipoDocumento} ${c.numeroDocumento}</td>
            <td class="px-3 py-2 space-x-2">
              <button onclick="editarCliente('${c.id}')" class="text-blue-600 hover:underline">Editar</button>
              <button onclick="eliminarCliente('${c.id}')" class="text-red-600 hover:underline">Eliminar</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
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
          notyf.success("Cliente eliminado exitosamente");
          //console.log("Cliente eliminado exitosamente:");
        }
      } catch (error) {
        notyf.error(error.message);
        //console.error("Error al eliminar cliente:", error.message);
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
  notyf.success("Ingreso registrado exitosamente");
  //console.log("Ingreso registrado: ",ingreso);
  e.target.reset();
  e.target.classList.add("hidden");
  actualizarDashboard();
  mostrarClientes();
  mostrarIngresos();
  mostrarEgresos();
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

function getBadgeClase(estado) {
  const clases = {
    PENDIENTE: "bg-yellow-100 text-yellow-800",
    FACTURADO: "bg-blue-100 text-blue-800",
    COMPLETADO: "bg-green-100 text-green-800",
    DEVUELTO: "bg-gray-100 text-gray-800",
    "SALDO A FAVOR": "bg-purple-100 text-purple-800"
  };
  return clases[estado] || "bg-gray-200 text-gray-800";
}



function mostrarIngresos() {
  const contenedor = document.getElementById("tabla-ingresos");
  const ingresos = window.templatesStore.getIngresos();

  if (!ingresos.length) {
    contenedor.innerHTML = "<p class='text-gray-600'>No hay ingresos registrados.</p>";
    return;
  }

  contenedor.innerHTML = `
    <table class="min-w-full divide-y divide-gray-200 text-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-3 py-2 text-left text-gray-600">Cliente</th>
          <th class="px-3 py-2 text-left text-gray-600 hidden sm:table-cell">Banco</th>
          <th class="px-3 py-2 text-left text-gray-600 hidden sm:table-cell">Medio</th>
          <th class="px-3 py-2 text-left text-gray-600">Importe</th>
          <th class="px-3 py-2 text-left text-gray-600 hidden md:table-cell">Concepto</th>
          <th class="px-3 py-2 text-left text-gray-600">Estado</th>
          <th class="px-3 py-2 text-left text-gray-600">Acciones</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        ${ingresos.map(i => `
          <tr>
            <td class="px-3 py-2 font-medium">${window.templatesStore.getClienteById(i.clienteId).nombre}</td>
            <td class="px-3 py-2 hidden sm:table-cell">${i.banco}</td>
            <td class="px-3 py-2 hidden sm:table-cell">${i.medioPago}</td>
            <td class="px-3 py-2">S/. ${parseFloat(i.importe).toFixed(2)}</td>
            <td class="px-3 py-2 hidden md:table-cell">${i.concepto}</td>
            <td class="px-3 py-2">
              <span class="inline-block px-2 py-1 rounded-full text-xs font-semibold ${getBadgeClase(i.estado)}">${i.estado}</span>
            </td>
            <td class="px-3 py-2 space-x-2">
              <button onclick="editarIngreso('${i.id}')" class="text-blue-600 hover:underline">Editar</button>
              <button onclick="eliminarIngreso('${i.id}')" class="text-red-600 hover:underline">Eliminar</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}


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
    notyf.success("Egreso registrado exitosamente");
    //console.log("Egreso agregado exitosamente:", newEgreso);
  } catch (error) {
    notyf.error(error.message);
    //console.error("Error al agregar egreso:", error.message);
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
  mostrarClientes();
  mostrarIngresos();
  mostrarEgresos();
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

function mostrarEgresos() {
  const contenedor = document.getElementById("tabla-egresos");
  const egresos = window.templatesStore.getEgresos();

  if (!egresos.length) {
    contenedor.innerHTML = "<p class='text-gray-600'>No hay egresos registrados.</p>";
    return;
  }

  contenedor.innerHTML = `
    <table class="min-w-full divide-y divide-gray-200 text-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-3 py-2 text-left text-gray-600">Cliente</th>
          <th class="px-3 py-2 text-left text-gray-600 hidden sm:table-cell">Banco</th>
          <th class="px-3 py-2 text-left text-gray-600 hidden sm:table-cell">Medio</th>
          <th class="px-3 py-2 text-left text-gray-600">Importe</th>
          <th class="px-3 py-2 text-left text-gray-600 hidden md:table-cell">Concepto</th>
          <th class="px-3 py-2 text-left text-gray-600">Estado</th>
          <th class="px-3 py-2 text-left text-gray-600">Acciones</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        ${egresos.map(e => `
          <tr>
            <td class="px-3 py-2 font-medium">${window.templatesStore.getClienteById(e.clienteId).nombre}</td>
            <td class="px-3 py-2 hidden sm:table-cell">${e.banco}</td>
            <td class="px-3 py-2 hidden sm:table-cell">${e.medio}</td>
            <td class="px-3 py-2">S/. ${parseFloat(e.importe).toFixed(2)}</td>
            <td class="px-3 py-2 hidden md:table-cell">${e.concepto}</td>
            <td class="px-3 py-2">
              <span class="inline-block px-2 py-1 rounded-full text-xs font-semibold ${getBadgeClase(e.estado)}">${e.estado}</span>
            </td>
            <td class="px-3 py-2 space-x-2">
              <button onclick="editarEgreso('${e.id}')" class="text-blue-600 hover:underline">Editar</button>
              <button onclick="eliminarEgreso('${e.id}')" class="text-red-600 hover:underline">Eliminar</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function mostrarSaldoCliente(id){
   const container_saldo=document.getElementById("saldo-disponible");
   let balance=window.templatesStore.calcularBalanceCliente(id);
   container_saldo.textContent=`Saldo Disponible: S/ ${balance}`;
}

document.getElementById("egreso-cliente").addEventListener("change", function() {
  const selectedValue = this.value;
  if (selectedValue !== "") { // Comprobamos que no sea la opción por defecto
    mostrarSaldoCliente(this.value);
      // Aquí puedes agregar la lógica adicional que necesites
  } else {
    const container_saldo=document.getElementById("saldo-disponible");
    container_saldo.textContent=`Saldo disponible: S/ 0.00`;
  }
});


// === Inicialización ===
mostrarClientes();
mostrarIngresos();
mostrarEgresos();
cargarClientesSelect();
actualizarDashboard();


