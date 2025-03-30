// librarys
const express = require('express')
const cors = require('cors')

// Imports 
const userRoute = require('./routes/user.route')

// vars
const app = express()
const port = process.env.PORT ||3000

// desativar header extra 
app.disable('x-powered-by')

// middleware
app.use(express.json())

app.use(cors())

app.get('/',(req,res) => {
    res.status(200).send("<a href='/register'>register</a>")
})

app.use('/user',userRoute)

app.listen(port,() => console.log("Host is: http://localhost:" + port))