// import { createConnection } from "mysql2";

// const connection = createConnection({
//     host: process.env.MYSQL_ADDON_HOST || "localhost",
//     user: process.env.MYSQL_ADDON_USER || "root",
//     password: process.env.MYSQL_ADDON_PASSWORD || "root",
//     database: process.env.MYSQL_ADDON_DB || "escuela",
//     port: process.env.MYSQL_ADDON_PORT || 3306
// });

// connection.connect(err => {
//     if (err) {
//         console.error("Error connecting to the database: ", err);
//         return;
//     }
//     console.log("Connected to the database.");

//     // Crear la base de datos si no existe
//     connection.query(` CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_ADDON_DB || "escuela"}`, err => {
//         if (err) {
//             console.error("Error creating database: ", err);
//             return;
//         }
//         console.log("Database created or already exists.");

//         // Usar la base de datos
//         connection.query(`USE ${process.env.MYSQL_ADDON_DB || "escuela"}`, err => {
//             if (err) {
//                 console.error("Error using database: ", err);
//                 return;
//             }
//             console.log(`Using database '${process.env.MYSQL_ADDON_DB || "escuela"}'.`);

//             // Crear tabla Profesores
//             connection.query(`
//                 CREATE TABLE IF NOT EXISTS profesores (
//                 id_profesor INT AUTO_INCREMENT PRIMARY KEY,
//                 nombre VARCHAR(100) NOT NULL,
//                 apellido VARCHAR(100) NOT NULL,
//                 url VARCHAR(300),
//                 email VARCHAR(100) NOT NULL UNIQUE,
//                 telefono VARCHAR(20),
//                 estado TINYINT(1) NOT NULL,
//                 password VARCHAR(255) NOT NULL,
//                 role ENUM('PROFESOR', 'ADMIN') NOT NULL DEFAULT 'PROFESOR'
//                 )
//             `, err => {
//                 if (err) {
//                     console.error("Error creating profesores table: ", err);
//                     return;
//                 }
//                 console.log("Table 'profesores' created or already exists.");

//                 // Crear tabla Alumnos
//                 connection.query(`
//                     CREATE TABLE IF NOT EXISTS alumnos (
//                         id_alumno INT AUTO_INCREMENT PRIMARY KEY,
//                         nombre VARCHAR(300) NOT NULL,
//                         apellido VARCHAR(100) NOT NULL,
//                         url VARCHAR(100),
//                         email VARCHAR(100) NOT NULL UNIQUE,
//                         fecha_nacimiento DATE NOT NULL,
//                         estado TINYINT(1) NOT NULL
//                     )
//                 `, err => {
//                     if (err) {
//                         console.error("Error creating alumnos table: ", err);
//                         return;
//                     }
//                     console.log("Table 'alumnos' created or already exists.");

//                     // Crear tabla Cursos
//                     connection.query(`
//                         CREATE TABLE IF NOT EXISTS cursos (
//                             id_curso INT AUTO_INCREMENT PRIMARY KEY,
//                             nombre VARCHAR(100) NOT NULL,
//                             id_profesor INT,
//                             FOREIGN KEY (id_profesor) REFERENCES profesores(id_profesor)
//                         )
//                     `, err => {
//                         if (err) {
//                             console.error("Error creating cursos table: ", err);
//                             return;
//                         }
//                         console.log("Table 'cursos' created or already exists.");

//                         // Crear tabla Inscripciones
//                         connection.query(`
//                             CREATE TABLE IF NOT EXISTS inscripciones (
//                                 id_inscripcion INT AUTO_INCREMENT PRIMARY KEY,
//                                 id_alumno INT,
//                                 id_curso INT,
//                                 fecha_inscripcion DATE NOT NULL,
//                                 FOREIGN KEY (id_alumno) REFERENCES alumnos(id_alumno),
//                                 FOREIGN KEY (id_curso) REFERENCES cursos(id_curso)
//                             )
//                         `, err => {
//                             if (err) {
//                                 console.error("Error creating inscripciones table: ", err);
//                                 return;
//                             }
//                             console.log("Table 'inscripciones' created or already exists.");
//                         });
//                     });
//                 });
//             });
//         });
//     });
// });

import { createConnection, createPool } from "mysql2";

