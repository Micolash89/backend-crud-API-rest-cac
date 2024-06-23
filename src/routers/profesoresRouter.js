import { Router } from "express";
import { obtenerListaProfesores, subirProfesor } from "../controllers/profesoresController.js";

const profesoresRouter = Router();


profesoresRouter.get("/obtener", obtenerListaProfesores);

profesoresRouter.post("/subir", subirProfesor);

export default profesoresRouter;