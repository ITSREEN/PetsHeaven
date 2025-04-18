// Handle Validations middlewares
function validatorHeaders (req,res,next) {
    // Headers
    const apiKey = req.headers['x-api-key']
    const contentType = req.headers['content-type']
    const userAgent = req.headers['user-agent']

    // Validation
    if (!apiKey || apiKey !== 'pets_heaven_vite' ) {
        return res.status(498).json({ error: 'Usuario no autorizado' })
    }
    if (!contentType || contentType !== 'application/json' ) {
        return res.status(400).json({ error: 'Contenido invalido' })
    }
    if (!userAgent ) {
        return res.status(401).json({ error: 'Usuario invalido' })
    }

    // Next to
    next()
}

function ValidatorRol(requireRol = "") {
    return (req,res,next) => {
        const rolesHeader = req.headers['roles']
        // Verificación más robusta del header
        if (!rolesHeader || typeof rolesHeader !== 'string') {
            return res.status(403).json({ message: 'Roles perdidos o invalidos' })
        }
      
        const roles = rolesHeader.split(",").map(role => role.trim())
        
        // Comparación case-insensitive
        const isAdmin = roles.some(role => 
            role.toLowerCase() === requireRol
        )
        
        // Manejo de acceso
        if (!isAdmin) return res.status(401).json({ message: 'No tienes permisos para esta acción' })
    
        next()
    }
}

// export middleware 
module.exports = { validatorHeaders, ValidatorRol }