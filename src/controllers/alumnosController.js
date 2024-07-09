import db from "../db/db.js"
import { sendEmail } from "../service/emailService.js";

export const obtenerListaAlumnos = async (req, res) => {
    /*hacer otro archivo para que maneje la base de datos y no este todo en los controladores del router*/

    const sql = `
                SELECT a.*,
                c.nombre AS nombre_curso,
                c.id_curso
                FROM alumnos a
                INNER JOIN inscripciones i ON a.id_alumno = i.id_alumno
                INNER JOIN cursos c ON i.id_curso = c.id_curso
                ORDER BY estado 
                DESC;
    `

    try {
        const connection = await db.promise().getConnection();
        const [alumnosResult] = await connection.query(sql);
        connection.release();
        res.send({
            message: "lista de alumnos",
            payload: alumnosResult
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error al obtener la lista de alumnos",
            payload: []
        })
    }

}

export const obtenerAlumno = async (req, res) => {
    /*hacer otro archivo para que maneje la base de datos y no este todo en los controladores del router*/

    const { id } = req.params;

    const sql = `
                SELECT a.*,
                c.nombre AS nombre_curso,
                c.id_curso
                FROM alumnos a
                INNER JOIN inscripciones i ON a.id_alumno = i.id_alumno
                INNER JOIN cursos c ON i.id_curso = c.id_curso
                WHERE a.id_alumno = ?
                ORDER BY estado 
                DESC;
    `

    try {
        const connection = await db.promise().getConnection();
        const [alumnosResult] = await connection.query(sql, [id]);
        connection.release();
        res.send({
            message: "alumno obtenido",
            payload: alumnosResult[0]
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error al obtener al alumno con id " + id,
            payload: []
        })
    }

}

export const subirAlumno = async (req, res) => {

    const { nombre, apellido, email, fecha_nacimiento, id_curso } = req.body;

    const url = 'https://i.imgur.com/VbM4mRu.png';

    if (!nombre || !apellido || !email || !fecha_nacimiento || id_curso < 0) {
        return res.status(400).send({
            message: "falta un campo al cargar",
            payload: []
        })
    }

    const sql1 = "INSERT INTO alumnos (nombre,apellido,email,fecha_nacimiento,estado, url) VALUES (?,?,?,?,?,?)";

    const sql2 = "INSERT INTO inscripciones (id_alumno, id_curso, fecha_inscripcion) VALUE (?,?,?)"

    try {
        const connection = await db.promise().getConnection();
        const [alumnoResult] = await connection.query(sql1, [nombre, apellido, email, fecha_nacimiento, true, url]);

        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        const [cursoResul] = await connection.query(sql2, [alumnoResult.insertId, id_curso, formattedDate]);
        connection.release();
        res.send({
            message: "carga exitosa de alumno",
            payload: alumnoResult.insertId
        })

        sendEmail(email);

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "error al cargar el alumno",
            payload: []
        })
    }

}

export const actualizarAlumno = async (req, res) => {

    const { id_alumno, nombre, apellido, email, fecha_nacimiento, id_curso } = req.body;

    if (!id_alumno || !nombre || !apellido || !email || !fecha_nacimiento || !id_curso) {
        return res.status(400).send({
            message: "falta un campo al cargar",
            payload: []
        })
    }

    const sql1 = `
        UPDATE
        alumnos
        SET nombre=?,
            apellido=?,
            email=?,
            fecha_nacimiento=?
            WHERE id_alumno=?;
    `

    const sql2 = `
        UPDATE
        inscripciones
        SET id_curso = ?,
        fecha_inscripcion = ?
        WHERE id_alumno = ?;
    `
    try {
        const connection = await db.promise().getConnection();
        const [alumnoResult] = await connection.query(sql1, [nombre, apellido, email, fecha_nacimiento, id_alumno]);

        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        const [inscripcionResul] = await connection.query(sql2, [id_curso, formattedDate, id_alumno]);
        connection.release();
        res.send({
            message: "alumno actualizado",
            payload: []
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "error en la base de datos",
            payload: []
        });
    }

}

export const eliminarAlumno = (req, res) => {

    const id_alumno = req.params.aid;
    if (!id_alumno) {
        return res.status(400).send({
            message: "falta un campo al cargar",
            payload: []
        })
    }

    const sql = `UPDATE
                alumnos 
                SET
                estado=?
                WHERE id_alumno=? `;

    db.query(sql, [false, id_alumno], (err, result) => {

        if (err) return res.status(500).send({
            message: "error en la base de datos",
            payload: []
        });

        return res.send({
            message: "Se elimió el alumno de forma exitosa",
            payload: result.info
        });

    });

}

export const contarAlumnos = async (req, res) => {
    const sql = `SELECT COUNT(*) as total FROM alumnos WHERE estado=1;`;

    try {
        const connection = await db.promise().getConnection();
        const [alumnosResult] = await connection.query(sql);
        connection.release();
        res.send({
            message: "Se obtuvieron los alumnos",
            payload: alumnosResult[0]
        })

    } catch (error) {
        res.status(500).send({
            message: "error en la base de datos",
            payload: []
        })
    }
}