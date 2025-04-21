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



const inputFile = document.getElementById('input-csv-clientes');
const archivoNombre = document.getElementById('archivo-nombre');

inputFile.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    archivoNombre.textContent = file.name; // Muestra el nombre del archivo seleccionado
  } else {
    archivoNombre.textContent = "Ningún archivo seleccionado"; // Muestra un mensaje predeterminado
  }
});

document.getElementById('importar-btn').addEventListener('click', function() {
  if (inputFile.files.length > 0) {
    importarClientesDesdeCSV({ target: { files: inputFile.files } });
  } else {
    notyf.error("Por favor, selecciona el archivo que desea importar.");
  }
});

/*
* El archivo CSV debe tener encabezados que coincidan con estos nombres (sin importar mayúsculas):
* email,nombre,telefono,tipodocumento,numerodocumento,observaciones
*/
async function importarClientesDesdeCSV(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    const filas = text.split('\n').map(line => line.trim()).filter(Boolean);
    const cabeceras = filas[0].split(',').map(h => h.trim().toLowerCase());
    const datos = filas.slice(1);
    const rechazados = [];

    datos.forEach((linea, index) => {
      const columnas = linea.split(',').map(x => x.trim());
      const cliente = {};

      // Asignar campos por nombre
      cabeceras.forEach((col, i) => cliente[col] = columnas[i]);

      try {
        const nuevoCliente = {
          email: cliente.email,
          nombre: cliente.nombre,
          telefono: cliente.telefono,
          tipoDocumento: cliente.tipodocumento,
          numeroDocumento: cliente.numerodocumento,
          observaciones: cliente.observaciones || ''
        };
        console.log(nuevoCliente);
        // Intentar guardar en el Store
        window.templatesStore.addCliente(nuevoCliente);

      } catch (error) {
        // Si hay error, guardar línea fallida
        rechazados.push({ fila: index + 2, 
                          mensaje: `Cliente ${cliente.nombre} ,`+ error.message });
      }
    });
    // Renderizar solo al final
    mostrarClientes();
    // Reportar errores
    if (rechazados.length > 0) {
      notyf2.error(`${rechazados.length} cliente(s) no se pudieron importar`);
      /*rechazados.forEach(c => {
        notyf2.error(`Error al importar cliente ${c.nombre}: ${c.error}`);
      });*/
      generarArchivoErrores(rechazados, "errores_importacion_cliente.txt");
    } else {
      notyf.success("Todos los clientes se importaron correctamente.");
    }
    // Limpiar input para permitir reimportar si se desea
    archivoNombre.textContent="Ningún archivo seleccionado";
    event.target.value = '';
  };
  reader.readAsText(file);
}


const inputFileIngreso = document.getElementById('input-csv-ingresos');
const archivoNombreIngreso = document.getElementById('archivo-nombre-ingreso');

inputFileIngreso.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    archivoNombreIngreso.textContent = file.name; // Muestra el nombre del archivo seleccionado
  } else {
    archivoNombreIngreso.textContent = "Ningún archivo seleccionado"; // Muestra un mensaje predeterminado
  }
});


document.getElementById('importar-ingreso-btn').addEventListener('click', function() {
  if (inputFileIngreso.files.length > 0) {
    console.log("sasdas");
    importarIngresosDesdeCSV({ target: { files: inputFileIngreso.files } });
  } else {
    notyf.error("Por favor, selecciona el archivo que desea importar.");
  }
});


