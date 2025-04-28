let  ingresoDetalleFilter;
let  egresoDetalleFilter;

  function cargarDetalleCliente(clienteId){
    if(clienteId){

        document.getElementById("content-detalle-cliente").classList.remove("hidden");
        ingresoDetalleFilter = new FilterManagerTransaccion("ingreso", window.templatesStore.getIngresosByCliente(clienteId),true);
        window.ingresoDetalleFilter=ingresoDetalleFilter;
        egresoDetalleFilter = new FilterManagerTransaccion("egreso",  window.templatesStore.getEgresosByCliente(clienteId),true);
        window.egresoDetalleFilter=egresoDetalleFilter;

        const cardcliente=document.getElementById("info-cliente-detalle");
        cardcliente.innerHTML=getCardClienteDetalle(clienteId);
        
        const cardsResumen = document.getElementById("cards-cliente-detalle");
        cardsResumen.innerHTML = getCardsClienteDetalle(clienteId);

        const botonesAccion = document.getElementById("botones-cliente-detalle");
        botonesAccion.innerHTML = getBotonesClienteDetalle(clienteId);

        renderIngresosCliente(clienteId);
        renderEgresosCliente(clienteId);
    }
  } 



