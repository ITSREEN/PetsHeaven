// Librarys
const { Router } = require('express')

// Imports
const Pet = require('../services/Pets.services')
const { ValidatorRol } = require('../middleware/validator.handler')
// vars
const pet = new Pet()
const Route = Router()

// Routes 
Route.get('/all', ValidatorRol("veterinario"), async (req,res) => {
    // Vars 
    const pets = await pet.findAll()
    if (!pets.result) res.status(404).json({ message: "Mascotas no encontradas" })

    try {
        res.status(200).json(pets)
    } catch (err) {
        res.json({ message: err })
    }

})

Route.get('/all:by', ValidatorRol("usuario"),async (req,res) => {
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

Route.post('/register', ValidatorRol("veterinario"), async (req,res) => {
    // Vars
    const { body } = req

    // Verify if exist
    // const find = pet.findAllBy(toString(body.name))
    // const findPet = await find.result[0][0]

    // if (findPet) {
    //     return res.status(404).json({message: "La mascota ya existe"})
    // }
    console.log(body)

    try{
        const created = await pet.create(body)
        console.log(created)
        if (created.create) {
            return res.status(201).json(created)
        }
        res.status(500).json({message: "Error interno"})
    } catch (err) {
        res.json({ message: err })
    }
})

Route.put('/modify', ValidatorRol("usuario"), async (req,res) => {
    // Vars 
    const body = req.body

    // Verify if exist
    const find = await pet.findAllBy(body.doc_usu,body.nom_mas)
    const findOne = await find.result[0][0]

    if (!findOne) {
        return res.status(404).json({message: "Mascota no encontrada"})
    }

    try {
        const petMod = await pet.modify(body)
        res.status(200).json(petMod)
    } catch (err) {
        res.json({ message: err })
    }
})

Route.get('/history:by', ValidatorRol("veterinario") ,async (req,res) => {
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