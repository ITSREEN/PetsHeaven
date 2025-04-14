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