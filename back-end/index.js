// librarys
const express = require('express')
const cors = require('cors')

// Imports 
const globalRoute = require('./routes/global.route')
const userRoute = require('./routes/user.route')
const petRoute = require('./routes/pets.route')

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

// Routes
app.use('/global',globalRoute)
app.use('/user',userRoute)
app.use('/pet',petRoute)

app.listen(port,() => console.log("Host is: http://localhost:" + port))