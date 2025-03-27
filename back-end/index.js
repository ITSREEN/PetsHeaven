// librarys
const express = require('express')
const cors = require('cors')
const User = require('./services/users.services')

// vars
const app = express()
const port = 3000
const user = new User()

// desativar header extra 
app.disable('x-powered-by')

// middleware
app.use(express.json())

app.use(cors())

app.get('/',(req,res) => {
    res.status(200).send("<a href='/register'>register</a>")
})

app.get('/user', async (req,res) => {
    let search = await user.findAll()
    res.status(200).json(search)
})

// app.get('/user/:name', async (req,res) => {
//     const { name } = req.params
//     let searchOne = await user.findOne(name)
//     res.status(200).json(searchOne)
// })

app.post('/user/register', async (req,res) => {
    let data = req.body
    let crear = await user.create(data)
    res.status(201).json(crear)
})

app.listen(port,() => console.log("Host is: http://localhost:" + port))