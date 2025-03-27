import { NavLink } from "react-router"
import React from "react"

import '../../public/styles/nav.css'

export const NavBar = () => {
  return (
    <nav className="nav-container">
      <NavLink className="link" to='register'>Registro</NavLink>
      <NavLink className="link" to='login'>Login</NavLink>
      <NavLink className="link" to='/'>Home</NavLink>
      <NavLink className="link" to='pets'>Pets</NavLink>
      <NavLink className="link" to='registerM'>Register pets</NavLink>
    </nav>
  )
}