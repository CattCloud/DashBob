
// === Dashboard: resumen financiero ===
function renderDashboard() {
    const totalIngresos = window.templatesStore.getIngresos().reduce((sum, i) => sum + parseFloat(i.importe), 0);
    const totalEgresos = window.templatesStore.getEgresos().reduce((sum, e) => sum + parseFloat(e.importe), 0);
    const balance = totalIngresos - totalEgresos;
  
    document.getElementById("total-ingresos").textContent = `S/ ${totalIngresos.toFixed(2)}`;
    document.getElementById("total-egresos").textContent = `S/ ${totalEgresos.toFixed(2)}`;
    document.getElementById("balance-general").textContent = `S/ ${balance.toFixed(2)}`;
    renderGrafico();
  }


  // === Gráfico de barras con Chart.js ===
  let chart;
  function renderGrafico() {
    const ctx = document.getElementById("chart-ingresos-egresos").getContext("2d");
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Ingresos', 'Egresos'],
        datasets: [{
          label: 'Soles',
          data: [
            window.templatesStore.getIngresos().reduce((sum, i) => sum + parseFloat(i.importe), 0),
            window.templatesStore.getEgresos().reduce((sum, e) => sum + parseFloat(e.importe), 0)
          ],
          backgroundColor: ['#22c55e', '#ef4444']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  }
  
  