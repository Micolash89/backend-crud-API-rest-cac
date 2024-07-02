import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export const authMiddleware = (req, res, next) => {

    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(403).send({ auth: false, message: "no se proveyó un token" });

    const token = authHeader.split(" ")[1];

    if (!token) return res.status(403).send({ auth: false, message: "Malformed token" });

    //poner en variable de entorno  secreto
    jwt.verify(token, "secreto", (err, decode) => {
        if (err) return res.status(500).send({ auth: false, message: "token inválido" });

        req.profesor = decode.profesor;
        next();

    })

}


export default __dirname;