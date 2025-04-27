function renderDashboard() {
  // 1. Obtener datos de la store
  const ingresos = window.templatesStore.getIngresos();
  const egresos = window.templatesStore.getEgresos();
  const clientes = window.templatesStore.getClientes();

  const totalIngresos = ingresos
    .filter(i => i.estado !== "devuelto") // No consideramos devueltos
    .reduce((sum, i) => sum + parseFloat(i.importe), 0);

  const totalEgresos = egresos.reduce((sum, e) => sum + parseFloat(e.importe), 0);
  const balance = totalIngresos - totalEgresos;

  const totalClientes = clientes.length;

  const totalDevueltos = ingresos.filter(i => i.estado === "devuelto").length;

  const clientesSaldoFavor = clientes.filter(c => window.templatesStore.calcularBalanceCliente(c.id) > 0).length;

  const clientesSinTransacciones = clientes.filter(c => {
    const ingresosC = window.templatesStore.getIngresosByCliente(c.id);
    const egresosC = window.templatesStore.getEgresosByCliente(c.id);
    return ingresosC.length === 0 && egresosC.length === 0;
  }).length;

  // 2. Inyectar en HTML
  document.getElementById("total-clientes").textContent = totalClientes;
  document.getElementById("total-ingresos").textContent = `S/ ${totalIngresos.toFixed(2)}`;
  document.getElementById("total-egresos").textContent = `S/ ${totalEgresos.toFixed(2)}`;

  const balanceElem = document.getElementById("balance-general");
  balanceElem.textContent = `S/ ${balance.toFixed(2)}`;
  balanceElem.className = balance >= 0 ? "text-green-600 text-2xl font-bold" : "text-red-600 text-2xl font-bold";

  document.getElementById("total-devueltos").textContent = totalDevueltos;
  document.getElementById("clientes-saldo-favor").textContent = clientesSaldoFavor;
  document.getElementById("clientes-sin-transacciones").textContent = clientesSinTransacciones;

  // 3. Llamar a gráficos
  renderGraficosDashboard();
}

let chartIngresosEgresos, chartEstadosIngresos, chartEstadosEgresos, chartBalanceMensual, chartTopClientes;

function renderGraficosDashboard() {
  const ingresos = window.templatesStore.getIngresos();
  const egresos = window.templatesStore.getEgresos();
  const clientes = window.templatesStore.getClientes();
  
  // === 1. Gráfico Ingresos vs Egresos
  if (chartIngresosEgresos) chartIngresosEgresos.destroy();

  chartIngresosEgresos = new ApexCharts(document.querySelector("#chart-ingresos-egresos"), {
    chart: {
      type: 'bar',
      height: 300
    },
    series: [{
      name: 'Soles',
      data: [
        ingresos.filter(i => i.estado !== "devuelto").reduce((s, i) => s + parseFloat(i.importe), 0).toFixed(2),
        egresos.reduce((s, e) => s + parseFloat(e.importe), 0).toFixed(2)
      ]
    }],
    xaxis: {
      categories: ['Ingresos', 'Egresos']
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value.toFixed(0); // 🔹 Evita decimales en el eje Y
        }
      }
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return value.toFixed(2); // 🔹 Corrige decimales en tooltips
        }
      }
    },
    colors: ['#22c55e', '#ef4444'] // 🔹 Verde para ingresos, rojo para egresos
  });

  chartIngresosEgresos.render();
  // === 2. Donut Estados Ingresos
    if (chartEstadosIngresos) chartEstadosIngresos.destroy();
    const estadosIngreso = ['pendiente', 'facturado', 'saldo a favor', 'devuelto'];
    const conteoEstadosIngreso = estadosIngreso.map(estado =>
      ingresos.filter(i => i.estado === estado).length
    );
    chartEstadosIngresos = new ApexCharts(document.querySelector("#chart-estados-ingresos"), {
      chart: {
        type: 'donut',
        height: 300
      },
      labels: estadosIngreso.map(e => e.toUpperCase()),
      series: conteoEstadosIngreso,
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
    });
    chartEstadosIngresos.render();


  // === 3. Donut Estados Egresos
  if (chartEstadosEgresos) chartEstadosEgresos.destroy();
  const estadosEgreso = ['pendiente', 'completado'];
  const conteoEstadosEgreso = estadosEgreso.map(estado =>
    egresos.filter(e => e.estado === estado).length
  );
  chartEstadosEgresos = new ApexCharts(document.querySelector("#chart-estados-egresos"), {
    chart: {
      type: 'donut',
      height: 300
    },
    labels: estadosEgreso.map(e => e.toUpperCase()),
    series: conteoEstadosEgreso,
    colors: ['#facc15', '#22c55e']
  });
  chartEstadosEgresos.render();

  // === 4. Línea Balance Mensual
  if (chartBalanceMensual) chartBalanceMensual.destroy();

  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const balancePorMes = new Array(12).fill(0);

  ingresos.forEach(i => {
    if (i.estado !== "devuelto" && i.fechaRegistro) {
      const mes = crearFechaExacta(i.fechaRegistro).getMonth();
      balancePorMes[mes] += parseFloat(i.importe);
    }
  });

  egresos.forEach(e => {
    if (e.fechaRegistro) {
      const mes = crearFechaExacta(e.fechaRegistro).getMonth();
      balancePorMes[mes] -= parseFloat(e.importe);
    }
  });

  // 🔹 Redondeamos los valores a 2 decimales para evitar números largos en el gráfico
  const balanceLimpio = balancePorMes.map(valor => parseFloat(valor.toFixed(2)));

  chartBalanceMensual = new ApexCharts(document.querySelector("#chart-balance-mensual"), {
    chart: {
      type: 'line',
      height: 300
    },
    series: [{
      name: "Balance",
      data: balanceLimpio // 🔹 Usamos los valores corregidos
    }],
    xaxis: {
      categories: meses
    },
    colors: ['#6366f1'],
    stroke: {
      curve: 'smooth'
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return parseFloat(value).toFixed(2); // 🔹 Corrige decimales en tooltips
        }
      }
    }
  });

  chartBalanceMensual.render();

  // === 5. Top 5 Clientes
  if (chartTopClientes) chartTopClientes.destroy();
  const clientesConIngresos = clientes.map(c => {
    const ingresosC = window.templatesStore.getIngresosByCliente(c.id)
      .filter(i => i.estado !== "devuelto")
      .reduce((suma, i) => suma + parseFloat(i.importe), 0);
    return { nombre: c.nombre, total: ingresosC };
  }).sort((a, b) => b.total - a.total).slice(0, 5);

  chartTopClientes = new ApexCharts(document.querySelector("#chart-top-clientes"), {
    chart: {
      type: 'bar',
      height: 300,
      toolbar: { show: false }
    },
    series: [{
      name: "Ingresos",
      data: clientesConIngresos.map(c => c.total)
    }],
    xaxis: {
      categories: clientesConIngresos.map(c => c.nombre)
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    colors: ['#0ea5e9']
  });
  chartTopClientes.render();
}
