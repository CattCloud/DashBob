

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
            medio: ingreso.mediopago,
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
      window.ingresoFilter.refreshFromStore();
      //renderIngresos();
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
      archivoNombreIngreso=document.getElementById("archivo-nombre-ingreso");
      archivoNombreIngreso.textContent = "Ningún archivo seleccionado";
      event.target.value = '';
    };
  
    reader.readAsText(file);
  }


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
      //renderEgresos();
      window.egresoFilter.refreshFromStore();

      
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
      archivoNombreEgreso=document.getElementById("archivo-nombre-egreso");
      archivoNombreEgreso.textContent = "Ningún archivo seleccionado";
      event.target.value = '';
    };
  
    reader.readAsText(file);
  }