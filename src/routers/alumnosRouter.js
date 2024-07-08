import { Router } from "express";
import { obtenerListaAlumnos, subirAlumno, actualizarAlumno, eliminarAlumno, contarAlumnos, obtenerAlumno } from "../controllers/alumnosController.js"
import { authMiddleware } from "../../utils.js";

const alumnosRouter = Router();

alumnosRouter.get("/obtener", obtenerListaAlumnos);

alumnosRouter.get("/obtener/:id", obtenerAlumno);

alumnosRouter.get("/contar", contarAlumnos);

alumnosRouter.post("/subir", authMiddleware, subirAlumno);

alumnosRouter.put("/actualizar", authMiddleware, actualizarAlumno);

alumnosRouter.delete("/eliminar/:aid", authMiddleware, eliminarAlumno);

export default alumnosRouter;

