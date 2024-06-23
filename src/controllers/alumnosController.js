import db from "../db/db.js"

export const obtenerListaAlumnos = (req,res)=>{
    /*hacer otro archivo para que maneje la base de datos y no este todo en los controladores del router*/
    db.query("SELECT * FROM alumnos", (err, result) => {
        if (err) throw err;
        res.send({
            message:"lisr de alumnos",
            payload:result
        });

    })

 }

 export const  subirAlumno = (req,res)=>{

    const {nombre,apellido,email,fecha_nacimiento} = req.body;
    const sql = "INSERT INTO alumnos (nombre,apellido,email,fecha_nacimiento) VALUES (?,?,?,?)";

    db.query(sql,[nombre,apellido,email,fecha_nacimiento], (err, result) => {
        if (err) throw err;
        res.send({
            message:"carga exitosa de alumno",
            payload:result.insertId
        });
        
    })

 }