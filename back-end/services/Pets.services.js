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
                }),2000)
            })

            // close conection 
            database.conection.end()
        })
    }
    // function to find all
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
                },2000)
            })

            // close conection 
            database.conection.end()
        })
    }

    // function to find all by
    async findAllBy(data) {
        return new Promise((res,rej) => {
            // vars
            const by = data.slice(1,data.length)
            const proc = "CALL SearchPetsBy(?);"

            // conect to database
            let database = new DataBase()
            database.conect()

            if (database) database.conection.query(proc,by,(err,result) => {
                if(err) {
                    rej({ message: err })
                } else setTimeout(() => {
                    res({
                        message: "Pets found",
                        result: result
                    })
                },2000)
            })

            // close conection 
            database.conection.end()
        })
    }
    
    // function to find by
    async findBy(data) {
        return new Promise((res,rej) => {
            // vars
            const by = data.slice(1,data.length)
            const proc = "CALL SearchPetsBy(?)"

            // conect to database
            let database = new DataBase()
            database.conect()

            if (database) database.conection.query(proc,by,(err,result) => {
                if(err) {
                    rej({ message: err })
                } else setTimeout(() => {
                    res({
                        message: "Pet found",
                        result: result
                    })
                },2000)
            })

            // close conection 
            database.conection.end()
        })
    }
    async modify(data) {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL ModifyPets(?,?,?,?,?,?,?,?,?,?,?)"

            // conect to database
            let database = new DataBase()
            database.conect()

            // Query 
            if (database) database.conection.query(proc,[data.nom,data.ape,data.dir,data.tel,data.email,data.cont],err => {
                err? rej(err)
                :setTimeout(() => res({
                    message: "Pet Modify",
                    ...data
                }),2000)
            })

            // close conection 
            database.conection.end()
        })
    }
}

// Export
module.exports = Pet