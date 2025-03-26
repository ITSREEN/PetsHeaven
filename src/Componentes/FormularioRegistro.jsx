// Importaciones necesarias
import React from "react"
import { useState, useEffect } from "react" // Hooks de React para manejar estado y efectos secundarios
import { useForm } from "react-hook-form" // Librería para manejar formularios con validación
import "../../public/styles/formulario-registro.css"
import "boxicons"


export const FormularioRegistro = () => {
  // Estado para controlar el paso actual (ahora con 3 pasos)
  const [paso, setPaso] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)
  const [showDateRequirements, setShowDateRequirements] = useState(false)

  // Estado para almacenar el email del usuario para la verificación
  const [userEmail, setUserEmail] = useState("")

  // Estado para el código de verificación
  const [verificationCode, setVerificationCode] = useState("")
  const [userInputCode, setUserInputCode] = useState(["", "", "", "", "", ""])
  const [codeError, setCodeError] = useState(false)
  const [remainingTime, setRemainingTime] = useState(300) // 5 minutos en segundos
  const [timerActive, setTimerActive] = useState(false)

  // Configuración del formulario para el paso 1
  const {
    register: registerPaso1,
    handleSubmit: handleSubmitPaso1,
    formState: { errors: errorsPaso1 },
    reset: resetPaso1,
  } = useForm({
    mode: "onChange",
  })

  // Configuración del formulario para el paso 2
  const {
    register: registerPaso2,
    handleSubmit: handleSubmitPaso2,
    watch: watchPaso2,
    reset: resetPaso2,
    formState: { errors: errorsPaso2 },
  } = useForm({
    mode: "onChange",
  })

  // Efecto para limpiar el formulario del paso 2 cuando se cambia entre pasos
  useEffect(() => {
    if (paso === 1) {
      resetPaso2()

      setTimeout(() => {
        const formularioPaso2 = document.getElementById("formularioPaso2")
        if (formularioPaso2) {
          const inputs = formularioPaso2.querySelectorAll("input")
          inputs.forEach((input) => {
            input.value = ""
          })

          const checkbox = formularioPaso2.querySelector('input[type="checkbox"]')
          if (checkbox) {
            checkbox.checked = false
          }
        }
      }, 0)
    }
  }, [paso, resetPaso2])

  // Efecto para el temporizador de código de verificación
  useEffect(() => {
    let interval = null

    if (timerActive && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (remainingTime === 0) {
      setTimerActive(false)
      // Generar un nuevo código cuando expire el tiempo
      if (paso === 3) {
        generateVerificationCode()
      }
    }

    return () => clearInterval(interval)
  }, [timerActive, remainingTime, paso])

  // Variables para validación
  const password = watchPaso2("contrasena")
  const email = watchPaso2("email")

  // Función para avanzar al paso 2
  const avanzarPaso = () => {
    setPaso(2)
    setTimeout(() => {
      const formularioPaso2 = document.getElementById("formularioPaso2")
      if (formularioPaso2) {
        const inputs = formularioPaso2.querySelectorAll("input")
        inputs.forEach((input) => {
          input.value = ""
        })
      }
    }, 0)
  }

  // Función para retroceder al paso anterior
  const retrocederPaso = () => {
    if (paso === 3) {
      setPaso(2)
    } else if (paso === 2) {
      setPaso(1)
    }
  }

  // Manejador de envío del paso 1
  const onSubmitPaso1 = (data) => {
    console.log("Datos del paso 1:", data)
    avanzarPaso()
  }

  // Manejador de envío del paso 2
  const onSubmitPaso2 = (data) => {
    console.log("Datos del paso 2:", data)

    // Guardar el email para la verificación
    setUserEmail(data.email)

    // Generar código de verificación
    generateVerificationCode()

    // Avanzar al paso 3 (verificación de correo)
    setPaso(3)

    // Iniciar el temporizador
    setRemainingTime(300) // 5 minutos
    setTimerActive(true)
  }

  // Función para generar un código de verificación aleatorio
  const generateVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    setVerificationCode(code)
    console.log("Código de verificación generado:", code) // En producción, esto se enviaría por email

    // Resetear el input del usuario
    setUserInputCode(["", "", "", "", "", ""])
    setCodeError(false)
  }

  // Función para manejar el cambio en los inputs del código
  const handleCodeInputChange = (index, value) => {
    // Solo permitir números
    if (!/^\d*$/.test(value)) return

    const newCode = [...userInputCode]
    newCode[index] = value
    setUserInputCode(newCode)

    // Mover al siguiente input si se ingresó un dígito
    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  // Función para manejar el pegado del código
  const handleCodePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")

    // Verificar si lo pegado son 6 dígitos
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("")
      setUserInputCode(digits)

      // Enfocar el último input
      const lastInput = document.getElementById("code-input-5")
      if (lastInput) lastInput.focus()
    }
  }

  // Función para verificar el código
  const verifyCode = () => {
    const inputCode = userInputCode.join("")

    if (inputCode === verificationCode) {
      // Código correcto
      alert("¡Verificación exitosa! Tu cuenta ha sido activada.")

      // Resetear formularios y volver al paso 1
      resetPaso1()
      resetPaso2()
      setPaso(1)
    } else {
      // Código incorrecto
      setCodeError(true)
    }
  }

  // Función para reenviar el código
  const resendCode = () => {
    generateVerificationCode()
    setRemainingTime(300) // Reiniciar el temporizador
    setTimerActive(true)
    alert(`Se ha enviado un nuevo código de verificación a ${userEmail}`)
  }

  // Funciones auxiliares
  const handlePaste = (e) => {
    e.preventDefault()
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handlePasswordFocus = () => {
    setShowPasswordRequirements(true)
  }

  const handlePasswordBlur = () => {
    setShowPasswordRequirements(false)
  }

  const handleDateFocus = () => {
    setShowDateRequirements(true)
  }

  const handleDateBlur = () => {
    setShowDateRequirements(false)
  }

  // Formatear el tiempo restante
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <div className="page-container">
      <div className="background-section">
        <div className="background-quote">
          <h2>"El amor por los animales es el reflejo de nuestra humanidad"</h2>
          <p>En PetsHeaven cuidamos de quienes más amas</p>
        </div>
        <img src="../../public/imgs/fondo.png" alt="" className="fondo-patron" />
      </div>

      <div className="content-section">
        <div className="logo-container">
          <a href="index.jsx">
            <img src="../../public/imgs/3.png" alt="Logo" className="logo-register" />
          </a>
        </div>

        <div className="formulario-container">
          <div className="formulario-header">
            <h2>Registrarse</h2>
            <div className="pasos-indicador">
              <div className={`paso ${paso >= 1 ? "activo" : ""}`}>1</div>
              <div className="linea"></div>
              <div className={`paso ${paso >= 2 ? "activo" : ""}`}>2</div>
              <div className="linea"></div>
              <div className={`paso ${paso >= 3 ? "activo" : ""}`}>3</div>
            </div>
            <p className="paso-descripcion">
              {paso === 1 ? "Información Personal" : paso === 2 ? "Datos de Acceso" : "Verificación de Correo"}
            </p>
          </div>

          {paso === 1 ? (
            // Formulario del paso 1: Información Personal
            <form onSubmit={handleSubmitPaso1(onSubmitPaso1)}>
              <div className="paso-contenido">
                <div className="campos-grid">
                  {/* Campos del paso 1 (igual que antes) */}
                  <div className="campo-formulario">
                    <label>
                      Tipo de documento
                      {errorsPaso1.tipoDocumento && <span className="asterisco-error">*</span>}
                    </label>
                    <select
                      className={errorsPaso1.tipoDocumento ? "campo-error" : ""}
                      {...registerPaso1("tipoDocumento", {
                        required: true,
                      })}
                    >
                      <option value="" selected disabled>
                        Seleccione...
                      </option>
                      <option value="CC">Cédula de Ciudadanía (CC)</option>
                      <option value="CE">Cédula de Extranjería (CE)</option>
                    </select>
                  </div>

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
                        required: true,
                        minLength: "6",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Solo se permiten números",
                        },
                      })}
                    />
                  </div>

                  {/* Resto de campos del paso 1... */}
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
                        required: true,
                        minLength: {
                          value: 3,
                          message: "El nombre debe tener al menos 3 caracteres",
                        },
                        maxLength: "40",
                        pattern: {
                          value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                          message: "El nombre solo puede contener letras y espacios",
                        },
                      })}
                    />
                  </div>

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
                        required: true,
                        minLength: {
                          value: 3,
                          message: "El apellido debe tener al menos 3 caracteres",
                        },
                        pattern: {
                          value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                          message: "El apellido solo puede contener letras y espacios",
                        },
                      })}
                    />
                  </div>

                  <div className="campo-formulario">
                    <label>
                      Fecha de nacimiento
                      {errorsPaso1.fechaNacimiento && <span className="asterisco-error">*</span>}
                    </label>
                    <input
                      type="date"
                      className={errorsPaso1.fechaNacimiento ? "campo-error" : ""}
                      onFocus={handleDateFocus}
                      onBlur={handleDateBlur}
                      {...registerPaso1("fechaNacimiento", {
                        required: true,
                        validate: (value) => {
                          const fecha = new Date(value)
                          const hoy = new Date()
                          const edad = hoy.getFullYear() - fecha.getFullYear()
                          return edad >= 18
                        },
                      })}
                    />
                    {showDateRequirements && (
                      <p className="info-message">Debes ser mayor de 18 años para registrarte</p>
                    )}
                  </div>

                  <div className="campo-formulario">
                    <label>
                      Genero
                      {errorsPaso1.genero && <span className="asterisco-error">*</span>}
                    </label>
                    <select
                      className={errorsPaso1.genero ? "campo-error" : ""}
                      {...registerPaso1("genero", {
                        required: true,
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
                        required: true,
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "El teléfono debe tener 10 dígitos numéricos",
                        },
                      })}
                    />
                  </div>

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
                        required: true,
                        minLength: {
                          value: 5,
                          message: "La dirección debe tener al menos 5 caracteres",
                        },
                      })}
                    />
                  </div>
                </div>

                <div className="botones-navegacion">
                  <button type="submit" className="boton-siguiente">
                    Siguiente
                  </button>
                </div>
              </div>
            </form>
          ) : paso === 2 ? (
            // Formulario del paso 2: Datos de Acceso
            <form onSubmit={handleSubmitPaso2(onSubmitPaso2)} id="formularioPaso2">
              <div className="paso-contenido">
                <div className="campos-grid">
                  {/* Campos del paso 2 (igual que antes) */}
                  <div className="campo-formulario">
                    <label>
                      Email
                      {errorsPaso2.email && <span className="asterisco-error">*</span>}
                    </label>
                    <input
                      type="email"
                      placeholder="ej: juan.lopez@example.com"
                      className={errorsPaso2.email ? "campo-error" : ""}
                      onPaste={handlePaste}
                      {...registerPaso2("email", {
                        required: true,
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "El correo electrónico es inválido",
                        },
                      })}
                    />
                  </div>

                  <div className="campo-formulario">
                    <label>
                      Confirmación Email
                      {errorsPaso2.confirmEmail && <span className="asterisco-error">*</span>}
                    </label>
                    <input
                      type="email"
                      placeholder="Confirmar correo electrónico"
                      className={errorsPaso2.confirmEmail ? "campo-error" : ""}
                      onPaste={handlePaste}
                      {...registerPaso2("confirmEmail", {
                        required: true,
                        validate: (value) => {
                          const emailValue = watchPaso2("email")
                          return value === emailValue || "Los correos electrónicos no coinciden"
                        },
                      })}
                    />
                    {errorsPaso2.confirmEmail && errorsPaso2.confirmEmail.type === "validate" && (
                      <p className="error-message">Los correos electrónicos no coinciden</p>
                    )}
                  </div>

                  <div className="campo-formulario">
                    <label>
                      Contraseña
                      {errorsPaso2.contrasena && <span className="asterisco-error">*</span>}
                    </label>
                    <div className="password-input-container">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        className={errorsPaso2.contrasena ? "campo-error" : ""}
                        onPaste={handlePaste}
                        onFocus={handlePasswordFocus}
                        onBlur={handlePasswordBlur}
                        {...registerPaso2("contrasena", {
                          required: true,
                          minLength: {
                            value: 8,
                            message: "La contraseña debe tener al menos 8 caracteres",
                          },
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                              "La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial",
                          },
                        })}
                      />
                      <button type="button" className="toggle-password-button" onClick={togglePasswordVisibility}>
                        {showPassword ? (
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
                    {showPasswordRequirements && (
                      <p className="info-message">
                        La contraseña debe contener: al menos 8 caracteres, una mayúscula, una minúscula, un número y un
                        carácter especial (@$!%*?&)
                      </p>
                    )}
                  </div>

                  <div className="campo-formulario">
                    <label>
                      Confirmación Contraseña
                      {errorsPaso2.confirmContrasena && <span className="asterisco-error">*</span>}
                    </label>
                    <div className="password-input-container">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirmar contraseña"
                        className={errorsPaso2.confirmContrasena ? "campo-error" : ""}
                        onPaste={handlePaste}
                        {...registerPaso2("confirmContrasena", {
                          required: true,
                          validate: (value) => value === password || "Las contraseñas no coinciden",
                        })}
                      />
                      <button
                        type="button"
                        className="toggle-password-button"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? (
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
                    {errorsPaso2.confirmContrasena && errorsPaso2.confirmContrasena.type === "validate" && (
                      <p className="error-message">Las contraseñas no coinciden</p>
                    )}
                  </div>
                </div>

                <div className="campo-formulario checkbox campo-ancho-completo">
                  <input
                    type="checkbox"
                    id="terminos"
                    className={errorsPaso2.terminos ? "campo-error" : ""}
                    {...registerPaso2("terminos", {
                      required: true,
                    })}
                  />
                  <label htmlFor="terminos">
                    Acepto los términos y condiciones
                    {errorsPaso2.terminos && <span className="asterisco-error">*</span>}
                  </label>
                </div>

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
          ) : (
            // Paso 3: Verificación de correo electrónico
            <div className="paso-contenido">
              <div className="verificacion-email">
                <div className="verificacion-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00bcd4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2L11 13"></path>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
                  </svg>
                </div>

                <h3 className="verificacion-titulo">Verifica tu correo electrónico</h3>

                <p className="verificacion-descripcion">
                  Hemos enviado un código de verificación a <strong>{userEmail}</strong>. Por favor, introduce el código
                  de 6 dígitos para verificar tu cuenta.
                </p>

                <div className="codigo-container">
                  {userInputCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-input-${index}`}
                      type="text"
                      maxLength="1"
                      className={`codigo-input ${codeError ? "codigo-error" : ""}`}
                      value={digit}
                      onChange={(e) => handleCodeInputChange(index, e.target.value)}
                      onPaste={index === 0 ? handleCodePaste : null}
                      autoFocus={index === 0}
                    />
                  ))}
                </div>

                {codeError && (
                  <p className="error-message codigo-error-mensaje">
                    El código ingresado no es válido. Por favor, intenta nuevamente.
                  </p>
                )}

                <div className="timer-container">
                  <p className="timer-text">
                    Tiempo restante: <span className="timer-count">{formatTime(remainingTime)}</span>
                  </p>
                </div>

                <div className="verificacion-botones">
                  <button type="button" className="boton-verificar" onClick={verifyCode}>
                    Verificar
                  </button>

                  <button
                    type="button"
                    className="boton-reenviar"
                    onClick={resendCode}
                    disabled={timerActive && remainingTime > 240} // Deshabilitar por 1 minuto
                  >
                    Reenviar código
                  </button>
                </div>

                <p className="verificacion-ayuda">
                  ¿No recibiste el código? Revisa tu carpeta de spam o solicita un nuevo código.
                </p>
              </div>
            </div>
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