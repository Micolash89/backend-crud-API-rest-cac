import db from "../db/db.js"
import jwt from "jsonwebtoken";
import ProfesorDTO from "../dto/ProfesorDTO.js";
import { isValidPassword } from "../../utils.js";

export const loginPost = async (req, res) => {


    const { email, password } = req.body;
    const sql = `
        SELECT id_profesor,
         email, 
         password,
          nombre, 
          apellido, 
          estado, 
          email, 
          telefono,
          url,
          role
          FROM profesores p WHERE p.email LIKE ? 
    `;

    try {
        const connection = await db.promise().getConnection();
        const [profesorResult] = await connection.query(sql, [email]);
        connection.release();
        if (!profesorResult) {
            res.status(404).send({
                message: "error en alguno de los campos",
                payload: []
            })
        };

        const passwordValid = isValidPassword(profesorResult[0], password);

        if (!passwordValid) res.status(404).send({
            message: "Error en algunos de los campos",
            payload: []
        });

        //poner en variable de entorno el secreto
        const token = jwt.sign({ profesor: ProfesorDTO.profesorToken(profesorResult[0]) }, "secreto", { expiresIn: "30d" });

        res.status(201).send({ message: "login exitoso", auth: true, token: token, profesor: ProfesorDTO.profesorToken(profesorResult[0]) });

    } catch (error) {
        res.status(500).send({
            message: "usuario no registrado",
            payload: []
        })
    }

};

export const currentGet = (req, res) => {
    res.status(200).send({ message: "login exitoso", auth: true, profesor: req.profesor })
};