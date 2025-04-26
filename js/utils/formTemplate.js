const FormTemplatesModal = {
    editarIngresoPendiente: `
  
        <div>
          <label class="block mb-1 font-bold" for="editar-ingreso-banco">Banco</label>
          <select id="editar-ingreso-banco" class="p-2 border rounded w-full" name="banco" required>
            ${getOpcionesBanco()}
          </select>
        </div>
  
        <div>
          <label class="block mb-1 font-bold" for="editar-ingreso-medio">Medio de pago</label>
          <select id="editar-ingreso-medio" class="p-2 border rounded w-full" name="medio" required>
            ${getOpcionesMediosPago()}
          </select>
        </div>
  
        <div>
          <label class="block mb-1 font-bold" for="editar-ingreso-concepto">Concepto</label>
          <select id="editar-ingreso-concepto" class="p-2 border rounded w-full" name="concepto" required>
            ${getOpcionesConceptoIngreso()}
          </select>
        </div>
  
        <div>
          <label class="block mb-1 font-bold" for="editar-ingreso-importe">Importe</label>
          <input type="number" id="editar-ingreso-importe" class="p-2 border rounded w-full" name="importe" placeholder="Importe" required>
        </div>
    `,
  
    editarIngresoFacturado: `
      <div>
        <label class="block mb-1 font-bold" for="editar-ingreso-banco">Banco</label>
        <select id="editar-ingreso-banco" class="p-2 border rounded w-full" name="banco" required>
          ${getOpcionesBanco()}
        </select>
      </div>
  
      <div>
        <label class="block mb-1 font-bold" for="editar-ingreso-medio">Medio de pago</label>
        <select id="editar-ingreso-medio" class="p-2 border rounded w-full" name="medio" required>
          ${getOpcionesMediosPago()}
        </select>
      </div>
  
      <div>
        <label class="block mb-1 font-bold" for="editar-ingreso-concepto">Concepto</label>
        <select id="editar-ingreso-concepto" class="p-2 border rounded w-full" name="concepto" required>
          ${getOpcionesConceptoIngreso()}
        </select>
      </div>
  `,
  
  
  editarIngresoSaldoFavor: `
      <div>
        <label class="block mb-1 font-bold" for="editar-ingreso-importe">Importe</label>
        <input type="number" id="editar-ingreso-importe" class="p-2 border rounded w-full" name="importe" placeholder="Importe" required>
    
      </div>
  
      <div>
        <label class="block mb-1 font-bold" for="editar-ingreso-banco">Banco</label>
        <select id="editar-ingreso-banco" class="p-2 border rounded w-full" name="banco" required>
          ${getOpcionesBanco()}
        </select>
      </div>
  
      <div>
        <label class="block mb-1 font-bold" for="editar-ingreso-medio">Medio de pago</label>
        <select id="editar-ingreso-medio" class="p-2 border rounded w-full" name="medio" required>
          ${getOpcionesMediosPago()}
        </select>
      </div>
  
      <div>
        <label class="block mb-1 font-bold" for="editar-ingreso-concepto">Concepto</label>
        <select id="editar-ingreso-concepto" class="p-2 border rounded w-full" name="concepto" required>
          ${getOpcionesConceptoIngreso()}
        </select>
      </div>
    `
  ,
  editarEgresoPendiente: `
    <div>
      <label class="block mb-1 font-bold" for="editar-egreso-banco">Banco</label>
      <select id="editar-egreso-banco" class="p-2 border rounded w-full" name="banco" required>
        ${getOpcionesBanco()}
      </select>
    </div>
  
    <div>
      <label class="block mb-1 font-bold" for="editar-egreso-medio">Medio de pago</label>
      <select id="editar-egreso-medio" class="p-2 border rounded w-full" name="medio" required>
        ${getOpcionesMediosPago()}
      </select>
    </div>
  
    <div>
      <label class="block mb-1 font-bold" for="editar-egreso-concepto">Concepto</label>
      <select id="editar-egreso-concepto" class="p-2 border rounded w-full" name="concepto" required>
        ${getOpcionesConceptoEgreso()}
      </select>
    </div>
  
    <div>
      <label class="block mb-1 font-bold" for="editar-egreso-importe">Importe</label>
      <input type="number" id="editar-egreso-importe" class="p-2 border rounded w-full" name="importe" placeholder="Importe" required>
    </div>
    `,
    editarEgresoCompletado: `
      <div>
        <label class="block mb-1 font-bold" for="editar-egreso-banco">Banco</label>
        <select id="editar-egreso-banco" class="p-2 border rounded w-full" name="banco" required>
          ${getOpcionesBanco()}
        </select>
      </div>
  
      <div>
        <label class="block mb-1 font-bold" for="editar-egreso-medio">Medio de pago</label>
        <select id="editar-egreso-medio" class="p-2 border rounded w-full" name="medio" required>
          ${getOpcionesMediosPago()}
        </select>
      </div>
  
      <div>
        <label class="block mb-1 font-bold" for="editar-egreso-concepto">Concepto</label>
        <select id="editar-egreso-concepto" class="p-2 border rounded w-full" name="concepto" required>
          ${getOpcionesConceptoEgreso()}
        </select>
      </div>
    `,
    registrar_editar_Cliente:
      `
     <div>
        <label class="block mb-1 font-bold" for="cliente-email">Correo Electrónico</label>
        <input id="cliente-email" type="email" placeholder="Correo Electrónico" class="p-2 border rounded w-full" required />
      </div>
  
      <div>
        <label class="block mb-1 font-bold" for="cliente-nombre">Nombre o Razón Social</label>
        <input id="cliente-nombre" type="text" placeholder="Nombre o Razón Social" class="p-2 border rounded w-full" required />
      </div>
  
      <div>
        <label class="block mb-1 font-bold" for="cliente-telefono">Celular</label>
        <input id="cliente-telefono" type="text" placeholder="Celular" class="p-2 border rounded w-full" required />
      </div>
  
      <div>
        <label class="block mb-1 font-bold" for="cliente-tipoDocumento">Tipo de Documento</label>
        <select id="cliente-tipoDocumento" class="p-2 border rounded w-full">
          ${getOpcionesTiposDocumento()}
        </select>
      </div>
      <div>
        <label class="block mb-1 font-bold" for="cliente-numeroDocumento">Número de Documento</label>
        <input id="cliente-numeroDocumento" type="text" placeholder="Número de Documento" class="p-2 border rounded w-full" required />
      </div>
  
      <div>
        <label class="block mb-1 font-bold" for="cliente-observaciones">Observaciones</label>
        <textarea id="cliente-observaciones" placeholder="Observaciones" class="p-2 border rounded w-full"></textarea>
      </div>
      `,
      registrarIngreso:
      `
        <div>
          <label class="block mb-1 font-bold" for="ingreso-cliente">Cliente</label>
          <select id="ingreso-cliente" class="p-2 border rounded w-full" required>
            <option value="">Seleccione un cliente</option>
            ${getOpcionesClientes()}
          </select>
        </div>
  
        <div>
          <label class="block mb-1 font-bold" for="ingreso-medio">Medio de pago</label>
          <select id="ingreso-medio" class="p-2 border rounded w-full" name="medio" required>
            <option value="">Seleccione medio de pago</option>
            ${getOpcionesMediosPago()}
          </select>
        </div>
  
        <div>
          <label class="block mb-1 font-bold" for="ingreso-banco">Banco</label>
          <select id="ingreso-banco" class="p-2 border rounded w-full" name="banco" required>
            <option value="">Seleccione banco</option>
            ${getOpcionesBanco()}
          </select>
        </div>
  
        <div>
          <label class="block mb-1 font-bold" for="ingreso-moneda">Moneda</label>
          <select id="ingreso-moneda" class="p-2 border rounded w-full" name="moneda" required>
            ${getOpcionesMonedas()}
          </select>
        </div>
  
        <div>
          <label class="block mb-1 font-bold" for="ingreso-concepto">Concepto</label>
          <select id="ingreso-concepto" name="concepto" class="p-2 border rounded w-full" required>
            ${getOpcionesConceptoIngreso()}
          </select>
        </div>
  
        <div>
          <label class="block mb-1 font-bold" for="ingreso-importe">Importe</label>
          <input type="number" id="ingreso-importe" class="p-2 border rounded w-full" name="importe" placeholder="Importe" required>
        </div>
      `,
      registrarEgreso:
      `
        <div>
          <label class="block mb-1 font-bold" for="egreso-cliente">Cliente</label>
          <select id="egreso-cliente" class="p-2 border rounded w-full" required>
            <option value="">Seleccione un cliente</option>
            ${getOpcionesClientes()}
          </select>
        </div>
  
        <div>
          <label class="block mb-1 font-bold" for="egreso-medio">Medio de pago</label>
          <select id="egreso-medio" class="p-2 border rounded w-full" name="medio" required>
            <option value="">Seleccione medio de pago</option>
            ${getOpcionesMediosPago()}
          </select>
        </div>
  
        <div>
          <label class="block mb-1 font-bold" for="egreso-banco">Banco</label>
          <select id="egreso-banco" class="p-2 border rounded w-full" name="banco" required>
            <option value="">Seleccione banco</option>
            ${getOpcionesBanco()}
          </select>
        </div>
  
        <div>
          <label class="block mb-1 font-bold" for="egreso-moneda">Moneda</label>
          <select id="egreso-moneda" class="p-2 border rounded w-full" name="moneda" required>
            ${getOpcionesMonedas()}
          </select>
        </div>
  
        <div>
          <label class="block mb-1 font-bold" for="egreso-concepto">Concepto</label>
          <select id="egreso-concepto" name="concepto" class="p-2 border rounded w-full" required>
            ${getOpcionesConceptoEgreso()}
          </select>
        </div>
  
        <div>
          <label class="block mb-1 font-bold" for="egreso-importe">Importe</label>
          <input type="number" id="egreso-importe" class="p-2 border rounded w-full" name="importe" placeholder="Importe" required>
        </div>
      `,
      filtrosCliente:
      `
      <!-- Fecha desde / hasta -->
      <div class="flex gap-2">
        <div class="flex flex-col">
          <label class="text-sm block mb-1 font-bold">Desde</label>
          <input type="date" id="filtro-fecha-desde" class="input p-2 border rounded">
        </div>
        <div class="flex flex-col">
          <label class="text-sm font-medium text-gray-700">Hasta</label>
          <input type="date" id="filtro-fecha-hasta" class="input p-2 border rounded">
        </div>
      </div>

      <!-- Tipo de Documento -->
      <div class="flex flex-col">
        <label class="text-sm block mb-1 font-bold">Tipo de Documento</label>
        <select id="filtro-tipo-documento" class="input p-2 border rounded">
          <option value="todo">Todo</option>
          <option value="dni">Solo DNI</option>
          <option value="ruc">Solo RUC</option>
        </select>
      </div>

      <!-- Observaciones -->
      <div class="flex flex-col">
        <label class="text-sm block mb-1 font-bold">Observaciones</label>
        <select id="filtro-observaciones" class="input p-2 border rounded">
          <option value="todo">Todo</option>
          <option value="con">Con observaciones</option>
          <option value="sin">Sin observaciones</option>
        </select>
      </div>

      <!-- Estado del Cliente -->
      <div class="flex flex-col">
        <label class="text-sm block mb-1 font-bold">Estado del Cliente</label>
        <select id="filtro-estado-cliente" class="input p-2 border rounded">
          <option value="todo">Todo</option>
          <option value="activos">Activos</option>
          <option value="sinTransacciones">Sin transacciones</option>
          <option value="saldoPositivo">Con saldo positivo</option>
          <option value="saldoCero">Con saldo en cero</option>
        </select>
      </div>
      `
  };
  