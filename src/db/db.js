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
    connection.query('CREATE DATABASE IF NOT EXISTS ' + "escuela", err => {
        if (err) {
            console.error("Error creating database: ", err);
            return;
        }
        console.log("Database created or already exists.");

        // Usar la base de datos
        connection.query('USE' + "escuela", err => {
            if (err) {
                console.error("Error using database: ", err);
                return;
            }
            console.log("Using database 'escuela'.");

            // Crear tabla Profesores
            connection.query(`
                CREATE TABLE IF NOT EXISTS Profesores (
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
                    console.error("Error creating Profesores table: ", err);
                    return;
                }
                console.log("Table 'Profesores' created or already exists.");

                // Crear tabla Alumnos
                connection.query(`
                    CREATE TABLE IF NOT EXISTS Alumnos (
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
                        console.error("Error creating Alumnos table: ", err);
                        return;
                    }
                    console.log("Table 'Alumnos' created or already exists.");

                    // Crear tabla Cursos
                    connection.query(`
                        CREATE TABLE IF NOT EXISTS Cursos (
                            id_curso INT AUTO_INCREMENT PRIMARY KEY,
                            nombre VARCHAR(100) NOT NULL,
                            descripcion TEXT,
                            id_profesor INT,
                            FOREIGN KEY (id_profesor) REFERENCES Profesores(id_profesor)
                        )
                    `, err => {
                        if (err) {
                            console.error("Error creating Cursos table: ", err);
                            return;
                        }
                        console.log("Table 'Cursos' created or already exists.");

                        // Crear tabla Inscripciones
                        connection.query(`
                            CREATE TABLE IF NOT EXISTS Inscripciones (
                                id_inscripcion INT AUTO_INCREMENT PRIMARY KEY,
                                id_alumno INT,
                                id_curso INT,
                                fecha_inscripcion DATE NOT NULL,
                                FOREIGN KEY (id_alumno) REFERENCES Alumnos(id_alumno),
                                FOREIGN KEY (id_curso) REFERENCES Cursos(id_curso)
                            )
                        `, err => {
                            if (err) {
                                console.error("Error creating Inscripciones table: ", err);
                                return;
                            }
                            console.log("Table 'Inscripciones' created or already exists.");
                        });
                    });
                });
            });
        });
    });
});

export default connection;
