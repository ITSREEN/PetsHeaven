// Librarys
const jwt = require('jsonwebtoken')
const { Router } = require('express')

// Imports
const Global = require('../services/Global.services')

// vars
const global = new Global()
const Route = Router()

// Routes 
Route.get('/services', async (req,res) => {
    const services = await global.SearchServices()

    // Verify if exist 
    if (!services.result) res.status(404).json({ message: "servicios no encontrados" })

    try {
        res.status(200).json(services)
    } catch (err) {
        res.json({ message: err })
    }
})

Route.post('/login', async (req,res) => {
    // Vars
    const { firstData, secondData } = req.body
    
    try {
        // Search in database
        let log = await global.login(firstData, secondData)
        let user = await log.result[0][0]

        if (!user.nom_usu) {
            res.status(401).json({ error: 'Credenciales inválidas' })
            return
        }

        const token = jwt.sign(
            { 
                names: user.nom_usu,
                lastNames: user.ape_usu,
                roles: user.roles,
                permisos: user.permisos
            },
            'pets_heaven',
            { expiresIn: '2h' }
        )
        res.status(201).json({ token: token })

    } catch (err) {
        console.log(err)
    }
})

// Export 
module.exports = Route