// Librarys
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router"

// Imports
import { NavBar } from "./Componentes/BarrasNavegacion/NavBar"
import {LoginForm} from "./Componentes/Formularios/LoginForm"
import { NotFound } from "./Componentes/Errores/NotFound"
import Registro from "./Componentes/Formularios/Registro"
import VeterinariaPage from "./Componentes/VeterinariaPage"
import RegistroMascota from "./Componentes/Formularios/FormularioMascotas"
import ForgotPassword from "./Componentes/Formularios/ForgotPassword"
import { Loader } from "./Componentes/Errores/Loader"


// Component 
export default function App () {
  return (
    <BrowserRouter>
      <Loader></Loader>
      <Routes>
        <Route path="/" element={<VeterinariaPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/registerM" element={<RegistroMascota />} />
        <Route path="/recuperar" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
