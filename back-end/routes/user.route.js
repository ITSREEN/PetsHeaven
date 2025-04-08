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
Route.get('/all:by', async (req,res) => {
    const by = req.params.by
    let search = await user.findAllBy(by)
    res.status(200).json(search)
})

Route.get('/by:by', async (req,res) => {
    const by = req.params.by
    let search = await user.findBy(by)
    res.status(200).json(search)
})

Route.post('/register', async (req,res) => {
    // Vars 
    let body = req.body

    // Verifiy if exist
    const find = user.findBy(toString(body.numeroDocumento))
    if (find.result) {
        res.status(302).json({ message: "Usuario ya existe"})
    }
        
    try {
        let create = await user.create(body)
        res.status(201).json(create)
    } catch(err) {
        res.json({
            message: err
        })
    }
})

Route.put('/modify', async (req,res) => {
    // Vars 
    let { body } = req

    // Verifiy if exist
    const find = user.findBy(toString(body.numeroDocumento))
    if (!find.result) res.status(404).json({ message: "Usuario no existe"})

    try {
        let create = await user.modify(body)
        res.status(200).json(create)
    } catch (err) {
        res.status(304).json({
            message: err
        })
    }
})

// Export 
module.exports = Route