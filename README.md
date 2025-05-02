# Sistema de Gestión de Ingresos, Egresos y Balance de Bob Subastas

## Descripción General

Este sistema es un MVP (Producto Mínimo Viable) diseñado para resolver el problema de gestión de ingresos y egresos de Bob Subastas, una empresa de economía circular especializada en la intermediación de venta de activos en desuso, principalmente vehículos. 

La aplicación permite:
- Gestionar clientes
- Registrar ingresos (garantías de subasta)
- Procesar egresos (devoluciones)
- Calcular balances automatizados
- Exportar en CSV las tablas de informacion(clientes,ingreso,egreso)

BOB es una empresa especializada en subastas industriales que opera como intermediario en la compraventa de vehículos, maquinarias y materiales de segundo uso. Actualmente, BOB enfrenta desafíos en el seguimiento del dinero transferido por sus clientes para:

- Registrar los ingresos recibidos
- Conocer los gastos realizados y las comisiones generadas
- Mantener trazabilidad completa de los fondos (si fueron usados, están en cuenta, devueltos o reasignados)
=======
Esta solución reemplaza el proceso manual actual basado en Google Forms y hojas de cálculo, centralizando la información y automatizando cálculos para reducir errores y mejorar la eficiencia ope

## Tecnologías Utilizadas

### Frontend


- **HTML5 Semántico**: Estructura de contenido accesible y optimizada para SEO
- **CSS3 con Flexbox y Grid**: Layouts responsivos y adaptables a diferentes dispositivos
- **JavaScript ES6+**: Programación orientada a objetos para la lógica de negocio del cliente
- **Tailwind**: Framework CSS para agilizar el desarrollo de interfaces 
- **ApexChart.js**: Biblioteca para visualización de datos y generación de gráficos interactivos

### Backend (Implementación Cliente-Side)

- **Arquitectura MVC**: Patrón de diseño para separar datos, lógica y presentación
- **LocalStorage API**: Persistencia de datos en el navegador del cliente
- **Vanilla JavaScript**: Implementación de clases y prototipos para la lógica de negocio
- **Event Handling**: Sistema de eventos para sincronización de la interfaz con el modelo de datos

### Herramientas de Desarrollo

- **Git y GitHub**: Control de versiones y colaboración
- **Trello**: Gestión de proyecto con metodología Agile
- **VS Code**: Editor de código con extensiones para desarrollo web


### Despliegue

- **GitHub Pages**: Hosting gratuito para la aplicación web

  
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


## Instalación y Uso

1. Clone el repositorio:

```bash
```
   ```
   https://github.com/CattCloud/bobAuction-Platform.git
   ```

2.Abra el proyecto en su editor de código preferido

3.Para iniciar la aplicación en desarrollo local:

- Puede utilizar una extensión como "Live Server" en VS Code

- O simplemente abrir el archivo index.html en su navegador

4.No se requiere configuración adicional ya que el sistema utiliza almacenamiento local

=======
```
┌─────────────────────────────────────────────────────────────────────┐
│                         INTERFAZ DE USUARIO                          │
│                                                                     │
│  ┌───────────────┐    ┌───────────────┐    ┌───────────────┐        │
│  │  Clientes     │    │  Ingresos     │    │  Egresos      │        │
│  └───────────────┘    └───────────────┘    └───────────────┘        │
│                                                                     │
│  ┌───────────────┐    ┌───────────────┐                             │
│  │  Balance      │    │  Dashboard     │                            │
│  └───────────────┘    └───────────────┘                             │
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
├── js
└── .gitignore
```

## Enfoque MVP y Consideraciones


Este proyecto está siendo desarrollado por:

- **Erick Verde**: Líder Técnico, Documentación, Gestión de Datos
- **Mario**: Frontend, Gestión de Datos

## Documentacion del proyecto

[Requerimientos](https://github.com/CattCloud/bobAuction-Platform/blob/main/docs/requirements.md)
[Equipo de desarrollo](https://github.com/CattCloud/bobAuction-Platform/blob/main/docs/team.md)
[Historias de Usuario](https://github.com/CattCloud/bobAuction-Platform/blob/main/docs/user-stories.md)
=======
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
- Implementación de exportación a CSV
- Visualizaciones gráficas de datos
- Respaldo automático de datos
- Sistema básico de usuarios
- Migración a solución con backend en una fase posterior

## Instalación y Uso

1. Clonar el repositorio
2. Abrir el archivo `index.html` en un navegador web moderno
3. La aplicación funcionará sin necesidad de servidor o dependencias adicionales

