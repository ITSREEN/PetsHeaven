// Imports
const DataBase = require('./DataBase')

// Main class 
class Pet {
    constructor (name = null) {
        this.name = name
    }

    async findAll() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchPets();"

            // conect to database
            let database = new DataBase()
            database.conect()

            if (database) database.conection.query(proc,(err,result) => {
                if(err) {
                    rej({ message: err })
                } else setTimeout(() => {
                    res({
                        message: "Pets found",
                        result: result
                    })
                },4000)
            })

            // close conection 
            database.conection.end()
        })
    }
}

// Export
module.exports = Pet