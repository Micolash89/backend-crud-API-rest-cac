import { Router } from "express";
import { actualizarCurso, obtenerCursos, obtenerUnCursos, subirCurso } from "../controllers/cursoController.js";

const cursosRouter = Router();

cursosRouter.get("/obtener/:cid", obtenerUnCursos);

cursosRouter.get("/obtener", obtenerCursos);

cursosRouter.post("/subir", subirCurso);

cursosRouter.put("/actualizar", actualizarCurso);

export default cursosRouter;