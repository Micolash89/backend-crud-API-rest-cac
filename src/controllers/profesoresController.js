import { createHash } from "../../utils.js";
import db from "../db/db.js"

export const obtenerListaProfesores = (req, res) => {

    /*hacer otro archivo para que maneje la base de datos y no este todo en los controladores del router*/

    db.query("SELECT * FROM profesores WHERE estado = 1", (err, result) => {
        if (err) throw err;

        res.send({
            message: "lista de profesores",
            payload: result
        });

    });

}

export const subirProfesor = (req, res) => {

    const { nombre, apellido, email, telefono, password } = req.body;

    if (!nombre || !apellido || !email || !telefono || !password) {

        return res.status(400).send({
            message: "error en algun campo",
            payload: []
        })
    }

    const sql = "INSERT INTO profesores (nombre, apellido , email, telefono, estado, password) VALUES (?,?,?,?,?,?)";

    db.query(sql, [nombre, apellido, email, telefono, true, createHash(password)], (err, result) => {
        if (err) throw err;

        return res.send({
            message: "carga exitoso de profesor",
            payload: result.insertId
        });

    });

}

export const actualizarProfesor = (req, res) => {

    const { id_profesor, nombre, apellido, email, telefono } = req.body;

    if (!id_profesor || !nombre || !apellido || !email || !telefono) {

        return res.status(400).send({
            message: "error en algun campo",
            payload: []
        })
    }

    const sql = "UPDATE profesores SET nombre =? , apellido = ?, email = ?, telefono = ? WHERE id_profesor = ?";

    db.query(sql, [nombre, apellido, email, telefono, id_profesor], (err, result) => {
        if (err) return res.status(500).send({
            message: "error en la base de datos",
            payload: []
        });

        console.log(result);

        return res.send({
            message: "actualizacion de profesor exitoso ",
            payload: result.info
        });

    });

}

export const eliminarProfesor = (req, res) => {

    const { id_profesor } = req.body;

    if (!id_profesor) {

        return res.status(400).send({
            message: "error en algun campo",
            payload: []
        })
    }

    //baja logica
    const sql = "UPDATE profesores SET estado = ? WHERE id_profesor = ?";

    db.query(sql, [false, id_profesor], (err, result) => {
        if (err) return res.status(500).send({
            message: "error en la base de datos",
            payload: []
        });

        return res.send({
            message: "se elimino el profesor de manera exitosa",
            payload: result.info
        });

    });

}

