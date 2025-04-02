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
Route.post('/register',async (req,res) => {
    try{
        const { body } = req
        let pets = await pet.create(body)
        res.status(201).json(body)
    } catch (err) {
        console.log(err)
    }
})

// Export 
module.exports = Route