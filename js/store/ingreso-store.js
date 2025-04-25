
import { getState, updateState, _generateId } from './store-manager.js';


// ========================================================================
// OPERACIONES PARA INGRESOS (GARANTÍAS)
// ========================================================================
    

    /**
     * Obtiene la lista completa de ingresos
     * @returns {Array} Lista de objetos ingreso
     */
    function getIngresos() {
        return [...getState().ingresos]; // Retornar copia para evitar mutaciones directas
    }
    



    /**
     * Busca un ingreso por su ID
     * @param {string} id - ID del ingreso a buscar
     * @returns {Object|null} El ingreso encontrado o null si no existe
     */
    function getIngresoById(id) {
        const ingreso = getState().ingresos.find(i => i.id === id);
        return ingreso ? { ...ingreso } : null; // Retornar copia o null
    }
    



    /**
     * Obtiene ingresos filtrados por cliente
     * @param {string} clienteId - ID del cliente
     * @returns {Array} Lista de ingresos del cliente
     */
    function getIngresosByCliente(clienteId) {
        return getState().ingresos
            .filter(ingreso => ingreso.clienteId === clienteId)
            .map(ingreso => ({ ...ingreso })); // Retornar copias
    }
    



    /**
     * Agrega un nuevo ingreso (garantía) al store
     * @param {Object} ingresoData - Datos del nuevo ingreso
     * @returns {Object} Ingreso creado con ID asignado
     * @throws {Error} Si faltan campos requeridos o el cliente no existe
     */
    function addIngreso(ingresoData) {

        const ingresos=getIngresos();
        // Verificar que exista el cliente
        const clienteExists = getState().clientes.some(c => c.id === ingresoData.clienteId);
        if (!clienteExists) {
            throw new Error(`El cliente con ID ${ingresoData.clienteId} no existe`);
        }
        
        if (!ingresoData.clienteId || !ingresoData.moneda || !ingresoData.medio || !ingresoData.banco || isNaN(ingresoData.importe)) {
            throw new Error("Ingreso con datos incompletos");
        }

        if (!validarMedioPago(ingresoData.medio)) {
            throw new Error("El medio no cumple con ningún medio de pago disponible");
        }
        
        if (!validarBanco(ingresoData.banco)) {
            throw new Error("El banco no cumple con ningún banco disponible");
        }
        
        if (!validarMoneda(ingresoData.moneda)) {
            throw new Error("La moneda no cumple con ningún tipo de moneda disponible");
        }
        
        if (!validarConceptoIngreso(ingresoData.concepto)) {
            throw new Error("El concepto no cumple con ningún concepto disponible");
        }
        if(ingresoData.estado){
            if(!validarEstadoIngreso(ingresoData.estado)){
                throw new Error("El estado no cumple con ningún estado disponible");
            }
            ingresoData.estado=ingresoData.estado.toLowerCase();
        }
        // Crear nuevo ingreso con ID generado y fechas
        const nuevoIngreso=new Transaccion(ingresoData);
        nuevoIngreso.id= _generateId('ingreso');
        nuevoIngreso.fechaRegistro=new Date().toISOString();
        nuevoIngreso.estado= ingresoData.estado || 'pendiente';
        console.log("registrado",nuevoIngreso);
        /*
        const nuevoIngreso = {
            ...ingresoData,
            id: _generateId('ingreso'),
            fechaRegistro: new Date().toISOString(),
            estado: ingresoData.estado || 'pendiente'
        };*/
        // Agregar a la lista de ingresos
        ingresos.push(nuevoIngreso);
        updateState('ingresos', ingresos);
        // Retornar copia del ingreso creado
        return { ...nuevoIngreso };
    }
    




    /**
     * Actualiza los datos de un ingreso existente
     * @param {string} id - ID del ingreso a actualizar
     * @param {Object} ingresoData - Nuevos datos del ingreso
     * @returns {Object} Ingreso actualizado
     * @throws {Error} Si el ingreso no existe
     */
    function updateIngreso(id, ingresoData) {

        const ingresos=getIngresos();
        // Buscar posición del ingreso
        const index = ingresos.findIndex(i => i.id === id);
        const ingresoActual = ingresos[index];
        // Si se cambia de cliente, verificar que el nuevo cliente exista
        if (ingresoData.clienteId && ingresoData.clienteId !== ingresoActual.clienteId) {
            const clienteExists = getState().clientes.some(c => c.id === ingresoData.clienteId);
            if (!clienteExists) {
                throw new Error(`El cliente con ID ${ingresoData.clienteId} no existe`);
            }
        }
        // Actualizar ingreso manteniendo campos no modificados
        const ingresoActualizado = new Transaccion({...ingresoActual,...ingresoData});

        console.log("guardado",ingresoActualizado);
        // Guardar en la misma posición
        ingresos[index] = ingresoActualizado;

        updateState('ingresos', ingresos);
        // Retornar copia del ingreso actualizado
        return { ...ingresoActualizado };
    }
    





    /**
     * Actualiza el estado de un ingreso (PENDIENTE, FACTURADO, DEVUELTO, etc.)
     * @param {string} id - ID del ingreso a actualizar
     * @param {string} nuevoEstado - Nuevo estado a asignar
     * @returns {Object} Ingreso actualizado
     * @throws {Error} Si el ingreso no existe o el estado es inválido
     */
    function updateIngresoEstado(id, nuevoEstado) {
        // Estados válidos para ingresos
        const estadosValidos = ['pendiente', 'facturado', 'devuelto', 'saldo a favor'];
        if (!estadosValidos.includes(nuevoEstado)) {
            throw new Error(`Estado '${nuevoEstado}' no válido para ingresos`);
        }
        return updateIngreso(id, { estado: nuevoEstado });
    }


    /**
     * Elimina un ingreso(previamente con ciertas validaciones)
     * @param {string} id - ID del ingreso a eliminar
     * @returns {boolean} true si se eliminó correctamente
     * @throws {Error} Si el ingreso no existe
     */
        function deleteIngreso(id) {
            const ingresos=getIngresos();
            // Buscar posición del ingreso
            const index = ingresos.findIndex(i => i.id === id);

            if (index === -1) {
                throw new Error(`Ingreso con ID ${id} no encontrado`);
            }
            // Eliminar ingreso
            ingresos.splice(index, 1);

            updateState('ingresos', ingresos);

        return true;
        }

    export {
        getIngresos,
        getIngresoById,
        getIngresosByCliente,
        addIngreso,
        updateIngreso,
        updateIngresoEstado,
        deleteIngreso
      };
      