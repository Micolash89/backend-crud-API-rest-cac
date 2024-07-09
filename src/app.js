import express from "express";
//import config from "./config/config.js";
import cors from "cors";
import profesoresRouter from "./routers/profesoresRouter.js";
import searchRouter from "./routers/searchRouter.js";
import cursosRouter from "./routers/cursoRouter.js";
import inscripcionRouter from "./routers/inscripcionRouter.js";
import alumnosRouter from "./routers/alumnosRouter.js";
import sessionRouter from "./routers/session.Router.js";
import config from "./config/config.js";

const port = config.port || 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: config.allUrl.split(","), methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));

app.use("/api/profesores", profesoresRouter);
app.use("/api/search", searchRouter)
app.use("/api/cursos", cursosRouter);
app.use("/api/inscripciones", inscripcionRouter);
app.use("/api/alumnos", alumnosRouter);
app.use("/api/session", sessionRouter);

const server = app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

