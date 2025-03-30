// Imports
const DataBase = require('./database')

// Main class
class User{
    constructor(
        nom = null,
        ape = null,
        tip_doc = null,
        doc = null,
        dir = null,
        cel = null,
        cel2 = null,
        email = null,
        cont = null,
    ) {
        this.nom = nom
        this.ape = ape
        this.tip_doc = tip_doc
        this.doc = doc
        this.dir = dir
        this.cel = cel
        this.cel2 = cel2
        this.email = email
        this.cont = cont
    }

    // function to find One 
    async findOne(name) {
        return new Promise((res,rej) => {
            // conect to database
            let conection = DataBase.conect()

            conection.query()
            
            // close conection 
            conection.end()
        })
    }
    
    // function to find all
    async findAll() {
        return new Promise((res,rej) => {
            // vars
            const proc = "CALL SearchPeoples();"

            // conect to database
            let database = new DataBase()
            database.conect()

            if (database) database.conection.query(proc,(err,result) => {
                if(err) {
                    rej({ message: err })
                } else setTimeout(() => {
                    res({
                        message: "Users found",
                        result: result
                    })
                },4000)
            })

            // close conection 
            database.conection.end()
        })
    }
    
    // function to register
    // async create(data) {
    //     return new Promise((res,rej) => {
    //         // data 
    //         const newUser = {...data}

    //         // conect to database
    //         let conection = conect()

    //         // call procedure
    //         conection.query(procedure,[newUser.nom,newUser.ape,newUser.dir,newUser.tel,newUser.email,newUser.cont],(err,result) => { 
    //             if(err) {
    //                 rej(err) 
    //             } else setTimeout(() => res({
    //                 message: "User Created",
    //                 ...newUser
    //             }),4000)
    //         })

    //         // close conection 
    //         conection.end()
    //     })
    //   }

}

// Export
module.exports = User