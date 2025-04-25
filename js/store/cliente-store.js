import { getState, updateState, _generateId } from './store-manager.js';

// ========================================================================
// OPERACIONES PARA CLIENTES
// ========================================================================
    
    /**
     * Obtiene la lista completa de clientes
     * @returns {Array} Lista de objetos cliente
     */
    function getClientes() {
        return [...getState().clientes]; // Retornar copia para evitar mutaciones directas
    }
    
    /**
     * Busca un cliente por su ID
     * @param {string} id - ID del cliente a buscar
     * @returns {Object|null} El cliente encontrado o null si no existe
     */
    function getClienteById(id) {
        const cliente = getState().clientes.find(cliente => cliente.id === id);
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
        return getState().clientes.filter(cliente => {
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
        const clientes = getClientes();
        if (!clienteData.telefono) {
            throw new Error(`El cliente no tiene numero telefonico`);
        }
        if (!clienteData.email) {
            throw new Error(`El cliente no tiene email`);
        }
        if (!clienteData.numeroDocumento) {
            throw new Error(`El cliente no tiene numero de documento`);
        }    
        if (!clienteData.nombre) {
            throw new Error(`El cliente no tiene nombres`);
        }

        // Verificar si ya existe un cliente con el mismo email o documento
        const emailExists = clientes.some(c => 
            c.email.toLowerCase() === clienteData.email.toLowerCase());
            
        const docExists = clientes.some(c => 
            c.tipoDocumento === clienteData.tipoDocumento && 
            c.numeroDocumento === clienteData.numeroDocumento);
            
        if (emailExists) {
            throw new Error(`Ya existe un cliente con el email ${clienteData.email}`);
        }
        
        if (docExists) {
            throw new Error(`Ya existe un cliente con el documento ${clienteData.tipoDocumento}: ${clienteData.numeroDocumento}`);
        }

        if(!validarTipoDocumento(clienteData.tipoDocumento)){
            throw new Error("El tipoDocumento no cumple con ningún tipo de documento disponible");
        }


        const nuevoCliente = new Cliente(clienteData);
        nuevoCliente.id=_generateId('cliente');
        nuevoCliente.fechaRegistro=new Date().toISOString();
        //console.log("El  cliente insertado es :",nuevoCliente);


        clientes.push(nuevoCliente);
        // Agregar a la lista de clientes
        updateState('clientes', clientes);


        // Retornar copia del cliente actualizado
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
        const clientes = getClientes();
        // Buscar posición del cliente
        const index = clientes.findIndex(cliente => cliente.id === id);
        
        if (index === -1) {
            throw new Error(`Cliente con ID ${id} no encontrado`);
        }
        
        const clienteActual = clientes[index];
        
        // Verificar duplicados solo si se están cambiando esos campos
        if (clienteData.email && 
            clienteData.email.toLowerCase() !== clienteActual.email.toLowerCase()) {
            
            const emailExists = clientes.some(c => 
                c.id !== id && c.email.toLowerCase() === clienteData.email.toLowerCase());
                
            if (emailExists) {
                throw new Error(`Ya existe otro cliente con el email ${clienteData.email}`);
            }
        }
        
        if (clienteData.tipoDocumento && clienteData.numeroDocumento &&
            (clienteData.tipoDocumento !== clienteActual.tipoDocumento || 
             clienteData.numeroDocumento !== clienteActual.numeroDocumento)) {
            
            const docExists = clientes.some(c => 
                c.id !== id && 
                c.tipoDocumento === clienteData.tipoDocumento && 
                c.numeroDocumento === clienteData.numeroDocumento);
                
            if (docExists) {
                throw new Error(`Ya existe otro cliente con el documento ${clienteData.tipoDocumento}: ${clienteData.numeroDocumento}`);
            }
        }
        
        // Actualizar cliente manteniendo campos no modificados

        /*const clienteActualizado = {
            ...clienteActual,
            ...clienteData
        };*/
        // Crear una nueva instancia del Cliente con los valores actualizados
        const clienteActualizado = new Cliente({
            ...clienteActual, // Mantiene los valores anteriores
            ...clienteData   // Sobreescribe los valores modificados
        });

        console.log("El  cliente actualizado sera:",clienteActualizado);


        // Guardar en la misma posición
        clientes[index] = clienteActualizado;
        updateState('clientes', clientes);


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
        const clientes = getClientes();
        const ingresos = getState().egresos;
        const egresos = getState().ingresos;

        // Verificar que exista el cliente
        const index = clientes.findIndex(c => c.id === id);
        
        if (index === -1) {
            throw new Error(`Cliente con ID ${id} no encontrado`);
        }
        

        // Verificar que no tenga transacciones asociadas
        const tieneIngresos = ingresos.some(i => i.clienteId === id);
        const tieneEgresos = egresos.some(e => e.clienteId === id);
        
        if (tieneIngresos || tieneEgresos) {
            throw new Error(`No se puede eliminar el cliente porque tiene transacciones asociadas`);
        }
        
        // Eliminar cliente
        clientes.splice(index, 1);

        updateState('clientes', clientes);

        return true;
    }

    export {
        getClientes,
        getClienteById,
        searchClientes,
        addCliente,
        updateCliente,
        deleteCliente
      };
      