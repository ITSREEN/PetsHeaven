import { useState, useEffect, useRef } from "react"
import React from "react"
import { MapPin, Star, ChevronUp, Menu, X, Phone, Mail, Clock } from "lucide-react"
import "../../public/styles/VeterinariaPage.css"

export default function VeterinariaPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentTestimonioSlide, setCurrentTestimonioSlide] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [testimoniosSlides, setTestimoniosSlides] = useState([])
  const navRef = useRef(null)

  // Hook personalizado para detectar cuando un elemento es visible en el viewport
  function useIntersectionObserver(options = {}) {
    const [isIntersecting, setIsIntersecting] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      }, options)

      if (ref.current) {
        observer.observe(ref.current)
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      }
    }, [ref, options])

    return [ref, isIntersecting]
  }

  // Referencias para animaciones de scroll
  const [aboutRef, aboutVisible] = useIntersectionObserver({ threshold: 0.2 })
  const [servicesRef, servicesVisible] = useIntersectionObserver({ threshold: 0.1 })
  const [testimoniosRef, testimoniosVisible] = useIntersectionObserver({ threshold: 0.1 })
  const [contactRef, contactVisible] = useIntersectionObserver({ threshold: 0.1 })

  const slides = [
    {
      image: "/placeholder.svg?height=500&width=1200",
      title: "Atendimento 24h",
      description:
        "Cuidamos de tus mascotas cuando más lo necesitan, con servicio veterinario disponible las 24 horas del día.",
    },
    {
      image: "/placeholder.svg?height=500&width=1200",
      title: "Médicos Especialistas",
      description:
        "Contamos con un equipo de veterinarios especializados para atender todas las necesidades de tu mascota.",
    },
    {
      image: "/placeholder.svg?height=500&width=1200",
      title: "Instalaciones Modernas",
      description:
        "Nuestras instalaciones están equipadas con la última tecnología para diagnósticos precisos y tratamientos efectivos.",
    },
  ]

  const servicios = [
    {
      title: "Consulta General",
      description: "Examen completo de salud para tu mascota con recomendaciones personalizadas.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Vacunación",
      description: "Programa completo de vacunación para prevenir enfermedades comunes.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Cirugía",
      description: "Procedimientos quirúrgicos realizados por especialistas con equipos de última generación.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Emergencias 24h",
      description: "Atención inmediata para situaciones urgentes a cualquier hora del día.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Spa y Baño",
      description: "Servicio completo de baño, corte de pelo, limpieza de oídos y corte de uñas para tu mascota.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const testimonios = [
    {
      nombre: "María García",
      texto:
        "Excelente atención para mi perrito Max. Los veterinarios son muy profesionales y cariñosos con las mascotas.",
      calificacion: 5,
      imagen: "/placeholder.svg?height=60&width=60",
    },
    {
      nombre: "Carlos Rodríguez",
      texto:
        "Mi gata recibió un tratamiento excepcional. El personal está muy bien capacitado y las instalaciones son impecables.",
      calificacion: 5,
      imagen: "/placeholder.svg?height=60&width=60",
    },
    {
      nombre: "Laura Martínez",
      texto:
        "Siempre confío en PetsHeaven para el cuidado de mis mascotas. El servicio de emergencia 24h nos salvó en más de una ocasión.",
      calificacion: 4,
      imagen: "/placeholder.svg?height=60&width=60",
    },
    {
      nombre: "Javier Sánchez",
      texto:
        "El servicio de spa para mi perro fue increíble. Quedó limpio, perfumado y muy feliz. Definitivamente volveremos.",
      calificacion: 5,
      imagen: "/placeholder.svg?height=60&width=60",
    },
    {
      nombre: "Ana Pérez",
      texto:
        "Llevé a mi conejo para una revisión y quedé impresionada con el conocimiento y cuidado del veterinario. Recomiendo totalmente.",
      calificacion: 5,
      imagen: "/placeholder.svg?height=60&width=60",
    },
    {
      nombre: "Roberto Gómez",
      texto:
        "Mi perro necesitaba una cirugía complicada y el equipo de PetsHeaven fue excepcional. Ahora está completamente recuperado.",
      calificacion: 5,
      imagen: "/placeholder.svg?height=60&width=60",
    },
  ]

  // Agrupar testimonios en grupos de 3 para pantallas grandes y 1 para móviles
  const getTestimoniosSlides = () => {
    const isMobile = window.innerWidth < 768
    const testimoniosPorSlide = isMobile ? 1 : 3
    const slides = []

    for (let i = 0; i < testimonios.length; i += testimoniosPorSlide) {
      slides.push(testimonios.slice(i, i + testimoniosPorSlide))
    }

    return slides
  }

  useEffect(() => {
    // Inicializar los slides
    setTestimoniosSlides(getTestimoniosSlides())

    // Actualizar los slides cuando cambie el tamaño de la ventana
    const handleResize = () => {
      setTestimoniosSlides(getTestimoniosSlides())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  useEffect(() => {
    if (testimoniosSlides.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonioSlide((prev) => (prev === testimoniosSlides.length - 1 ? 0 : prev + 1))
      }, 7000)
      return () => clearInterval(interval)
    }
  }, [testimoniosSlides.length])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

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
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
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

      {/* Carousel */}
      <section className="carousel">
        <div className="carousel-overlay"></div>
        {slides.map((slide, index) => (
          <div key={index} className={`carousel-slide ${index === currentSlide ? "active" : ""}`}>
            <img src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" />
          </div>
        ))}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`carousel-indicator ${index === currentSlide ? "active" : ""}`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="carousel-content container mx-auto px-4">
          <h1 className="carousel-title animate-fade-in">{slides[currentSlide].title}</h1>
          <p className="carousel-description animate-slide-up">{slides[currentSlide].description}</p>
          <button className="carousel-button animate-bounce-in">
            <MapPin className="mr-2 h-5 w-5" />
            Como Llegar
          </button>
        </div>
      </section>

      {/* About Us Section */}
      <section id="nosotros" className="about-section" ref={aboutRef}>
        <div className={`container mx-auto px-4 ${aboutVisible ? "animate-fade-in" : ""}`}>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className={`md:w-1/2 w-full ${aboutVisible ? "animate-slide-right" : ""}`}>
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="Veterinario con mascotas"
                width={400}
                height={400}
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
            <div className={`md:w-1/2 w-full ${aboutVisible ? "animate-slide-left" : ""}`}>
              <h2 className="section-title">Quienes somos</h2>
              <p className="section-text mb-4">
                En PetsHeaven, nos dedicamos a proporcionar atención veterinaria de la más alta calidad para tus
                mascotas. Nuestro equipo de veterinarios altamente capacitados y personal de apoyo está comprometido con
                el bienestar y la salud de tus compañeros peludos.
              </p>
              <p className="section-text mb-4">
                Fundada hace más de 10 años, nuestra clínica ha crecido para convertirse en un centro de referencia en
                medicina veterinaria, ofreciendo servicios integrales desde chequeos rutinarios hasta procedimientos
                quirúrgicos complejos.
              </p>
              <p className="section-text">
                Entendemos que tus mascotas son parte de tu familia, por eso nos esforzamos por brindar un ambiente
                acogedor y un trato personalizado para cada paciente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="services-section" ref={servicesRef}>
        <div className={`container mx-auto px-4 ${servicesVisible ? "animate-fade-in" : ""}`}>
          <h2 className="section-title text-center mb-12">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
            {servicios.map((servicio, index) => (
              <div
                key={index}
                className={`service-card ${servicesVisible ? `animate-pop-in animation-delay-${index}` : ""}`}
              >
                <div className="relative h-48">
                  <img
                    src={servicio.image || "/placeholder.svg"}
                    alt={servicio.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="service-title">{servicio.title}</h3>
                  <p className="service-description">{servicio.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonios" className="testimonials-section" ref={testimoniosRef}>
        <div className={`container mx-auto px-4 ${testimoniosVisible ? "animate-fade-in" : ""}`}>
          <h2 className="section-title text-center mb-12">Testimonios</h2>

          <div className="testimonios-carousel relative">
            {testimoniosSlides.map((grupo, index) => (
              <div
                key={index}
                className={`testimonios-slide transition-opacity duration-500 ${index === currentTestimonioSlide ? "opacity-100" : "opacity-0 absolute inset-0"}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                  {grupo.map((testimonio, testimonioIndex) => (
                    <div
                      key={testimonioIndex}
                      className={`testimonial-card ${testimoniosVisible ? `animate-float animation-delay-${testimonioIndex}` : ""}`}
                    >
                      <div className="flex items-center mb-4">
                        <img
                          src={testimonio.imagen || "/placeholder.svg"}
                          alt={testimonio.nombre}
                          width={60}
                          height={60}
                          className="rounded-full mr-4"
                        />
                        <div>
                          <h3 className="font-semibold">{testimonio.nombre}</h3>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < testimonio.calificacion ? "star-active" : "star-inactive"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="testimonial-text">"{testimonio.texto}"</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="testimonios-indicators flex justify-center mt-8 gap-2">
              {testimoniosSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonioSlide(index)}
                  className={`testimonios-indicator ${index === currentTestimonioSlide ? "active" : ""}`}
                  aria-label={`Ir al grupo de testimonios ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="contact-section" ref={contactRef}>
        <div className={`container mx-auto px-4 ${contactVisible ? "animate-fade-in" : ""}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className={contactVisible ? "animate-slide-right" : ""}>
              <h2 className="contact-title">Contáctanos</h2>
              <p className="contact-description">
                Estamos aquí para responder tus preguntas y proporcionar la mejor atención para tus mascotas
              </p>
              <div className="contact-info">
                <div className="contact-item animate-on-hover">
                  <MapPin className="h-5 w-5" />
                  <span>Transversal 45 #3-54</span>
                </div>
                <div className="contact-item animate-on-hover">
                  <Phone className="h-5 w-5" />
                  <span>322 452 3961</span>
                </div>
                <div className="contact-item animate-on-hover">
                  <Mail className="h-5 w-5" />
                  <span>petsheaven@gmail.com</span>
                </div>
                <div className="contact-item animate-on-hover">
                  <Clock className="h-5 w-5" />
                  <div>
                    <div>Lunes - Viernes: 8am - 8pm</div>
                    <div>Sábados: 8am - 5pm</div>
                    <div>Domingos: Cerrado</div>
                  </div>
                </div>
              </div>
              <div className="contact-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.9728971442!2d-74.07800742426815!3d4.598916042707592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99a7eccfe58f%3A0x9620f171953c6c95!2sTransversal%2045%2C%20Bogot%C3%A1%2C%20Colombia!5e0!3m2!1ses!2sco!4v1710798850813!5m2!1ses!2sco"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de PetsHeaven"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            <div className={contactVisible ? "animate-slide-left" : ""}>
              <div className="appointment-card">
                <h3 className="appointment-title">Agendar una Cita</h3>
                <p className="appointment-description">
                  Completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible
                </p>
                <form>
                  <div className="form-row flex-col sm:flex-row">
                    <div className="form-group">
                      <label htmlFor="nombre" className="form-label">
                        Nombre
                      </label>
                      <input type="text" id="nombre" className="form-input" placeholder="Ingresa tu nombre" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="apellido" className="form-label">
                        Apellido
                      </label>
                      <input type="text" id="apellido" className="form-input" placeholder="Ingresa tu apellido" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Correo Electrónico
                    </label>
                    <input type="email" id="email" className="form-input" placeholder="Ingresa tu correo electrónico" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="telefono" className="form-label">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      className="form-input"
                      placeholder="Ingresa tu número de teléfono"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="tipo-mascota" className="form-label">
                      Tipo de Mascota
                    </label>
                    <select id="tipo-mascota" className="form-select">
                      <option value="perro">Perro</option>
                      <option value="gato">Gato</option>
                      <option value="ave">Ave</option>
                      <option value="roedor">Roedor</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="mensaje" className="form-label">
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      className="form-textarea"
                      placeholder="Cuéntanos sobre tu mascota y el motivo de tu visita"
                    ></textarea>
                  </div>
                  <button type="submit" className="appointment-button animate-pulse-on-hover">
                    Agendar Cita
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <div className="simple-footer bg-white">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src="/placeholder.svg?height=30&width=30"
              alt="PetsHeaven Logo"
              width={30}
              height={30}
              className="mr-2"
            />
            <span className="text-gray-600">
              © {new Date().getFullYear()} PetsHeaven. Todos los derechos reservados.
            </span>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Política de Privacidad
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Términos de Servicio
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button onClick={scrollToTop} className="scroll-top-button animate-bounce-slow" aria-label="Volver arriba">
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  ) 
}