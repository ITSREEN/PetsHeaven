// Librarys
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router"

// Imports
import { NavBar } from "./Componentes/NavBar"
import {LoginForm} from "./Componentes/LoginForm"
import { NotFound } from "./Componentes/NotFound"
import { FormularioRegistro } from "./Componentes/FormularioRegistro"
import VeterinariaPage from "./Componentes/VeterinariaPage"

// Component 
export default function App () {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<VeterinariaPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<FormularioRegistro />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}