import db from "../db/db.js"

export const obtenerListaAlumnos = (req, res) => {
    /*hacer otro archivo para que maneje la base de datos y no este todo en los controladores del router*/
    db.query("SELECT * FROM alumnos WHERE estado=1", (err, result) => {
        if (err) throw err;
        res.send({
            message: "lista de alumnos",
            payload: result
        });

    })

}

export const subirAlumno = async (req, res) => {

    const { nombre, apellido, email, fecha_nacimiento, id_curso } = req.body;

    if (!nombre || !apellido || !email || !fecha_nacimiento || id_curso < 0) {
        return res.status(400).send({
            message: "falta un campo al cargar",
            payload: []
        })
    }

    const sql1 = "INSERT INTO alumnos (nombre,apellido,email,fecha_nacimiento,estado) VALUES (?,?,?,?,?)";

    const sql2 = "INSERT INTO inscripciones (id_alumno, id_curso, fecha_inscripcion) VALUE (?,?,?)"

    try {

        const [alumnoResult] = await db.promise().query(sql1, [nombre, apellido, email, fecha_nacimiento, true]);

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

    const sql = "UPDATE alumnos SET nombre=? , apellido=? , email=? , fecha_nacimiento=? WHERE id_alumno=?";

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

    const sql = "UPDATE alumnos SET estado=? WHERE id_alumno=? ";

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