// Librarys
import React from "react"
import VeterinariaPage from "./Componentes/VeterinariaPage"
import { BrowserRouter, Routes, Route } from "react-router"
import { Header } from "./Componentes/Header"

// Imports
import { NavBar } from "./Componentes/NavBar"
import {LoginForm} from "./Componentes/LoginForm"
import { NotFound } from "./Componentes/NotFound"
import {Registro} from "./Componentes/FormularioRegistro"
import './App.css';

// Component 
export default function App () {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <NavBar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            {/* <Route path="/" element={<HomeView />} /> */}
            {/* <Route path="/about" element={<AboutView />} /> */}
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<Registro />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}