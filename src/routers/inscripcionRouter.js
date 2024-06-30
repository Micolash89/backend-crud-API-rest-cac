import { Router } from "express";
import db from "../db/db.js";

const inscripcionRouter = Router();
/*
inscripcionRouter.get("/obtener/:id", (req, res) => {

    const { id } = req.params;


    const sql = `
        SELECT * 
        FROM inscripciones 
        WHERE id = ?
    `

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log();
            return res.status(500).send({
                message: "Error al obtener la inscripcion",
                payload: []
            });
        }

        return res.status(200).send({
            message: "se encontro la inscripcion",
            payload: result
        })

    });

});
*/
inscripcionRouter.get("/obtener", (req, res) => {

    /*hacer un join con la base de datos de profesores y alumnos*/
    const sql = `
        SELECT i.id_inscripcion, i.fecha_inscripcion, a.nombre AS nombre_alumno, a.apellido AS apellido_alumno, a.estado AS estado_alumno, a.id_alumno, p.nombre AS nombre_profesor, p.apellido AS apellido_profesor, p.id_profesor, c.id_curso ,c.nombre AS nombre_curso
        FROM inscripciones i
        JOIN alumnos a ON i.id_alumno = a.id_alumno AND a.estado = 1
        JOIN cursos c ON i.id_curso = c.id_curso
        JOIN profesores p ON c.id_profesor = p.id_profesor AND p.estado=1
    `
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

});

inscripcionRouter.get("/obtener/:cid", (req, res) => {

    /*hacer un join con la base de datos de profesores y alumnos*/

    const { cid } = req.params

    const sql = `
        SELECT i.id_inscripcion, i.fecha_inscripcion, 
        a.id_alumno, a.nombre AS nombre_alumno, 
        a.apellido AS apellido_alumno,
        c.nombre AS nombre_curso
        FROM inscripciones i
        INNER JOIN alumnos a ON a.id_alumno = i.id_alumno AND a.estado=1
        INNER JOIN cursos c ON c.id_curso = i.id_curso 
        WHERE i.id_curso = ? 
    `
    db.query(sql, [cid], (err, result) => {

        if (err) {
            return res.status(500).send({
                message: "Error al obtener las incripciones",
                payload: []
            });
        }

        return res.status(200).send({
            message: "lista de alumnos inscriptos",
            payload: result
        });
    });

});

inscripcionRouter.post("/subir", (req, res) => {

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

});

inscripcionRouter.put("/actualizar", (req, res) => {

    const { id_inscripciones, id_alumno, id_curso, fecha_inscripcion } = req.body;

    const sql = `
        UPDATE inscripciones
        SET id_alumno = ?, id_curso = ?, fecha_inscripcion = ?
        WHERE id_inscripciones = ?
    `

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

});

//inscripcionRouter.delete();//sose si quiero eliminar un curso necesito un estado

export default inscripcionRouter;