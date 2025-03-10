// Importaciones necesarias
import React from "react"
import { useState, useEffect } from "react" // Hooks de React para manejar estado y efectos secundarios
import { useForm } from "react-hook-form" // Librería para manejar formularios con validación
import "../../public/styles/formulario-registro.css"
import "boxicons"

const FormularioRegistro = () => {
  // Estados para controlar la navegación entre pasos del formulario
  const [paso, setPaso] = useState(1) // Estado para controlar en qué paso del formulario estamos (1 o 2)

  // Estados para controlar la visibilidad de las contraseñas
  const [showPassword, setShowPassword] = useState(false) // Controla si se muestra la contraseña en texto plano
  const [showConfirmPassword, setShowConfirmPassword] = useState(false) // Controla si se muestra la confirmación de contraseña

  // Estados para mostrar/ocultar los requisitos de campos
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false) // Muestra requisitos de contraseña
  const [showDateRequirements, setShowDateRequirements] = useState(false) // Muestra requisitos de fecha

  // Configuración del formulario para el paso 1 usando React Hook Form
  const {
    register: registerPaso1, // Función para registrar campos del paso 1
    handleSubmit: handleSubmitPaso1, // Manejador de envío del paso 1
    formState: { errors: errorsPaso1 }, // Estado de errores del paso 1
  } = useForm({
    mode: "onChange", // Validar al cambiar los campos
  })

  // Configuración del formulario para el paso 2
  const {
    register: registerPaso2, // Función para registrar campos del paso 2
    handleSubmit: handleSubmitPaso2, // Manejador de envío del paso 2
    watch: watchPaso2, // Función para observar valores de campos en tiempo real
    reset: resetPaso2, // Función para resetear el formulario
    formState: { errors: errorsPaso2 }, // Estado de errores del paso 2
  } = useForm({
    mode: "onChange", // Validar al cambiar los campos
  })

  // Efecto para limpiar el formulario del paso 2 cuando se cambia entre pasos
  useEffect(() => {
    if (paso === 1) {
      // Si estamos en el paso 1, resetear el formulario del paso 2
      resetPaso2()
    } else if (paso === 2) {
      // Si estamos en el paso 2, limpiar explícitamente los campos
      const formularioPaso2 = document.getElementById("formularioPaso2")
      if (formularioPaso2) {
        const inputs = formularioPaso2.querySelectorAll("input")
        inputs.forEach((input) => {
          input.value = "" // Limpiar cada campo de entrada
        })
      }
    }
  }, [paso, resetPaso2]) // Ejecutar cuando cambie el paso o la función resetPaso2

  // Variables para validación de campos que deben coincidir
  const password = watchPaso2("contrasena") // Observar el valor de la contraseña en tiempo real
  const email = watchPaso2("email") // Observar el valor del email en tiempo real

  // Función para avanzar al paso 2
  const avanzarPaso = () => {
    setPaso(2) // Cambiar al paso 2
    // Limpiar explícitamente los campos del formulario del paso 2 después de renderizar
    setTimeout(() => {
      const formularioPaso2 = document.getElementById("formularioPaso2")
      if (formularioPaso2) {
        const inputs = formularioPaso2.querySelectorAll("input")
        inputs.forEach((input) => {
          input.value = "" // Limpiar cada campo de entrada
        })
      }
    }, 0) // Timeout de 0ms para ejecutar después del renderizado
  }

  // Función para retroceder al paso 1
  const retrocederPaso = () => {
    setPaso(1)
  }

  // Manejador de envío del paso 1
  const onSubmitPaso1 = (data) => {
    console.log("Datos del paso 1:", data) // Registrar datos en consola
    avanzarPaso() // Avanzar al paso 2
  }

  // Manejador de envío del paso 2
  const onSubmitPaso2 = (data) => {
    console.log("Datos del paso 2:", data) // Registrar datos en consola
    alert("Formulario enviado con éxito") // Mostrar alerta de éxito
    resetPaso2() // Resetear el formulario del paso 2
    setPaso(1) // Volver al paso 1
  }

  // Función para prevenir pegar en campos de confirmación
  const handlePaste = (e) => {
    e.preventDefault() // Previene la acción de pegar
  }

  // Funciones para mostrar/ocultar contraseñas
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword) // Alternar visibilidad de contraseña
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword) // Alternar visibilidad de confirmación de contraseña
  }

  // Funciones para mostrar/ocultar requisitos de contraseña
  const handlePasswordFocus = () => {
    setShowPasswordRequirements(true) // Mostrar requisitos al enfocar
  }

  const handlePasswordBlur = () => {
    setShowPasswordRequirements(false) // Ocultar requisitos al perder foco
  }

  // Funciones para mostrar/ocultar requisitos de fecha
  const handleDateFocus = () => {
    setShowDateRequirements(true) // Mostrar requisitos al enfocar
  }

  const handleDateBlur = () => {
    setShowDateRequirements(false) // Ocultar requisitos al perder foco
  }

  // Renderizado del componente
  return (
    <div className="page-container">
      {/* Sección de fondo (izquierda) */}
      <div className="background-section">
        <div className="background-quote">
          <h2>"Dedicados a la salud y felicidad de tu mascota en cada etapa de su vida"</h2>
          <p>En PetsHeaven cuidamos de quienes más amas</p>
        </div>
        <img src="../../public/imgs/fondo.png" alt="" className="fondo-patron" />
      </div>

      {/* Sección de contenido (derecha) */}
      <div className="content-section">
        {/* Logo */}
        <div className="logo-container">
          <a href="index.jsx">
            <img src="../../public/imgs/3.png" alt="Logo" className="logo-register" />
          </a>
        </div>

        {/* Contenedor del formulario */}
        <div className="formulario-container">
          {/* Encabezado del formulario */}
          <div className="formulario-header">
            <h2>Registrarse</h2>
            {/* Indicador de pasos */}
            <div className="pasos-indicador">
              <div className={`paso ${paso >= 1 ? "activo" : ""}`}>1</div>
              <div className="linea"></div>
              <div className={`paso ${paso >= 2 ? "activo" : ""}`}>2</div>
            </div>
            <p className="paso-descripcion">{paso === 1 ? "Información Personal" : "Datos de Acceso"}</p>
          </div>

          {/* Renderizado condicional según el paso actual */}
          {paso === 1 ? (
            // Formulario del paso 1: Información Personal
            <form onSubmit={handleSubmitPaso1(onSubmitPaso1)}>
              <div className="paso-contenido">
                <div className="campos-grid">
                  {/* Campo: Tipo de documento */}
                  <div className="campo-formulario">
                    <label>
                      Tipo de documento
                      {errorsPaso1.tipoDocumento && <span className="asterisco-error">*</span>}
                    </label>
                    <select
                      className={errorsPaso1.tipoDocumento ? "campo-error" : ""}
                      {...registerPaso1("tipoDocumento", {
                        required: true, // Campo obligatorio
                      })}
                    >
                      <option value="" selected disabled>
                        Seleccione...
                      </option>
                      <option value="CC">Cédula de Ciudadanía (CC)</option>
                      <option value="CE">Cédula de Extranjería (CE)</option>
                    </select>
                  </div>

                  {/* Campo: Número de documento */}
                  <div className="campo-formulario">
                    <label>
                      Número de documento
                      {errorsPaso1.numeroDocumento && <span className="asterisco-error">*</span>}
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: 65642312"
                      className={errorsPaso1.numeroDocumento ? "campo-error" : ""}
                      {...registerPaso1("numeroDocumento", {
                        required: true, // Campo obligatorio
                        minLength: "6", // Mínimo 6 caracteres
                        pattern: {
                          value: /^[0-9]+$/, // Solo números
                          message: "Solo se permiten números",
                        },
                      })}
                    />
                  </div>

                  {/* Campo: Nombres */}
                  <div className="campo-formulario">
                    <label>
                      Nombres
                      {errorsPaso1.nombres && <span className="asterisco-error">*</span>}
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Pepito Juan"
                      className={errorsPaso1.nombres ? "campo-error" : ""}
                      {...registerPaso1("nombres", {
                        required: true, // Campo obligatorio
                        minLength: {
                          value: 3, // Mínimo 3 caracteres
                          message: "El nombre debe tener al menos 3 caracteres",
                        },
                        maxLength: "40", // Máximo 40 caracteres
                        pattern: {
                          value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, // Solo letras y espacios
                          message: "El nombre solo puede contener letras y espacios",
                        },
                      })}
                    />
                  </div>

                  {/* Campo: Apellidos */}
                  <div className="campo-formulario">
                    <label>
                      Apellidos
                      {errorsPaso1.apellidos && <span className="asterisco-error">*</span>}
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Lopez Perez"
                      className={errorsPaso1.apellidos ? "campo-error" : ""}
                      {...registerPaso1("apellidos", {
                        required: true, // Campo obligatorio
                        minLength: {
                          value: 3, // Mínimo 3 caracteres
                          message: "El apellido debe tener al menos 3 caracteres",
                        },
                        pattern: {
                          value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, // Solo letras y espacios
                          message: "El apellido solo puede contener letras y espacios",
                        },
                      })}
                    />
                  </div>

                  {/* Campo: Fecha de nacimiento */}
                  <div className="campo-formulario">
                    <label>
                      Fecha de nacimiento
                      {errorsPaso1.fechaNacimiento && <span className="asterisco-error">*</span>}
                    </label>
                    <input
                      type="date"
                      className={errorsPaso1.fechaNacimiento ? "campo-error" : ""}
                      onFocus={handleDateFocus} // Mostrar requisitos al enfocar
                      onBlur={handleDateBlur} // Ocultar requisitos al perder foco
                      {...registerPaso1("fechaNacimiento", {
                        required: true, // Campo obligatorio
                        validate: (value) => {
                          // Validar que sea mayor de 18 años
                          const fecha = new Date(value)
                          const hoy = new Date()
                          const edad = hoy.getFullYear() - fecha.getFullYear()
                          return edad >= 18
                        },
                      })}
                    />
                    {/* Mostrar requisitos de fecha si el campo está enfocado */}
                    {showDateRequirements && (
                      <p className="info-message">Debes ser mayor de 18 años para registrarte</p>
                    )}
                  </div>

                  {/* Campo: Género */}
                  <div className="campo-formulario">
                    <label>
                      Genero
                      {errorsPaso1.genero && <span className="asterisco-error">*</span>}
                    </label>
                    <select
                      className={errorsPaso1.genero ? "campo-error" : ""}
                      {...registerPaso1("genero", {
                        required: true, // Campo obligatorio
                      })}
                    >
                      <option value="" selected disabled>
                        Seleccione...
                      </option>
                      <option value="F">Femenino</option>
                      <option value="M">Masculino</option>
                      <option value="O">Otro</option>
                    </select>
                  </div>

                  {/* Campo: Teléfono */}
                  <div className="campo-formulario">
                    <label>
                      Teléfono
                      {errorsPaso1.telefono && <span className="asterisco-error">*</span>}
                    </label>
                    <input
                      type="text"
                      placeholder="Eje: 65642312"
                      className={errorsPaso1.telefono ? "campo-error" : ""}
                      {...registerPaso1("telefono", {
                        required: true, // Campo obligatorio
                        pattern: {
                          value: /^[0-9]{10}$/, // 10 dígitos numéricos
                          message: "El teléfono debe tener 10 dígitos numéricos",
                        },
                      })}
                    />
                  </div>

                  {/* Campo: Dirección */}
                  <div className="campo-formulario">
                    <label>
                      Dirección
                      {errorsPaso1.direccion && <span className="asterisco-error">*</span>}
                    </label>
                    <input
                      type="text"
                      placeholder="Eje: Calle 123, Nro. 456"
                      className={errorsPaso1.direccion ? "campo-error" : ""}
                      {...registerPaso1("direccion", {
                        required: true, // Campo obligatorio
                        minLength: {
                          value: 5, // Mínimo 5 caracteres
                          message: "La dirección debe tener al menos 5 caracteres",
                        },
                      })}
                    />
                  </div>
                </div>

                {/* Botones de navegación del paso 1 */}
                <div className="botones-navegacion">
                  <button type="submit" className="boton-siguiente">
                    Siguiente
                  </button>
                </div>
              </div>
            </form>
          ) : (
            // Formulario del paso 2: Datos de Acceso
            <form onSubmit={handleSubmitPaso2(onSubmitPaso2)} id="formularioPaso2">
              <div className="paso-contenido">
                <div className="campos-grid">
                  {/* Campo: Email */}
                  <div className="campo-formulario">
                    <label>
                      Email
                      {errorsPaso2.email && <span className="asterisco-error">*</span>}
                    </label>
                    <input
                      type="email"
                      placeholder="ej: juan.lopez@example.com"
                      className={errorsPaso2.email ? "campo-error" : ""}
                      onPaste={handlePaste} // Prevenir pegar
                      {...registerPaso2("email", {
                        required: true, // Campo obligatorio
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Formato de email válido
                          message: "El correo electrónico es inválido",
                        },
                      })}
                    />
                  </div>

                  {/* Campo: Confirmación Email */}
                  <div className="campo-formulario">
                    <label>
                      Confirmación Email
                      {errorsPaso2.confirmEmail && <span className="asterisco-error">*</span>}
                    </label>
                    <input
                      type="email"
                      placeholder="Confirmar correo electrónico"
                      className={errorsPaso2.confirmEmail ? "campo-error" : ""}
                      onPaste={handlePaste} // Prevenir pegar
                      {...registerPaso2("confirmEmail", {
                        required: true, // Campo obligatorio
                        validate: (value) => {
                          // Validar que coincida con el email
                          const emailValue = watchPaso2("email")
                          return value === emailValue || "Los correos electrónicos no coinciden"
                        },
                      })}
                    />
                    {/* Mostrar mensaje de error si los emails no coinciden */}
                    {errorsPaso2.confirmEmail && errorsPaso2.confirmEmail.type === "validate" && (
                      <p className="error-message">Los correos electrónicos no coinciden</p>
                    )}
                  </div>

                  {/* Campo: Contraseña */}
                  <div className="campo-formulario">
                    <label>
                      Contraseña
                      {errorsPaso2.contrasena && <span className="asterisco-error">*</span>}
                    </label>
                    <div className="password-input-container">
                      <input
                        type={showPassword ? "text" : "password"} // Mostrar como texto o contraseña
                        placeholder="Contraseña"
                        className={errorsPaso2.contrasena ? "campo-error" : ""}
                        onPaste={handlePaste} // Prevenir pegar
                        onFocus={handlePasswordFocus} // Mostrar requisitos al enfocar
                        onBlur={handlePasswordBlur} // Ocultar requisitos al perder foco
                        {...registerPaso2("contrasena", {
                          required: true, // Campo obligatorio
                          minLength: {
                            value: 8, // Mínimo 8 caracteres
                            message: "La contraseña debe tener al menos 8 caracteres",
                          },
                          pattern: {
                            // Patrón complejo para contraseña segura
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                              "La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial",
                          },
                        })}
                      />
                      {/* Botón para mostrar/ocultar contraseña */}
                      <button type="button" className="toggle-password-button" onClick={togglePasswordVisibility}>
                        {showPassword ? (
                          // Icono de ojo tachado (contraseña visible)
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
                            className="eye-icon"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          // Icono de ojo (contraseña oculta)
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
                            className="eye-icon"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                    </div>
                    {/* Mostrar requisitos de contraseña si el campo está enfocado */}
                    {showPasswordRequirements && (
                      <p className="info-message">
                        La contraseña debe contener: al menos 8 caracteres, una mayúscula, una minúscula, un número y un
                        carácter especial (@$!%*?&)
                      </p>
                    )}
                  </div>

                  {/* Campo: Confirmación Contraseña */}
                  <div className="campo-formulario">
                    <label>
                      Confirmación Contraseña
                      {errorsPaso2.confirmContrasena && <span className="asterisco-error">*</span>}
                    </label>
                    <div className="password-input-container">
                      <input
                        type={showConfirmPassword ? "text" : "password"} // Mostrar como texto o contraseña
                        placeholder="Confirmar contraseña"
                        className={errorsPaso2.confirmContrasena ? "campo-error" : ""}
                        onPaste={handlePaste} // Prevenir pegar
                        {...registerPaso2("confirmContrasena", {
                          required: true, // Campo obligatorio
                          validate: (value) => value === password || "Las contraseñas no coinciden", // Validar que coincida
                        })}
                      />
                      {/* Botón para mostrar/ocultar confirmación de contraseña */}
                      <button
                        type="button"
                        className="toggle-password-button"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? (
                          // Icono de ojo tachado (contraseña visible)
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
                            className="eye-icon"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          // Icono de ojo (contraseña oculta)
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
                            className="eye-icon"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                    </div>
                    {/* Mostrar mensaje de error si las contraseñas no coinciden */}
                    {errorsPaso2.confirmContrasena && errorsPaso2.confirmContrasena.type === "validate" && (
                      <p className="error-message">Las contraseñas no coinciden</p>
                    )}
                  </div>
                </div>

                {/* Campo: Términos y condiciones */}
                <div className="campo-formulario checkbox campo-ancho-completo">
                  <input
                    type="checkbox"
                    id="terminos"
                    className={errorsPaso2.terminos ? "campo-error" : ""}
                    {...registerPaso2("terminos", {
                      required: true, // Campo obligatorio
                    })}
                  />
                  <label htmlFor="terminos">
                    Acepto los términos y condiciones
                    {errorsPaso2.terminos && <span className="asterisco-error">*</span>}
                  </label>
                </div>

                {/* Botones de navegación del paso 2 */}
                <div className="botones-navegacion">
                  <button type="button" className="boton-anterior" onClick={retrocederPaso}>
                    Anterior
                  </button>
                  <button type="submit" className="boton-enviar">
                    Registrarse
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Sección de inicio de sesión (solo visible en el paso 1) */}
        {paso === 1 && (
          <div className="login-section">
            <p className="login-text">Ya haces parte de PetsHeaven</p>
            <a href="Login.jsx" className="boton-login">
              Inicia sesión
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default FormularioRegistro

