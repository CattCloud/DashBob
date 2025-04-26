
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
                <span class="inline-block px-2 py-1 rounded-full text-xs font-semibold ${getBadgeClase(e.estado)}">${e.estado.toUpperCase()}</span>
              </td>
              <td class="px-3 py-2 space-x-2">
                <button onclick="vistaEgreso('${e.id}')" class="text-gray-600 hover:underline">Vista</button>
                <button onclick="editarEgreso('${e.id}')" class="text-blue-600 hover:underline">Editar</button>
                <button onclick="eliminarEgreso('${e.id}')" class="text-red-600 hover:underline">Eliminar</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }
  