import express from "express";
import config from "./config/config.js";
import cors from "cors";
// import db from "./db/db.js"

const port = config.port || 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));

/*hacer otro archivo para que maneje la base de datos y no este todo en los controladores del router*/
// db.query("SELECT * FROM alumnos", (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     console.log(typeof result)
// })

const server = app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
})

