// Imports
const DataBase = require('./DataBase')

// Main class 
class Pet {
    // function to register
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
            const by = data.replace(":","").replace(" ","")
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
    
    // function to modify
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

     // function to find all Medical History by Pet
     async findHistoryBy(data) {
        return new Promise((res,rej) => {
            // vars
            const by = data.replace(":","").replace(" ","")
            const proc = "CALL SearchHistoryBy(?);"

            // conect to database
            let database = new DataBase()
            database.conect()
            
            if (database) database.conection.query(proc,by,(err,result) => {
                if(err) {
                    rej({ message: err })
                } else setTimeout(() => {
                    res({
                        message: "History found",
                        result: result
                    })
                },2000)
            })

            // close conection 
            database.conection.end()
        })
    }
}

// Export
module.exports = Pet