
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
            onclick="cerrarModalVista()">
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
         Importe: S/.${window.templatesStore.calcularBalanceCliente(cliente.id)}
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
            onclick="cerrarModalVista()">
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
        