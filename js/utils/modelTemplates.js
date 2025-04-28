
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
         Saldo: S/.${window.templatesStore.calcularBalanceCliente(cliente.id)}
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
        <p><span class="font-semibold text-gray-700">Banco:</span> ${transaccion.banco.toUpperCase()}</p>
        <p><span class="font-semibold text-gray-700">Medio:</span> ${transaccion.medio.charAt(0).toUpperCase() + transaccion.medio.slice(1)}</p>
        <p><span class="font-semibold text-gray-700">Moneda:</span> ${(transaccion.moneda).toUpperCase()}</p>
        <div>
        <h3 class="text-sm font-semibold text-gray-700 mb-1">Concepto:</h3>
        <p class="text-sm">${transaccion.concepto.charAt(0).toUpperCase() + transaccion.concepto.slice(1)}</p>
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
    <div class="max-w-md mx-auto bg-white shadow-md rounded-2xl overflow-hidden space-y-4 p-3 md:max-w-2xl h-full">
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
  if (!cliente) return "<p class='text-red-600 font-bold'>Cliente no encontrado.</p>";

  const ingresos = window.templatesStore.getIngresosByCliente(clienteId);
  const egresos = window.templatesStore.getEgresosByCliente(clienteId);
  const saldo = window.templatesStore.calcularBalanceCliente(clienteId);

  const totalIngresos = ingresos.reduce((acc, ingreso) => acc + parseFloat(ingreso.importe), 0);
  const totalEgresos = egresos.reduce((acc, egreso) => acc + parseFloat(egreso.importe), 0);
  const numTransacciones = ingresos.length + egresos.length;

  // Última fecha de movimiento
  let ultimaFechaMovimiento = "-";
  const todasFechas = [...ingresos, ...egresos].map(t => crearFechaExacta(t.fechaRegistro)).sort((a, b) => b - a);
  if (todasFechas.length > 0) {
    ultimaFechaMovimiento = obtenerSoloFecha(todasFechas[0]);
  }

  return `
    ${crearCardInfo("Saldo Actual", `S/ ${saldo.toFixed(2)}`, saldo > 0 ? "text-green-700" : "text-red-700")}
    ${crearCardInfo("N° de Transacciones", numTransacciones, "text-yellow-600")}
    ${crearCardInfo("Total Ingresos", `S/ ${totalIngresos.toFixed(2)}`, "text-green-600")}
    ${crearCardInfo("Total Egresos", `S/ ${totalEgresos.toFixed(2)}`, "text-red-600")}
    ${crearCardInfo("Último Movimiento", ultimaFechaMovimiento, "text-blue-600")}
  `;
}

function crearCardInfo(titulo, valor, colorTexto) {
  return `
    <div class="bg-white p-3 rounded-xl shadow-md flex flex-col items-center justify-center gap-2">
      <h3 class="text-gray-600 text-sm font-bold">${titulo}</h3>
      <p class="text-2xl font-bold ${colorTexto}">${valor}</p>
    </div>
  `;
}


function getBotonesClienteDetalle(id) {
  return `
  <!-- Botones rápidos debajo de las tarjetas de saldo -->
    <!-- Registrar ingreso -->
    <button onclick="registrarIngresoClientDetalle()"
            class="bg-green-600 hover:bg-green-400 text-white px-4 py-2 rounded-xl shadow-md font-bold justify-center flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

       Registrar Ingreso
    </button>

    <!-- Registrar egreso -->
    <button onclick="registrarEgresoClienteDetalle()"
            class="bg-red-600 hover:bg-red-400 text-white px-4 py-2 rounded-xl shadow-md  font-bold justify-center flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>

      Registrar Egreso
    </button>

    <!-- Generar reporte -->
    <!--button onclick="exportarDetalleCliente()"
            class="bg-[#338792] hover:bg-blue-400 text-white px-4 py-2 rounded-xl shadow-md  font-bold justify-center flex items-center gap-2">
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
       </svg>
       Generar Reporte
    </!--button-->

    <!-- Ir a dashboard cliente -->
    <button onclick="irADashboardClienteActual()"
            class="bg-gray-600 hover:bg-gray-400 text-white px-4 py-2 rounded-xl shadow-md font-bold flex justify-center items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
       Dashboard del cliente
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