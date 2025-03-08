// Librarys
import React from 'react'
import ReactDOM from 'react-dom/client'

// Imports
import '../public/styles/index.css'
import { App } from './Componentes/App'

// Create root
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)