// Configuración de la base de datos
const dbConfig = {
    host: process.env.MYSQL_ADDON_HOST || "localhost",
    user: process.env.MYSQL_ADDON_USER || "root",
    password: process.env.MYSQL_ADDON_PASSWORD || "root",
    database: process.env.MYSQL_ADDON_DB || "escuela",
    port: process.env.MYSQL_ADDON_PORT || 3306
};

// Crear la base de datos y las tablas si no existen
const initializeDatabase = () => {
    const connection = createConnection(dbConfig);

    connection.connect(err => {
        if (err) {
            console.error("Error connecting to the database: ", err);
            return;
        }
        console.log("Connected to the database.");

        // Crear la base de datos si no existe
        connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`, err => {
            if (err) {
                console.error("Error creating database: ", err);
                connection.end();
                return;
            }
            console.log("Database created or already exists.");

            // Usar la base de datos
            connection.query(`USE ${dbConfig.database}`, err => {
                if (err) {
                    console.error("Error using database: ", err);
                    connection.end();
                    return;
                }
                console.log(`Using database '${dbConfig.database}'.`);

                // Crear tabla Profesores
                connection.query(`
                    CREATE TABLE IF NOT EXISTS profesores (
                        id_profesor INT AUTO_INCREMENT PRIMARY KEY,
                        nombre VARCHAR(100) NOT NULL,
                        apellido VARCHAR(100) NOT NULL,
                        url VARCHAR(300),
                        email VARCHAR(100) NOT NULL UNIQUE,
                        telefono VARCHAR(20),
                        estado TINYINT(1) NOT NULL,
                        password VARCHAR(255) NOT NULL,
                        role ENUM('PROFESOR', 'ADMIN') NOT NULL DEFAULT 'PROFESOR'
                    )
                `, err => {
                    if (err) {
                        console.error("Error creating profesores table: ", err);
                        connection.end();
                        return;
                    }
                    console.log("Table 'profesores' created or already exists.");

                    // Crear tabla Alumnos
                    connection.query(`
                        CREATE TABLE IF NOT EXISTS alumnos (
                            id_alumno INT AUTO_INCREMENT PRIMARY KEY,
                            nombre VARCHAR(300) NOT NULL,
                            apellido VARCHAR(100) NOT NULL,
                            url VARCHAR(100),
                            email VARCHAR(100) NOT NULL UNIQUE,
                            fecha_nacimiento DATE NOT NULL,
                            estado TINYINT(1) NOT NULL
                        )
                    `, err => {
                        if (err) {
                            console.error("Error creating alumnos table: ", err);
                            connection.end();
                            return;
                        }
                        console.log("Table 'alumnos' created or already exists.");

                        // Crear tabla Cursos
                        connection.query(`
                            CREATE TABLE IF NOT EXISTS cursos (
                                id_curso INT AUTO_INCREMENT PRIMARY KEY,
                                nombre VARCHAR(100) NOT NULL,
                                id_profesor INT,
                                FOREIGN KEY (id_profesor) REFERENCES profesores(id_profesor)
                            )
                        `, err => {
                            if (err) {
                                console.error("Error creating cursos table: ", err);
                                connection.end();
                                return;
                            }
                            console.log("Table 'cursos' created or already exists.");

                            // Crear tabla Inscripciones
                            connection.query(`
                                CREATE TABLE IF NOT EXISTS inscripciones (
                                    id_inscripcion INT AUTO_INCREMENT PRIMARY KEY,
                                    id_alumno INT,
                                    id_curso INT,
                                    fecha_inscripcion DATE NOT NULL,
                                    FOREIGN KEY (id_alumno) REFERENCES alumnos(id_alumno),
                                    FOREIGN KEY (id_curso) REFERENCES cursos(id_curso)
                                )
                            `, err => {
                                if (err) {
                                    console.error("Error creating inscripciones table: ", err);
                                    connection.end();
                                    return;
                                }
                                console.log("Table 'inscripciones' created or already exists.");
                                connection.end(); // Cerrar la conexión inicial
                            });
                        });
                    });
                });
            });
        });
    });
};

// Inicializar la base de datos
initializeDatabase();

// Crear el pool de conexiones para uso regular
const db = createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

export default db;
