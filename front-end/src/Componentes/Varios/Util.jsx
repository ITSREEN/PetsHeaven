// Librays
import React from "react"

//componente de cerrar sesion 
export const Logout = () => {
    localStorage.setItem("token","")
}

// decodificar token
export const decodeJWT = (token) => {
    try {
      // Dividir el token y decodificar el payload (parte 2)
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const payload = JSON.parse(atob(base64))
      
      return payload
    } catch (error) {
      console.error("Error decodificando el token:", error)
      return null
    }
}
export const errorStatusHandler = (errStatus) => {
  let message = "Error interno"

  if (errStatus >= 500) return "Error en el servidor"
  
  switch (errStatus) {
    case 302:
      message = 'Ya existe en el sistema'
      break

    case 401:
      message = 'Usuario o contraseña incorrectos'
      break
      
    case 404:
      message = 'No se encontro lo que buscas'
      break

    case 429: 
      message = 'Demasiados intentos espera 5 minutos'
      break
    
    default:
      message = errStatus
      break
  }

  return message
}