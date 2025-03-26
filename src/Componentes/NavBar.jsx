import { Link } from "react-router"
import React from "react"

export const NavBar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tighter hover:text-blue-200 transition-colors">
            Mi Aplicación
          </h1>
          
          <div className="flex gap-5">
            <Link 
              to="/" 
              className="px-3 py-2 font-medium hover:bg-white/20 rounded-lg transition-all"
            >
              Inicio
            </Link>
            <Link 
              to="/login" 
              className="px-3 py-2 font-medium hover:bg-white/20 rounded-lg transition-all"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-3 py-2 font-medium hover:bg-white/20 rounded-lg transition-all"
            >
              Registro
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}