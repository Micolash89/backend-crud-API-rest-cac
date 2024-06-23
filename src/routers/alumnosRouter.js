import { Router } from "express";
import {obtenerListaAlumnos} from "../controllers/alumnosController.js"
 const alumnosRouter = Router();

 alumnosRouter.get("/obtener",obtenerListaAlumnos);
 alumnosRouter.post("/subir",subirAlumno);


 export default alumnosRouter;