
import { getState,updateStateAll} from './store-manager.js';


    /**
     * Realiza una exportación completa de los datos del store
     * @returns {Object} Copia completa del estado actual
     */
    function exportData() {
        return JSON.parse(JSON.stringify(getState()));
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
            updateStateAll(JSON.parse(JSON.stringify(data)));

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
            updateStateAll( {
                clientes: [],
                ingresos: [],
                egresos: []
            }
            );
            
            return true;
        } catch (error) {
            console.error('Error al limpiar datos:', error);
            return false;
        }
    }

    export{
        exportData,
        importData,
        clearAll
    };
