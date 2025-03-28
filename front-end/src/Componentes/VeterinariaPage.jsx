import React,{ useState, useEffect, useRef } from "react"
import { MapPin, Star, Phone, Mail, Clock, ChevronUp, Menu, X, Instagram, Facebook } from "lucide-react"
import "../../public/styles/VeterinariaPage.css"


export default function VeterinariaPage() {
  // Estados para los diferentes componentes
  const [diaActual, setDiaActual] = useState(0)
  const [testActual, setTestActual] = useState(0)
  const [mostrarBoton, setMostrarBoton] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [gruposTest, setGruposTest] = useState([])
  const refNav = useRef(null)

  // Datos para el carrusel principal
  const diapositivas = [
    {
      imagen: "/imgs/carru1.png",
      titulo: "",
      descripcion: "",
    },
    {
      imagen: "/imgs/carru2.png",
      titulo: "",
      descripcion: "",
    },
    {
      imagen: "/imgs/carru3.png",
      titulo: "",
      descripcion: "",
    },
  ]

  // Datos para la sección de servicios
  const servicios = [
    {
      titulo: "Consulta General",
      descripcion: "Examen completo de salud para tu mascota con recomendaciones personalizadas.",
      imagen: "/imgs/consulta.png",
    },
    {
      titulo: "Vacunación",
      descripcion: "Programa completo de vacunación para prevenir enfermedades comunes.",
      imagen: "/imgs/vacunacion.png",
    },
    {
      titulo: "Cirugía",
      descripcion: "Procedimientos quirúrgicos realizados por especialistas con equipos de última generación.",
      imagen: "/imgs/cirugia.png",
    },
    {
      titulo: "Emergencias 24h",
      descripcion: "Atención inmediata para situaciones urgentes a cualquier hora del día.",
      imagen: "/imgs/urgencias.png",
    },
    {
      titulo: "Spa y Baño",
      descripcion: "Servicio completo de baño, corte de pelo, limpieza de oídos y corte de uñas para tu mascota.",
      imagen: "/imgs/baño.png",
    },
  ]

  // Datos para la sección de promociones
  const promociones = [
    {
      titulo: "Servicio de Profilaxis",
      descripcion:
        "Cuidado dental profesional para tu mascota. Agenda tu cita y mantén la salud bucal de tu compañero.",
      imagen: "/imgs/pos1.png",
      fechaVencimiento: "Permanente",
    },
    {
      titulo: "Jornada de Esterilización",
      descripcion: "Precios especiales para esterilización de perros y gatos. Incluye exámenes previos.",
      imagen: "/imgs/pos2.png",
      fechaVencimiento: "16 de Noviembre",
    },
    {
      titulo: "Jornada de Adopción",
      descripcion: "Ven y adopta un amigo para toda la vida. Te esperamos en nuestra sede principal.",
      imagen: "/imgs/pos3.png",
      fechaVencimiento: "10 de agosto de 2025",
    },
  ]

  // Datos para la sección de testimonios
  const testimonios = [
    {
      nombre: "María García",
      texto:
        "Excelente atención para mi perrito Max. Los veterinarios son muy profesionales y cariñosos con las mascotas.",
      calificacion: 5,
      imagen: "/imgs/perfil2.png",
    },
    {
      nombre: "Carlos Rodríguez",
      texto:
        "Mi gata recibió un tratamiento excepcional. El personal está muy bien capacitado y las instalaciones son impecables.",
      calificacion: 5,
      imagen: "/imgs/perfil3.png",
    },
    {
      nombre: "Laura Martínez",
      texto:
        "Siempre confío en PetsHeaven para el cuidado de mis mascotas. El servicio de emergencia 24h nos salvó en más de una ocasión.",
      calificacion: 4,
      imagen: "/imgs/perfil4.png",
    },
    {
      nombre: "Javier Sánchez",
      texto:
        "El servicio de spa para mi perro fue increíble. Quedó limpio, perfumado y muy feliz. Definitivamente volveremos.",
      calificacion: 5,
      imagen: "/imgs/perfil1.png",
    },
    {
      nombre: "Ana Pérez",
      texto:
        "Llevé a mi conejo para una revisión y quedé impresionada con el conocimiento y cuidado del veterinario. Recomiendo totalmente.",
      calificacion: 5,
      imagen: "/imgs/perfil5.png",
    },
    {
      nombre: "Roberto Gómez",
      texto:
        "Mi perro necesitaba una cirugía complicada y el equipo de PetsHeaven fue excepcional. Ahora está completamente recuperado.",
      calificacion: 5,
      imagen: "/imgs/perfil6.png",
    },
  ]

  // Función para agrupar testimonios en diapositivas
  const agruparTest = () => {
    if (typeof window === "undefined") return []

    const esMovil = window.innerWidth < 768
    const testPorGrupo = esMovil ? 1 : 3
    const grupos = []

    for (let i = 0; i < testimonios.length; i += testPorGrupo) {
      grupos.push(testimonios.slice(i, i + testPorGrupo))
    }

    return grupos
  }

  // Efecto para inicializar y actualizar los grupos de testimonios
  useEffect(() => {
    setGruposTest(agruparTest())

    const cambiarTamaño = () => {
      setGruposTest(agruparTest())
    }

    window.addEventListener("resize", cambiarTamaño)
    return () => window.removeEventListener("resize", cambiarTamaño)
  }, [])

  // Efecto para el carrusel principal
  useEffect(() => {
    const intervalo = setInterval(() => {
      setDiaActual((anterior) => (anterior === diapositivas.length - 1 ? 0 : anterior + 1))
    }, 5000)
    return () => clearInterval(intervalo)
  }, [diapositivas.length])

  // Efecto para el carrusel de testimonios
  useEffect(() => {
    if (gruposTest.length > 0) {
      const intervalo = setInterval(() => {
        setTestActual((anterior) => (anterior === gruposTest.length - 1 ? 0 : anterior + 1))
      }, 7000)
      return () => clearInterval(intervalo)
    }
  }, [gruposTest.length])

  // Efecto para mostrar/ocultar el botón de scroll
  useEffect(() => {
    const manejarScroll = () => {
      if (window.scrollY > 300) {
        setMostrarBoton(true)
      } else {
        setMostrarBoton(false)
      }
    }

    window.addEventListener("scroll", manejarScroll)
    return () => window.removeEventListener("scroll", manejarScroll)
  }, [])

  // Función para scroll al inicio
  const subirInicio = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Función para manejar el scroll a secciones
  const irASeccion = (e, id) => {
    e.preventDefault()
    setMenuAbierto(false)

    if (!id) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      return
    }

    const elemento = document.getElementById(id)
    if (elemento) {
      const alturaNav = refNav.current?.offsetHeight || 0
      const posicion = elemento.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: posicion - alturaNav,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="pagina">
      {/* COMPONENTE: Header/Nav */}
      <header className="encabezado" ref={refNav}>
        <div className="contenedor-header">
          <div className="logo-container">
            <img src="/imgs/2.png" alt="PetsHeaven Logo" width={50} height={50} className="logo-img" />
            <span className="texto-logo">PetsHeaven</span>
          </div>

          {/* Navegación Escritorio */}
          <nav className="nav-escritorio">
            <a href="/" className="enlace-nav" onClick={(e) => irASeccion(e, "")}>
              Inicio
            </a>
            <a href="#nosotros" className="enlace-nav" onClick={(e) => irASeccion(e, "nosotros")}>
              Nosotros
            </a>
            <a href="#servicios" className="enlace-nav" onClick={(e) => irASeccion(e, "servicios")}>
              Servicios
            </a>
            <a href="#promociones" className="enlace-nav" onClick={(e) => irASeccion(e, "promociones")}>
              Promociones
            </a>
            <a href="#testimonios" className="enlace-nav" onClick={(e) => irASeccion(e, "testimonios")}>
              Testimonios
            </a>
            <a href="#contacto" className="enlace-nav" onClick={(e) => irASeccion(e, "contacto")}>
              Contáctanos
            </a>
          </nav>

          {/* Botón Menú Móvil */}
          <div className="contenedor-boton-menu">
            <button
              className="boton-menu"
              onClick={() => setMenuAbierto(!menuAbierto)}
              aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            >
              {menuAbierto ? <X className="icono-menu" /> : <Menu className="icono-menu" />}
            </button>
          </div>

          {/* Botones para escritorio */}
          <div className="botones-escritorio">
            <a href="/register" className="boton-registro">
              Registrarse
            </a>
            <a href="/login" className="boton-login">Iniciar Sesión</a>
          </div>
        </div>

        {/* Navegación Móvil */}
        <div className={`menu-movil ${menuAbierto ? "activo" : ""}`}>
          <nav className="nav-movil">
            <a href="#" className="enlace-nav-movil" onClick={(e) => irASeccion(e, "")}>
              Inicio
            </a>
            <a href="#nosotros" className="enlace-nav-movil" onClick={(e) => irASeccion(e, "nosotros")}>
              Nosotros
            </a>
            <a href="#servicios" className="enlace-nav-movil" onClick={(e) => irASeccion(e, "servicios")}>
              Servicios
            </a>
            <a href="#promociones" className="enlace-nav-movil" onClick={(e) => irASeccion(e, "promociones")}>
              Promociones
            </a>
            <a href="#testimonios" className="enlace-nav-movil" onClick={(e) => irASeccion(e, "testimonios")}>
              Testimonios
            </a>
            <a href="#contacto" className="enlace-nav-movil" onClick={(e) => irASeccion(e, "contacto")}>
              Contáctanos
            </a>
            {/* Botones para móvil */}
            <div className="botones-movil">
              <a href="/registro" className="boton-registro-movil">
                Registrarse
              </a>
              <button className="boton-login-movil">Iniciar Sesión</button>
            </div>
          </nav>
        </div>
      </header>

      {/* COMPONENTE: Carrusel */}
      <section className="carrusel">
        {diapositivas.map((dia, indice) => (
          <div key={indice} className={`dia-carrusel ${indice === diaActual ? "activo" : ""}`}>
            <img src={dia.imagen || "/placeholder.svg"} alt="Imagen de carrusel" className="imagen-carrusel" />
          </div>
        ))}
        <div className="indicadores">
          {diapositivas.map((_, indice) => (
            <button
              key={indice}
              onClick={() => setDiaActual(indice)}
              className={`indicador ${indice === diaActual ? "activo" : ""}`}
              aria-label={`Ir a diapositiva ${indice + 1}`}
            />
          ))}
        </div>
      </section>

      {/* COMPONENTE: Sobre Nosotros */}
      <section id="nosotros" className="seccion-nosotros">
        <div className="contenedor">
          <div className="contenedor-nosotros">
            <div className="imagen-nosotros">
              <img src="/imgs/quienes-somos.png" alt="Veterinarios con mascota" className="img-nosotros" />
            </div>
            <div className="texto-nosotros">
              <h2 className="titulo-seccion">Quienes somos</h2>
              <p className="texto-seccion mb-4">
                En PetsHeaven, nos dedicamos a proporcionar atención veterinaria de la más alta calidad para tus
                mascotas. Nuestro equipo de veterinarios altamente capacitados y personal de apoyo está comprometido con
                el bienestar y la salud de tus compañeros peludos.
              </p>
              <p className="texto-seccion mb-4">
                Fundada hace más de 10 años, nuestra clínica ha crecido para convertirse en un centro de referencia en
                medicina veterinaria, ofreciendo servicios integrales desde chequeos rutinarios hasta procedimientos
                quirúrgicos complejos.
              </p>
              <p className="texto-seccion">
                Entendemos que tus mascotas son parte de tu familia, por eso nos esforzamos por brindar un ambiente
                acogedor y un trato personalizado para cada paciente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPONENTE: Servicios */}
      <section id="servicios" className="seccion-servicios">
        <div className="contenedor">
          <h2 className="titulo-seccion titulo-centrado">Nuestros Servicios</h2>
          <div className="grid-servicios">
            {servicios.map((servicio, indice) => (
              <div key={indice} className="tarjeta-servicio">
                <div className="imagen-servicio">
                  <img src={servicio.imagen || "/placeholder.svg"} alt={servicio.titulo} className="img-servicio" />
                </div>
                <div className="contenido-servicio">
                  <h3 className="titulo-servicio">{servicio.titulo}</h3>
                  <p className="descripcion-servicio">{servicio.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPONENTE: Promociones (SECCIÓN ESTÁTICA) */}
      <section id="promociones" className="seccion-promociones">
        <div className="contenedor">
          <h2 className="titulo-seccion titulo-centrado">Promociones Especiales</h2>

          <div className="grid-promociones">
            {promociones.map((promocion, indice) => (
              <div key={indice} className="tarjeta-promocion">
                <div className="imagen-promocion">
                  <img src={promocion.imagen || "/placeholder.svg"} alt={promocion.titulo} className="img-promocion" />
                  <div className="etiqueta-fecha">Válido hasta: {promocion.fechaVencimiento}</div>
                </div>
                <div className="contenido-promocion">
                  <h3 className="titulo-promocion">{promocion.titulo}</h3>
                  <p className="descripcion-promocion">{promocion.descripcion}</p>
                  <button className="boton-promocion">Aprovechar oferta</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPONENTE: Testimonios */}
      <section id="testimonios" className="seccion-test">
        <div className="contenedor">
          <h2 className="titulo-seccion titulo-centrado">Testimonios</h2>

          <div className="carrusel-test">
            {gruposTest.map((grupo, indice) => (
              <div key={indice} className={`slide-test ${indice === testActual ? "activo" : "inactivo"}`}>
                <div className="grid-test">
                  {grupo.map((test, idxTest) => (
                    <div key={idxTest} className="tarjeta-test">
                      <div className="cabecera-test">
                        <img src={test.imagen || "/placeholder.svg"} alt={test.nombre} className="foto-perfil" />
                        <div className="info-test">
                          <h3 className="nombre-test">{test.nombre}</h3>
                          <div className="estrellas">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`estrella ${i < test.calificacion ? "activa" : "inactiva"}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="texto-test">"{test.texto}"</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="indicadores-test">
              {gruposTest.map((_, indice) => (
                <button
                  key={indice}
                  onClick={() => setTestActual(indice)}
                  className={`indicador-test ${indice === testActual ? "activo" : ""}`}
                  aria-label={`Ir al grupo de testimonios ${indice + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPONENTE: Contacto */}
      <section id="contacto" className="seccion-contacto">
        <div className="contenedor">
          <div className="grid-contacto">
            <div className="columna-info">
              <h2 className="titulo-contacto">Contáctanos</h2>
              <p className="descripcion-contacto">
                Estamos aquí para responder tus preguntas y proporcionar la mejor atención para tus mascotas
              </p>
              <div className="info-contacto">
                <div className="item-contacto">
                  <MapPin className="icono-contacto" />
                  <span>Transversal 45 #3-54</span>
                </div>
                <div className="item-contacto">
                  <Phone className="icono-contacto" />
                  <span>322 452 3961</span>
                </div>
                <div className="item-contacto">
                  <Mail className="icono-contacto" />
                  <span>petsheaven@gmail.com</span>
                </div>
                <div className="item-contacto">
                  <Clock className="icono-contacto" />
                  <div className="horarios">
                    <div>Lunes - Viernes: 8am - 8pm</div>
                    <div>Sábados: 8am - 5pm</div>
                    <div>Domingos: Cerrado</div>
                  </div>
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="redes-sociales">
                <h3 className="titulo-redes">Síguenos en redes sociales</h3>
                <div className="iconos-redes">
                  <a
                    href="https://www.instagram.com/petsheaven"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="enlace-red"
                    aria-label="Instagram"
                  >
                    <Instagram className="icono-red" />
                  </a>
                  <a
                    href="https://www.facebook.com/petsheaven"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="enlace-red"
                    aria-label="Facebook"
                  >
                    <Facebook className="icono-red" />
                  </a>
                  <a
                    href="https://wa.me/573224523961"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="enlace-red"
                    aria-label="WhatsApp"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icono-red"
                    >
                      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                      <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                      <path d="M9.5 13.5c.5 1.5 2.5 2 4 1" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="mapa-contacto">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.9728971442!2d-74.07800742426815!3d4.598916042707592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99a7eccfe58f%3A0x9620f171953c6c95!2sTransversal%2045%2C%20Bogot%C3%A1%2C%20Colombia!5e0!3m2!1ses!2sco!4v1710798850813!5m2!1ses!2sco"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de PetsHeaven"
                  className="iframe-mapa"
                ></iframe>
              </div>
            </div>
            <div className="columna-formulario">
              <div className="tarjeta-cita">
                <h3 className="titulo-cita">Agendar una Cita</h3>
                <p className="descripcion-cita">
                  Completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible
                </p>
                <form className="formulario-cita">
                  <div className="fila-formulario">
                    <div className="grupo-formulario">
                      <label htmlFor="nombre" className="etiqueta-formulario">
                        Nombre
                      </label>
                      <input type="text" id="nombre" className="campo-formulario" placeholder="Ingresa tu nombre" />
                    </div>
                    <div className="grupo-formulario">
                      <label htmlFor="apellido" className="etiqueta-formulario">
                        Apellido
                      </label>
                      <input type="text" id="apellido" className="campo-formulario" placeholder="Ingresa tu apellido" />
                    </div>
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="email" className="etiqueta-formulario">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="campo-formulario"
                      placeholder="Ingresa tu correo electrónico"
                    />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="telefono" className="etiqueta-formulario">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      className="campo-formulario"
                      placeholder="Ingresa tu número de teléfono"
                    />
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="tipo-mascota" className="etiqueta-formulario">
                      Tipo de Mascota
                    </label>
                    <select id="tipo-mascota" className="selector-formulario">
                      <option value="perro">Perro</option>
                      <option value="gato">Gato</option>
                      <option value="ave">Ave</option>
                      <option value="roedor">Roedor</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div className="grupo-formulario">
                    <label htmlFor="mensaje" className="etiqueta-formulario">
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      className="area-texto-formulario"
                      placeholder="Cuéntanos sobre tu mascota y el motivo de tu visita"
                    ></textarea>
                  </div>
                  <button type="submit" className="boton-cita">
                    Agendar Cita
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Botón para subir */}
      {mostrarBoton && (
        <button onClick={subirInicio} className="boton-subir" aria-label="Volver arriba">
          <ChevronUp className="icono-subir" />
        </button>
      )}
    </div>
  )
}

