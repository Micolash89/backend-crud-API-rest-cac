import express from "express";
import config from "./config/config.js";
import cors from "cors";
import profesoresRouter from "./routers/profesoresRouter.js";
import searchRouter from "./routers/searchRouter.js";
//import alumnosRouter from "./routers/alumnosRouter.js";

const port = config.port || 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));


app.use("/api/profesores", profesoresRouter);
//app.use("/api/alumnos", alumnosRouter);
app.use("/api/search", searchRouter)

const server = app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});