// Librarys
import React from "react"
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
  return (
    // Define Routes
    <BrowserRouter>
      <Routes>
        <Route path="main" element={<VeterinariaPage />} />
        <Route path="user/login" element={<LoginForm />} />
        <Route path="user/register" element={<Registro />} />
        <Route path="user/recuperar" element={<ForgotPassword />} />
        <Route path="user/pets" element={<Pets />} ></Route>
        <Route path="user/pets/register" element={<RegistroMascota />} />
        <Route path="veterinario/pets" element={<Pets />} ></Route>
        <Route path="admin/pets" element={<Pets />} ></Route>
        <Route path="propietarios" element={<HomeAdmin />} ></Route>
        <Route path="gestion/usuarios" element={<GesUsuario/>} ></Route>
        <Route path="/internal" element={<ErrorInternalServer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
