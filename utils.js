import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from './src/config/config.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export const authMiddleware = (req, res, next) => {

    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(403).send({ auth: false, message: "inicie session" });

    const token = authHeader.split(" ")[1];

    if (!token) return res.status(403).send({ auth: false, message: "no existe el token" });

    //poner en variable de entorno  secreto
    jwt.verify(token, config.tokenSecret, (err, decode) => {
        if (err) return res.status(500).send({ auth: false, message: "token inválido" });

        req.profesor = decode.profesor;

        if (decode.profesor.role != "ADMIN") return res.status(403).send({ auth: false, message: "no tiene permisos" })

        next();
    });

}




export default __dirname;