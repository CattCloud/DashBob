//Establecer el color del estado en la tabla (Fin informativo)

function renderIngresos() {
  const contenedor = document.getElementById("tabla-ingresos");
  const ingresos = window.templatesStore.getIngresos();

  //Extraer ingresos NO DEVUELTOS
  const ingresosFiltrados = ingresos.filter(ingreso => ingreso.estado != "devuelto");

 
  if (!ingresosFiltrados.length) {
    contenedor.innerHTML = "<p class='text-gray-600'>No hay ingresos registrados.</p>";
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
  ${ingresosFiltrados.map(i => `<tr>
      <td class="px-3 py-2 font-medium">${window.templatesStore.getClienteById(i.clienteId).nombre}</td>
      <td class="px-3 py-2 hidden sm:table-cell">${i.banco.toUpperCase()}</td>
      <td class="px-3 py-2 hidden sm:table-cell">${i.medio}</td>
      <td class="px-3 py-2">S/. ${parseFloat(i.importe).toFixed(2)}</td>
      <td class="px-3 py-2 hidden md:table-cell">${i.concepto}</td>
      <td class="px-3 py-2"> <span
          class="inline-block px-2 py-1 rounded-full text-xs font-semibold ${getBadgeClase(i.estado)}">${i.estado.toUpperCase()}</span>
      </td>
      <td class="px-3 py-2 space-x-2"> 
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



