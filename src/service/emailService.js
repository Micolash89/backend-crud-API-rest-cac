import nodemailer from "nodemailer";
import config from "../config/config.js";

/*envio de mail*/
const transporter = nodemailer.createTransport({

    service: 'gmail',
    port: 587,
    auth: {
        user: config.emailUser,
        pass: config.passwordAppGoogle
    }

})

export const sendEmail = async (email) => {

    await transporter.sendMail({
        from: `CaC Crud ✅`,
        to: email,
        subject: "Registro ✔️ CaC Crud - GRUPO 1",
        html: `
        <table width="100%" style="background-image: url('https://i.imgur.com/HnCBFgv.png'); background-size: cover; color: #000; font-family: Arial, sans-serif; padding: 20px;">
        <tr>
            <td style="padding: 20px;">
                <div style="background-color: #5c554b; padding: 15px; color: #fff; height: 30px;"></div>
                <h1 style="background-color: #fae7cd; padding: 10px; text-align: center;">¡Gracias por registrarte!</h1>
                <p style="background-color: #d6c6b0; padding: 15px;">
                    Me complace darte la bienvenida al proyecto <a href="https://micolash89.github.io/crud-page/" style="color: #5c554b;">CRUD Page</a> del curso de Fullstack NodeJS de Codo a Codo. Este es un paso importante para nuestro camino hacia el dominio del desarrollo web.
                </p>
                <p style="background-color: #d6c6b0; padding: 15px;">
                    Durante este curso, aprendimos a crear aplicaciones web completas utilizando NodeJS para el backend y tecnologías modernas para el frontend.
                </p>
                
                <h2 style="background-color: #fae7cd; padding: 10px; text-align: center;">Lo que hemos aprendido hasta ahora</h2>
                <ul style="background-color: #d6c6b0; padding: 15px; ">
                    <li> Diseño de layouts y prototipos web</li>
                    <li> Estructuras HTML y estilos CSS</li>
                    <li> Maquetación y diseño responsive con Bootstrap</li>
                    <li> Control de versiones con GIT y GitHub</li>
                    <li> Programación del lado del cliente con JavaScript</li>
                    <li> Publicación de sitios web en servidores</li>
                    <li> Patrones de diseño de arquitectura web</li>
                    <li> Manejo de bases de datos relacionales con MySQL</li>
                    <li> Desarrollo backend con NodeJS y Express</li>
                    <li> Gestión de proyectos con metodologías ágiles</li>
                </ul>
                <p style="background-color: #d6c6b0; padding: 15px;">
                <h2 style="background-color: #fae7cd; padding: 10px; text-align: center;">Codigo</h2>     
                <ul>
                <li>
                puedes visitar el repositorio<a href="https://github.com/Micolash89/backend-crud-API-rest-cac" style="color: #5c554b;"> BACK-END</a>
                </li>
                <li>
                puedes visitar el repositorio<a href="https://github.com/Micolash89/crud-page" style="color: #5c554b;"> FRONT-END</a> 
                </li>
                </ul>
                </p>
                <p style="background-color: #d6c6b0; padding: 15px;">
                    Para más detalles sobre el plan de estudio de Codo a Codo <a href="https://inscripcionesagencia.bue.edu.ar/codoacodo/doc/Plan%20de%20estudios-%20estudiantes-%20Full%20Stack%20Node%20JS%202023.pdf" style="color: #5c554b;">LINK.</a>.
                </p>
                <p style="background-color: #d6c6b0; padding: 15px;">
                    Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarme. ¡Buena suerte y felices aprendizajes!
                </p>
                <div style="background-color: #5c554b; padding: 15px; color: #fff; height: 30px;"></div>
            </td>
        </tr>
    </table>
        `,
        attachments: []
    })

}
