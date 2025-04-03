import { Instagram, Facebook } from "lucide-react"
<<<<<<< HEAD:front-end/src/Componentes/Footer2.jsx
=======
import "../../../public/styles/footer.css"
>>>>>>> Violett:front-end/src/Componentes/Varios/Footer2.jsx
import React from "react"
import "../../public/styles/footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="contenedor-footer">
        <div className="logo-derechos">
          <img src="https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Logos/1.png" alt="PetsHeaven Logo" className="logo-footer" />
          <span className="texto-footer">© 2025 PetsHeaven. Todos los derechos reservados.</span>
        </div>
        <div className="enlaces-legales">
          <a href="#" className="enlace-footer">
            Política de Privacidad
          </a>
          <a href="#" className="enlace-footer">
            Términos de Servicio
          </a>
          <a href="#" className="enlace-footer">
            Cookies
          </a>
        </div>
      </div>
    </footer>
  )
}

