
//Listener para registrar un egreso

function aplicarregistroEgreso(){
  const nuevoEgreso = {
    clienteId: document.getElementById("egreso-cliente").value,
    moneda: document.getElementById("egreso-moneda").value,
    medio : document.getElementById("egreso-medio").value,
    banco: document.getElementById("egreso-banco").value,
    importe: document.getElementById("egreso-importe").value,
    concepto: document.getElementById("egreso-concepto").value
  };
  console.log("DataIngreso: ",nuevoEgreso);
  try {
    const newEgreso=window.templatesStore.addEgreso(nuevoEgreso);
    console.log(newEgreso);
    notyf.success("Egreso registrado exitosamente");
    renderEgresos();
    renderDashboard();
  } catch (error) {
    notyf.error(error.message);
  }

}

function registrarEgreso(){
  abrirModalRegistrar("Registrar Egreso","registrarEgreso",aplicarregistroEgreso);

}




// === Campos editables según estado ===
function obtenerCamposEgresoEditablesPorEstado(estado) {
    const mapa = {
      'pendiente': ['banco', 'medio', 'importe', 'concepto'],
      'completado': ['banco', 'medio', 'concepto'],
    };
    return mapa[estado] || [];
}


const getCaseModalEgreso={
    pendiente:"editarEgresoPendiente",
    completado:"editarEgresoCompletado",
}

function validarImporteEgresoEditar(egresoEditado) {
    const clienteId = egresoEditado.clienteId;
    const totalIngreso = window.templatesStore.getIngresosByCliente(clienteId).reduce((sum, i) => sum + parseFloat(i.importe), 0); 
    const otrosEgresos = window.templatesStore.getEgresosByCliente(clienteId).filter(i => i.id !== egresoEditado.id);
    const totalNuevoEgresado = otrosEgresos.reduce((sum, e) => sum + parseFloat(e.importe), 0) + parseFloat(egresoEditado.importe);
    const nuevoBalance = totalIngreso - totalNuevoEgresado;
    //False si el balance es negativo True si es cero o mas
    return nuevoBalance >= 0;
  }
 



function aplicarEditarEgreso(id){
    const egresoOriginal = window.templatesStore.getEgresoById(id);
    const nuevoEgreso = { ...egresoOriginal };
    const campos = obtenerCamposEgresoEditablesPorEstado(egresoOriginal.estado);

    // Obtener valores del formulario
    campos.forEach(campo => {
        const input = document.getElementById("editar-egreso-" + campo);
        //console.log(input.value);
        if (input) nuevoEgreso[campo] = input.value;
      });
      
    console.log("Nuevo->",nuevoEgreso); 
    switch  (egresoOriginal.estado){
        case "pendiente":
            if(validarImporteEgresoEditar(nuevoEgreso)){
                try {
                    window.templatesStore.updateEgreso(id,nuevoEgreso);
                    notyf.success("Egreso editado exitosamente");
                    renderEgresos();
                    renderDashboard();
                  } catch (err) {
                    notyf.error(err.mensaje);
                  }
            }else{
                notyf.error("Error: El nuevo importe de egreso deja en saldo negativo el balance del cliente");
            }
        break;
        case "completado":
            try {
                window.templatesStore.updateEgreso(id,nuevoEgreso);
                notyf.success("Egreso editado exitosamente");
                renderEgresos();
                renderDashboard();
              } catch (err) {
                notyf.error(err.mensaje);
              }
        break;
        default:
            notyf.error("No se reconoce el estado del egreso: ",egresoOriginal.estado);
        break;    
    }
}


function editarEgreso(id) {
    const egresoOriginal = window.templatesStore.getEgresoById(id);
    const campos = obtenerCamposEgresoEditablesPorEstado(egresoOriginal.estado);
    abrirModalEditarEgreso("Editar egreso",getCaseModalEgreso[egresoOriginal.estado],aplicarEditarEgreso,egresoOriginal,campos);
}



// === Eliminar cliente ===
function eliminarEgreso(id) {
    //const egresoEliminar= window.templatesStore.getEgresoById(id);
    mostrarModalEliminacion({
      titulo: "¿Eliminar egreso?",
      mensaje: "Esta acción eliminará el egreso permanentemente.",
      onConfirm: () => {
        try {
            if(window.templatesStore.deleteEgreso(id)){
                notyf.success("Egreso eliminado exitosamente");
                renderEgresos();
                renderDashboard();
            }
          
        } catch (error) {
          notyf.error(error.message);
        }
      }
    });
}




function vistaEgreso(id){
  abrirModalVista(getCardTransaccion(id,"egreso"));
}
