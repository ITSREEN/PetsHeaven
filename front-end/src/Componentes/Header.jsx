import React from "react"
import { NavLink } from "react-router"

export const Header = () => {
  return (
        <header className="encabezado">
        <div className="contenedor-header">
          <div className="logo-container">
            <img src="/imgs/2.png" alt="PetsHeaven Logo" width={50} height={50} className="logo-img" />
            <span className="texto-logo">PetsHeaven</span>
          </div>

          {/* Navegación Escritorio */}
          <nav className="nav-escritorio">
            <NavLink to="/" className="link">
              Inicio
            </NavLink>
            <NavLink to="/pets" className="link">
              Pets
            </NavLink>
            <NavLink to="/products" className="link">
              Products
            </NavLink>
            <NavLink to="/registerM" className="link">
              Registro mascota
            </NavLink>
          </nav>

          {/* Botones para escritorio */}
          <div className="botones-escritorio">
            <a href="/register" className="boton-registro">
              Registrarse
            </a>
            <a href="/login" className="boton-login">Iniciar Sesión</a>
          </div>
        </div>

      </header>
    )
}