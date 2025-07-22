¡Claro! Aquí tienes tu README.md actualizado para reflejar los cambios de conexión a Aiven, la gestión de la tabla sequelizemeta y la estructura de config.json con __parsed_literal__.

He puesto un especial énfasis en las secciones de Requisitos Previos y Configuración de la Base de Datos para guiar claramente al usuario.

Backend de Gestión de Películas
📝 Descripción del Proyecto
Este es el componente backend de una aplicación de gestión de películas, construido con Express.js, Sequelize ORM y TypeScript, utilizando MySQL como base de datos. Proporciona una API RESTful para gestionar la información de películas, incluyendo operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y funcionalidades de búsqueda.

Este backend está diseñado para ser consumido por un frontend moderno (como una aplicación en React, Vue o Angular), sirviendo datos en formato JSON.

✨ Características Principales
API RESTful: Endpoints bien definidos para la gestión de recursos de películas.

Gestión de Películas:

Listar todas las películas.

Obtener detalles de una película por ID.

[Opcional: Crear, Actualizar, Eliminar películas si tienes estos endpoints].

Búsqueda: Funcionalidad de búsqueda de películas por título.

Autenticación (Opcional): [Si tienes rutas de autenticación con JWT, por ejemplo].

Validación de Datos: [Si implementaste validaciones en tus modelos o rutas].

Base de Datos MySQL: Persistencia de datos utilizando Sequelize como ORM, ahora optimizado para servicios en la nube como Aiven.

TypeScript: Código tipado para mayor robustez y mantenibilidad.

Semillas (Seeders): Datos iniciales para poblar la base de datos de forma sencilla.

🛠️ Tecnologías Utilizadas
Lenguaje: TypeScript

Framework Web: Express.js

ORM: Sequelize

Base de Datos: MySQL

Variables de Entorno: dotenv

Registro de Solicitudes HTTP: Morgan

Manejo de CORS: cors

Otros: npm (o yarn) para gestión de paquetes, ts-node para ejecución en desarrollo.

🚀 Requisitos Previos
Antes de ejecutar este proyecto, asegúrate de tener instalado lo siguiente:

Node.js: Versión 14 o superior. Puedes descargarlo desde nodejs.org.

npm (Node Package Manager): Viene incluido con Node.js.

MySQL Server (Aiven o Local):

Recomendado: Un servicio de base de datos MySQL remoto como Aiven. Necesitarás crear un servicio MySQL (plan Hobbyist para desarrollo/pruebas) y descargar el certificado CA (ca.pem) desde su consola.

Alternativa Local: MySQL Server local (XAMPP, WAMP, MAMP, Docker).

Un editor de código: Como VS Code.

📦 Instalación
Sigue estos pasos para configurar el proyecto en tu máquina local:

Clona el repositorio:

Bash

git clone [URL_DE_TU_REPOSITORIO_BACKEND]
cd [nombre-de-tu-carpeta-backend]
Instala las dependencias:

Bash

npm install
# o si usas yarn
yarn install
Configura las variables de entorno:
Crea un archivo .env en la raíz de tu proyecto. Este archivo contendrá las variables de conexión a tu base de datos y otras configuraciones.
# .env

# Configuración de la Base de Datos (para Aiven)
DB_HOST=TU_HOST
DB_PORT=TU_PUERTO
DB_USER=TU_USUARIO
DB_PASSWORD=TU_CONTRASEÑA_DE_AIVEN
DB_DATABASE=db_peliculas # El nombre de la base de datos que creaste en Aiven
DB_CA_CERT_PATH=./certs/ca.pem # Ruta relativa al certificado CA descargado de Aiven

# Puerto del servidor Express
PORT=4000

# Entorno (development, production)
NODE_ENV=development

# [Opcional: Si usas JWT para autenticación]
# JWT_SECRET=TU_SECRETO_JWT # Genera una cadena aleatoria y compleja
# JWT_EXPIRES_IN=1d
¡Importante: Crea una carpeta certs/ en la raíz de tu proyecto y guarda el archivo ca.pem (descargado de Aiven) dentro de ella.

⚙️ Configuración de la Base de Datos
Crear la Base de Datos y Tablas en Aiven
Si estás usando Aiven, los pasos son los siguientes:

Crea el Servicio MySQL en Aiven: Asegúrate de que tu servicio MySQL esté en estado "Running" en la consola de Aiven (plan Hobbyist).

Descarga el Certificado CA: Obtén el archivo ca.pem de la sección de conexión de tu servicio Aiven y guárdalo en la carpeta ./certs/ de tu proyecto.

Crea la Base de Datos (Schema): Conéctate a tu servicio Aiven vía MySQL CLI (línea de comandos) y ejecuta:

