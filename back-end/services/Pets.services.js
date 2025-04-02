// Imports
const DataBase = require('./DataBase')

// Main class 
class Pet {
    async create(data) {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL RegistPets(?,?,?,?,?,?,?,?,?,?,?)"

            // conect to database
            let database = new DataBase()
            database.conect()

            // Query
            if (database) database.conection.query(proc,[data.nom,data.ape,data.dir,data.tel,data.email,data.cont],err => { 
                err? rej(err)
                :setTimeout(() => res({
                    message: "Pet Created",
                    ...data
                }),4000)
            })

            // close conection 
            database.conection.end()
        })
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