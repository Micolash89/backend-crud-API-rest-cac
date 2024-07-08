import { Router } from "express";
import { actualizarIncripcion, obtenerCantAlumnosIncripciones, obtenerIncripciones, obtenerUnaInscripcion, subirUnaIncripcion } from "../controllers/inscripcionController.js";

const inscripcionRouter = Router();

inscripcionRouter.get("/obtener", obtenerIncripciones);

inscripcionRouter.get("/obtener/:cid", obtenerUnaInscripcion);

inscripcionRouter.get("/contar/:cid", obtenerCantAlumnosIncripciones);

inscripcionRouter.post("/subir", subirUnaIncripcion);

inscripcionRouter.put("/actualizar", actualizarIncripcion);

export default inscripcionRouter;