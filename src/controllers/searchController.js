import db from "../db/db.js"

// export const buscarPorFiltro = async (req, res) => {

//     const { filtro } = req.params;
//     const searchValue = `%${filtro}%`;

//     if (!filtro) res.status(404).send({
//         message: "no se pudo aplicar el filtro",
//         payload: []
//     })

//     let resultadoConsultado = {};

//     const sql1 = `
//         SELECT p.id_profesor, p.nombre AS nombre_profesor, p.apellido AS apellido_profesor, p.estado, p.telefono, p.email , c.nombre AS nombre_curso, c.id_curso FROM profesores p WHERE p.nombre LIKE ? OR p.apellido LIKE ?
//         INNER JOIN cursos c ON c.id_profesor = p.id_profesor
//     `;

//     db.query(sql1, [searchValue, searchValue, searchValue, searchValue], (err, result) => {

//         if (err) return res.status(500).send({
//             message: "error en la base de datos profesores",
//             payload: []
//         });

//         if (!result.length) {
//             resultadoConsultado.profesores = {
//                 message: "no se encontraron profesores",
//                 payload: []
//             };
//             return;
//         }

//         resultadoConsultado.profesores = {
//             message: "lista de profesores",
//             payload: result
//         }
//     });

//     const sql2 = `
//         SELECT a.id_alumno,a.nombre,a.apellido, a.estado, a.email, a.fecha_nacimiento FROM alumnos a WHERE a.nombre LIKE ? OR a.apellido LIKE ?
//             `;

//     db.query(sql2, [searchValue, searchValue, searchValue, searchValue], (
//         err, result) => {
//         if (err) return res.status(500).send({
//             message: "error en la base de datos alumnos",
//             payload: []
//         });
//         if (!result.length) {
//             resultadoConsultado.alumnos = {
//                 message: "no se encontraron alumnos",
//                 payload: []
//             };
//             return;
//         }
//         resultadoConsultado.alumnos = {
//             message: "lista de alumnos",
//             payload: result
//         };

//         res.send({ message: `Resultados de buscar ${filtro}`, payload: resultadoConsultado })
//     });

// }

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
        const [profesoresResult] = await db.promise().query(sql1, [searchValue, searchValue]);
        const [alumnosResult] = await db.promise().query(sql2, [searchValue, searchValue]);

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
