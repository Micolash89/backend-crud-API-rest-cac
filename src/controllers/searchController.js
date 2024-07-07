import db from "../db/db.js"

export const buscarPorFiltro = async (req, res) => {
    const { filtro } = req.params;
    const searchValue = `%${filtro}%`;

    if (!filtro) {
        return res.status(404).send({
            message: "no se pudo aplicar el filtro",
            payload: []
        });
    }

    let resultadoConsultado = {};

    const sql1 = `
        SELECT p.id_profesor, p.nombre AS nombre_profesor, p.apellido AS apellido_profesor, p.estado, p.telefono, p.email, c.nombre AS nombre_curso, c.id_curso 
        FROM profesores p
        INNER JOIN cursos c ON c.id_profesor = p.id_profesor
        WHERE p.nombre LIKE ? OR p.apellido LIKE ?
    `;

    const sql2 = `
        SELECT a.id_alumno, a.nombre AS nombre_alumno, a.apellido AS apellido_alumno, a.estado, a.email, a.fecha_nacimiento 
        FROM alumnos a 
        WHERE a.nombre LIKE ? OR a.apellido LIKE ?
    `;

    try {
        const connection = await db.promise().getConnection();
        const [profesoresResult] = await connection.query(sql1, [searchValue, searchValue]);
        const [alumnosResult] = await connection.query(sql2, [searchValue, searchValue]);
        connection.release();
        if (!profesoresResult.length) {
            resultadoConsultado.profesores = {
                message: "no se encontraron profesores",
                payload: []
            };
        } else {
            resultadoConsultado.profesores = {
                message: "lista de profesores",
                payload: profesoresResult
            };
        }

        if (!alumnosResult.length) {
            resultadoConsultado.alumnos = {
                message: "no se encontraron alumnos",
                payload: []
            };
        } else {
            resultadoConsultado.alumnos = {
                message: "lista de alumnos",
                payload: alumnosResult
            };
        }

        res.send({ message: `Resultados de buscar ${filtro}`, payload: resultadoConsultado });
    } catch (err) {
        res.status(500).send({
            message: "error en la base de datos",
            payload: []
        });
    }
};
