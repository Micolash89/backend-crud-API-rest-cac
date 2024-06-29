import { Router } from "express";
import db from "../db/db.js";

const inscripcionRouter = Router();

inscripcionRouter.get("/obtener/:id", (req, res) => {

    const { id } = req.params;

    /*hacer un join con la base de datos de profesores y alumnos*/
    sql = `
        SELECT * 
        FROM inscripciones 
        WHERE id = ?
    `

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).send({
                message: "Error al obtener la inscripcion",
                payload: []
            });
        }

        return res.status(200).send({
            message: "se encontro el curso",
            payload: result
        })

    });

});

inscripcionRouter.get("/obtener", (req, res) => {

    /*hacer un join con la base de datos de profesores y alumnos*/
    sql = `
        SELECT *
        FROM inscripciones
    `
    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).send({
                message: "Error al obtener los cursos",
                payload: []
            });
        }

        return res.status(200).send({
            message: "lista de cursos",
            payload: result
        });
    });

});

inscripcionRouter.post("/subir", (req, res) => {

    const { id_alumno, id_curso, fecha_inscripcion } = req.body;

    sql = `
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
            payload: result
        });
    });

});

inscripcionRouter.put("/actualizar", (req, res) => {

    const { id_inscripciones, id_alumno, id_curso, fecha_inscripcion } = req.body;

    sql = `
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