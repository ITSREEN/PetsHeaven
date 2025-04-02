// Imports
const DataBase = require('./DataBase')

// Main class 
class Global {
    async SearchServices() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchServices();"

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
module.exports = Global