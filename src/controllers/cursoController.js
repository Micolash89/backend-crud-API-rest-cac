import db from "../db/db.js"

export const obtenerUnCursos = (req, res) => {

    const { cid } = req.params;

    const sql = `
    SELECT *
    FROM cursos c
    INNER JOIN profesores p ON c.id_profesor = p.id_profesor AND p.estado=1
    WHERE c.id_curso = ?
    `
    db.query(sql, [cid], (err, rows) => {

        if (err) {
            console.log(err);
            return res.status(500).send({
                message: "error en la base de datos",
                payload: []
            })
        }

        return res.status(200).send({
            message: "curso obtenido",
            payload: rows
        })

    });

};

export const obtenerCursos = (req, res) => {

    const sql = `
       SELECT   c.id_curso,
                c.nombre AS nombre_curso,
                p.id_profesor,
                p.nombre AS nombre_profesor,
                p.apellido,
                p.email,
                p.telefono,
                p.estado
    FROM cursos c
    INNER JOIN profesores p ON c.id_profesor = p.id_profesor AND p.estado = 1
    `
    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send({
                message: "error en la base de datos",
                payload: []
            });
        }

        return res.status(200).send({
            message: "cursos obtenidos",
            payload: result
        });

    })
};

export const subirCurso = (req, res) => {
    const { nombre, id_profesor } = req.body;
    const sql = `
        INSERT INTO cursos(nombre,  id_profesor)
        VALUES(?,?,?)
    `
    db.query(sql, [nombre, id_profesor], (err, result) => {

        if (err) return res.status(500).send({
            message: "error en la base de datos",
            payload: []
        });

        return res.status(200).send({
            message: "curso subido",
            payload: result.insertId
        });

    });

}

export const actualizarCurso = (req, res) => {
    const { id, nombre, id_profesor } = req.body;
    const sql = `
        UPDATE cursos
        SET nombre = ?, id_profesor = ?
        WHERE id = ?
    `
    db.query(sql, [nombre, id_profesor, id], (err, result) => {

        if (err) return res.status(500).send({
            message: "error en la base de datos",
            payload: []
        });

        return res.status(200).send({
            message: "curso actualizado",
            payload: result
        });

    });

}

export const contarCursos = async (req, res) => {

    const sql = `SELECT COUNT(*) AS total
                FROM cursos c
                INNER JOIN  profesores p ON c.id_profesor = p.id_profesor AND p.estado = 1`

    try {
        const connection = await db.promise().getConnection();
        const [cursosResult] = await connection.query(sql)
        connection.release();
        res.send({
            message: "cursos encontrados",
            payload: cursosResult[0]
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "error en la base de datos",
            payload: []
        })
    }

}