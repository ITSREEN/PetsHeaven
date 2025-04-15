// Handle Validations middlewares
function validatorHeaders (req,res,next) {
    // Headers
    const apiKey = req.headers['x-api-key']
    const contentType = req.headers['content-type']
    const userAgent = req.headers['user-agent']
    const user = req.headers['user']

    console.log(contentType,apiKey,user,userAgent)

    // Validation
    if (!apiKey || apiKey !== 'pets_heaven_vite' ) {
        return res.status(498).json({ error: 'Usuario no autorizado' })
    }
    if (!contentType || contentType !== 'application/json' ) {
        return res.status(400).json({ error: 'Contenido invalido' })
    }
    if (!userAgent || !user) {
        return res.status(401).json({ error: 'Usuario invalido' })
    }

    // Next to
    next()
}

function ValidatorToken(req,res,next) {
    const token = req.headers['token']

}

// export middleware 
module.exports = { validatorHeaders, ValidatorToken }