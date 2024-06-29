import { Router } from "express";
import {obtenerListaAlumnos, subirAlumno, actualizarAlumno,eliminarAlumno} from "../controllers/alumnosController.js"

 const alumnosRouter = Router();

 alumnosRouter.get("/obtener",obtenerListaAlumnos);
 alumnosRouter.post("/subir",subirAlumno);
 alumnosRouter.put("/actualizar",actualizarAlumno);
 alumnosRouter.delete("/eliminar",eliminarAlumno);

 export default alumnosRouter;

