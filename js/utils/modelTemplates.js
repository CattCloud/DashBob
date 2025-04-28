
function getCardCliente(id){
    const cliente=window.templatesStore.getClienteById(id);
    const cardCliente=
    `
   <div class="max-w-md mx-auto  space-y-4 md:max-w-2xl">

   <div class="flex flex-row items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-800">
        ${cliente.nombre}
        </h2>
        <button 
            class="top-2 right-2 hover:text-red-500 text-xl font-bold"
            onclick="cerrarModalSoloBody()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="size-7">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </button>
   </div>

   <!-- Datos de contacto -->
   <div class="text-gray-600 space-y-2">
     <p><span class="font-bold text-gray-700">${(cliente.tipoDocumento).toUpperCase()}: </span> ${ cliente.numeroDocumento}</p>
     <p><span class="font-bold text-gray-700">Correo: </span>${ cliente.email}</p>
     <p><span class="font-bold text-gray-700">Teléfono: </span>${ cliente.telefono}</p>
     <div class="text-gray-600">
                 <h3 class="text-sm font-bold text-gray-700 mb-1">Observaciones:</h3>
                 <p class="text-sm">
                     ${cliente.observaciones?cliente.observaciones:"Sin observaciones"}
                 </p>
       </div>
   </div>

    <div class="flex flex-row justify-between items-center mt-4">
        <span class="text-xs text-gray-500">
       Registrado: ${cliente.fechaRegistro}
        </span>
        <span class="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-full">
         S: S/.${window.templatesStore.calcularBalanceCliente(cliente.id)}
        </span>
    </div>


  </div>
  `
    return cardCliente;
  }
    
  function badgeEstadoTransaccion (estado) {
    switch (estado.toLowerCase()) {
      case 'pendiente':
        return 'inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full';
      case 'facturado':
        return 'inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full';
      case 'devuelto':
        return 'inline-block bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full';
      case 'saldo a favor':
        return 'inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full';
      case 'terminado':
            return 'inline-block bg-purple-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full';
      default:
        return 'inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full';
    }
   }

  function getCardTransaccion(id,tipo){
    let transaccion;
    if(tipo=="ingreso"){
        transaccion=window.templatesStore.getIngresoById(id);
    }else{
        transaccion=window.templatesStore.getEgresoById(id);
    }
    const cardTransaccion=
    `
    <div class="max-w-md mx-auto space-y-4 md:max-w-2xl relative">
    
    <!-- Botón de cerrar -->
    <!-- Encabezado -->
    <div class="flex flex-row items-center justify-between">
        <div class="flex gap-2">
            <h2 class="text-xl font-bold text-gray-800">
            ${tipo.charAt(0).toUpperCase() + tipo.slice(1)} #${transaccion.id}
            </h2>
            <span class="${badgeEstadoTransaccion(transaccion.estado)}">
                ${transaccion.estado.toUpperCase()}
            </span>
        </div>
        <div>
            <button 
            class="hover:text-red-500 text-xl font-bold"
            onclick="cerrarModalSoloBody()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="size-7">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </button>
        </div>
    </div>
    <!-- Cuerpo de datos -->
    <div class="text-gray-600 space-y-2">
        <p><span class="font-semibold text-gray-700">Banco:</span> ${transaccion.banco}</p>
        <p><span class="font-semibold text-gray-700">Medio:</span> ${transaccion.medio}</p>
        <p><span class="font-semibold text-gray-700">Moneda:</span> ${(transaccion.moneda).toUpperCase()}</p>
        <div>
        <h3 class="text-sm font-semibold text-gray-700 mb-1">Concepto:</h3>
        <p class="text-sm">${transaccion.concepto}</p>
        </div>
    </div>

    <!-- Footer -->
    <div class="flex flex-row justify-between items-center mt-4">
        <span class="text-xs text-gray-500">
        Registrado: ${transaccion.fechaRegistro}
        </span>
        <span class="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-full">
       Importe:  S/. ${transaccion.importe.toFixed(2)}
        </span>
    </div>

    </div>

  `
    return cardTransaccion;
  }
        


  
function getCardClienteDetalle(id){
  const cliente=window.templatesStore.getClienteById(id);
  const cardCliente=
  `
    <div class="max-w-md mx-auto bg-white shadow-md rounded-2xl overflow-hidden space-y-4 p-3 md:max-w-2xl">
    <div class="flex flex-row items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-800">
          ${cliente.nombre}
          </h2>
          <span class="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-full">
            Cliente #${cliente.id}
          </span>
    </div>

    <!-- Datos de contacto -->
    <div class="text-gray-600 space-y-2">
      <p><span class="font-bold text-gray-700">${(cliente.tipoDocumento).toUpperCase()}: </span> ${ cliente.numeroDocumento}</p>
      <p><span class="font-bold text-gray-700">Correo: </span>${ cliente.email}</p>
      <p><span class="font-bold text-gray-700">Teléfono: </span>${ cliente.telefono}</p>
      <div class="text-gray-600">
                  <h3 class="text-sm font-bold text-gray-700 mb-1">Observaciones:</h3>
                  <p class="text-sm">
                      ${cliente.observaciones?cliente.observaciones:"Sin observaciones"}
                  </p>
        </div>
    </div>

  <div class="flex flex-row justify-end items-center mt-4">
      <span class="text-xs text-gray-500">
       Registrado: ${cliente.fechaRegistro}
      </span>
  </div>


</div>
`
  return cardCliente;
}


