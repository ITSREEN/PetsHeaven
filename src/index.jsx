// Librarys
import React from 'react'
import ReactDOM from 'react-dom/client'

// Imports
import '../public/styles/index.css'
import { App } from './Componentes/App'
import Footer from './Componentes/Footer'

// Create root
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
    <Footer />
  </React.StrictMode>
)