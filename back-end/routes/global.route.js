// Librarys
const jwt = require('jsonwebtoken')
const { compare } = require('bcrypt')
const { Router } = require('express')

// Imports
const Global = require('../services/Global.services')
const { limiterLog } = require('../middleware/varios.handler')

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

Route.post('/login',limiterLog, async (req,res) => {
    // Vars
    const { firstData, secondData } = req.body
    
    try {
        // Search in database
        let log = await global.login(firstData)
        let user = await log.result[0][0]
        // Verify
        const coincide = await compare(secondData, user.cont_usu)

        if (!user || !coincide) {
            res.status(401).json({ message: 'Credenciales inválidas' })
            return
        }
        const token = jwt.sign(
            { 
                names: user.nom_usu,
                lastNames: user.ape_usu,
                roles: user.roles
            },
            'pets_heaven_vite_gestion',
            { expiresIn: '1h' }
        )
        res.status(200).json({ token: token })

    } catch (err) {
        res.json({ message: err })
    }
})

// Export 
module.exports = Route