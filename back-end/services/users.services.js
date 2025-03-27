const db = require('./database')
class User{
    // constructor() {}

    async findOne(name) {
        return new Promise((res,rej) => {
            db.query()
        })
    }

    async findAll() {
        return new Promise((res,rej) => {
            db.query("SELECT * FROM usuarios;",(err,result) => {
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

    async create(data) {
        return new Promise((res,rej) => {
            const newUser = {...data}
            let typeUser = newUser.tipUser === 3?"InsertarAdministrador":newUser.tipUser === 2?"InsertarVeterinario":"InsertarPropietario"
            let procedure = "CALL " + typeUser + "(?,?,?,?,?,?)"

            db.query(procedure,[newUser.nom,newUser.ape,newUser.dir,newUser.tel,newUser.email,newUser.cont],(err,result) => { 
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