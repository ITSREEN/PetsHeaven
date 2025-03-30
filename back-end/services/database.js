// Librarys 
const mysql = require('mysql')

// Conect function
const db = mysql.createConnection({
    host: "127.0.0.1",
    database: "mascotas_db",
    user: "root",
    password: "",
    port: 3306
})

// Exports 
module.exports = db