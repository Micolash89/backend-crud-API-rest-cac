import { Router } from "express";
import db from "../db/db.js";

const cursosRouter = Router();

cursosRouter.get("/obtener/:cid", (req, res) => {

    const { cid } = req.params;

    const sql = `
    SELECT *
    FROM cursos c
    WHERE id = ?
    JOIN profesores p ON c.id_profesores = p.id_profesores AND p.estado=1
    `
    db.query(sql, [cid], (err, rows) => {

        if (err) return res.status(500).send({
            message: "error en la base de datos",
            payload: []
        })

        return res.status(200).send({
            message: "curso obtenido",
            payload: rows
        })

    });

});

cursosRouter.get("/obtener", (req, res) => {

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

        if (err) return res.status(500).send({
            message: "error en la base de datos",
            payload: []
        });

        return res.status(200).send({
            message: "cursos obtenidos",
            payload: result
        });

    })
});

cursosRouter.post("/subir", (req, res) => {
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

    })

});

cursosRouter.put("/actualizar", (req, res) => {
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

    })

});

//cursosRouter.delete("/eliminar", (req, res) => { });




export default cursosRouter;