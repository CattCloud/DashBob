//Establecer el color del estado en la tabla (Fin informativo)

function renderIngresos() {
  const contenedor = document.getElementById("tabla-ingresos");
  //const ingresos = window.templatesStore.getIngresos();

  let ingresos=[];
  if(window.ingresoFilter.hasFilters()){
    ingresos= window.ingresoFilter.searchArray;
  }else{
    if(window.ingresoFilter.onlyOrdenamiento()){
      ingresos= window.ingresoFilter.searchArray;
    }else{
      //Por defecto el ordenamiento es por fecha
      ingresos=window.templatesStore.getIngresos().sort((a, b) => crearFechaExacta(b.fechaRegistro) - crearFechaExacta(a.fechaRegistro)); 
    }
  }
  


  //Extraer ingresos NO DEVUELTOS
  const ingresosNoDevueltos = ingresos.filter(ingreso => ingreso.estado != "devuelto");
  //console.log(ingresosNoDevueltos);
  if (!ingresosNoDevueltos.length) {
    contenedor.innerHTML = "<p class='text-gray-600'>No hay ingresos registrados.</p>";
    renderIngresosDevueltos();
    return;
  }

  contenedor.innerHTML = 
  `
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
  ${ingresosNoDevueltos.map(i => `<tr>
      <td class="px-3 py-2 font-medium">${window.templatesStore.getClienteById(i.clienteId).nombre}</td>
      <td class="px-3 py-2 hidden sm:table-cell">${i.banco.toUpperCase()}</td>
      <td class="px-3 py-2 hidden sm:table-cell">${i.medio}</td>
      <td class="px-3 py-2">S/. ${parseFloat(i.importe).toFixed(2)}</td>
      <td class="px-3 py-2 hidden md:table-cell">${i.concepto}</td>
      <td class="px-3 py-2"> <span
          class="inline-block px-2 py-1 rounded-full text-xs font-semibold ${getBadgeClase(i.estado)}">${i.estado.toUpperCase()}</span>
      </td>
      <td class="px-3 py-2 space-x-2"> 
      <button onclick="vistaIngreso('${i.id}')"class="text-gray-600 hover:underline">Vista</button>
      <button onclick="editarIngreso('${i.id}')"class="text-blue-600 hover:underline">Editar</button>
      <button onclick="eliminarIngreso('${i.id}')"class="text-red-600 hover:underline">Eliminar</button> </td>
    </tr>`).join("")}</tbody>
  </table>
  `
  renderIngresosDevueltos();
}



function renderIngresosDevueltos() {
  const contenedor = document.getElementById("tabla-ingresos-devuelto");
  const ingresos = window.templatesStore.getIngresos();

  //Extraer ingresos  DEVUELTOS
  const ingresosFiltrados = ingresos.filter(ingreso => ingreso.estado == "devuelto");

  if (!ingresosFiltrados.length) {
    contenedor.innerHTML = "<p class='text-gray-600'>No hay ingresos devueltos registrados.</p>";
    return;
  }

  contenedor.innerHTML = 
  `
    <table class="min-w-full divide-y divide-gray-200 text-sm">
    <thead class="bg-gray-100">
      <tr>
        <th class="px-3 py-2 text-left text-gray-600">Cliente</th>
        <th class="px-3 py-2 text-left text-gray-600 hidden sm:table-cell">Banco</th>
        <th class="px-3 py-2 text-left text-gray-600 hidden sm:table-cell">Medio</th>
        <th class="px-3 py-2 text-left text-gray-600">Importe</th>
        <th class="px-3 py-2 text-left text-gray-600 hidden md:table-cell">Concepto</th>
        <th class="px-3 py-2 text-left text-gray-600">Estado</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
  ${ingresosFiltrados.map(i => `<tr>
      <td class="px-3 py-2 font-medium">${window.templatesStore.getClienteById(i.clienteId).nombre}</td>
      <td class="px-3 py-2 hidden sm:table-cell">${i.banco.toUpperCase()}</td>
      <td class="px-3 py-2 hidden sm:table-cell">${i.medio}</td>
      <td class="px-3 py-2">S/. ${parseFloat(i.importe).toFixed(2)}</td>
      <td class="px-3 py-2 hidden md:table-cell">${i.concepto}</td>
      <td class="px-3 py-2"> <span
          class="inline-block px-2 py-1 rounded-full text-xs font-semibold ${getBadgeClase(i.estado)}">${i.estado.toUpperCase()}</span>
      </td>
    </tr>`).join("")}</tbody>
  </table>
  `
}




function renderIngresosCliente() {
  const contenedor = document.getElementById("tabla-ingresos-detalle-cliente");
  clienteId=document.getElementById("cliente-detalle-select").value;
  if(clienteId.trim()){
    let ingresos=[];
    if(window.ingresoDetalleFilter.hasFilters()){
      ingresos= window.ingresoDetalleFilter.searchArray;
    }else{
      if(window.ingresoDetalleFilter.onlyOrdenamiento()){
        ingresos= window.ingresoDetalleFilter.searchArray;
      }else{
        //Por defecto el ordenamiento es por fecha
        ingresos=window.templatesStore.getIngresosByCliente(clienteId).sort((a, b) => crearFechaExacta(b.fechaRegistro) - crearFechaExacta(a.fechaRegistro)); 
      }
    }
  
  
    if (!ingresos.length) {
      contenedor.innerHTML = "<p class='text-gray-600'>No hay ingresos registrados para este cliente.</p>";
      return;
    }
  
    contenedor.innerHTML = `
      <table class="min-w-full divide-y divide-gray-200 text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-3 py-2 text-left text-gray-600">Fecha</th>
            <th class="px-3 py-2 text-left text-gray-600">Banco</th>
            <th class="px-3 py-2 text-left text-gray-600 hidden md:table-cell">Medio</th>
            <th class="px-3 py-2 text-left text-gray-600">Importe</th>
            <th class="px-3 py-2 text-left text-gray-600 hidden md:table-cell">Concepto</th>
            <th class="px-3 py-2 text-left text-gray-600">Estado</th>
            <th class="px-3 py-2 text-left text-gray-600">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          ${ingresos.map(i => `
            <tr>
              <td class="px-3 py-2">${i.fechaRegistro}</td>
              <td class="px-3 py-2">${i.banco.toUpperCase()}</td>
              <td class="px-3 py-2 hidden md:table-cell">${i.medio}</td>
              <td class="px-3 py-2">S/ ${parseFloat(i.importe).toFixed(2)}</td>
              <td class="px-3 py-2 hidden md:table-cell">${i.concepto}</td>
              <td class="px-3 py-2">
                <span class="inline-block px-2 py-1 rounded-full text-xs font-semibold ${getBadgeClase(i.estado)}">
                  ${i.estado.toUpperCase()}
                </span>
              </td>
              <td class="px-3 py-2 space-x-2">
                <button onclick="vistaIngreso('${i.id}')" class="text-gray-600 hover:underline">Vista</button>
                ${i.estado !== 'devuelto' ? `
                  <button onclick="editarIngreso('${i.id}')" class="text-blue-600 hover:underline">Editar</button>
                  <button onclick="eliminarIngreso('${i.id}')" class="text-red-600 hover:underline">Eliminar</button>
                ` : ''}
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }
  
}
