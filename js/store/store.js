
// store.js (el centralizador del Store completo)
import * as ClienteStore from './cliente-store.js';
import * as IngresoStore from './ingreso-store.js';
import * as EgresoStore from './egreso-store.js';
import * as StoreManager from './store-manager.js';
import * as BalanceStore from './balance-store.js';
import * as BackupStore from './backup-store.js';


function createStore() {
  // Inicializamos el estado desde localStorage
  StoreManager.initStore();

  return {
    // Acceso al estado
    getState: StoreManager.getState,
    updateState: StoreManager.updateState,

    // Clientes
    ...ClienteStore,

    // Ingresos
    ...IngresoStore,

    // Egresos
    ...EgresoStore,

    ...BalanceStore,

    ...BackupStore,
  };
}


const templatesStore = createStore();
  
window.templatesStore = templatesStore;

