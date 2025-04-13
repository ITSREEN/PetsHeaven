// Librarys
import React, { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router"

// Imports
import { LoginForm } from "./Componentes/Formularios/LoginForm"
import Registro from "./Componentes/Formularios/Registro"
import RegistroMascota from "./Componentes/Formularios/FormularioMascotas"
import ForgotPassword from "./Componentes/Formularios/ForgotPassword"
import { HomeAdmin } from "./Componentes/InterfazAdmin/HomeAdmin"
import { GesUsuario } from "./Componentes/InterfazAdmin/GesUsuario"
import { Pets } from "./Componentes/InterfazUsuario/Pets"
import { NotFound } from "./Componentes/Errores/NotFound"
import { ErrorInternalServer } from "./Componentes/Errores/ErrorInternalServer"
import VeterinariaPage from "./Componentes/VeterinariaPage"

// Main Component
export default function App () {
  // Vars 
  const [authenticated,isAuthenticated] = useState(true)

  // Route types
  const PrivateRoute = ({ children }) => {
    return authenticated? children: window.location.href = "/main"
  }

  const AdminRoute = ({ children }) => {
    return isAdmin? children: window.location.href = "/main"
  }

  const MainRoute = () => {
    window.location.replace("/main")
  }

  return (
    // Define Routes
    <BrowserRouter>
      <Routes>
        {/* Private routes */}
        <Route path="user/pets" element={
          <PrivateRoute children={<Pets />}/>}>
        </Route>
        <Route path="user/pets/register" element={
          <PrivateRoute children={<RegistroMascota />} />} />
        <Route path="veterinario/pets" element={<Pets />} ></Route>

        {/* Admin routes  */}
        <Route path="admin/pets" element={
          <AdminRoute children={<Pets />} />}>
        </Route>
        <Route path="propietarios" element={
          <AdminRoute children={<HomeAdmin />} />}>  
        </Route>
        <Route path="gestion/usuarios" element={
          <AdminRoute children={<GesUsuario/>} />} >
        </Route>

        {/* Routes */}
        <Route path="/" element={<MainRoute />} />
        <Route path="main" element={<VeterinariaPage />} />
        <Route path="user/login" element={<LoginForm />} />
        <Route path="user/register" element={<Registro />} />
        <Route path="user/recuperar" element={<ForgotPassword />} />
        <Route path="internal" element={<ErrorInternalServer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
