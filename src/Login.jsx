import React from 'react'
import ReactDOM from 'react-dom/client'
import '../public/styles/login.css'
import LoginForm from './Componentes/LoginForm'
import Footer from './Componentes/Footer'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <LoginForm />
    <Footer />
  </React.StrictMode>
)