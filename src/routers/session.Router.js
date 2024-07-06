import { Router } from "express";
import { authMiddleware } from "../../utils.js";
import { currentGet, loginPost } from "../controllers/sessionController.js";

const sessionRouter = Router();

sessionRouter.post("/login", loginPost);

sessionRouter.get("/current", authMiddleware, currentGet);

export default sessionRouter;