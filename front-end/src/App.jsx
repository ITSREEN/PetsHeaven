// Librarys
import React from "react"
import { BrowserRouter, Routes, Route,Navigate } from "react-router"

// Imports
import { LoginForm } from "./Componentes/Formularios/LoginForm"
import Registro from "./Componentes/Formularios/Registro"
import { FormularioRegMascota } from "./Componentes/Formularios/FormularioMascotas"
import ForgotPassword from "./Componentes/Formularios/ForgotPassword"
import { HomeAdmin } from "./Componentes/InterfazAdmin/HomeAdmin"
import { GesUsuario } from "./Componentes/InterfazAdmin/GesUsuario"
import { GesPropietario } from "./Componentes/InterfazAdmin/GesPropietario"
import { GesMascota } from "./Componentes/InterfazAdmin/GesMascota"
import { Pets } from "./Componentes/InterfazUsuario/Pets"
import { NotFound } from "./Componentes/Errores/NotFound"
import { ErrorInternalServer } from "./Componentes/Errores/ErrorInternalServer"
import { getRoles } from './Componentes/Varios/Util'
import VeterinariaPage from "./Componentes/VeterinariaPage"
// import { RegistroUsu } from "./Componentes/InterfazAdmin/FormulariosAdmin/RegistroUsu"

// Main Component
export default function App () {
  // Vars 
  const token = localStorage.getItem('token');

  // Route types
  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/user/login" />
  }

  const AdminRoute = ({ children }) => {
    // Vars
    if (token) {
      const roles = getRoles(token)
      return roles.includes('Administrador')? children :<Navigate to="/user/login" />
    }

    return <Navigate to="/user/login" />
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
          <PrivateRoute children={<Pets token={token} />}/>}>
        </Route>
        <Route path="user/pets/register" element={
          <PrivateRoute children={<FormularioRegMascota />} />} />

        {/* Admin routes  */}
        <Route path="consultorio" element={
          <AdminRoute children={<HomeAdmin />} />}>  
        </Route>
        <Route path="gestion/usuarios" element={
          <AdminRoute children={<GesUsuario/>} />} >
        </Route>
        <Route path="gestion/propietarios" element={
          <AdminRoute children={<GesPropietario/>} />} >
        </Route>
        <Route path="gestion/mascotas" element={
          <AdminRoute children={<GesMascota/>} />} >
        </Route>
        {/* <Route path="usuario/registro" element={
          <AdminRoute children={<RegistroUsu/>} />} >
        </Route> */}


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
