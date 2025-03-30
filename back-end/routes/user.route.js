// Librarys
const { Router } = require('express')

// Imports
const User = require('../services/users.services')

// vars
const user = new User()

let Route = Router()

Route.get('/all', async (req,res) => {
    let search = await user.findAll()
    res.status(200).json(search)
})


module.exports = Route