import db from "../db/db.js"
import { createHash } from "../../utils.js";

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

    const { nombre,apellido,email,fecha_nacimiento,password } = req.body;

    if(!nombre || !apellido || !email || fecha_nacimiento || !password){
        return res.status(400).send({
            message:"falta un campo al cargar",
            payload:[]
        })
    }

    const sql = "INSERT INTO alumnos (nombre,apellido,email,fecha_nacimiento,estado,password) VALUES (?,?,?,?,?,?)";

    db.query(sql,[nombre,apellido,email,fecha_nacimiento,true, createHash(password)], (err, result) => {
        if (err) throw err;
        res.send({
            message:"carga exitosa de alumno",
            payload:result.insertId
        });
        
    })

 }

 export const  actualizarAlumno = (req,res)=>{

    const { id_alumno,nombre,apellido,email,fecha_nacimiento } = req.body;

    if(!id_alumno || !nombre || !apellido || !email || fecha_nacimiento ){
        return res.status(400).send({
            message:"falta un campo al cargar",
            payload:[]
        })
    }

    const sql = "UPDATE alumnos SET alumno=? , apellido=? , email=? , fecha_nacimiento=? WHERE id_alumno=?";

    db.query(sql,[nombre,apellido,email,fecha_nacimiento,id_alumno], (err, result) => {

        if (err) return res.status(500).send({
            message:"error en la base de datos",
            payload:[]
        });

        return res.send({
            message:"Actualización de alumno exitosa",
            payload:result.info
        });
        
    });

 }


 export const  eliminarAlumno = (req,res)=>{

    const { id_alumno} = req.body;

    if(!id_alumno ){
        return res.status(400).send({
            message:"falta un campo al cargar",
            payload:[]
        })
    }

    const sql = "UPDATE alumnos SET estado=? WHERE id_alumno=?";

    db.query(sql, [false,id_alumno], (err, result) => {

        if (err) return res.status(500).send({
            message:"error en la base de datos",
            payload:[]
        });

        return res.send({
            message:"Se elimió el alumno de forma exitosa",
            payload:result.info
        });
        
    });

 }