import { createHash } from "../../utils.js";
import db from "../db/db.js"

export const obtenerListaProfesores = (req, res) => {

    /*hacer otro archivo para que maneje la base de datos y no este todo en los controladores del router*/

    const sql = "SELECT * FROM profesores WHERE estado = 1";

    db.query(sql, (err, result) => {
        if (err) return res.status(500).send({
            message: "error en la base de datos",
            payload: []
        });

        res.send({
            message: "lista de profesores",
            payload: result
        });

    });

};

export const obtenerProfesor = (req, res) => {

    /*hacer otro archivo para que maneje la base de datos y no este todo en los controladores del router*/

    const { id } = req.params;

    /*hacer un join con sursos en profesores con curso*/
    const sql = "SELECT * FROM profesores WHERE id_profesor = ? AND estado = 1";

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send({
            message: `no se encontro el profesor con id ${id}`,
            payload: []
        });

        res.send({
            message: "Profesor encontrado profesores",
            payload: result
        });

    });

};

export const subirProfesor = async (req, res) => {

    const { nombre, apellido, email, telefono, password, role, curso } = req.body;

    if (!nombre || !apellido || !email || !telefono || !password || !role || !curso) {

        return res.status(400).send({
            message: "error en algun campo",
            payload: []
        })
    }

    console.log(nombre, apellido, email, telefono, password, role, curso);

    const sql1 = "INSERT INTO profesores (nombre, apellido , email, telefono, estado, password, role) VALUES (?,?,?,?,?,?,?)";

    const sql2 = `INSERT INTO cursos (nombre, id_profesor) VALUES (?,?)`;

    try {

        const [profesoresResult] = await db.promise().query(sql1, [nombre, apellido, email, telefono, true, createHash(password), role]);

        const [cursosResult] = await db.promise().query(sql2, [curso, profesoresResult.insertId]);

        res.send({
            message: "carga exitoso de profesor",
            payload: profesoresResult.insertId
        });

    } catch (error) {
        res.status(500).send({
            message: "error en la base de datos",
            payload: []
        });
    }

};

export const actualizarProfesor = (req, res) => {

    const { id_profesor, nombre, apellido, email, telefono, role } = req.body;

    if (!id_profesor || !nombre || !apellido || !email || !telefono, !role) {

        return res.status(400).send({
            message: "error en algun campo",
            payload: []
        })
    }

    const sql = "UPDATE profesores SET nombre =? , apellido = ?, email = ?, telefono = ?, role = ? WHERE id_profesor = ?";

    db.query(sql, [nombre, apellido, email, telefono, role, id_profesor], (err, result) => {
        if (err) {
            return res.status(500).send({
                message: "error en la base de datos",
                payload: []
            });
        }

        return res.send({
            message: "actualizacion de profesor exitoso ",
            payload: result.info
        });

    });

};

export const eliminarProfesor = (req, res) => {

    const { pid } = req.params;

    if (!pid) {

        return res.status(400).send({
            message: "error en algun campo",
            payload: []
        })
    }

    //baja logica
    const sql = "UPDATE profesores SET estado = ? WHERE id_profesor = ?";

    db.query(sql, [false, pid], (err, result) => {
        if (err) return res.status(500).send({
            message: "error en la base de datos",
            payload: []
        });

        return res.send({
            message: "se elimino el profesor de manera exitosa",
            payload: result.info
        });

    });

};

