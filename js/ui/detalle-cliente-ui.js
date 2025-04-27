  function cargarDetalleCliente(clienteId){
    if(clienteId){
        const cardcliente=document.getElementById("info-cliente-detalle");
        cardcliente.innerHTML=getCardClienteDetalle(clienteId);
        
        const cardsResumen = document.getElementById("cards-cliente-detalle");
        cardsResumen.innerHTML = getCardsClienteDetalle(clienteId);

        const botonesAccion = document.getElementById("botones-cliente-detalle");
        botonesAccion.innerHTML = getBotonesClienteDetalle(clienteId);
        
    }
  } 



