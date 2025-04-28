
function renderEgresos() {
    const contenedor = document.getElementById("tabla-egresos");
    //const egresos = window.templatesStore.getEgresos();
  
      
    let egresos=[];
    if(window.egresoFilter.hasFilters()){
      egresos= window.egresoFilter.searchArray;
    }else{
      if(window.egresoFilter.onlyOrdenamiento()){
        egresos= window.egresoFilter.searchArray;
      }else{
        //Por defecto el ordenamiento es por fecha
        egresos=window.templatesStore.getEgresos().sort((a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro)); 
      }
    }
  
    if (!egresos.length) {
      contenedor.innerHTML = "<p class='text-gray-600'>No hay egresos registrados.</p>";
      return;
    }
  
    contenedor.innerHTML = `
      <table id="tabla-general-egresos" class="min-w-full divide-y divide-gray-200 text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="hidden">idCliente</th>
            <th class="px-3 py-2 text-left text-gray-600">Cliente</th>
            <th class="px-3 py-2 text-left text-gray-600 hidden sm:table-cell">Banco</th>
            <th class="px-3 py-2 text-left text-gray-600 hidden sm:table-cell">Medio</th>
            <th class="hidden">moneda</th>
            <th class="px-3 py-2 text-left text-gray-600">Importe</th>
            <th class="hidden">importe</th>
            <th class="px-3 py-2 text-left text-gray-600 hidden md:table-cell">Concepto</th>
            <th class="px-3 py-2 text-left text-gray-600">Estado</th>
            <th class="px-3 py-2 text-left text-gray-600">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          ${egresos.map(e => `
            <tr>
              <td class="hidden">${e.clienteId}</td>
              <td class="px-3 py-2 font-medium">${window.templatesStore.getClienteById(e.clienteId).nombre}</td>
              <td class="px-3 py-2 hidden sm:table-cell">${e.banco.toUpperCase()}</td>
              <td class="px-3 py-2 hidden sm:table-cell">${e.medio.charAt(0).toUpperCase() + e.medio.slice(1)}</td>
              <td class="hidden">${e.moneda}</td>
              <td class="px-3 py-2">S/. ${parseFloat(e.importe).toFixed(2)}</td>
              <td class="hidden">${e.importe}</td>
              <td class="px-3 py-2 hidden md:table-cell">${e.concepto.charAt(0).toUpperCase() + e.concepto.slice(1)}</td>
              <td class="px-3 py-2">
                <span class="inline-block px-2 py-1 rounded-full text-xs font-semibold ${getBadgeClase(e.estado)}">${e.estado.toUpperCase()}</span>
              </td>
              <td class="px-3 py-2 space-x-2">
                <button onclick="vistaEgreso('${e.id}')" class="text-gray-600 hover:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                </button>
               
                  <button onclick="editarEgreso('${e.id}')" class="text-blue-600 hover:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                  </button>
                  <button onclick="eliminarEgreso('${e.id}')"  class="text-red-600 hover:text-red-400">               
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                   </svg>
                </button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }
  

  function renderEgresosCliente(clienteId) {
    const contenedor = document.getElementById("tabla-egresos-detalle-cliente");
    clienteId=document.getElementById("cliente-detalle-select").value;
    if(clienteId.trim()){
      let egresos=[];
      if(window.egresoDetalleFilter.hasFilters()){
        egresos= window.egresoDetalleFilter.searchArray;
      }else{
        if(window.egresoDetalleFilter.onlyOrdenamiento()){
          egresos= window.egresoDetalleFilter.searchArray;
        }else{
          //Por defecto el ordenamiento es por fecha
          egresos=window.templatesStore.getEgresosByCliente(clienteId).sort((a, b) => crearFechaExacta(b.fechaRegistro) - crearFechaExacta(a.fechaRegistro)); 
        }
      }
  
  
      if (!egresos.length) {
        contenedor.innerHTML = "<p class='text-gray-600'>No hay egresos registrados para este cliente.</p>";
        return;
      }
    
      contenedor.innerHTML = `
        <table id="tabla-cliente-egresos" class="min-w-full divide-y divide-gray-200 text-sm">
          <thead class="bg-gray-100">
          <tr>
            <th class="px-3 py-2 text-left text-gray-600">Fecha</th>
            <th class="hidden">idCliente</th>
            <th class="px-3 py-2 text-left text-gray-600">Banco</th>
            <th class="px-3 py-2 text-left text-gray-600 hidden md:table-cell">Medio</th>
            <th class="hidden">moneda</th>
            <th class="px-3 py-2 text-left text-gray-600">Importe</th>
            <th class="hidden">importe</th>
            <th class="px-3 py-2 text-left text-gray-600 hidden md:table-cell">Concepto</th>
            <th class="px-3 py-2 text-left text-gray-600">Estado</th>
            <th class="px-3 py-2 text-left text-gray-600">Acciones</th>
          </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            ${egresos.map(e => `
              <tr>
                <td class="px-3 py-2">${e.fechaRegistro}</td>
                <td class="hidden">${e.clienteId}</td>
                <td class="px-3 py-2">${e.banco.toUpperCase()}</td>
                <td class="px-3 py-2 hidden md:table-cell">${e.medio.charAt(0).toUpperCase() + e.medio.slice(1)}</td>
                <td class="hidden">${e.moneda}</td>
                <td class="px-3 py-2">S/ ${parseFloat(e.importe).toFixed(2)}</td>
                <td class="hidden">${e.importe}</td>
                <td class="px-3 py-2 hidden md:table-cell">${e.concepto.charAt(0).toUpperCase() + e.concepto.slice(1)}</td>
                <td class="px-3 py-2">
                  <span class="inline-block px-2 py-1 rounded-full text-xs font-semibold ${getBadgeClase(e.estado)}">
                    ${e.estado.toUpperCase()}
                  </span>
                </td>
                <td class="px-3 py-2 space-x-2">
                    <button onclick="vistaEgreso('${e.id}')" class="text-gray-600 hover:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    </button>
                  
                      <button onclick="editarEgresoDetalle('${e.id}')" class="text-blue-600 hover:text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                      </button>
                      <button onclick="eliminarEgresoDetalle('${e.id}')"  class="text-red-600 hover:text-red-400">               
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    }
   
  }
  