// === Clase FilterManagerTransaccion ===
class FilterManagerTransaccion {
    constructor(tipo,transaccionesOriginales,detalle=false) {
      this.tipo=tipo;//ingreso o egreso
      this.originalArray = transaccionesOriginales; // array original (sin filtros)
      this.searchArray = [...transaccionesOriginales];
      this.filters = {
        texto: '',
        fechaDesde: '',
        fechaHasta: '',
        importeMin: '',
        importeMax: '',
        concepto: 'todo',
        estado: 'todo',
        moneda: 'todo',
        medio: 'todo',
        orden: 'fecha'
      };
      this.activeFilters = []; // visualización de filtros activos
      this.isdetalleCliente=detalle;
    }
  
    setTexto(texto) {
      this.filters.texto = texto.toLowerCase().trim();
      this.applyFilters();
    }
  
    setFechaDesde(fecha) { this.filters.fechaDesde = fecha; }
    setFechaHasta(fecha) { this.filters.fechaHasta = fecha; }
    setImporteMin(min) { this.filters.importeMin = min; }
    setImporteMax(max) { this.filters.importeMax = max; }
    setConcepto(concepto) { this.filters.concepto = concepto; }
    setEstado(estado) { this.filters.estado = estado; }
    setMoneda(moneda) { this.filters.moneda = moneda; }
    setMedio(medio) { this.filters.medio = medio; }
    setOrden(criterio) {
      this.filters.orden = criterio;
      this.applyFilters();
    }
  
    hasFilters() {
      const f = this.filters;
      return (
        f.texto.trim() || f.fechaDesde || f.fechaHasta ||
        f.importeMin || f.importeMax ||
        f.concepto !== 'todo' ||
        f.estado !== 'todo' ||
        f.moneda !== 'todo' ||
        f.medio !== 'todo'
      );
    }
  
    onlyOrdenamiento() {
      return this.filters.orden !== 'fecha';
    }
  
    renderOnlyOrdenamiento(){
        if(!this.onlyOrdenamiento){
           this.applyOrdenamiento();    
        }
        this.renderTransaccion(); 
    }
      
    renderTransaccion(){
        //console.log(this.tipo);
        //console.log("Es ingreso?",this.tipo=="ingreso");
        if(this.isdetalleCliente){
          if(this.tipo == "ingreso"){
            console.log("Es resultado de busqueda es",this.searchArray);
            renderIngresosCliente()
            }else{
            //console.log(this.searchArray);
            renderEgresosCliente()
            }
        }else{
          if(this.tipo == "ingreso"){
            renderIngresos()
            }else{
            renderEgresos()
            }
        }

    }



    applyFilters() {
      const f = this.filters;
      const transacciones = this.originalArray.filter(t => {
        const cliente = window.templatesStore.getClienteById(t.clienteId) || { nombre: '' };
  

        let textoMatch=""
        if(this.isdetalleCliente){
          textoMatch = f.texto === '' || [t.banco]
          .some(campo => campo?.toLowerCase().includes(f.texto));
        }else{
          textoMatch = f.texto === '' || [cliente.nombre, t.banco]
          .some(campo => campo?.toLowerCase().includes(f.texto));
        }

        const fechaMatch = (!f.fechaDesde || crearFechaExacta(t.fechaRegistro) >= crearFechaExacta(normalizarFecha(f.fechaDesde))) &&
                           (!f.fechaHasta || crearFechaExacta(t.fechaRegistro) <= crearFechaExacta(normalizarFecha(f.fechaHasta)));

  
        const importeMatch = (!f.importeMin || parseFloat(t.importe) >= parseFloat(f.importeMin)) &&
                             (!f.importeMax || parseFloat(t.importe) <= parseFloat(f.importeMax));
  
        const conceptoMatch = f.concepto === 'todo' || t.concepto === f.concepto.toLowerCase();
        const estadoMatch = f.estado === 'todo' || t.estado === f.estado.toLowerCase();
        const monedaMatch = f.moneda === 'todo' || t.moneda === f.moneda.toLowerCase();
        const medioMatch = f.medio === 'todo' || t.medio === f.medio.toLowerCase();
  
        return textoMatch && fechaMatch && importeMatch && conceptoMatch && estadoMatch && monedaMatch && medioMatch;
      });
  


      this.searchArray = [...transacciones];
      this.applyOrdenamiento();
      this.updateActiveFilters();
      this.renderTransaccion();     
    }

