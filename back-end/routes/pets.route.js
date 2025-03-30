// Librarys
const { Router } = require('express')

// Imports
const Pet = require('../services/Pets.services')

// vars
const pet = new Pet()
let Route = Router()

// Routes 
Route.get('/all', async (req,res) => {
    let pets = await pet.findAll()
    res.status(200).json(pets)
})

// Export 
module.exports = Route