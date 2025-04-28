function cargarDashboardCliente(clienteId) {
    if (!clienteId) return;

    document.getElementById("charts-dashboard-cliente").classList.remove("hidden");
    document.getElementById("irdetalle-cliente-btn").classList.remove("hidden");
    
    const cliente = window.templatesStore.getClienteById(clienteId);
    const ingresos = window.templatesStore.getIngresosByCliente(clienteId);
    const egresos = window.templatesStore.getEgresosByCliente(clienteId);
  
    renderCardsClienteDashboard(cliente, ingresos, egresos);
    renderGraficosDashboardCliente(clienteId);
}


function renderCardsClienteDashboard(cliente, ingresos, egresos) {
    const saldo = window.templatesStore.calcularBalanceCliente(cliente.id);
    const totalIngresos = ingresos.reduce((sum, i) => sum + parseFloat(i.importe), 0);
    const totalEgresos = egresos.reduce((sum, e) => sum + parseFloat(e.importe), 0);
    const numTransacciones = ingresos.length + egresos.length;
  
    let estadoCliente = "Activo";
    if (numTransacciones === 0) {
      estadoCliente = "Sin Transacciones";
    } else if (saldo > 0) {
      estadoCliente = "Saldo Positivo";
    } else if (saldo === 0) {
      estadoCliente = "Saldo en Cero";
    }
  
    const ultimaFecha = [...ingresos, ...egresos]
      .map(t => t.fechaRegistro)
      .sort()
      .reverse()[0] || 'Sin movimientos';
  
    document.getElementById("cards-cliente-dashboard").innerHTML = `
        <!-- Tarjeta: Saldo Actual -->
        <div class="bg-gray-50 p-5 rounded-xl shadow-md flex flex-col items-center gap-2">
            <p class="text-gray-600 text-sm font-bold">Saldo Actual</p>
            <p class="text-2xl font-bold ${saldo >= 0 ? 'text-green-700' : 'text-red-600'}">S/ ${saldo.toFixed(2)}</p>
        </div>

        <!-- Tarjeta: Total Ingresos -->
        <div class="bg-gray-50 p-5 rounded-xl shadow-md flex flex-col items-center gap-2">
            <p class="text-gray-600 text-sm font-bold">Total Ingresos</p>
            <p class="text-2xl font-bold text-green-600">S/ ${totalIngresos.toFixed(2)}</p>
        </div>

        <!-- Tarjeta: Total Egresos -->
        <div class="bg-gray-50 p-5 rounded-xl shadow-md  flex flex-col items-center gap-2">
            <p class="text-gray-600 text-sm font-bold">Total Egresos</p>
            <p class="text-2xl font-bold text-red-600">S/ ${totalEgresos.toFixed(2)}</p>
        </div>

        <!-- Tarjeta: N° Transacciones -->
        <div class="bg-gray-50 p-5 rounded-xl shadow-md  flex flex-col items-center gap-2">
            <p class="text-gray-600 text-sm font-bold">N° Transacciones</p>
            <p class="text-2xl font-bold text-blue-600">${numTransacciones}</p>
        </div>

        <!-- Tarjeta: Estado Cliente -->
        <div class="bg-gray-50 p-5 rounded-xl shadow-md  flex flex-col items-center gap-2">
            <p class="text-gray-600 text-sm font-bold">Estado Cliente</p>
            <p class="text-2xl font-bold text-teal-600">${estadoCliente}</p>
        </div>

        <!-- Tarjeta: Última Fecha Movimiento -->
        <div class="bg-gray-50 p-5 rounded-xl shadow-md  flex flex-col items-center gap-2">
            <p class="text-gray-600 text-sm font-bold">Última Fecha Movimiento</p>
            <p class="text-2xl font-bold text-gray-700">${ultimaFecha.split('T')[0]}</p>
        </div>


    `;
  }


  let chartClienteIngresosEgresos, chartClienteEstadosIngresos, chartClienteEstadosEgresos, chartClienteSaldo;

  function renderGraficosDashboardCliente(clienteId) {
    const ingresos = window.templatesStore.getIngresosByCliente(clienteId);
    const egresos = window.templatesStore.getEgresosByCliente(clienteId);
  
    // === 1. Ingresos vs Egresos (Barras)
    if (chartClienteIngresosEgresos) chartClienteIngresosEgresos.destroy();
    chartClienteIngresosEgresos = new ApexCharts(document.querySelector("#chart-cliente-ingresos-egresos"), {
      chart: { type: 'bar', height: 300 },
      series: [{
        name: 'Soles',
        data: [
          ingresos.reduce((s, i) => s + parseFloat(i.importe), 0),
          egresos.reduce((s, e) => s + parseFloat(e.importe), 0)
        ]
      }],
      xaxis: { categories: ['Ingresos', 'Egresos'] },
      colors: ['#10b981', '#ef4444']
    });
    chartClienteIngresosEgresos.render();
  
    // === 2. Distribución Estados Ingresos
    if (chartClienteEstadosIngresos) chartClienteEstadosIngresos.destroy();
    const estadosIngreso = ['pendiente', 'facturado', 'saldo a favor', 'devuelto'];
    const conteoEstadosIngreso = estadosIngreso.map(estado =>
      ingresos.filter(i => i.estado === estado).length
    );
    chartClienteEstadosIngresos = new ApexCharts(document.querySelector("#chart-cliente-estados-ingresos"), {
      chart: { type: 'donut', height: 300 },
      labels: estadosIngreso.map(e => e.toUpperCase()),
      series: conteoEstadosIngreso,
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
    });
    chartClienteEstadosIngresos.render();
  
    // === 3. Distribución Estados Egresos
    if (chartClienteEstadosEgresos) chartClienteEstadosEgresos.destroy();
    const estadosEgreso = ['pendiente', 'completado'];
    const conteoEstadosEgreso = estadosEgreso.map(estado =>
      egresos.filter(e => e.estado === estado).length
    );
    chartClienteEstadosEgresos = new ApexCharts(document.querySelector("#chart-cliente-estados-egresos"), {
      chart: { type: 'donut', height: 300 },
      labels: estadosEgreso.map(e => e.toUpperCase()),
      series: conteoEstadosEgreso,
      colors: ['#facc15', '#22c55e']
    });
    chartClienteEstadosEgresos.render();
  
    // === 4. Saldo Histórico (Línea)
    if (chartClienteSaldo) chartClienteSaldo.destroy();
    let saldoAcumulado = 0;
    const movimientosOrdenados = [...ingresos, ...egresos].sort((a, b) => new Date(a.fechaRegistro) - new Date(b.fechaRegistro));
  
    const saldoTimeline = movimientosOrdenados.map(mov => {
      if (mov.hasOwnProperty('concepto')) { // es ingreso
        saldoAcumulado += parseFloat(mov.importe);
      } else { // es egreso
        saldoAcumulado -= parseFloat(mov.importe);
      }
      return saldoAcumulado.toFixed(2);
    });
  
    const categoriasLimpias = movimientosOrdenados.map(m => 
        m.fechaRegistro ? m.fechaRegistro : "Fecha inválida"
      );
      
      chartClienteSaldo = new ApexCharts(document.querySelector("#chart-cliente-saldo"), {
        chart: { type: 'line', height: 300 },
        series: [{ name: "Saldo", data: saldoTimeline }],
        xaxis: { categories: categoriasLimpias }, // 🔹 Usa las fechas formateadas correctamente
        stroke: { curve: 'smooth' },
        colors: ['#6366f1']
      });
      
      chartClienteSaldo.render();
  }
  