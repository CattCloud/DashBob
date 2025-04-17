# Sistema de Gestión de Ingresos, Egresos y Balance de Bob Subastas

## Descripción General

Este sistema es un MVP (Producto Mínimo Viable) diseñado para resolver el problema de gestión de ingresos y egresos de Bob Subastas, una empresa de economía circular especializada en la intermediación de venta de activos en desuso, principalmente vehículos. 

La aplicación permite:
- Gestionar clientes
- Registrar ingresos (garantías de subasta)
- Procesar egresos (devoluciones)
- Calcular balances automatizados
- Generar reportes básicos

Esta solución reemplaza el proceso manual actual basado en Google Forms y hojas de cálculo, centralizando la información y automatizando cálculos para reducir errores y mejorar la eficiencia operativa.

## Tecnologías Utilizadas

### Frontend
- **HTML5 Semántico**: Estructura del sitio con etiquetas modernas y accesibles
- **CSS3**: Estilización con Flexbox y Grid para layouts responsivos
- **JavaScript (ES6+)**: Lógica de negocio y manipulación del DOM
- **Tailwind CSS**: Framework de utilidades CSS para agilizar el desarrollo visual
- **LocalStorage API**: Persistencia de datos en el navegador

### Patrones de Diseño
- **Patrón Storage**: Para la gestión y persistencia de datos
- **Event Handling**: Para la interacción entre componentes
- **Estado y Sincronización**: Para mantener la coherencia de datos en la UI

## Arquitectura del Sistema

La arquitectura del sistema sigue un enfoque Frontend-Only, adaptado a las limitaciones técnicas y conocimientos disponibles del equipo:

### Capa de Presentación
- **Componentes UI**: Interfaces de usuario organizadas por funcionalidad
- **Eventos**: Sistema de manejo de eventos para interactividad
- **Renderizado**: Generación dinámica de elementos del DOM

### Capa de Lógica de Negocio
- **Modelos**: Representación de entidades (Cliente, Ingreso, Egreso)
- **Servicios**: Lógica de manipulación de datos y cálculos
- **Validadores**: Validación de datos de formularios

### Capa de Persistencia
- **Storage Manager**: Abstracción para operaciones CRUD en LocalStorage
- **Serialización**: Conversión de objetos JavaScript a JSON y viceversa
- **Recuperación**: Estrategias para recuperar datos en caso de error

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────────┐
│                         INTERFAZ DE USUARIO                          │
│                                                                     │
│  ┌───────────────┐    ┌───────────────┐    ┌───────────────┐        │
│  │  Clientes     │    │  Ingresos     │    │  Egresos      │        │
│  └───────────────┘    └───────────────┘    └───────────────┘        │
│                                                                     │
│  ┌───────────────┐    ┌───────────────┐    ┌───────────────┐        │
│  │  Balance      │    │  Reportes     │    │  Dashboard    │        │
│  └───────────────┘    └───────────────┘    └───────────────┘        │
└─────────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      LÓGICA DE NEGOCIO                              │
│                                                                     │
│  ┌───────────────┐    ┌───────────────┐    ┌───────────────┐        │
│  │  Modelos      │    │  Servicios    │    │  Validadores  │        │
│  └───────────────┘    └───────────────┘    └───────────────┘        │
└─────────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      CAPA DE PERSISTENCIA                           │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────┐      │
│  │                    Storage Manager                        │      │
│  └───────────────────────────────────────────────────────────┘      │
│                             │                                       │
│                             ▼                                       │
│  ┌───────────────────────────────────────────────────────────┐      │
│  │                     LocalStorage                          │      │
│  └───────────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────────┘
```

## Estructura del Proyecto

```
bob-subastas/
├── docs/
│   ├── team.md
│   ├── requirements.md
│   ├── user-stories.md
│   └── wireframes/ <-- imagenes
├── README.md
└── .gitignore
```

## Enfoque MVP y Consideraciones

### Prioridades para el MVP
1. **Funcionalidad sobre perfección**: Implementar primero las funcionalidades core que resuelven el problema principal.
2. **Simplicidad**: Mantener un enfoque minimalista que facilite el mantenimiento.
3. **Usabilidad**: Priorizar una experiencia de usuario intuitiva sobre características avanzadas.
4. **Rendimiento**: Asegurar que la aplicación funcione fluidamente incluso con conjuntos de datos moderados.

### Limitaciones y Consideraciones
- **Persistencia local**: Los datos se almacenan solo en el navegador del usuario.
- **Sin autenticación**: MVP sin sistema de usuarios o permisos.
- **Respaldo manual**: Los usuarios deberán exportar/guardar sus datos periódicamente.
- **Transacciones simples**: Sin manejo de concurrencia o transacciones complejas.

### Roadmap Post-MVP
- Implementación de exportación a PDF
- Visualizaciones gráficas de datos
- Respaldo automático de datos
- Sistema básico de usuarios
- Migración a solución con backend en una fase posterior

## Instalación y Uso

1. Clonar el repositorio
2. Abrir el archivo `index.html` en un navegador web moderno
3. La aplicación funcionará sin necesidad de servidor o dependencias adicionales
