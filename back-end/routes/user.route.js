// Librarys
const { Router } = require('express')

// Imports
const User = require('../services/Users.services')

// vars
const user = new User()
let Route = Router()

// Routes
Route.get('/all', async (req,res) => {
    let search = await user.findAll()
    res.status(200).json(search)
})
Route.post('/regist', async (req,res) => {
    let { body } = req
    let create = await user.create(body)
    res.status(200).json(create)
})

// Export 
module.exports = Route