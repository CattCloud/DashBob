import { getState} from './store-manager.js';
import { getIngresosByCliente } from './ingreso-store.js';
import { getEgresosByCliente } from './egreso-store.js';
import { getClienteById } from './cliente-store.js';


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
        const clienteExists = getState().clientes.some(c => c.id === clienteId);
        if (!clienteExists) {
            throw new Error(`El cliente con ID ${clienteId} no existe`);
        }
        
        // Sumar todos los ingresos del cliente
        const totalIngresos = getState().ingresos
            .filter(i => i.clienteId === clienteId)
            .reduce((sum, i) => sum + parseFloat(i.importe), 0);
            
        // Sumar todos los egresos del cliente
        const totalEgresos = getState().egresos
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
        const totalIngresos = getState().ingresos
            .reduce((sum, i) => sum + parseFloat(i.importe), 0);
            
        // Sumar todos los egresos
        const totalEgresos = getState().egresos
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
            totalClientes: getState().clientes.length,
            totalTransacciones: getState().ingresos.length + getState().egresos.length,
            ultimasTransacciones: getUltimasTransacciones(5),
            // Otros datos estadísticos que se puedan requerir
            fechaActualizacion: new Date()
        };
    }
    
    /**
     * Obtiene las últimas transacciones (ingresos y egresos) registradas
     * @param {number} limite - Cantidad máxima de transacciones a retornar
     * @returns {Array} Lista de últimas transacciones
     */
    function getUltimasTransacciones(limite = 5) {
        // Combinar ingresos y egresos
        const ingresos = getState().ingresos.map(i => ({
            ...i,
            tipo: 'ingreso',
            clienteNombre: getClienteById(i.clienteId)?.nombre || 'Cliente desconocido'
        }));
        
        const egresos = getState().egresos.map(e => ({
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

    export {
        calcularBalanceCliente,
        calcularBalanceGeneral,
        getTransaccionesCliente,
        getEstadisticas,
        getUltimasTransacciones
      };
      