// Librarys
const { Router } = require('express')

// Imports
const Pet = require('../services/Pets.services')

// vars
const pet = new Pet()
const Route = Router()

// Routes 
Route.get('/all', async (req,res) => {
    // Vars 
    const pets = await pet.findAll()
    if (!pets.result) res.status(404).json({message: "Mascotas no encontradas"})

    try {
        res.status(200).json(pets)
    } catch (err) {
        res.json({ message: err })
    }

})

Route.get('/all:by', async (req,res) => {
    // Vars
    const by = req.params.by
    
    const pets = await pet.findAllBy(by)
    if (!pets.result[0][0]) res.status(404).json({message: "mascotas no encontradas"})

    try {
        res.status(200).json(pets)
    } catch (err) {
        res.json({ message: err })
    }

})

Route.post('/register',async (req,res) => {
    // Vars
    const { body } = req

    // Verify if exist
    // const find = pet.findAllBy(toString(body.name))
    // if (find) res.status(404).json({message: "Mascota no encontrada"})

    try{
        const pets = await pet.create(body)
        res.status(201).json(pets)
    } catch (err) {
        res.json({ message: err })
    }
})

Route.put('/modify',async (req,res) => {
    // Vars 
    const body = req.body

    // Verify if exist
    const find = await pet.findAllBy(body.doc_usu,body.nom_mas)
    const findOne = await find.result[0][0]

    if (!findOne) {
        res.status(404).json({message: "Mascota no encontrada"})
        return
    }

    try {
        const petMod = await pet.modify(body)
        console.log(petMod)
        res.status(200).json(petMod)
    } catch (err) {
        res.json({ message: err })
    }
})

Route.get('/history:by', async (req,res) => {
    // Vars 
    const by = req.params.by

    // Verify if exist
    const find = pet.findAllBy(toString(body.user))
    if (!find.result) res.status(404).json({message: "Mascota no encontrada"})

    try {
        const pets = await pet.findHistoryBy(toString(by))
        res.status(200).json(pets)
    } catch (err) {
        res.json({ message: err })
    }
})

// Export 
module.exports = Route