





function aplicarregistroIngreso(){
  const nuevoIngreso = {
    clienteId: document.getElementById("ingreso-cliente").value,
    moneda: document.getElementById("ingreso-moneda").value,
    medio : document.getElementById("ingreso-medio").value,
    banco: document.getElementById("ingreso-banco").value,
    importe: document.getElementById("ingreso-importe").value,
    concepto: document.getElementById("ingreso-concepto").value
  };
    try {
      const ingreso = window.templatesStore.addIngreso(nuevoIngreso);
      notyf.success("Ingreso registrado exitosamente.");
      renderIngresos();
      renderDashboard();
    
  } catch (error) {
      notyf.error(error.message);
    } 
}

function registrarIngreso(){
  abrirModalRegistrar("Registrar Ingreso","registrarIngreso",aplicarregistroIngreso);

}



// === Campos editables según estado ===
function obtenerCamposEditablesPorEstado(estado) {
    const mapa = {
      'pendiente': ['banco', 'medio', 'importe', 'concepto'],
      'facturado': ['banco', 'medio', 'concepto'],
      'saldo a favor': ['banco', 'medio', 'concepto', 'importe']
    };
    return mapa[estado] || [];
}


const getCaseModalIngreso={
    pendiente:"editarIngresoPendiente",
    facturado:"editarIngresoFacturado",
    "saldo a favor":"editarIngresoSaldoFavor"
}

function validarImporteIngresoEditar(ingresoEditado) {
    const clienteId = ingresoEditado.clienteId;
    const otrosIngresos = window.templatesStore.getIngresosByCliente(clienteId).filter(i => i.id !== ingresoEditado.id);
    const totalNuevoIngreso = otrosIngresos.reduce((sum, i) => sum + parseFloat(i.importe), 0)
      + parseFloat(ingresoEditado.importe);
    const egresos = window.templatesStore.getEgresosByCliente(clienteId);
    const totalEgresado = egresos.reduce((sum, e) => sum + parseFloat(e.importe), 0);
    const nuevoBalance = totalNuevoIngreso - totalEgresado;
    //False si el balance es negativo True si es cero o mas
    return nuevoBalance >= 0;
  }

function validarImporteIngresoEliminar(ingreso) {
    const clienteId = ingreso.clienteId;
    const otrosIngresos = window.templatesStore.getIngresosByCliente(clienteId).filter(i => i.id !== ingreso.id);
    const totalNuevoIngreso = otrosIngresos.reduce((sum, i) => sum + parseFloat(i.importe), 0);
    const egresos = window.templatesStore.getEgresosByCliente(clienteId);
    const totalEgresado = egresos.reduce((sum, e) => sum + parseFloat(e.importe), 0);
    const nuevoBalance = totalNuevoIngreso - totalEgresado;
    //False si el balance es negativo True si es cero o mas
    return nuevoBalance >= 0;
}



function aplicarEditarIngreso(id){
    const ingresoOriginal = window.templatesStore.getIngresoById(id);

    const nuevoIngreso = { ...ingresoOriginal };

    const campos = obtenerCamposEditablesPorEstado(ingresoOriginal.estado);
    // Obtener valores del formulario
    campos.forEach(campo => {
        const input = document.getElementById("editar-ingreso-" + campo);
        console.log( input.value);
        if (input) nuevoIngreso[campo] = input.value;
      });
    console.log("Nuevo->",nuevoIngreso); 
    switch  (ingresoOriginal.estado){
        case "pendiente":
        case "saldo a favor":
        
            if(validarImporteIngresoEditar(nuevoIngreso)){
                try {
                    window.templatesStore.updateIngreso(id,nuevoIngreso);
                    notyf.success("Ingreso editado exitosamente");
                    renderIngresos();
                    renderDashboard();
                  } catch (err) {
                    notyf.error(err.mensaje);
                  }
            }else{
                notyf.error("Error: El nuevo importe deja en saldo negativo el balance del cliente");
            }
        break;
        case "facturado":
            try {
                window.templatesStore.updateIngreso(id,nuevoIngreso);
                notyf.success("Ingreso editado exitosamente");
                renderIngresos();
                renderDashboard();
              } catch (err) {
                notyf.error(err.mensaje);
              }
        break;
        default:
            notyf.error("No se reconoce el estado del ingreso: ",ingresoOriginal.estado);
        break;    
    }
    

}

function editarIngreso(id) {
    const ingresoOriginal = window.templatesStore.getIngresoById(id);
    const campos = obtenerCamposEditablesPorEstado(ingresoOriginal.estado);
    console.log("Ingreso a editar",ingresoOriginal);
    abrirModalEditarIngreso("Editar ingreso",getCaseModalIngreso[ingresoOriginal.estado],aplicarEditarIngreso,ingresoOriginal,campos);
}



// === Eliminar cliente ===
function eliminarIngreso(id) {
    const ingresoEliminar= window.templatesStore.getIngresoById(id);
    mostrarModalEliminacion({
      titulo: "¿Eliminar ingreso?",
      mensaje: "Esta acción eliminará el ingreso permanentemente.",
      onConfirm: () => {
        try {
          if(validarImporteIngresoEliminar(ingresoEliminar)){
            if(window.templatesStore.deleteIngreso(id)){
                notyf.success("Ingreso eliminado exitosamente");
                renderIngresos();
                renderDashboard();
            }
          }else{
            notyf.error("Error: No es posible eliminar el ingreso, el cliente quedaria con saldo negativo");
          }
        } catch (error) {
          notyf.error(error.message);
        }
      }
    });
}




function vistaIngreso(id){
  abrirModalSoloBody(getCardTransaccion(id,"ingreso"));
}






function registrarIngresoClientDetalle() {
  idCliente=document.getElementById("cliente-detalle-select").value;
  cliente=window.templatesStore.getClienteById(idCliente);
  if (idCliente.trim()) {
    abrirModalRegistrar("Registrar Ingreso", "registrarIngresoDetalle", aplicarRegistroIngresoDetalle, getDetalleShortCliente(cliente));
  }

  function aplicarRegistroIngresoDetalle() {
    idCliente=document.getElementById("cliente-detalle-select").value;
    if(idCliente.trim()){
      const nuevoIngreso = {
        clienteId: idCliente,
        moneda: document.getElementById("ingreso-moneda").value,
        medio: document.getElementById("ingreso-medio").value,
        banco: document.getElementById("ingreso-banco").value,
        importe: document.getElementById("ingreso-importe").value,
        concepto: document.getElementById("ingreso-concepto").value
      };
    
      try {
        const ingreso = window.templatesStore.addIngreso(nuevoIngreso);
        notyf.success("Ingreso registrado exitosamente.");
        cargarDetalleCliente(idCliente);
      } catch (error) {
        notyf.error(error.message);
      }
  
    }
  }
}