async function importarIngresosDesdeCSV(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    const filas = text.split('\n').map(line => line.trim()).filter(Boolean);
    const cabeceras = filas[0].split(',').map(h => h.trim().toLowerCase());
    const datos = filas.slice(1);
    const rechazados = [];

    datos.forEach((linea, index) => {
      const columnas = linea.split(',').map(x => x.trim());
      const ingreso = {};

      // Asignar campos por nombre
      cabeceras.forEach((col, i) => ingreso[col] = columnas[i]);

      try {
        // Validación y creación del objeto ingreso
        const nuevoIngreso = {
          clienteId: ingreso.clienteid,
          moneda: ingreso.moneda,
          medioPago: ingreso.mediopago,
          banco: ingreso.banco,
          importe: parseFloat(ingreso.importe),
          concepto: ingreso.concepto,
          estado: ingreso.estado // Valor por defecto si no se especifica
        };

        // Intentar guardar en el Store
        window.templatesStore.addIngreso(nuevoIngreso);

      } catch (error) {
        // Si hay error, guardar línea fallida
        rechazados.push({ fila: index + 2, 
          mensaje: error.message });
      }
    });

    // Renderizar solo al final
    mostrarIngresos();
    // Reportar errores
    if (rechazados.length > 0) {
      notyf2.error(`${rechazados.length} ingreso(s) no se pudieron importar.`);
      /*rechazados.forEach(i => {
        notyf2.error(`Error al importar ingreso ${i.info}: ${i.error}`);
      });*/
      generarArchivoErrores(rechazados, "errores_importacion_ingreso.txt");
    } else {
      notyf.success("Todos los ingresos se importaron correctamente.");
    }
    // Limpiar input para permitir reimportar si se desea
    archivoNombreIngreso.textContent = "Ningún archivo seleccionado";
    event.target.value = '';
  };

  reader.readAsText(file);
}



const inputFileEgreso = document.getElementById('input-csv-egresos');
const archivoNombreEgreso = document.getElementById('archivo-nombre-egreso');

inputFileEgreso.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    archivoNombreEgreso.textContent = file.name; // Muestra el nombre del archivo seleccionado
  } else {
    archivoNombreEgreso.textContent = "Ningún archivo seleccionado"; // Muestra un mensaje predeterminado
  }
});


document.getElementById('importar-egreso-btn').addEventListener('click', function() {
  if (inputFileIngreso.files.length > 0) {
    importarEgresosDesdeCSV({ target: { files: inputFileEgreso.files } });
  } else {
    notyf.error("Por favor, selecciona el archivo que desea importar.");
  }
});


async function importarEgresosDesdeCSV(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    const filas = text.split('\n').map(line => line.trim()).filter(Boolean);
    const cabeceras = filas[0].split(',').map(h => h.trim().toLowerCase());
    const datos = filas.slice(1);
    const rechazados = [];

    datos.forEach((linea, index) => {
      const columnas = linea.split(',').map(x => x.trim());
      const egreso = {};

      // Asignar campos por nombre
      cabeceras.forEach((col, i) => egreso[col] = columnas[i]);

      try {
        // Validación y creación del objeto ingreso
        const nuevoEgreso = {
          clienteId: egreso.clienteid,
          moneda: egreso.moneda,
          medio: egreso.medio,
          banco: egreso.banco,
          importe: parseFloat(egreso.importe),
          concepto: egreso.concepto,
          estado: egreso.estado // Valor por defecto si no se especifica
        };

        // Intentar guardar en el Store
        window.templatesStore.addEgreso(nuevoEgreso);

      } catch (error) {
        // Si hay error, guardar línea fallida
        rechazados.push({ fila: index + 2, 
          mensaje: error.message });
      }
    });

    // Renderizar solo al final
    mostrarEgresos();
    // Reportar errores
    if (rechazados.length > 0) {
      notyf2.error(`${rechazados.length} egreso(s) no se pudieron importar.`);
      /*rechazados.forEach(i => {
        notyf2.error(`Error al importar ingreso ${i.info}: ${i.error}`);
      });*/
      generarArchivoErrores(rechazados, "errores_importacion_egreso.txt");
    } else {
      notyf.success("Todos los egresos se importaron correctamente.");
    }
    // Limpiar input para permitir reimportar si se desea
    archivoNombreIngreso.textContent = "Ningún archivo seleccionado";
    event.target.value = '';
  };

  reader.readAsText(file);
}



function generarArchivoErrores(errores, nombreArchivo) {
  // Crear contenido para el archivo
  const contenido = errores.map(error => `Fila ${error.fila}: ${error.mensaje}`).join('\n');
  // Crear un objeto Blob con el contenido del archivo
  const blob = new Blob([contenido], { type: "text/plain" });
  // Crear una URL para el Blob
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = nombreArchivo; // Nombre del archivo que se descargará
  // Simular un clic en el enlace para descargar
  enlace.style.display = "none";
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);
}




// === Inicialización ===
mostrarClientes();
mostrarIngresos();
mostrarEgresos();
cargarClientesSelect();
actualizarDashboard();


//localStorage.clear();
//console.log(window.templatesStore.getClientes());

