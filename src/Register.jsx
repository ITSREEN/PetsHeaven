// Librarys
import React from "react"
import ReactDOM from 'react-dom/client'

// Imports
import FormularioRegistro from "./Componentes/FormularioRegistro.jsx"
import Footer from "./Componentes/Footer.jsx"
import "../public/styles/formulario-registro.css"

// Create root
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <FormularioRegistro></FormularioRegistro>
        <Footer></Footer>
    </React.StrictMode>
)