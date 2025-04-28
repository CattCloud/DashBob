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
            tipoDocumento: cliente.tipodocumento.toLowerCase(),
            numeroDocumento: cliente.numerodocumento,
            observaciones: cliente.observaciones || ''
          };
          //console.log(nuevoCliente);
          // Intentar guardar en el Store
          window.templatesStore.addCliente(nuevoCliente);
  
        } catch (error) {
          // Si hay error, guardar línea fallida
          rechazados.push({ fila: index + 2, 
                            mensaje: `Cliente ${cliente.nombre} ,`+ error.message });
        }
      });
      // Renderizar solo al final
      window.clienteFilter.refreshFromStore();
      //renderClientes();
      
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
      event.target.value = '';
    };
    reader.readAsText(file);
  } 
  