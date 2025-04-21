/**
 * El store maneja tres entidades principales:
 * - Clientes: información de los participantes en subastas
 * - Ingresos: garantías recibidas de clientes
 * - Egresos: devoluciones realizadas a clientes
 * 
 */

function createStore() {
    // Clave utilizada para almacenar el estado completo en localStorage
    const STORAGE_KEY = 'bob_subastas_data';
    
    // Estructura inicial del estado
    const initialState = {
        clientes: [],
        ingresos: [],
        egresos: []
    };
    
    // Estado en memoria (caché)
    let state = { ...initialState };
    
    /**
     * Inicializa el store cargando datos de localStorage si existen
     * o creando la estructura inicial si es la primera ejecución
     */
    function init() {
        try {
            // Intentar recuperar datos guardados
            const savedData = localStorage.getItem(STORAGE_KEY);
            
            if (savedData) {
                // Si existen datos guardados, cargarlos en el estado
                state = JSON.parse(savedData);
                console.log('Store: Datos cargados correctamente');
            } else {
                // Si no hay datos, inicializar con estado vacío y guardar
                state = { ...initialState };
                _saveToLocalStorage();
                console.log('Store: Inicializado con estado vacío');
            }
        } catch (error) {
            console.error('Error al inicializar el Store:', error);
            // En caso de error, inicializar con estado vacío
            state = { ...initialState };
            _saveToLocalStorage();
        }
    }
    
    /**
     * Guarda el estado actual en localStorage
     * Función privada usada internamente
     */
    function _saveToLocalStorage() {
        try {
            // Actualizar timestamp
            //state.metadata.lastUpdated = new Date().toISOString();
            // Guardar en localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            return true;
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
            // Posible error por límite de espacio
            return false;
        }
    }
    
    
    /**
     * Genera un ID único para una entidad específica
     * @param {string} entity - Nombre de la entidad ('cliente', 'ingreso', 'egreso')
     * @returns {string} ID único en formato 'C001', 'I001', 'E001', etc.
     */
    function _generateId(entity) {
        // Incrementar contador para la entidad
        //state.metadata.counters[entity]++;
        
        // Formatear ID según el tipo de entidad
        let lengthEntity;
        switch(entity){
            case "cliente":
                lengthEntity=state.clientes.length;
                break;
            case "ingreso":
                lengthEntity=state.ingresos.length;
                break;
            case "egreso":
                lengthEntity=state.egresos.length;
                break;    
        }
        const counter = lengthEntity.toString().padStart(3, '0');
        
        const prefix = {
            'cliente': 'C',
            'ingreso': 'I',
            'egreso': 'E'
        }[entity] || 'X';
        
        return `${prefix}${counter}`;
    }
    
    // ========================================================================
    // OPERACIONES PARA CLIENTES
    // ========================================================================
    
    /**
     * Obtiene la lista completa de clientes
     * @returns {Array} Lista de objetos cliente
     */
    function getClientes() {
        return [...state.clientes]; // Retornar copia para evitar mutaciones directas
    }
    
    /**
     * Busca un cliente por su ID
     * @param {string} id - ID del cliente a buscar
     * @returns {Object|null} El cliente encontrado o null si no existe
     */
    function getClienteById(id) {
        const cliente = state.clientes.find(cliente => cliente.id === id);
        return cliente ? { ...cliente } : null; // Retornar copia o null
    }
    
    
    /**
     * Busca clientes que coincidan con el criterio de búsqueda en cualquier campo
     * @param {string} searchTerm - Término de búsqueda
     * @returns {Array} Lista de clientes que coinciden con el criterio
     */
    function searchClientes(searchTerm) {
        if (!searchTerm) return getClientes();
        
        const term = searchTerm.toLowerCase();
        return state.clientes.filter(cliente => {
            // Buscar en campos comunes
            return (
                cliente.nombre.toLowerCase().includes(term) ||
                cliente.email.toLowerCase().includes(term) ||
                cliente.numeroDocumento.toLowerCase().includes(term) ||
                (cliente.telefono && cliente.telefono.includes(term))
            );
        });
    }
    
    /**
     * Agrega un nuevo cliente al store
     * @param {Object} clienteData - Datos del nuevo cliente
     * @returns {Object} Cliente creado con ID asignado
     * @throws {Error} Si faltan campos requeridos o hay duplicados
     */
    function addCliente(clienteData) {
 
        // Verificar si ya existe un cliente con el mismo email o documento
        const emailExists = state.clientes.some(c => 
            c.email.toLowerCase() === clienteData.email.toLowerCase());
            
        const docExists = state.clientes.some(c => 
            c.tipoDocumento === clienteData.tipoDocumento && 
            c.numeroDocumento === clienteData.numeroDocumento);
            
        if (emailExists) {
            throw new Error(`Ya existe un cliente con el email ${clienteData.email}`);
        }
        
        if (docExists) {
            throw new Error(`Ya existe un cliente con el documento ${clienteData.tipoDocumento}: ${clienteData.numeroDocumento}`);
        }
        
        // Crear nuevo cliente con ID generado y fecha de registro
        const nuevoCliente = {
            ...clienteData,
            id: _generateId('cliente'),
            fechaRegistro: new Date().toISOString()
        };
        
        // Agregar a la lista de clientes
        state.clientes.push(nuevoCliente);
        
        // Guardar cambios
        _saveToLocalStorage();
        
        // Retornar copia del cliente creado
        return { ...nuevoCliente };
    }
    
    /**
     * Actualiza los datos de un cliente existente
     * @param {string} id - ID del cliente a actualizar
     * @param {Object} clienteData - Nuevos datos del cliente
     * @returns {Object} Cliente actualizado
     * @throws {Error} Si el cliente no existe o hay campos duplicados
     */
    function updateCliente(id, clienteData) {
        // Buscar posición del cliente
        const index = state.clientes.findIndex(cliente => cliente.id === id);
        
        if (index === -1) {
            throw new Error(`Cliente con ID ${id} no encontrado`);
        }
        
        const clienteActual = state.clientes[index];
        
        // Verificar duplicados solo si se están cambiando esos campos
        if (clienteData.email && 
            clienteData.email.toLowerCase() !== clienteActual.email.toLowerCase()) {
            
            const emailExists = state.clientes.some(c => 
                c.id !== id && c.email.toLowerCase() === clienteData.email.toLowerCase());
                
            if (emailExists) {
                throw new Error(`Ya existe otro cliente con el email ${clienteData.email}`);
            }
        }
        
        if (clienteData.tipoDocumento && clienteData.numeroDocumento &&
            (clienteData.tipoDocumento !== clienteActual.tipoDocumento || 
             clienteData.numeroDocumento !== clienteActual.numeroDocumento)) {
            
            const docExists = state.clientes.some(c => 
                c.id !== id && 
                c.tipoDocumento === clienteData.tipoDocumento && 
                c.numeroDocumento === clienteData.numeroDocumento);
                
            if (docExists) {
                throw new Error(`Ya existe otro cliente con el documento ${clienteData.tipoDocumento}: ${clienteData.numeroDocumento}`);
            }
        }
        
        // Actualizar cliente manteniendo campos no modificados
        const clienteActualizado = {
            ...clienteActual,
            ...clienteData
        };
        
        // Guardar en la misma posición
        state.clientes[index] = clienteActualizado;
        
        // Guardar cambios
        _saveToLocalStorage();
        
        // Retornar copia del cliente actualizado
        return { ...clienteActualizado };
    }
    
    /**
     * Elimina un cliente (solo si no tiene transacciones asociadas)
     * @param {string} id - ID del cliente a eliminar
     * @returns {boolean} true si se eliminó correctamente
     * @throws {Error} Si el cliente tiene transacciones o no existe
     */
    function deleteCliente(id) {
        // Verificar que exista el cliente
        const index = state.clientes.findIndex(c => c.id === id);
        
        if (index === -1) {
            throw new Error(`Cliente con ID ${id} no encontrado`);
        }
        
        // Verificar que no tenga transacciones asociadas
        const tieneIngresos = state.ingresos.some(i => i.clienteId === id);
        const tieneEgresos = state.egresos.some(e => e.clienteId === id);
        
        if (tieneIngresos || tieneEgresos) {
            throw new Error(`No se puede eliminar el cliente porque tiene transacciones asociadas`);
        }
        
        // Eliminar cliente
        state.clientes.splice(index, 1);
        
        // Guardar cambios
        _saveToLocalStorage();
        
        return true;
    }
    
    // ========================================================================
    // OPERACIONES PARA INGRESOS (GARANTÍAS)
    // ========================================================================
    
    /**
     * Obtiene la lista completa de ingresos
     * @returns {Array} Lista de objetos ingreso
     */
    function getIngresos() {
        return [...state.ingresos]; // Retornar copia para evitar mutaciones directas
    }
    
    /**
     * Busca un ingreso por su ID
     * @param {string} id - ID del ingreso a buscar
     * @returns {Object|null} El ingreso encontrado o null si no existe
     */
    function getIngresoById(id) {
        const ingreso = state.ingresos.find(i => i.id === id);
        return ingreso ? { ...ingreso } : null; // Retornar copia o null
    }
    
    /**
     * Obtiene ingresos filtrados por cliente
     * @param {string} clienteId - ID del cliente
     * @returns {Array} Lista de ingresos del cliente
     */
    function getIngresosByCliente(clienteId) {
        return state.ingresos
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

        
        // Verificar que exista el cliente
        //const clienteExists = state.clientes.some(c => c.id === ingresoData.clienteId);
        //if (!clienteExists) {
        //    throw new Error(`El cliente con ID ${ingresoData.clienteId} no existe`);
        //}
        
        // Crear nuevo ingreso con ID generado y fechas
        const nuevoIngreso = {
            ...ingresoData,
            id: _generateId('ingreso'),
            fechaRegistro: new Date().toISOString(),
            estado: 'PENDIENTE'
        };
        
        // Agregar a la lista de ingresos
        state.ingresos.push(nuevoIngreso);
        
        // Guardar cambios
        _saveToLocalStorage();
        
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
        // Buscar posición del ingreso
        const index = state.ingresos.findIndex(i => i.id === id);
        
        if (index === -1) {
            throw new Error(`Ingreso con ID ${id} no encontrado`);
        }
        
        const ingresoActual = state.ingresos[index];
        
        // Si se cambia de cliente, verificar que el nuevo cliente exista
        if (ingresoData.clienteId && ingresoData.clienteId !== ingresoActual.clienteId) {
            const clienteExists = state.clientes.some(c => c.id === ingresoData.clienteId);
            if (!clienteExists) {
                throw new Error(`El cliente con ID ${ingresoData.clienteId} no existe`);
            }
        }
        
        // Actualizar ingreso manteniendo campos no modificados
        const ingresoActualizado = {
            ...ingresoActual,
            ...ingresoData
        };
        
        // Guardar en la misma posición
        state.ingresos[index] = ingresoActualizado;
        
        // Guardar cambios
        _saveToLocalStorage();
        
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
        const estadosValidos = ['PENDIENTE', 'FACTURADO', 'DEVUELTO', 'SALDO A FAVOR'];
        
        if (!estadosValidos.includes(nuevoEstado)) {
            throw new Error(`Estado '${nuevoEstado}' no válido para ingresos`);
        }
        
        return updateIngreso(id, { estado: nuevoEstado });
    }
    
    // ========================================================================
    // OPERACIONES PARA EGRESOS (DEVOLUCIONES)
    // ========================================================================
    
    /**
     * Obtiene la lista completa de egresos
     * @returns {Array} Lista de objetos egreso
     */
    function getEgresos() {
        return [...state.egresos]; // Retornar copia para evitar mutaciones directas
    }
    
    /**
     * Busca un egreso por su ID
     * @param {string} id - ID del egreso a buscar
     * @returns {Object|null} El egreso encontrado o null si no existe
     */
    function getEgresoById(id) {
        const egreso = state.egresos.find(e => e.id === id);
        return egreso ? { ...egreso } : null; // Retornar copia o null
    }
    
    /**
     * Obtiene egresos filtrados por cliente
     * @param {string} clienteId - ID del cliente
     * @returns {Array} Lista de egresos del cliente
     */
    function getEgresosByCliente(clienteId) {
        return state.egresos
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

        // Verificar que exista el cliente
        //const clienteExists = state.clientes.some(c => c.id === egresoData.clienteId);
        //if (!clienteExists) {
        //    throw new Error(`El cliente con ID ${egresoData.clienteId} no existe`);
        //}
        
        // Verificar que el cliente tenga saldo suficiente
        const saldoCliente = calcularBalanceCliente(egresoData.clienteId);
        
        if (parseFloat(egresoData.importe) > saldoCliente) {
            throw new Error(`Saldo insuficiente: El cliente tiene ${saldoCliente} pero se intentan retirar ${egresoData.importe}`);
        }
        
        // Crear nuevo egreso con ID generado y fechas
        const nuevoEgreso = {
            ...egresoData,
            id: _generateId('egreso'),
            fechaRegistro: new Date().toISOString(),
            // Si no se especifica estado, asignar PENDIENTE por defecto
            estado: 'PENDIENTE'
        };
        
        // Agregar a la lista de egresos
        state.egresos.push(nuevoEgreso);
        
        // Guardar cambios
        _saveToLocalStorage();
        
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
        // Buscar posición del egreso
        const index = state.egresos.findIndex(e => e.id === id);
        
        if (index === -1) {
            throw new Error(`Egreso con ID ${id} no encontrado`);
        }
        
        const egresoActual = state.egresos[index];
        
        // Si se cambia de cliente o importe, validar saldo
        if ((egresoData.clienteId && egresoData.clienteId !== egresoActual.clienteId) ||
            (egresoData.importe && parseFloat(egresoData.importe) !== parseFloat(egresoActual.importe))) {
            
            const clienteId = egresoData.clienteId || egresoActual.clienteId;
            
            // Calcular saldo actual sumando el monto actual (para excluirlo del cálculo)
            let saldoCliente = calcularBalanceCliente(clienteId);
            saldoCliente += parseFloat(egresoActual.importe);
            
            // Verificar si el nuevo monto es válido
            if (egresoData.importe && parseFloat(egresoData.importe) > saldoCliente) {
                throw new Error(`Saldo insuficiente: El cliente tiene ${saldoCliente} pero se intentan retirar ${egresoData.importe}`);
            }
        }
        
        // Actualizar egreso manteniendo campos no modificados
        const egresoActualizado = {
            ...egresoActual,
            ...egresoData
        };
        
        // Guardar en la misma posición
        state.egresos[index] = egresoActualizado;
        
        // Guardar cambios
        _saveToLocalStorage();
        
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
        const estadosValidos = ['PENDIENTE', 'COMPLETADO'];
        
        if (!estadosValidos.includes(nuevoEstado)) {
            throw new Error(`Estado '${nuevoEstado}' no válido para egresos`);
        }
        
        return updateEgreso(id, { estado: nuevoEstado });
    }
    
    // ========================================================================
    // OPERACIONES DE BALANCE
    // ========================================================================
    
    /**
     * Calcula el balance para un cliente específico
     * @param {string} clienteId - ID del cliente
     * @returns {number} Saldo actual del cliente (ingresos - egresos)
     */
    function calcularBalanceCliente(clienteId) {
        // Verificar que el cliente exista
        //const clienteExists = state.clientes.some(c => c.id === clienteId);
        //if (!clienteExists) {
        //    throw new Error(`El cliente con ID ${clienteId} no existe`);
        //}
        
        // Sumar todos los ingresos del cliente
        const totalIngresos = state.ingresos
            .filter(i => i.clienteId === clienteId)
            .reduce((sum, i) => sum + parseFloat(i.importe), 0);
            
        // Sumar todos los egresos del cliente
        const totalEgresos = state.egresos
            .filter(e => e.clienteId === clienteId)
            .reduce((sum, e) => sum + parseFloat(e.importe), 0);
            
        // Calcular saldo (ingresos - egresos)
        return +(totalIngresos - totalEgresos).toFixed(2);
    }
    
    /**
     * Calcula el balance general de todos los clientes
     * @returns {Object} Objeto con totales de ingresos, egresos y balance
     */
    function calcularBalanceGeneral() {
        // Sumar todos los ingresos
        const totalIngresos = state.ingresos
            .reduce((sum, i) => sum + parseFloat(i.importe), 0);
            
        // Sumar todos los egresos
        const totalEgresos = state.egresos
            .reduce((sum, e) => sum + parseFloat(e.importe), 0);
            
        // Calcular balance general
        const balance = +(totalIngresos - totalEgresos).toFixed(2);
        
        return {
            totalIngresos: +totalIngresos.toFixed(2),
            totalEgresos: +totalEgresos.toFixed(2),
            balance
        };
    }
    
    // ========================================================================
    // OPERACIONES DE TRANSACCIONES COMBINADAS
    // ========================================================================
    
    /**
     * Obtiene todas las transacciones (ingresos y egresos) de un cliente
     * ordenadas por fecha
     * @param {string} clienteId - ID del cliente
     * @returns {Array} Lista combinada de ingresos y egresos
     */
    function getTransaccionesCliente(clienteId) {
        // Obtener ingresos y egresos del cliente
        const ingresos = getIngresosByCliente(clienteId)
            .map(i => ({...i, tipo: 'ingreso'}));
            
        const egresos = getEgresosByCliente(clienteId)
            .map(e => ({...e, tipo: 'egreso'}));
            
        // Combinar y ordenar por fecha
        const transacciones = [...ingresos, ...egresos].sort((a, b) => {
            return new Date(b.fecha) - new Date(a.fecha);
        });
        
        return transacciones;
    }
    
    /**
     * Obtiene un resumen estadístico del estado actual del sistema
     * @returns {Object} Estadísticas del sistema
     */
    function getEstadisticas() {
        const balance = calcularBalanceGeneral();
        
        return {
            ...balance,
            totalClientes: state.clientes.length,
            totalTransacciones: state.ingresos.length + state.egresos.length,
            ultimasTransacciones: getUltimasTransacciones(5),
            // Otros datos estadísticos que se puedan requerir
            fechaActualizacion: new Date().toISOString()
        };
    }
    
    /**
     * Obtiene las últimas transacciones (ingresos y egresos) registradas
     * @param {number} limite - Cantidad máxima de transacciones a retornar
     * @returns {Array} Lista de últimas transacciones
     */
    function getUltimasTransacciones(limite = 5) {
        // Combinar ingresos y egresos
        const ingresos = state.ingresos.map(i => ({
            ...i,
            tipo: 'ingreso',
            clienteNombre: getClienteById(i.clienteId)?.nombre || 'Cliente desconocido'
        }));
        
        const egresos = state.egresos.map(e => ({
            ...e,
            tipo: 'egreso',
            clienteNombre: getClienteById(e.clienteId)?.nombre || 'Cliente desconocido'
        }));
        
        // Ordenar por fecha de registro (más reciente primero)
        const todasTransacciones = [...ingresos, ...egresos].sort((a, b) => {
            return new Date(b.fechaRegistro) - new Date(a.fechaRegistro);
        });
        
        // Limitar a la cantidad solicitada
        return todasTransacciones.slice(0, limite);
    }
    
    /**
     * Realiza una exportación completa de los datos del store
     * @returns {Object} Copia completa del estado actual
     */
    function exportData() {
        return JSON.parse(JSON.stringify(state));
    }
    
    /**
     * Importa datos completos al store (reemplaza todo el estado actual)
     * @param {Object} data - Datos a importar
     * @returns {boolean} true si la importación fue exitosa
     * @throws {Error} Si los datos tienen formato inválido
     */
    function importData(data) {
        try {
            // Validación básica de estructura
            if (!data.clientes || !data.ingresos || !data.egresos || !data.metadata) {
                throw new Error('Formato de datos inválido');
            }
            
            // Reemplazar estado actual
            state = JSON.parse(JSON.stringify(data));
            
            // Guardar en localStorage
            _saveToLocalStorage();
            
            return true;
        } catch (error) {
            console.error('Error al importar datos:', error);
            throw new Error('No se pudieron importar los datos: ' + error.message);
        }
    }
    
    /**
     * Limpia todos los datos del store (¡CUIDADO!)
     * @returns {boolean} true si la operación fue exitosa
     */
    function clearAll() {
        try {
            // Reiniciar a estado inicial
            state = { ...initialState };
            state.metadata.lastUpdated = new Date().toISOString();
            
            // Guardar en localStorage
            _saveToLocalStorage();
            
            return true;
        } catch (error) {
            console.error('Error al limpiar datos:', error);
            return false;
        }
    }
    

    init();
    
    return {
    // API para Clientes
    getClientes,
    getClienteById,
    searchClientes,
    addCliente,
    updateCliente,
    deleteCliente,

    // API para Ingresos
    getIngresos,
    getIngresoById,
    getIngresosByCliente,
    addIngreso,
    updateIngreso,
    updateIngresoEstado,

    // API para Egresos
    getEgresos,
    getEgresoById,
    getEgresosByCliente,
    addEgreso,
    updateEgreso,
    updateEgresoEstado,

    // API para Balance y Reportes
    calcularBalanceCliente,
    calcularBalanceGeneral,
    getTransaccionesCliente,
    getUltimasTransacciones,
    getEstadisticas,

    // Backup y Restauración
    exportData,
    importData,
    clearAll
    };
};


const templatesStore = createStore();
  
window.templatesStore = templatesStore;