SQL

CREATE DATABASE db_peliculas; -- Usa el nombre que configuraste en DB_DATABASE
(Consulta la documentación de Aiven para los comandos de conexión SSL con el certificado CA).

Importa las Tablas y Datos: Una vez creada la base de datos, puedes importar tus tablas peliculas y usuarios (y sus datos) usando tu archivo SQL exportado (ej., db_peliculas_sin_meta.sql que no incluye la tabla sequelizemeta para evitar conflictos).

Bash

mysql -h [TU_HOST_AIVEN] -P [TU_PUERTO_AIVEN] -u [TU_USUARIO_AIVEN] -p [TU_NOMBRE_DE_LA_BASE_DE_DATOS] --ssl-mode=REQUIRED --ssl-ca="./certs/ca.pem" < db_peliculas_sin_meta.sql
Nota: La tabla sequelizemeta no es necesaria para la importación inicial. Sequelize la creará automáticamente si la necesita para migraciones futuras.

Configuración del Sequelize CLI (config/config.json)
Si usas Sequelize CLI para migraciones o seeds, también debes actualizar config/config.json. Este archivo es utilizado por sequelize-cli para conectar.

Abre config/config.json y modifica la sección production para que use las variables de entorno de esta manera:

JSON

{
  "development": {
    "username": "root",
    "password": "",
    "database":"db_peliculas",
    "host": "localhost",
    "dialect": "mysql",
    "port": 3306
  },
  "test": {
    "username": "root",
    "password": "",
    "database": "your_mysql_database_name_test",
    "host": "localhost",
    "dialect": "mysql",
    "port": 3306
  },
  "production": {
    "username": {
      "__parsed_literal__": "process.env.DB_USER"
    },
    "password": {
      "__parsed_literal__": "process.env.DB_PASSWORD"
    },
    "database": {
      "__parsed_literal__": "process.env.DB_DATABASE"
    },
    "host": {
      "__parsed_literal__": "process.env.DB_HOST"
    },
    "dialect": "mysql",
    "port": {
      "__parsed_literal__": "process.env.DB_PORT"
    },
    "dialectOptions": {
      "ssl": {
        "ca": {
          "__parsed_literal__": "require('fs').readFileSync(process.env.DB_CA_CERT_PATH)"
        },
        "rejectUnauthorized": true
      }
    }
  }
}
Sincronizar Modelos y Sembrar Datos (Seeders)
El proyecto utiliza Sequelize para sincronizar los modelos con la base de datos y sembrar datos iniciales.

Sincronizar Modelos: Esto creará las tablas de la base de datos según tus modelos definidos en Sequelize si no existen.

Bash

npm run migrate # O el comando que tengas definido para sincronizar, ej: sequelize db:migrate
Nota: Si tu connectDB en src/config/database.ts ya usa sequelize.sync({ force: false }), esto se hará automáticamente al iniciar el servidor por primera vez en un entorno sin las tablas.

Sembrar Datos (Seeders): Esto insertará datos de ejemplo en tus tablas. Ideal para desarrollo y pruebas.

Bash

npm run seed # O el comando que tengas definido para los seeders, ej: sequelize db:seed:all
Asegúrate de que tus archivos de seeders estén configurados y que el comando seed en tu package.json los ejecute.

🏃 Ejecutar la Aplicación
Una vez configurada la base de datos y las dependencias, puedes iniciar el servidor:

Bash

npm run dev
# o si es para producción
npm run start
El servidor se ejecutará en http://localhost:4000 (o el puerto que hayas configurado en tu .env).

🗺️ Endpoints de la API
Aquí hay una lista de los principales endpoints de la API que expone este backend:

GET /peliculas: Obtiene una lista de todas las películas.

Parámetros de consulta: ?searchTitle=[título] para buscar películas por título.

Respuesta: application/json (un array de objetos de película).

GET /peliculas/:id: Obtiene los detalles de una película específica por su ID.

Parámetro de ruta: id (número).

Respuesta: application/json (un objeto de película).

GET /api/check-connection: Endpoint de prueba para verificar la conexión entre el frontend y el backend.

Respuesta: {"message": "Conexión con el frontend exitosa. ¡Hola desde el backend!"}

POST /usuarios/register: [Si tienes un endpoint de registro de usuarios].

POST /auth/login: [Si tienes un endpoint de login].

[Añade aquí otros endpoints si los tienes, por ejemplo para POST /peliculas, PUT /peliculas/:id, DELETE /peliculas/:id]

🤝 Contribuciones
Las contribuciones son bienvenidas. Si tienes sugerencias, mejoras o encuentras algún error, por favor, abre un "issue" o envía un "pull request".

📄 Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.
