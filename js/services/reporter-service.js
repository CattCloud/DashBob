// 🔹 Función específica para procesar la tabla de clientes antes de exportar
function prepareClientTableForExportCSV(nombreArchivo,idTabla) {
    const tablaOriginal = document.getElementById(idTabla);
    if (!tablaOriginal) {
        notyf.error(`No hay clientes en la tabla`);
        return;
    }

    // Clonar la tabla para manipulación sin afectar la UI
    const tablaClone = tablaOriginal.cloneNode(true);

    tablaClone.querySelectorAll("tr").forEach(fila => {
        fila.removeChild(fila.children[fila.children.length - 1]); // Elimina "Acciones"
        fila.removeChild(fila.children[3]); // Elimina "Documento"
    });
    exportarTablaCSV(nombreArchivo,tablaClone);  
}

function prepareTransaccionTableForExportCSV(nombreArchivo, idTabla) {
    const tablaOriginal = document.getElementById(idTabla);
    if (!tablaOriginal) {
        notyf.error(`No hay ingresos en la tabla`);
        return;
    }

    // Clonar la tabla antes de modificarla
    const tablaClone = tablaOriginal.cloneNode(true);

    // Eliminar columnas innecesarias (Acciones y Concepto)
    tablaClone.querySelectorAll("tr").forEach(fila => {
        fila.removeChild(fila.children[fila.children.length - 1]); // 🔹 Elimina "Acciones"
        fila.removeChild(fila.children[5]); // 🔹 Elimina "Importe"
    });

    // Enviar la tabla procesada para exportación
    exportarTablaCSV(nombreArchivo, tablaClone);
}

function prepareTransaccionDetalleTableForExportCSV(nombreArchivo, idTabla) {
    const tablaOriginal = document.getElementById(idTabla);
    if (!tablaOriginal) {
        notyf.error(`No hay elementos en la tabla`);
        return;
    }

    // Clonar la tabla antes de modificarla
    const tablaClone = tablaOriginal.cloneNode(true);

    // Eliminar columnas innecesarias (Acciones y Concepto)
    tablaClone.querySelectorAll("tr").forEach(fila => {
        fila.removeChild(fila.children[fila.children.length - 1]); // 🔹 Elimina "Acciones"
        fila.removeChild(fila.children[0]); // 
        fila.removeChild(fila.children[5]); //
    });

    // Enviar la tabla procesada para exportación
    exportarTablaCSV(nombreArchivo, tablaClone);
}



  
  function exportarSeccionPDF(idSeccion, nombreArchivo) {
    console.log("Aqui llegue");
    const seccion = document.getElementById(idSeccion);
    if (!seccion) {
      console.error(`No se encontró la sección con id ${idSeccion}`);
      return;
    }
  
    const opt = {
      margin:       0.5,
      filename:     nombreArchivo + '.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(seccion).set({
        html2canvas: { scale: 1, logging: true, useCORS: true },
      }).save();
      
    //html2pdf().from(seccion).set(opt).save();
  }
  