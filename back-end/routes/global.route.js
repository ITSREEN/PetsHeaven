// Librarys
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

// Export 
module.exports = Route