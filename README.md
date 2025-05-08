ATC Tasks
Descripción General

ATC Tasks es una aplicación web para la gestión de tareas, desarrollada con Laravel 12 en el backend y Vue 2 en el frontend. Está orientada a ofrecer una experiencia de usuario fluida y eficiente, con una arquitectura modular y escalable.
Arquitectura y Tecnologías

El proyecto está completamente dockerizado, facilitando su despliegue, mantenimiento y portabilidad entre entornos.
Contenedores Principales

    Frontend: Aplicación en Vue 2, desplegada en su propio contenedor.

    Backend: API desarrollada con Laravel 12, corriendo sobre PHP 8.2-FPM.

    Base de Datos: Utiliza MySQL como sistema gestor de base de datos.

    Servidor Web: Un contenedor con NGINX se encarga de servir y enrutar las solicitudes HTTP a los servicios correspondientes.

Autenticación

La autenticación está implementada utilizando Laravel Sanctum, configurado en modo SPA (Single Page Application), lo que permite una experiencia de usuario sin recargas de página y un manejo seguro de sesiones.
Comunicación entre servicios

Los contenedores se comunican mediante una red interna de Docker. NGINX actúa como proxy inverso, dirigiendo las peticiones al contenedor correspondiente según la configuración del servidor.
