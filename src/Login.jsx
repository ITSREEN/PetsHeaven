// Librarys
import React from 'react'
import ReactDOM from 'react-dom/client'

// Imports
import '../public/styles/login.css'
import { LoginForm } from './Componentes/LoginForm'
import Footer from './Componentes/Footer'

// Create root 
const root = ReactDOM.createRoot(document.getElementById('root'))

// Render root
root.render(
  <React.StrictMode>
    <LoginForm />
    <Footer />
  </React.StrictMode>
)