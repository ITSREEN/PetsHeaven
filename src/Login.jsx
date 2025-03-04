import React from 'react'
import ReactDOM from 'react-dom/client'
import '../public/styles/'
import LoginForm from './Componentes/Login.component'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <LoginForm />
  </React.StrictMode>
)