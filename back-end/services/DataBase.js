// Librarys 
const mysql = require('mysql')

class DataBase {
    constructor() {
        this.conection = this.createConnection()
    }
    
    // Create conection function
    createConnection() {
        return mysql.createConnection({
            host: "127.0.0.1",
            database: "pets_heaven",
            user: "root",
            password: "",
            port: 3306
        })
    }

    // Conect function
    conect = () => {
        this.conection.connect((err) => {
            if (err) {
                // throw Error(err)
                console.log(err)
                return
            }
            return true
        })
    }
}


// Exports 
module.exports = DataBase