import React from 'react'
import ReactDOM from 'react-dom/client'
import '../public/styles/login.css'
import LoginForm from './Componentes/Login'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <LoginForm />
  </React.StrictMode>
)