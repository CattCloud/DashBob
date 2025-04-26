// store-manager.js
/**
 * El store maneja tres entidades principales:
 * - Clientes: información de los participantes en subastas
 * - Ingresos: garantías recibidas de clientes
 * - Egresos: devoluciones realizadas a clientes
 * 
 */
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
   function initStore() {
      try {
        // Intentar recuperar datos guardados
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (savedData) {
            // Si existen datos guardados, cargarlos en el estado
            state = JSON.parse(savedData);
            notyf.success("Datos cargados correctamente");
            //console.log('Store: Datos cargados correctamente');
        } else {
            // Si no hay datos, inicializar con estado vacío y guardar
            state = { ...initialState };
            _saveToLocalStorage();
            //notyf.info("Datos cargados correctamente");
            console.log('Store: Inicializado con estado vacío');
        }
    } catch (error) {
        notyf.error('Error al cargar datos:', error);
        //console.error('Error al inicializar el Store:', error);
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
            console.log("LO QUE GUARDO ES "+ JSON.stringify(state));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            return true;
        } catch (error) {
            notyf.error('Error al guardar en localStorage:', error);
            //console.error('Error al guardar en localStorage:', error);
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
    
    

function getState() {
  return state;
}

function updateState(key, data) {
  state[key] = data;
  _saveToLocalStorage();
}

function updateStateAll(data) {
    state = data;
    _saveToLocalStorage();
  }



export {
  initStore,
  getState,
  updateState,
  _generateId,
  updateStateAll
};
