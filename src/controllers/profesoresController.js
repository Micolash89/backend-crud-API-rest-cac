import db from "../db/db.js"


export const obtenerListaProfesores = (req, res) => {

    /*hacer otro archivo para que maneje la base de datos y no este todo en los controladores del router*/

    db.query("SELECT * FROM profesores", (err, result) => {
        if (err) throw err;

        res.send({
            message: "lista de profesores",
            payload: result
        });

    });

}

export const subirProfesor = (req, res) => {

    const { nombre, apellido, email, telefono } = req.body;

    if (!nombre || !apellido || !email || !telefono) {

        return res.status(400).send({
            message: "error en algun campo",
            payload: []
        })
    }

    const sql = "INSERT INTO profesores (nombre, apellido , email, telefono) VALUES (?,?,?,?)";

    db.query(sql, [nombre, apellido, email, telefono], (err, result) => {
        if (err) throw err;

        return res.send({
            message: "carga exitoso de profesor",
            payload: result.insertId
        });

    });


}