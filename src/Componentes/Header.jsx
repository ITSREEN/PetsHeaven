import React from "react"

export const Header = () => {
    const handleNavLinkClick = (e, id) => {
        e.preventDefault()
        setMobileMenuOpen(false)
        const element = document.getElementById(id)
        if (element) {
          const headerHeight = navRef.current?.offsetHeight || 0
          const elementPosition = element.getBoundingClientRect().top + window.scrollY
          window.scrollTo({
            top: elementPosition - headerHeight,
            behavior: "smooth",
          })
        }
    }

    return (
        <header className="header" ref={navRef}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/placeholder.svg?height=50&width=50"
              alt="PetsHeaven Logo"
              width={50}
              height={50}
              className="mr-2 animate-pulse-slow"
            />
            <span className="logo-text">PetsHeaven</span>
          </div> 

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="nav-link" onClick={(e) => handleNavLinkClick(e, "")}>
              Home
            </a>
            <a href="#nosotros" className="nav-link" onClick={(e) => handleNavLinkClick(e, "nosotros")}>
              Nosotros
            </a>
            <a href="#servicios" className="nav-link" onClick={(e) => handleNavLinkClick(e, "servicios")}>
              Servicios
            </a>
            <a href="#testimonios" className="nav-link" onClick={(e) => handleNavLinkClick(e, "testimonios")}>
              Testimonios
            </a>
            <a href="#contacto" className="nav-link" onClick={(e) => handleNavLinkClick(e, "contacto")}>
              Contáctanos
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-gray-800" /> : <Menu className="h-6 w-6 text-gray-800" />}
            </button>
          </div>

          {/* Botones de login en la navegación de escritorio */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="register-button">Registrarse</button>
            <button className="login-button">Iniciar Sesión</button>
          </div>
        </div> 

        {/* Mobile Navigation */}
         <div className={`mobile-menu md:hidden ${mobileMenuOpen ? "active" : ""}`}>
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#" className="mobile-nav-link" onClick={(e) => handleNavLinkClick(e, "")}>
              Home
            </a>
            <a href="#nosotros" className="mobile-nav-link" onClick={(e) => handleNavLinkClick(e, "nosotros")}>
              Nosotros
            </a>
            <a href="#servicios" className="mobile-nav-link" onClick={(e) => handleNavLinkClick(e, "servicios")}>
              Servicios
            </a>
            <a href="#testimonios" className="mobile-nav-link" onClick={(e) => handleNavLinkClick(e, "testimonios")}>
              Testimonios
            </a>
            <a href="#contacto" className="mobile-nav-link" onClick={(e) => handleNavLinkClick(e, "contacto")}>
              Contáctanos
            </a>
            {/* Botones de login en la navegación móvil */}
            <div className="flex flex-col space-y-2">
              <button className="register-button-mobile">Registrarse</button>
              <button className="login-button-mobile">Iniciar Sesión</button>
            </div>
          </nav>
        </div> 
      </header>
    )
}