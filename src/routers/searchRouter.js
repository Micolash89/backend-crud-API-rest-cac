import { Router } from "express";
import db from "../db/db.js"

const searchRouter = Router();

searchRouter.get("/obtener/:filtro", (req, res) => {

    const { filtro } = req.params;
    const searchValue = `%${filtro}%`;

    if (!filtro) res.status(404).send({
        message: "no se pudo aplicar el filtro",
        payload: []
    })

    const sql = `
        SELECT * FROM profesores WHERE nombre LIKE ? OR apellido LIKE ?
        UNION
        SELECT * FROM alumnos WHERE nombre LIKE ? OR apellido LIKE ?
    `;
    db.query(sql, [searchValue, searchValue, searchValue, searchValue], (err, result) => {
        if (err) return res.status(500).send({
            message: "error en la base de datos",
            payload: []
        });

        if (!result.length) return res.send({
            message: "no se encontraron resultados",
            payload: []
        })

        res.send({
            message: "lista de profesores",
            payload: result
        });

    });

})


export default searchRouter;