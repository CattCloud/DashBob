# Sistema de Gestión Financiera - BOB Subastas

## Descripción General

El Sistema de Gestión Financiera para BOB Subastas es una aplicación web diseñada para administrar y dar seguimiento al flujo financiero de las operaciones de subastas industriales. Esta herramienta permite a BOB registrar las transferencias recibidas de los clientes, controlar el estado de los fondos durante todo el proceso, calcular comisiones y generar reportes financieros detallados.

### Problema que Resuelve

BOB es una empresa especializada en subastas industriales que opera como intermediario en la compraventa de vehículos, maquinarias y materiales de segundo uso. Actualmente, BOB enfrenta desafíos en el seguimiento del dinero transferido por sus clientes para:
- Registrar los ingresos recibidos
- Conocer los gastos realizados y las comisiones generadas
- Mantener trazabilidad completa de los fondos (si fueron usados, están en cuenta, devueltos o reasignados)

El sistema proporciona una solución centralizada y transparente para gestionar este flujo financiero, mejorando la eficiencia operativa y la toma de decisiones.

### Funcionalidades Principales

1. **Registro de Transferencias de Clientes**
   - Captura manual de transferencias recibidas
   - Importación masiva desde hojas de cálculo
   - Asociación con clientes y subastas específicas

2. **Seguimiento de Estado de Fondos**
   - Visualización del estado actual (disponible, asignado, gastado, retornado)
   - Filtrado y búsqueda de fondos por diferentes criterios
   - Indicadores visuales de estado

3. **Gestión de Comisiones**
   - Cálculo automático basado en reglas configurables
   - Reportes por período con análisis comparativos
   - Ajustes manuales con registro de justificación

4. **Reportes y Visualizaciones**
   - Dashboard principal con KPIs financieros
   - Reportes detallados por subasta
   - Análisis de rendimiento y rentabilidad

## Tecnologías a Utilizar

### Frontend
- **HTML5 Semántico**: Estructura de contenido accesible y optimizada para SEO
- **CSS3 con Flexbox y Grid**: Layouts responsivos y adaptables a diferentes dispositivos
- **JavaScript ES6+**: Programación orientada a objetos para la lógica de negocio del cliente
- **Bootstrap 5**: Framework CSS para agilizar el desarrollo de interfaces con componentes prediseñados
- **Chart.js**: Biblioteca para visualización de datos y generación de gráficos interactivos

### Backend (Implementación Cliente-Side)
- **Arquitectura MVC**: Patrón de diseño para separar datos, lógica y presentación
- **LocalStorage API**: Persistencia de datos en el navegador del cliente
- **Vanilla JavaScript**: Implementación de clases y prototipos para la lógica de negocio
- **Event Handling**: Sistema de eventos para sincronización de la interfaz con el modelo de datos

### Herramientas de Desarrollo
- **Git y GitHub**: Control de versiones y colaboración
- **Trello**: Gestión de proyecto con metodología Agile
- **VS Code**: Editor de código con extensiones para desarrollo web
- **Jest**: Framework para pruebas unitarias y de integración (opcional)

### Despliegue
- **GitHub Pages**: Hosting gratuito para la aplicación web
- **Netlify/Vercel**: Alternativas para CI/CD y despliegue automático

## Arquitectura del Sistema

El proyecto implementa una arquitectura Model-View-Controller (MVC) en el cliente:

1. **Model**: Clases de JavaScript para representar entidades (Transferencia, Cliente, Subasta, Comisión)
2. **View**: Componentes HTML/CSS que renderizan la interfaz basada en el estado actual
3. **Controller**: Módulos JS que manejan eventos, actualizan el modelo y sincronizan vistas

La persistencia se logra utilizando LocalStorage, que permite almacenar datos en formato JSON en el navegador del usuario.

### Diagrama de Clases (Básico)

```
+----------------+      +----------------+      +---------------+
|  Transferencia |      |    Cliente     |      |    Subasta    |
+----------------+      +----------------+      +---------------+
| - id           |      | - id           |      | - id          |
| - cliente      |<--->| - nombre       |      | - titulo      |
| - monto        |      | - contacto     |      | - fechas      |
| - fecha        |      +----------------+      | - estado      |
| - estado       |                              +---------------+
| - subasta      |<----------------------------->|
+----------------+
        ^
        |
+----------------+
|    Comision    |
+----------------+
| - transferencia|
| - porcentaje   |
| - monto        |
+----------------+
```

## Instalación y Uso

1. Clone el repositorio:
   ```
   https://github.com/CattCloud/bobAuction-Platform.git
   ```

2. Abra el proyecto en su editor de código preferido

3. Para iniciar la aplicación en desarrollo local:
   - Puede utilizar una extensión como "Live Server" en VS Code
   - O simplemente abrir el archivo index.html en su navegador

4. No se requiere configuración adicional ya que el sistema utiliza almacenamiento local

## Estructura del Proyecto

```
nombre-proyecto/
├── docs/
│   ├── team.md
│   ├── requirements.md
│   ├── user-stories.md
│   └── wireframes/ <-- imagenes
├── README.md
└── .gitignore
```

## Contribución

Este proyecto está siendo desarrollado por:
- **Erick Verde**: Líder Técnico, Documentación, Gestión de Datos
- **Mario**: Frontend, Gestión de Datos

