// Librarys
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router"

// Imports
import { Header } from "./Componentes/Header"
import { NavBar } from "./Componentes/NavBar"
import {LoginForm} from "./Componentes/LoginForm"
import { NotFound } from "./Componentes/NotFound"
import {Registro} from "./Componentes/FormularioRegistro"
import VeterinariaPage from "./Componentes/VeterinariaPage"

// Component 
export default function App () {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<VeterinariaPage />} />
        <Route path="login" element={<LoginForm />} />
        {/* <Route path="/" element={<HomeView />} /> */}
        {/* <Route path="/about" element={<AboutView />} /> */}
        <Route path="register" element={<Registro />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}