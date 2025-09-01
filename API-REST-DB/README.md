# Proyecto API REST con Sequelize - Products

Este proyecto es una API REST básica construida con Node.js, Express y Sequelize, con una estructura tradicional:

- /models → modelos de la base de datos
- /controllers → lógica de negocio
- /routes → definición de endpoints

Actualmente incluye endpoints para usuarios y productos.

## Requisitos previos

- Tener instalado Node.js (versión recomendada LTS)
- Tener instalado MySQL y un servidor corriendo (por ejemplo, XAMPP, MAMP, WAMP, MySQL Workbench, etc.)

## Instalación

1. Clona este repositorio o descarga el ZIP:

git clone <url-del-repo>

2. Entra en la carpeta del proyecto:

cd nombre-del-proyecto

3. Instala las dependencias:

npm install

## Configuración de la base de datos

El proyecto utiliza Sequelize con la configuración en el archivo:

/config/config.json

Ejemplo de configuración:

"development": {
  "username": "root",
  "password": "root1234",
  "database": "crud_db",
  "host": "127.0.0.1",
  "dialect": "mysql"
}

Importante: debes cambiar estos datos con los de tu propio servidor MySQL:

- username → tu usuario de MySQL (por ejemplo "root")
- password → tu contraseña de MySQL
- database → el nombre de la base de datos (por ejemplo "crud_db")
- host → generalmente "127.0.0.1" o "localhost"

## Crear la base de datos

En este proyecto hay un script que permite crear la base de datos automáticamente.

El archivo se llama:

createDatabase.js

### Cómo usarlo

1. Revisar que host, user, password y database coincidan con tu configuración de MySQL.
2. Ejecutar el script con:

node createDatabase.js

## Cómo correr el proyecto

Una vez configurada la base de datos y con las dependencias instaladas:

npm run dev

Esto levanta el servidor en modo desarrollo usando nodemon.

Por defecto, suele correr en:

http://localhost:3000

## Estructura del proyecto

/config → configuración de Sequelize (config.json)
/models → modelos Sequelize
/controllers → lógica de negocio (products)
/routes → rutas de la API (products)
createDatabase.js → script para crear la base de datos
index.js → punto de entrada de la aplicación
package.json → dependencias y scripts

## Endpoints disponibles

### Products

GET /products → listar productos  
POST /products → crear un producto  
PUT /products/:id → actualizar producto  
DELETE /products/:id → eliminar producto  

## Notas finales

- Es importante que cada uno configure correctamente su conexión a MySQL en config.json y en createDatabase.js.
- Si no se configuran correctamente los datos, el proyecto no se conectará a la base de datos.
- El entorno por defecto es development.
- Si la base de datos ya existe, el script createDatabase.js no la volverá a crear (usa IF NOT EXISTS).

