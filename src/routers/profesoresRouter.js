import { Router } from "express";
import { actualizarProfesor, eliminarProfesor, obtenerListaProfesores, subirProfesor } from "../controllers/profesoresController.js";

const profesoresRouter = Router();


profesoresRouter.get("/obtener", obtenerListaProfesores);

profesoresRouter.post("/subir", subirProfesor);

profesoresRouter.put("/actualizar", actualizarProfesor);

profesoresRouter.delete("/eliminar", eliminarProfesor);

export default profesoresRouter;