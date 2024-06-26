import { createConnection } from "mysql2";

const connection = createConnection({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    port: process.env.MYSQL_ADDON_PORT
});

connection.connect(err => {
    if (err) {
        console.error("Error connecting to the database: ", err);
        return;
    }
    console.log("Connected to the database.");

    // Crear la base de datos si no existe
    connection.query(` CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_ADDON_DB}`, err => {
        if (err) {
            console.error("Error creating database: ", err);
            return;
        }
        console.log("Database created or already exists.");

        // Usar la base de datos
        connection.query(`USE ${process.env.MYSQL_ADDON_DB}`, err => {
            if (err) {
                console.error("Error using database: ", err);
                return;
            }
            console.log(`Using database '${process.env.MYSQL_ADDON_DB}'.`);

            // Crear tabla Profesores
            connection.query(`
                CREATE TABLE IF NOT EXISTS profesores (
                    id_profesor INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(100) NOT NULL,
                    apellido VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL UNIQUE,
                    telefono VARCHAR(20),
                    estado TINYINT(1) NOT NULL,
                    password VARCHAR(255) NOT NULL
                )
            `, err => {
                if (err) {
                    console.error("Error creating profesores table: ", err);
                    return;
                }
                console.log("Table 'profesores' created or already exists.");

                // Crear tabla Alumnos
                connection.query(`
                    CREATE TABLE IF NOT EXISTS alumnos (
                        id_alumno INT AUTO_INCREMENT PRIMARY KEY,
                        nombre VARCHAR(100) NOT NULL,
                        apellido VARCHAR(100) NOT NULL,
                        email VARCHAR(100) NOT NULL UNIQUE,
                        fecha_nacimiento DATE NOT NULL,
                        estado TINYINT(1) NOT NULL,
                        password VARCHAR(255) NOT NULL
                    )
                `, err => {
                    if (err) {
                        console.error("Error creating alumnos table: ", err);
                        return;
                    }
                    console.log("Table 'alumnos' created or already exists.");

                    // Crear tabla Cursos
                    connection.query(`
                        CREATE TABLE IF NOT EXISTS cursos (
                            id_curso INT AUTO_INCREMENT PRIMARY KEY,
                            nombre VARCHAR(100) NOT NULL,
                            descripcion TEXT,
                            id_profesor INT,
                            FOREIGN KEY (id_profesor) REFERENCES profesores(id_profesor)
                        )
                    `, err => {
                        if (err) {
                            console.error("Error creating cursos table: ", err);
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
                                return;
                            }
                            console.log("Table 'inscripciones' created or already exists.");
                        });
                    });
                });
            });
        });
    });
});

export default connection;
