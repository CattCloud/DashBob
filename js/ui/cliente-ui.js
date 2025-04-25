//Funcion para mostrar clientes en la tabla de clientes general
function renderClientes() {
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


// === Cargar clientes en los select de ingresos, egresos y reportes ===
function cargarClientesSelect() {
    const clientes=window.templatesStore.getClientes();
    const selects = [
      document.getElementById("reporte-cliente")
    ];
    selects.forEach(select => {
      if (!select) return;
      select.innerHTML = '<option value="">Seleccione un cliente</option>' +
        clientes.map(c => `<option value="${c.id}">${c.nombre}</option>`).join("");
    });
}
  