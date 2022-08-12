# The Fashion Room

Este proyecto tiene como objetivo demostrar las habilidades adquiridas durante el semestre en la materia Bases de datos, cuya arquitectura consiste en una tienda online
que contiene el cliente (Frontend), api-server (Backend) y una base de datos en Postgres.

## Instalación

Para poner en prueba el proyecto se deben seguir los siguientes pasos:

1. Clonar el código
```
https://github.com/ClouddCoder/The-fashion-room.git
```
2. Abrir una terminal dentro de la carpeta **react-node-app** y ejecutar el comando `npm install`.

3. Dentro de **react-node-app** se debe crear un archivo ***.env*** para establecer las variables de entorno que conectarán con la base de datos Postgres
(Depende de cada usuario).

4. Abrir una terminal dentro de la carpeta **the-fashion-room** y ejecutar el comando `npm install`.

5. Crear una imagen y contenedor de Postgres en Docker con sus respectivas variables de entorno que coincidan con el archivo ***.env*** de la carpeta **react-node-app**
```
docker run --name <nombre> -p <puertos> -e POSTGRES_USER=<usuario> -e POSTGRES_PASSWORD=<contraseña> -e POSTGRES_DB=<nombre_bd> -d postgres
```
6. Crear una imagen y contenedor de pgAdmin en Docker con las variables de entorno
```
docker run --name <nombre> -p <puertos> -e 'PGADMIN_DEFAULT_EMAIL=<email> -e 'PGADMIN_DEFAULT_PASSWORD=<contraseña> -d dpage/pgadmin4
```
7. Abrir un ***localhost:<puerto>*** en el navegador con el puerto expuesto establecido al crear el contenedor de pgAdmin, se debe crear una base de datos que concidan
con las variables de entorno establecidas en el archivo ***.env*** de la carpeta **react-node-pp**.

8. Copiar el contenido del archivo ***queries.sql*** que se encuentra en la carpeta **react-node-app** y pegarlo dentro de la sección de ***Query tools*** de pgAdmin para crear las tablas, 
funciones e inserciones para el correcto funcionamiento de la tienda.

9. Ejecutar el comando `npm run dev`en una terminal dentro de la carpeta **react-node-app** para desplegar el backend de la aplicación, no se debe cerrar la terminal.

10. Ejecutar el comando `npm start` para ejecutar el frontend de la aplicación y empezar a interactuar desde el navegador. Por defecto se abrirá un ***localhost:3000*** en
el navegador.

## Desplegar proyecto con Docker compose

Dentro del proyecto se encuentra una carpeta **nginx** con dos archivos para crear un contenedor del mismo en docker, esto es para poder desplegar la aplicación
completa con un docker compose, por ende en las carpetas **react-node-app** y **the-fashion-room** se encuentran sus respectivos archivos Dockerfile y en el directorio raíz del proyecto se encuentra el archivo ***docker-compose-yml*** para su respectiva configuración.

Esta funcionalidad aún está en prueba, sin embargo el usuario lo puede modificar y desplegar a su gusto.

## Equipo de trabajo
- Brayan Sánchez [@ClouddCoder](https://github.com/ClouddCoder)
- Diana Cadena [@DianaCadenaMoreno](https://github.com/DianaCadenaMoreno)
- Juan Majin [@JuanMajin](https://github.com/JuanMajin)
- Mayra Sánchez [@mayra-Sanchez](https://github.com/mayra-Sanchez)
