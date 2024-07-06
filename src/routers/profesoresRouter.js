import { Router } from "express";
import { actualizarProfesor, eliminarProfesor, obtenerListaProfesores, obtenerProfesor, subirProfesor } from "../controllers/profesoresController.js";
import { authMiddleware } from "../../utils.js";

const profesoresRouter = Router();

profesoresRouter.get("/obtener", obtenerListaProfesores);

profesoresRouter.get("/obtener/:id", obtenerProfesor);

profesoresRouter.post("/subir", authMiddleware, subirProfesor);

profesoresRouter.put("/actualizar", authMiddleware, actualizarProfesor);

profesoresRouter.delete("/eliminar/:pid", authMiddleware, eliminarProfesor);

export default profesoresRouter;