// Imports
const DataBase = require('./DataBase')

// Main class
class User{
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
    async create(data) {
        return new Promise((res,rej) => {
            // data 
            const newUser = [
                data.nombres,
                data.apellidos,
                data.fechaNacimiento,
                data.tipoDocumento,
                data.numeroDocumento,
                data.direccion,
                data.telefono,
                data.email,
                data.password
            ]
            let procedure = "CALL RegistPeoples(?,?,?,?,?,?,?,?,?,?);"

            // conect to database
            let conection = conect()

            // call procedure
            conection.query(procedure,newUser,err => { 
                if(err) {
                    rej(err) 
                } else setTimeout(() => res({
                    message: "User Created",
                    ...data
                }),4000)
            })

            // close conection 
            conection.end()
        })
      }

}

// Export
module.exports = User