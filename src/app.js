import express from "express";
import config from "./config/config.js";
import cors from "cors";
import profesoresRouter from "./routers/profesoresRouter.js";
import searchRouter from "./routers/searchRouter.js";
import cursosRouter from "./routers/cursoRouter.js";
import inscripcionRouter from "./routers/inscripcionRouter.js";
import alumnosRouter from "./routers/alumnosRouter.js";
import dotenv from "dotenv"

dotenv.config();

const port = config.port || 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5500", "https://micolash89.github.io"], methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));

app.use("/api/profesores", profesoresRouter);
app.use("/api/search", searchRouter)
app.use("/api/cursos", cursosRouter);
app.use("/api/inscripciones", inscripcionRouter);
app.use("/api/alumnos", alumnosRouter);

const server = app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});