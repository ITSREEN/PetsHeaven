// Librarys
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router"

// Imports
import { NavBar } from "./Componentes/NavBar"
import {LoginForm} from "./Componentes/LoginForm"
import { NotFound } from "./Componentes/NotFound"
import Registro from "./Componentes/Registro"
import VeterinariaPage from "./Componentes/VeterinariaPage"
import RegistroMascota from "./Componentes/FormularioMascotas"
import { Header } from "./Componentes/Header"
import ForgotPassword from "./Componentes/ForgotPassword"

// Component 
export default function App () {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<VeterinariaPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Registro />} />
<<<<<<< HEAD
        <Route path="/registerM" element={<RegistroMascota />} />
=======
        <Route path="/recuperar" element={<ForgotPassword />} />
>>>>>>> 7414b7ac8c7fabdef313a4f6bdcedd80e5e2de52
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
