import { Router } from "express";
import { actualizarProfesor, contarProfesores, eliminarProfesor, obtenerListaProfesores, obtenerProfesor, subirProfesor } from "../controllers/profesoresController.js";
import { authMiddleware } from "../../utils.js";

const profesoresRouter = Router();

profesoresRouter.get("/obtener", obtenerListaProfesores);

profesoresRouter.get("/obtener/:id", obtenerProfesor);

profesoresRouter.get("/contar", contarProfesores)

profesoresRouter.post("/subir", subirProfesor);

profesoresRouter.put("/actualizar", authMiddleware, actualizarProfesor);

profesoresRouter.delete("/eliminar/:pid", authMiddleware, eliminarProfesor);

export default profesoresRouter;