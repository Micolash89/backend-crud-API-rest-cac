import db from "../db/db.js"

export const obtenerListaAlumnos = async (req, res) => {
    /*hacer otro archivo para que maneje la base de datos y no este todo en los controladores del router*/

    const sql = `
                SELECT a.*,
                c.nombre AS nombre_curso
                FROM alumnos a
                INNER JOIN inscripciones i ON a.id_alumno = i.id_alumno
                INNER JOIN cursos c ON i.id_curso = c.id_curso
                ORDER BY estado 
                DESC;
    `

    try {

        const [alumnosResult] = await db.promise().query(sql);

        res.send({
            message: "lista de alumnos",
            payload: alumnosResult
        })

    } catch (error) {
        res.status(500).send({
            message: "Error al obtener la lista de alumnos",
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

        const [alumnoResult] = await db.promise().query(sql1, [nombre, apellido, email, fecha_nacimiento, true, url]);

        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        const [cursoResul] = await db.promise().query(sql2, [alumnoResult.insertId, id_curso, formattedDate]);

        res.send({
            message: "carga exitosa de alumno",
            payload: alumnoResult.insertId
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "error al cargar el alumno",
            payload: []
        })
    }

}

export const actualizarAlumno = (req, res) => {

    const { id_alumno, nombre, apellido, email, fecha_nacimiento } = req.body;

    if (!id_alumno || !nombre || !apellido || !email || !fecha_nacimiento) {
        return res.status(400).send({
            message: "falta un campo al cargar",
            payload: []
        })
    }

    const sql = `UPDATE 
                alumnos 
                SET nombre=? ,
                apellido=? ,
                email=? ,
                fecha_nacimiento=? 
                WHERE id_alumno=?`;

    db.query(sql, [nombre, apellido, email, fecha_nacimiento, id_alumno], (err, result) => {

        if (err) {
            return res.status(500).send({
                message: "error en la base de datos",
                payload: []
            });
        }

        return res.send({
            message: "Actualización de alumno exitosa",
            payload: result.info
        });

    });

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