const db = require('./database')
class User{
    // constructor() {}

    // function to find One 
    async findOne(name) {
        return new Promise((res,rej) => {
            db.query()
        })
    }
    
    // function to find all
    async findAll() {
        return new Promise((res,rej) => {
            db.query("",(err,result) => {
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