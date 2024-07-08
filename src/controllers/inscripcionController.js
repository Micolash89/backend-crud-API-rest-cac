import db from "../db/db.js"

export const obtenerIncripciones = (req, res) => {

    /*hacer un join con la base de datos de profesores y alumnos*/
    const sql = `
        SELECT i.id_inscripcion,
        i.fecha_inscripcion,
        a.nombre AS nombre_alumno,
        a.apellido AS apellido_alumno,
        a.estado AS estado_alumno,
        a.id_alumno,
        a.url AS url_alumno,
        p.nombre AS nombre_profesor,
        p.apellido AS apellido_profesor,
        p.id_profesor,
        p.url AS url_profesor,
        c.id_curso ,
        c.nombre AS nombre_curso
        FROM inscripciones i
        JOIN alumnos a ON i.id_alumno = a.id_alumno AND a.estado = 1
        JOIN cursos c ON i.id_curso = c.id_curso
        JOIN profesores p ON c.id_profesor = p.id_profesor AND p.estado=1
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).send({
                message: "Error al obtener los inscipciones",
                payload: []
            });
        }

        return res.status(200).send({
            message: "lista de inscripciones",
            payload: result
        });
    });

};

export const obtenerUnaInscripcion = async (req, res) => {

    const { cid } = req.params;

    const sql = `
        SELECT  i.id_inscripcion,
                i.fecha_inscripcion, 
                a.id_alumno, 
                a.nombre AS nombre_alumno, 
                a.apellido AS apellido_alumno,
                a.email,
                a.fecha_nacimiento,
                a.estado,
                a.url,
                c.nombre AS nombre_curso
        FROM inscripciones i
        INNER JOIN alumnos a ON a.id_alumno = i.id_alumno AND a.estado = 1
        INNER JOIN cursos c ON c.id_curso = i.id_curso 
        WHERE i.id_curso = ? 
    `
    try {
        const connection = await db.promise().getConnection();
        const [incripcionesResult] = await connection.query(sql, [cid])
        connection.release();

        if (!incripcionesResult.length)
            return res.status(200).send({
                message: "No hay inscripciones",
                payload: []
            })

        return res.send({
            message: "Lista de inscripciones",
            payload: incripcionesResult
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error al obtener las incripciones",
            payload: []
        })
    }

};

export const subirUnaIncripcion = (req, res) => {

    const { id_alumno, id_curso, fecha_inscripcion } = req.body;

    const sql = `
    INSERT INTO inscripciones(id_alumno, id_curso, fecha_inscripcion)
    VALUES(?,?,?)
    `

    db.query(sql, [id_alumno, id_curso, fecha_inscripcion], (err, result) => {
        if (err) {
            return res.status(500).send({
                message: "Error al subir la inscripcion",
                payload: []
            });
        }

        return res.status(200).send({
            message: "inscripcion subida",
            payload: result.insertId
        });
    });

}

export const actualizarIncripcion = (req, res) => {

    const { id_inscripciones, id_alumno, id_curso, fecha_inscripcion } = req.body;

    const sql = `
        UPDATE inscripciones
        SET id_alumno = ?, id_curso = ?, fecha_inscripcion = ?
        WHERE id_inscripciones = ?
    `;

    db.query(sql, [id_alumno, id_curso, fecha_inscripcion, id_inscripciones], (err, result) => {

        if (err) {
            return res.status(500).send({
                message: "Error al actualizar la inscripcion",
                payload: []
            });
        }

        return res.status(200).send({
            message: "inscripcion actualizada",
            payload: result
        });

    });

}

export const obtenerCantAlumnosIncripciones = async (req, res) => {

    const { cid } = req.params;

    const sql = `
                SELECT count(*) AS total
                FROM inscripciones WHERE id_curso = ?
    `;

    try {

        const connection = await db.promise().getConnection();
        const [result] = await connection.query(sql, [cid]);
        connection.release();

        return res.status(200).send({
            message: "Cantidad de alumnos inscritos en el curso",
            payload: result[0]
        });

    } catch (error) {
        res.status(500).send({
            message: "Error al obtener la cantidad de inscripciones",
            payload: []
        });
    }

}