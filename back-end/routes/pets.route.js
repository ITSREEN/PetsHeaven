// Librarys
const { Router } = require('express')

// Imports
const Pet = require('../services/Pets.services')

// vars
const pet = new Pet()
let Route = Router()

// Routes 
Route.get('/all', async (req,res) => {
    // Vars 
    let pets = await pet.findAll()
    if (!pets.result) res.status(404).json({message: "Mascotas no encontradas"})

    try {
        res.status(200).json(pets)
    } catch (err) {
        console.log(err)
    }

})

Route.get('/all:by', async (req,res) => {
    // Vars
    const by = req.params.by

    let pets = await pet.findAllBy(toString(by))
    if (!pets.result) res.status(404).json({message: "mascotas no encontradas"})
    try {
        res.status(200).json(pets)
    } catch (err) {
        console.log(err)
    }

})

Route.post('/register',async (req,res) => {
    // Vars
    const { body } = req

    // Verify if exist
    // const find = pet.findAllBy(toString(body.name))
    // if (find) res.status(404).json({message: "Mascota no encontrada"})

    try{
        let pets = await pet.create(body)
        res.status(201).json(pets)
    } catch (err) {
        console.log(err)
    }
})

Route.put('/modify',async (req,res) => {
    // Vars 
    const { body } = req

    // Verify if exist
    const find = pet.findAllBy(toString(body.user))
    if (!find.result) res.status(404).json({message: "Mascota no encontrada"})
        
    try{
        let pets = await pet.modify(body)
        res.status(200).json(pets)
    } catch (err) {
        console.log(err)
    }
})

Route.get('/history:by', async (req,res) => {
    // Vars 
    const by = req.params.by

    // Verify if exist
    const find = pet.findAllBy(toString(body.user))
    if (!find.result) res.status(404).json({message: "Mascota no encontrada"})

    try {
        let pets = await pet.findHistoryBy(toString(by))
        res.status(200).json(pets)
    } catch (err) {
        console.error(err)
    }
})

// Export 
module.exports = Route