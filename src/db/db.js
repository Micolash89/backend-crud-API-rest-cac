import { createConnection } from "mysql2";

const connection = createConnection({
    
    host: 'localhost',
    user: 'root',
    password: "root",
    database: "escuela"
});

connection.connect(err => {
    if (err) {
        console.error("error connecting to the database: ", err);
        return
    }

    console.log("Connected to the database.");
})

export default connection;


