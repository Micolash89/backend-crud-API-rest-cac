import { Router } from "express";
import { buscarPorFiltro } from "../controllers/searchController.js";

const searchRouter = Router();

searchRouter.get("/obtener/:filtro", buscarPorFiltro)

export default searchRouter;