    applyOrdenamiento() {
      const criterio = this.filters.orden;
      const transacciones = this.searchArray;
  
      switch (criterio) {
        case 'nombre':
          transacciones.sort((a, b) => {
            const clienteA = window.templatesStore.getClienteById(a.clienteId)?.nombre || '';
            const clienteB = window.templatesStore.getClienteById(b.clienteId)?.nombre || '';
            return clienteA.localeCompare(clienteB);
          });
          break;
        case 'mayorImporte':
          transacciones.sort((a, b) => b.importe - a.importe);
          break;
        case 'menorImporte':
          transacciones.sort((a, b) => a.importe - b.importe);
          break;
        default:
          transacciones.sort((a, b) => crearFechaExacta(b.fechaRegistro) - crearFechaExacta(a.fechaRegistro));
      }
  
      this.searchArray = transacciones;
    }
  
    updateActiveFilters() {
      const f = this.filters;
      this.activeFilters = [];
  
      if (f.texto) this.activeFilters.push(`Texto: "${f.texto}"`);
      if (f.fechaDesde || f.fechaHasta) this.activeFilters.push(`Fecha: ${f.fechaDesde || '...'} → ${f.fechaHasta || '...'}`);
      if (f.importeMin || f.importeMax) this.activeFilters.push(`Importe: ${f.importeMin || '...'} - ${f.importeMax || '...'}`);
      if (f.concepto !== 'todo') this.activeFilters.push(`Concepto: ${f.concepto}`);
      if (f.estado !== 'todo') this.activeFilters.push(`Estado: ${f.estado}`);
      if (f.moneda !== 'todo') this.activeFilters.push(`Moneda: ${f.moneda}`);
      if (f.medio !== 'todo') this.activeFilters.push(`Medio: ${f.medio}`);
    }
  
    resetFilters() {
      //Guardabamos el orden en el que estaba
      const orden=this.filters.orden;  
      this.filters = {
        texto: '',
        fechaDesde: '',
        fechaHasta: '',
        importeMin: '',
        importeMax: '',
        concepto: 'todo',
        estado: 'todo',
        moneda: 'todo',
        medio: 'todo',
        orden : orden
      };
      this.searchArray = [...this.originalArray];
      this.activeFilters = [];
      this.applyOrdenamiento();
      this.renderOnlyOrdenamiento();

      if(this.isdetalleCliente){
        if(this.tipo == "ingreso"){
          document.getElementById("btn-remover-filtros-ingreso-detalle").classList.add("hidden");
        }else{
          document.getElementById("btn-remover-filtros-egreso-detalle").classList.add("hidden");
        }
      }else{
        if(this.tipo == "ingreso"){
          document.getElementById("btn-remover-filtros-ingreso").classList.add("hidden");
        }else{
          document.getElementById("btn-remover-filtros-egreso").classList.add("hidden");
        }
      }

    }
  
    refreshFromStore() {
      if(this.tipo == "ingreso"){
        this.originalArray=window.templatesStore.getIngresos();
            }else{
        this.originalArray=window.templatesStore.getEgresos();
            }
      if (this.hasFilters()) {
        this.applyFilters();
      } else {
        this.renderOnlyOrdenamiento();
      }
    }
  }
  

  const ingresoFilter = new FilterManagerTransaccion("ingreso",window.templatesStore.getIngresos()); 
  window.ingresoFilter= ingresoFilter;
  const egresoFilter = new FilterManagerTransaccion("egreso",window.templatesStore.getEgresos()); 
  window.egresoFilter= egresoFilter;