function getbusquedaClienteDetalle(){
  return `
  <div class="w-full">

      <div class="flex justify-end w-full">
              <button 
                    class="hover:text-red-500 text-xl font-bold"
                    onclick="cerrarModalSoloBody()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="size-7">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
      </div>
    <!-- Título -->
      <h2 class="text-2xl font-bold text-center mb-4">Buscar Cliente</h2>

    <!-- Campo de búsqueda -->
    <input type="text" id="input-buscar-detalle-cliente"
          placeholder="Buscar por nombre o número de documento"
          class="border border-gray-300 rounded px-4 py-2 w-full mb-4"
          oninput="filtrarDetalleClientes()">

    <!-- Tabla resultados -->
    <div class="overflow-y-auto max-h-80">
      <table class="min-w-full text-sm text-left">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-4 py-2">Nombre</th>
            <th class="px-4 py-2">Documento</th>
            <th class="px-4 py-2">Acción</th>
          </tr>
        </thead>
        <tbody id="tabla-resultados-detalle-clientes">
          <!-- Resultados dinámicos -->
        </tbody>
      </table>
    </div>
  </div>
  `
}



function getbusquedaClienteDashboard(){
  return `
  <div class="w-full">

      <div class="flex justify-end w-full">
              <button 
                    class="hover:text-red-500 text-xl font-bold"
                    onclick="cerrarModalSoloBody()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="size-7">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
      </div>
    <!-- Título -->
      <h2 class="text-2xl font-bold text-center mb-4">Buscar Cliente</h2>

    <!-- Campo de búsqueda -->
    <input type="text" id="input-buscar-dashboard-cliente"
          placeholder="Buscar por nombre o número de documento"
          class="border border-gray-300 rounded px-4 py-2 w-full mb-4"
          oninput="filtrarDashboardClientes()">

    <!-- Tabla resultados -->
    <div class="overflow-y-auto max-h-80">
      <table class="min-w-full text-sm text-left">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-4 py-2">Nombre</th>
            <th class="px-4 py-2">Documento</th>
            <th class="px-4 py-2">Acción</th>
          </tr>
        </thead>
        <tbody id="tabla-resultados-dashboard-clientes">
          <!-- Resultados dinámicos -->
        </tbody>
      </table>
    </div>
  </div>
  `
}


function getCardsClienteDetalle(clienteId) {
  const cliente = window.templatesStore.getClienteById(clienteId);
  if (!cliente) return "<p>Cliente no encontrado.</p>";

  const ingresos = window.templatesStore.getIngresosByCliente(clienteId);
  const egresos = window.templatesStore.getEgresosByCliente(clienteId);
  const saldo = window.templatesStore.calcularBalanceCliente(clienteId);

  const totalIngresos = ingresos.reduce((acc, ingreso) => acc + parseFloat(ingreso.importe), 0);
  const totalEgresos = egresos.reduce((acc, egreso) => acc + parseFloat(egreso.importe), 0);
  const numTransacciones = ingresos.length + egresos.length;

  // Última fecha de movimiento
  let ultimaFechaMovimiento = '-';
  const todasFechas = [...ingresos, ...egresos].map(t => crearFechaExacta(t.fechaRegistro)).sort((a, b) => b - a); // más reciente primero
  //console.log("ULTI",todasFechas);
  if (todasFechas.length > 0) {
    ultimaFechaMovimiento = obtenerSoloFecha(todasFechas[0]);
  }

  return `
    ${crearCardInfo("Saldo Actual", `S/ ${saldo.toFixed(2)}`, saldo > 0 ? "bg-blue-100 text-green-900" : "bg-red-200 text-blue-800")}
    ${crearCardInfo("N° de Transacciones", numTransacciones, "bg-yellow-100 text-yellow-800")}
    ${crearCardInfo("Total Ingresos", `S/ ${totalIngresos.toFixed(2)}`, "bg-green-100 text-green-800")}
    ${crearCardInfo("Total Egresos", `S/ ${totalEgresos.toFixed(2)}`, "bg-red-100 text-red-800")}
    ${crearCardInfo("Último Movimiento", ultimaFechaMovimiento, "bg-purple-100 text-purple-800")}
  `;
}

function crearCardInfo(titulo, valor, clasesBg) {
  return `
    <div class="p-4 rounded-lg shadow-md ${clasesBg} flex flex-col items-center justify-center text-center">
      <h3 class="text-lg font-semibold mb-2">${titulo}</h3>
      <p class="text-2xl font-bold">${valor}</p>
    </div>
  `;
}



function getBotonesClienteDetalle(id) {
  return `
  <!-- Botones rápidos debajo de las tarjetas de saldo -->
    <!-- Registrar ingreso -->
    <button onclick="registrarIngresoClientDetalle()"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2">
       Registrar Ingreso
    </button>

    <!-- Registrar egreso -->
    <button onclick="registrarEgresoClienteDetalle()"
            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2">
      Registrar Egreso
    </button>

    <!-- Generar reporte -->
    <button onclick="generarReporteClienteActual()"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2">
       Generar Reporte
    </button>

    <!-- Ir a dashboard cliente -->
    <button onclick="irADashboardClienteActual()"
            class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-2">
       Dashboard Cliente
    </button>
  `;
}


function getDetalleShortCliente(cliente){
  return  `
      <div class="flex flex-row items-center justify-between w-full">
            <h2 class="text-sm font-bold text-gray-800">
            Cliente: ${cliente.nombre}
            </h2>
            <span class="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-full">
            Saldo: S/.${window.templatesStore.calcularBalanceCliente(cliente.id)}
            </span>
      </div>
    `
}