import Link from "next/link"
import { Instagram, Facebook } from "lucide-react"
import "../../public/styles/footer.css"

export default function Footer() {
  return (
    <footer className="pie-pagina fondo-blanco">
      <div className="contenedor mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img src="/img/2.png" alt="PetsHeaven Logo" width={30} height={30} className="mr-2" />
          <span className="texto-gris">© 2025 PetsHeaven. Todos los derechos reservados.</span>
        </div>

        {/* Redes Sociales en el Footer */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a
            href="https://www.instagram.com/petsheaven"
            target="_blank"
            rel="noopener noreferrer"
            className="text-azul-turquesa hover:text-verde-aguamarina transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://www.facebook.com/petsheaven"
            target="_blank"
            rel="noopener noreferrer"
            className="text-azul-turquesa hover:text-verde-aguamarina transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="https://wa.me/573224523961"
            target="_blank"
            rel="noopener noreferrer"
            className="text-azul-turquesa hover:text-verde-aguamarina transition-colors"
            aria-label="WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
              <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
              <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
              <path d="M9.5 13.5c.5 1.5 2.5 2 4 1" />
            </svg>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
          <Link href="#" className="enlace-pie">
            Política de Privacidad
          </Link>
          <Link href="#" className="enlace-pie">
            Términos de Servicio
          </Link>
          <Link href="#" className="enlace-pie">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  )
}

