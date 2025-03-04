import React from "react"
import ReactDOM from 'react-dom/client'
import FormularioRegistro from "./Componentes/FormularioRegistro.jsx"
import Footer from "./Componentes/Footer.jsx"

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <FormularioRegistro></FormularioRegistro>
        <Footer></Footer>
    </React.StrictMode>
)