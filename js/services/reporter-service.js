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


function exportarTablaCSV(nombreArchivo, tableObject) {
    let csv = [];
    const filas = tableObject.querySelectorAll("tr");

    filas.forEach((fila, index) => {
        const celdas = fila.querySelectorAll("th, td");

        const filaDatos = Array.from(celdas).map(celda => {
            let texto = celda.innerText.replace(/"/g, '""').trim();
            return index === 0 ? `"${texto.toLowerCase()}"` : `"${texto}"`;
        });

        csv.push(filaDatos.join(","));
    });

    const csvString = "\uFEFF" + csv.join("\n"); 
    const csvBlob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(csvBlob);
    link.download = nombreArchivo + ".csv";
    link.click();
}
  
 