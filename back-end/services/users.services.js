// Imports
const db = require('./database')

// Main class
class User{
    constructor(
        nom = String = null,
        ape = String = null,
        tip_doc = String = null,
        doc = String = null,
        dir = String = null,
        cel = String = null,
        cel2 = String = null,
        email = String = null,
        cont = String = null,
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
            db.query()
        })
    }
    
    // function to find all
    async findAll() {
        return new Promise((res,rej) => {
            db.query("SearchPeoples",(err,result) => {
                if(err) {
                    rej({ message: err })
                } else setTimeout(() => {
                    res({
                        message: "Users found",
                        result: result
                    })
                },4000)
            })
        })
    }
    
    // function to register
    async create(data) {
        return new Promise((res,rej) => {
            // data 
            const newUser = {...data}

            // call procedure
            db.query.call(procedure,[newUser.nom,newUser.ape,newUser.dir,newUser.tel,newUser.email,newUser.cont],(err,result) => { 
                if(err) {
                    rej(err) 
                } else setTimeout(() => res({
                    message: "User Created",
                    ...newUser
                }),4000)
            })
        })
      }

}

module.exports = User