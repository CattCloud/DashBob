import { getState, updateState, _generateId } from './store-manager.js';
import { calcularBalanceCliente } from './balance-store.js';

// ========================================================================
// OPERACIONES PARA EGRESOS (DEVOLUCIONES)
// ========================================================================
    
    /**
     * Obtiene la lista completa de egresos
     * @returns {Array} Lista de objetos egreso
     */
    function getEgresos() {
        return [...getState().egresos]; // Retornar copia para evitar mutaciones directas
    }
    



    /**
     * Busca un egreso por su ID
     * @param {string} id - ID del egreso a buscar
     * @returns {Object|null} El egreso encontrado o null si no existe
     */
    function getEgresoById(id) {
        const egreso = getState().egresos.find(e => e.id === id);
        return egreso ? { ...egreso } : null; // Retornar copia o null
    }
    



    /**
     * Obtiene egresos filtrados por cliente
     * @param {string} clienteId - ID del cliente
     * @returns {Array} Lista de egresos del cliente
     */
    function getEgresosByCliente(clienteId) {
        return getState().egresos
            .filter(egreso => egreso.clienteId === clienteId)
            .map(egreso => ({ ...egreso })); // Retornar copias
    }



    
    /**
     * Agrega un nuevo egreso (devolución) al store
     * @param {Object} egresoData - Datos del nuevo egreso
     * @returns {Object} Egreso creado con ID asignado
     * @throws {Error} Si faltan campos requeridos, el cliente no existe o el saldo es insuficiente
     */
    function addEgreso(egresoData) {

        const egresos=getEgresos();

        // Verificar que exista el cliente
        const clienteExists = getState().clientes.some(c => c.id === egresoData.clienteId);
            if (!clienteExists) {
            throw new Error(`El cliente con ID ${egresoData.clienteId} no existe`);
        }

        if (!egresoData.clienteId || !egresoData.moneda || !egresoData.medio || !egresoData.banco || isNaN(egresoData.importe)) {
            throw new Error("Ingreso con datos incompletos");
        }

        if (!validarMedioPago(egresoData.medio)) {
            throw new Error("El medio no cumple con ningún medio de pago disponible");
        }
        
        if (!validarBanco(egresoData.banco)) {
            throw new Error("El banco no cumple con ningún banco disponible");
        }
        
        if (!validarMoneda(egresoData.moneda)) {
            throw new Error("La moneda no cumple con ningún tipo de moneda disponible");
        }
        
        if (!validarConceptoEgreso(egresoData.concepto)) {
            throw new Error("El concepto no cumple con ningún concepto disponible");
        }
        
        if(egresoData.estado){
            if(!validarEstadoEgreso(egresoData.estado)){
                throw new Error("El estado no cumple con ningún estado disponible");
            }
            egresoData.estado=egresoData.estado.toLowerCase();
        }
        
        // Verificar que el cliente tenga saldo suficiente
        const saldoCliente = calcularBalanceCliente(egresoData.clienteId);
        
        if (parseFloat(egresoData.importe) > saldoCliente) {
            throw new Error(`Saldo insuficiente: El cliente tiene ${saldoCliente} pero se intentan retirar ${egresoData.importe}`);
        }
        const nuevoEgreso=new Transaccion(egresoData);
        nuevoEgreso.id=_generateId('egreso');
        nuevoEgreso.fechaRegistro=obtenerSoloFecha(new Date());
        nuevoEgreso.estado=egresoData.estado ||'pendiente';


        // Crear nuevo egreso con ID generado y fechas
        /*const nuevoEgreso2 = {
            ...egresoData,
            id: _generateId('egreso'),
            fechaRegistro: new Date().toISOString(),
            // Si no se especifica estado, asignar PENDIENTE por defecto
            estado: egresoData.estado ||'pendiente'
        };*/


        
        // Agregar a la lista de egresos
        egresos.push(nuevoEgreso);

        updateState('egresos', egresos);

 
        // Retornar copia del egreso creado
        return { ...nuevoEgreso };
    }



    
    /**
     * Actualiza los datos de un egreso existente
     * @param {string} id - ID del egreso a actualizar
     * @param {Object} egresoData - Nuevos datos del egreso
     * @returns {Object} Egreso actualizado
     * @throws {Error} Si el egreso no existe o el nuevo monto supera el saldo disponible
     */
    function updateEgreso(id, egresoData) {
        const egresos=getEgresos();

        // Buscar posición del egreso
        const index = egresos.findIndex(e => e.id === id);
        
        if (index === -1) {
            throw new Error(`Egreso con ID ${id} no encontrado`);
        }
        
        const egresoActual = egresos[index];
        
        // Si se cambia de cliente o importe, validar saldo
        if ((egresoData.clienteId && egresoData.clienteId !== egresoActual.clienteId) ||
            (egresoData.importe && parseFloat(egresoData.importe) !== parseFloat(egresoActual.importe))) {
            
            const clienteId = egresoData.clienteId || egresoActual.clienteId;
            
            // Calcular saldo actual sumando el monto actual (para excluirlo del cálculo)
            //let saldoCliente = calcularBalanceCliente(clienteId);
            //saldoCliente += parseFloat(egresoActual.importe);
                
            // Verificar si el nuevo monto es válido
                //if (egresoData.importe && parseFloat(egresoData.importe) > saldoCliente) {
                //    throw new Error(`Saldo insuficiente: El cliente tiene ${saldoCliente} pero se intentan retirar ${egresoData.importe}`);
            // }
        }
        
        // Actualizar egreso manteniendo campos no modificados
        const egresoActualizado = new Transaccion({
            ...egresoActual,
            ...egresoData
        });
        
        // Guardar en la misma posición
        egresos[index] = egresoActualizado;
        updateState('egresos', egresos);

        // Retornar copia del egreso actualizado
        return { ...egresoActualizado };
    }
    
    /**
     * Actualiza el estado de un egreso (PENDIENTE, COMPLETADO)
     * @param {string} id - ID del egreso a actualizar
     * @param {string} nuevoEstado - Nuevo estado a asignar
     * @returns {Object} Egreso actualizado
     * @throws {Error} Si el egreso no existe o el estado es inválido
     */
    function updateEgresoEstado(id, nuevoEstado) {
        // Estados válidos para egresos
        const estadosValidos = ['pendiente', 'completado'];
        
        if (!estadosValidos.includes(nuevoEstado)) {
            throw new Error(`Estado '${nuevoEstado}' no válido para egresos`);
        }
        
        return updateEgreso(id, { estado: nuevoEstado });
    }
    
    /**
         * Elimina un egreso
         * @param {string} id - ID del egreso a eliminar
         * @returns {boolean} true si se eliminó correctamente
         * @throws {Error} Si el egreso no existe
         */
            function deleteEgreso(id) {
                const egresos=getEgresos();
                // Buscar posición del egreso
                const index = egresos.findIndex(i => i.id === id);
    
                if (index === -1) {
                    throw new Error(`Egreso con ID ${id} no encontrado`);
                }
                // Eliminar ingreso
                egresos.splice(index, 1);
    
                updateState('egresos', egresos);
    
            return true;
    }
    

    export {
        getEgresos,
        getEgresoById,
        getEgresosByCliente,
        addEgreso,
        updateEgreso,
        updateEgresoEstado,
        deleteEgreso
      };
      