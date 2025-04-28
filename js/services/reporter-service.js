function exportarTablaCSV(nombreArchivo, idTabla) {
    const tabla = document.getElementById(idTabla);
    if (!tabla) {
       notyf.error(`No se visualizan clientes que exportar`);
      return;
    }
  
    let csv = [];
    const filas = tabla.querySelectorAll("tr");
  
    for (const fila of filas) {
      const celdas = fila.querySelectorAll("th, td");
      const filaDatos = Array.from(celdas).map(celda => `"${celda.innerText.trim()}"`);
      csv.push(filaDatos.join(","));
    }
  
    const csvBlob = new Blob([csv.join("\n")], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(csvBlob);
    link.download = nombreArchivo + ".csv";
    link.click();
  }

  
  function exportarSeccionPDF(idSeccion, nombreArchivo) {
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
  
    html2pdf().from(seccion).set(opt).save();
  }
  