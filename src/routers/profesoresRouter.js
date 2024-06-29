import { Router } from "express";
import { actualizarProfesor, eliminarProfesor, obtenerListaProfesores, obtenerProfesor, subirProfesor } from "../controllers/profesoresController.js";

const profesoresRouter = Router();

profesoresRouter.get("/obtener", obtenerListaProfesores);

profesoresRouter.get("/obtener/:id", obtenerProfesor);

profesoresRouter.post("/subir", subirProfesor);

profesoresRouter.put("/actualizar", actualizarProfesor);

profesoresRouter.delete("/eliminar/:pid", eliminarProfesor);

export default profesoresRouter;