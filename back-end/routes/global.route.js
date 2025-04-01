// Librarys
const { Router } = require('express')

// Imports
const Global = require('../services/Global.services')

// vars
const global = new Global()
let Route = Router()

// Routes 
Route.get('/services', async (req,res) => {
    let services = await global.SearchServices()
    res.status(200).json(services)
})

// Export 
module.exports = Route