// Librarys
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router"

// Imports
import { NavBar } from "./Componentes/NavBar"
import {LoginForm} from "./Componentes/LoginForm"
import { NotFound } from "./Componentes/NotFound"
import Registro from "./Componentes/Registro"
import VeterinariaPage from "./Componentes/VeterinariaPage"
import { Header } from "./Componentes/Header"

// Component 
export default function App () {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<VeterinariaPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Registro />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </BrowserRouter>
  )
}
