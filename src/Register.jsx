import React from "react"
import ReactDOM from 'react-dom/client'
import FormularioRegistro from "./Componentes/FormularioRegistro"
import "../public/styles/formulario-registro.css"

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <FormularioRegistro />
    </React.StrictMode>
)