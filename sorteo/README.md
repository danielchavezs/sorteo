# Sorteo Promocional

Esta aplicación es un sistema de sorteo promocional que permite a los usuarios seleccionar departamentos y ciudades de Colombia para participar en una promoción de una marca automotriz. El sistema incluye un formulario interactivo, validaciones de los datos ingresados y medidas básicas de accesibilidad.

La aplicación está construida con **Next.js** y utiliza **Docker** para la gestión de la infraestructura y los servicios necesarios.

## Descripción

El proyecto consiste en un formulario que recopila información del usuario como nombre, cédula, departamento, ciudad, teléfono y correo electrónico. Dependiendo del departamento seleccionado, se carga dinámicamente una lista de ciudades correspondientes. La aplicación garantiza que los datos ingresados sean correctos antes de enviar el formulario. 

## Comandos Principales

Los comandos más importantes para ejecutar el proyecto son los siguientes:

### 1. Levantar Docker

Antes de iniciar la aplicación, debes ejecutar el contenedor de Docker para levantar los servicios necesarios:

npm run docker-up

### 2. Levantar Servidor

Levantar servidor local en caso de ser deseado:

npm run dev


-- En ambos casos se puede acceder a la aplicación desde: http://localhost:3000/

### Otros enlaces y recursos
Deploy en Vercel: https://sorteo-one.vercel.app/
Repositorio en GitHub: https://github.com/danielchavezs/sorteo.git
