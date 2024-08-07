# Proyecto Backend - Fullstack Node.js (Codo a Codo)<img src="https://user-images.githubusercontent.com/83146564/137408912-013f0d0c-37d1-4dc2-a1b5-77356c1003f3.png" alt="CodoCodoLogo" width=12% />

---

### Descripción del Proyecto

Este proyecto es el backend de una aplicación educativa desarrollada por el grupo 1 del curso de ***Full Stack Node.js en Codo a Codo***. La aplicación permite gestionar profesores, alumnos, cursos e inscripciones, e incluye autenticación de usuarios y búsqueda avanzada. Se implementaron buenas prácticas de desarrollo y se añadieron funcionalidades adicionales, como el envío de emails al registrar a un alumno o un profesor.

Los profesores son los únicos que pueden iniciar sesión y la aplicación genera un token que se guarda en una cookie del lado del cliente. Solo los profesores con rol de ***administrador*** pueden gestionar las cuentas. El ***backend*** está desplegado en [Render](https://render.com), la base de datos ***MySQL*** está en [Clever Cloud](https://clever-cloud.com), y el ***frontend***, desarrollado con React y Vite, está desplegado en [GitHub Pages](https://pages.github.com).

---

<div align="center">
    
| [<img src="https://github.com/tandpfun/skill-icons/raw/main/icons/NodeJS-Dark.svg" width=60><br><sub>Node.js</sub>](https://expressjs.com/) | [<img src="https://github.com/tandpfun/skill-icons/raw/main/icons/ExpressJS-Dark.svg" width=60><br><sub>Express</sub>](https://expressjs.com/) | [<img src="https://github.com/tandpfun/skill-icons/raw/main/icons/MySQL-Dark.svg" width=60><br><sub>MySQL</sub>](https://www.mysql.com/) | [<img src="https://github.com/tandpfun/skill-icons/raw/main/icons/Npm-Dark.svg" width=60><br><sub>npm</sub>](https://www.npmjs.com/) | [<img src="https://github.com/tandpfun/skill-icons/raw/main/icons/Postman.svg" width=60><br><sub>Postman</sub>](https://www.postman.com/) |
| :---: | :---: | :---: | :---: | :---: |

</div>

### Deploy

- El ***Frontend*** se encuentra desplegado en ***Github Pages*** [Link](https://micolash89.github.io/crud-page/).
- El  ***Backend*** se encuentra desplegado en ***Render*** [Link](https://backend-crud-api-rest-cac.onrender.com).
  
- Repositorio al ***código frontend*** [Link](https://github.com/Micolash89/crud-page).

---

## Rutas

### Profesores

- `GET /api/profesores/obtener` - Obtener la lista de todos los profesores.
- `GET /api/profesores/obtener/:id` - Obtener un profesor por su ID.
- `GET /api/profesores/contar` - Obtener la cantidad de profesores.
- `POST /api/profesores/subir` - Registrar un nuevo profesor.
- `PUT /api/profesores/actualizar` - Actualizar un profesor existente. (Requiere autenticación)
- `DELETE /api/profesores/eliminar/:pid` - Eliminar un profesor por su ID. (Requiere autenticación)

### Alumnos

- `GET /api/alumnos/obtener` - Obtener la lista de todos los alumnos.
- `GET /api/alumnos/obtener/:id` - Obtener un alumno por su ID.
- `GET /api/alumnos/contar` - Obtener la cantidad de alumnos.
- `POST /api/alumnos/subir` - Subir un nuevo alumno. (Requiere autenticación)
- `PUT /api/alumnos/actualizar` - Actualizar un alumno existente. (Requiere autenticación)
- `DELETE /api/alumnos/eliminar/:aid` - Eliminar un alumno por su ID. (Requiere autenticación)

### Cursos

- `GET /api/cursos/obtener/:cid` - Obtener un curso por su ID.
- `GET /api/cursos/obtener` - Obtener la lista de todos los cursos.
- `GET /api/cursos/contar` - Obtener la cantidad de cursos.
- `POST /api/cursos/subir` - Registrar un nuevo curso.
- `PUT /api/cursos/actualizar` - Actualizar un curso existente.

### Inscripciones

- `GET /api/inscripciones/obtener` - Obtener la lista de todas las inscripciones.
- `GET /api/inscripciones/obtener/:cid` - Obtener una inscripción por su ID.
- `GET /api/inscripciones/contar/:cid` - Obtener la cantidad de alumnos inscritos en un curso.
- `POST /api/inscripciones/subir` - Registrar una nueva inscripción.
- `PUT /api/inscripciones/actualizar` - Actualizar una inscripción existente.

### Búsqueda

- `GET /api/search/obtener/:filtro` - Buscar por filtro.

### Sesión

- `POST /api/session/login` - Iniciar sesión. (Genera el token de autenticación)
- `GET /api/session/current` - Obtener la información del usuario actual. (Requiere autenticación)

## Dependencias

A continuación se detallan las dependencias utilizadas en este proyecto:

| Nombre           | Versión |
| ---------------- | ------- |
| bcrypt           | ^5.1.1  |
| cors             | ^2.8.5  |
| dotenv           | ^16.4.5 |
| express          | ^4.19.2 |
| jsonwebtoken     | ^9.0.2  |
| mysql2           | ^3.10.1 |
| nodemailer       | ^6.9.14 |
| nodemon          | ^3.1.4  |

## Capturas de Pantalla

A continuación se muestran algunas capturas de pantalla del proyecto:

<p  align="center">
    <img src="https://i.imgur.com/DevHhRf.jpeg" alt="HomePage" width=75% />
    <img src="https://i.imgur.com/NGn3QkM.jpeg" alt="HomePage" width=75% />
    <img src="https://i.imgur.com/bR6zqQe.jpeg" alt="HomePage" width=75% />
    <img src="https://i.imgur.com/zdFmALs.jpeg" alt="HomePage" width=75% />
</p>

## Instrucciones de Ejecución

1. Clonar este repositorio.
2. Instalar las dependencias utilizando `npm install`.
3. Ejecutar el proyecto utilizando `node src/app.js`.

---

## Autores

| [<img src="https://avatars.githubusercontent.com/u/127247837?v=4" width=115><br><sub>Javier Espindola</sub>](https://github.com/Micolash89) <br> [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/javier-espindola/) | [<img src="https://avatars.githubusercontent.com/u/117237267?v=4" width=115><br><sub>Javier Buron</sub>](https://github.com/Mat-Insaurralde) <br> [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/javier-alejandro-buron-0732141b2) | [<img src="https://avatars.githubusercontent.com/u/95722600?v=4" width=115><br><sub>Agustin Corio</sub>](https://github.com/AFCoiro) <br> [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/agust%C3%ADn-coiro-0a5223200/) | [<img src="https://avatars.githubusercontent.com/u/119079697?v=4" width=115><br><sub>Juan Aramayo</sub>](https://github.com/ma3rtin) |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------: |

## Profesor

| [<img src="https://avatars.githubusercontent.com/u/42904415?v=4" width=115><br><sub>Roberto Perez</sub>](https://github.com/robermau) <br> [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/roberto-mauro-perez-olivera-206304176/) |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
