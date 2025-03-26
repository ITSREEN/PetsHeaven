// Librarys 
import React from "react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

// Imports 
import "../../public/styles/formulario-registro.css"

export const Registro = () => {
  // Rutas de imágenes definidas directamente en el componente
  const imagenFondo = "img/fondo.png" // Ruta desde la carpeta public
  const logoUrl = "img/3.png" // Ruta desde la carpeta public

  // Estados para controlar el paso actual y visibilidad de contraseñas
  const [paso, setPaso] = useState(1)
  const [verPassword, setVerPassword] = useState(false)
  const [verConfirmarPassword, setVerConfirmarPassword] = useState(false)
  const [mostrarRequisitosPassword, setMostrarRequisitosPassword] = useState(false)
  const [mostrarRequisitosFecha, setMostrarRequisitosFecha] = useState(false)

  // Estado para el email y verificación
  const [correoUsuario, setCorreoUsuario] = useState("")
  const [codigoVerificacion, setCodigoVerificacion] = useState("")
  const [codigoIngresado, setCodigoIngresado] = useState(["", "", "", "", "", ""])
  const [errorCodigo, setErrorCodigo] = useState(false)
  const [tiempoRestante, setTiempoRestante] = useState(300) // 5 minutos en segundos
  const [timerActivo, setTimerActivo] = useState(false)

  // Configuración del formulario para el paso 1
  const {
    register: registrarPaso1,
    handleSubmit: manejarEnvioPaso1,
    formState: { errors: erroresPaso1 },
    reset: resetearPaso1,
  } = useForm({
    mode: "onChange",
  })

  // Configuración del formulario para el paso 2
  const {
    register: registrarPaso2,
    handleSubmit: manejarEnvioPaso2,
    watch: observarPaso2,
    reset: resetearPaso2,
    formState: { errors: erroresPaso2 },
  } = useForm({
    mode: "onChange",
  })

  // Efecto para limpiar el formulario del paso 2 cuando se cambia entre pasos
  useEffect(() => {
    if (paso === 1) {
      resetearPaso2()

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
  }, [paso, resetearPaso2])

  // Efecto para el temporizador de código de verificación
  useEffect(() => {
    let intervalo = null

    if (timerActivo && tiempoRestante > 0) {
      intervalo = setInterval(() => {
        setTiempoRestante((prevTime) => prevTime - 1)
      }, 1000)
    } else if (tiempoRestante === 0) {
      setTimerActivo(false)
      // Generar un nuevo código cuando expire el tiempo
      if (paso === 3) {
        generarCodigoVerificacion()
      }
    }

    return () => clearInterval(intervalo)
  }, [timerActivo, tiempoRestante, paso])

  // Variables para validación
  const password = observarPaso2("password")
  const email = observarPaso2("email")

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
  const enviarPaso1 = (datos) => {
    console.log("Datos del paso 1:", datos)
    avanzarPaso()
  }

  // Manejador de envío del paso 2
  const enviarPaso2 = (datos) => {
    console.log("Datos del paso 2:", datos)

    // Guardar el email para la verificación
    setCorreoUsuario(datos.email)

    // Generar código de verificación
    generarCodigoVerificacion()

    // Avanzar al paso 3 (verificación de correo)
    setPaso(3)

    // Iniciar el temporizador
    setTiempoRestante(300) // 5 minutos
    setTimerActivo(true)
  }

  // Función para generar un código de verificación aleatorio
  const generarCodigoVerificacion = () => {
    const codigo = Math.floor(100000 + Math.random() * 900000).toString()
    setCodigoVerificacion(codigo)
    console.log("Código de verificación generado:", codigo) // En producción, esto se enviaría por email

    // Resetear el input del usuario para que esté vacío
    setCodigoIngresado(["", "", "", "", "", ""])
    setErrorCodigo(false)
  }

  // Función para manejar el cambio en los inputs del código
  const manejarCambioCodigo = (indice, valor) => {
    // Solo permitir números
    if (!/^\d*$/.test(valor)) return

    const nuevoCodigo = [...codigoIngresado]
    nuevoCodigo[indice] = valor
    setCodigoIngresado(nuevoCodigo)

    // Mover al siguiente input si se ingresó un dígito
    if (valor !== "" && indice < 5) {
      const siguienteInput = document.getElementById(`codigo-input-${indice + 1}`)
      if (siguienteInput) siguienteInput.focus()
    }
  }

  // Función para manejar el pegado del código
  const manejarPegadoCodigo = (e) => {
    e.preventDefault()
    const datoPegado = e.clipboardData.getData("text")

    // Verificar si lo pegado son 6 dígitos
    if (/^\d{6}$/.test(datoPegado)) {
      const digitos = datoPegado.split("")
      setCodigoIngresado(digitos)

      // Enfocar el último input
      const ultimoInput = document.getElementById("codigo-input-5")
      if (ultimoInput) ultimoInput.focus()
    }
  }

  // Función para verificar el código
  const verificarCodigo = () => {
    const codigoInput = codigoIngresado.join("")

    if (codigoInput === codigoVerificacion) {
      // Código correcto
      alert("¡Verificación exitosa! Tu cuenta ha sido activada.")

      // Resetear formularios y volver al paso 1
      resetearPaso1()
      resetearPaso2()
      setPaso(1)
    } else {
      // Código incorrecto
      setErrorCodigo(true)
    }
  }

  // Función para reenviar el código
  const reenviarCodigo = () => {
    generarCodigoVerificacion()
    setTiempoRestante(300) // Reiniciar el temporizador
    setTimerActivo(true)
    alert(`Se ha enviado un nuevo código de verificación a ${correoUsuario}`)
  }

  // Función para permitir solo números en los campos
  const permitirSoloNumeros = (e) => {
    const charCode = e.which ? e.which : e.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      e.preventDefault()
    }
  }

  // Función para permitir solo letras y espacios en los campos de texto
  const permitirSoloLetras = (e) => {
    const charCode = e.which ? e.which : e.keyCode
    if (
      !(charCode >= 65 && charCode <= 90) &&
      !(charCode >= 97 && charCode <= 122) &&
      !(charCode === 32) && // espacio
      !(charCode >= 192 && charCode <= 255) // letras acentuadas
    ) {
      e.preventDefault()
    }
  }

  // Funciones auxiliares
  const evitarPegado = (e) => {
    e.preventDefault()
  }

  const cambiarVisibilidadPassword = () => {
    setVerPassword(!verPassword)
  }

  const cambiarVisibilidadConfirmarPassword = () => {
    setVerConfirmarPassword(!verConfirmarPassword)
  }

  const mostrarRequisitosPasswordAlFocus = () => {
    setMostrarRequisitosPassword(true)
  }

  const ocultarRequisitosPasswordAlBlur = () => {
    setMostrarRequisitosPassword(false)
  }

  const mostrarRequisitosFechaAlFocus = () => {
    setMostrarRequisitosFecha(true)
  }

  const ocultarRequisitosFechaAlBlur = () => {
    setMostrarRequisitosFecha(false)
  }

  // Formatear el tiempo restante
  const formatearTiempo = (segundos) => {
    const minutos = Math.floor(segundos / 60)
    const segs = segundos % 60
    return `${minutos}:${segs < 10 ? "0" : ""}${segs}`
  }

  return (
    <div className="registro-container">
      {/* Sección izquierda - Imagen y cita */}
      <div className="registro-imagen-container">
        <div className="imagen-fondo-contenedor">
          <img src={imagenFondo || "/placeholder.svg"} alt="Imagen de fondo" className="imagen-fondo" />
        </div>
        <div className="overlay-imagen"></div>
        <div className="contenedor-cita">
          <h2 className="texto-cita">"El amor por los animales es el reflejo de nuestra humanidad"</h2>
          <p className="subtexto-cita">En PetsHeaven cuidamos de quienes más amas</p>
        </div>
      </div>

      {/* Sección derecha - Formulario de registro */}
      <div className="registro-formulario-container">
        {/* Logo de la veterinaria - Ahora fuera del formulario */}
        <div className="contenedor-logo-externo">
          <img src={logoUrl || "/placeholder.svg"} alt="Logo PetsHeaven" className="logo-veterinaria" />
        </div>

        {/* Contenedor del formulario - Aquí puedes agregar el patrón de fondo en el CSS */}
        <div className="formulario-card">
          <div className="contenido-formulario">
            <div className="encabezado-formulario">
              <h2 className="titulo-formulario">Registrarse</h2>

              {/* Indicadores de paso */}
              <div className="indicadores-paso">
                <div className={`paso ${paso >= 1 ? "activo" : ""}`}>1</div>
                <div className="linea"></div>
                <div className={`paso ${paso >= 2 ? "activo" : ""}`}>2</div>
                <div className="linea"></div>
                <div className={`paso ${paso >= 3 ? "activo" : ""}`}>3</div>
              </div>

              <p className="subtitulo-formulario">
                {paso === 1 ? "Información Personal" : paso === 2 ? "Datos de Acceso" : "Verificación de Correo"}
              </p>
            </div>

            {paso === 1 ? (
              // Formulario del paso 1: Información Personal
              <form onSubmit={manejarEnvioPaso1(enviarPaso1)}>
                <div className="contenido-paso">
                  <div className="grid-campos">
                    <div className="grupo-campo">
                      <label>
                        Tipo de documento <span className="obligatorio">*</span>
                      </label>
                      <select
                        className={erroresPaso1.tipoDocumento ? "campo-error" : ""}
                        {...registrarPaso1("tipoDocumento", {
                          required: true,
                        })}
                      >
                        <option value="" disabled selected>
                          Seleccione...
                        </option>
                        <option value="CC">Cédula de Ciudadanía (CC)</option>
                        <option value="CE">Cédula de Extranjería (CE)</option>
                        <option value="PAS">Pasaporte</option>
                      </select>
                      {erroresPaso1.tipoDocumento && (
                        <p className="mensaje-error">Debes seleccionar un tipo de documento</p>
                      )}
                    </div>

                    <div className="grupo-campo">
                      <label>
                        Número de documento <span className="obligatorio">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: 65642312"
                        maxLength={15}
                        className={erroresPaso1.numeroDocumento ? "campo-error" : ""}
                        onKeyPress={permitirSoloNumeros}
                        {...registrarPaso1("numeroDocumento", {
                          required: true,
                          minLength: 6,
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Solo se permiten números",
                          },
                        })}
                      />
                      {erroresPaso1.numeroDocumento && (
                        <p className="mensaje-error">
                          {erroresPaso1.numeroDocumento.type === "required"
                            ? "El número de documento es obligatorio"
                            : erroresPaso1.numeroDocumento.type === "minLength"
                              ? "El número debe tener al menos 6 dígitos"
                              : "Solo se permiten números"}
                        </p>
                      )}
                    </div>

                    <div className="grupo-campo">
                      <label>
                        Nombres <span className="obligatorio">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Pepito Juan"
                        maxLength={50}
                        className={erroresPaso1.nombres ? "campo-error" : ""}
                        onKeyPress={permitirSoloLetras}
                        {...registrarPaso1("nombres", {
                          required: true,
                          minLength: {
                            value: 3,
                            message: "El nombre debe tener al menos 3 caracteres",
                          },
                          maxLength: 50,
                          pattern: {
                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                            message: "El nombre solo puede contener letras y espacios",
                          },
                        })}
                      />
                      {erroresPaso1.nombres && (
                        <p className="mensaje-error">
                          {erroresPaso1.nombres.type === "required"
                            ? "El nombre es obligatorio"
                            : erroresPaso1.nombres.type === "minLength"
                              ? "El nombre debe tener al menos 3 caracteres"
                              : "El nombre solo puede contener letras y espacios"}
                        </p>
                      )}
                    </div>

                    <div className="grupo-campo">
                      <label>
                        Apellidos <span className="obligatorio">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: López Pérez"
                        maxLength={50}
                        className={erroresPaso1.apellidos ? "campo-error" : ""}
                        onKeyPress={permitirSoloLetras}
                        {...registrarPaso1("apellidos", {
                          required: true,
                          minLength: {
                            value: 3,
                            message: "El apellido debe tener al menos 3 caracteres",
                          },
                          maxLength: 50,
                          pattern: {
                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                            message: "El apellido solo puede contener letras y espacios",
                          },
                        })}
                      />
                      {erroresPaso1.apellidos && (
                        <p className="mensaje-error">
                          {erroresPaso1.apellidos.type === "required"
                            ? "El apellido es obligatorio"
                            : erroresPaso1.apellidos.type === "minLength"
                              ? "El apellido debe tener al menos 3 caracteres"
                              : "El apellido solo puede contener letras y espacios"}
                        </p>
                      )}
                    </div>

                    <div className="grupo-campo">
                      <label>
                        Fecha de nacimiento <span className="obligatorio">*</span>
                      </label>
                      <input
                        type="date"
                        className={erroresPaso1.fechaNacimiento ? "campo-error" : ""}
                        onFocus={mostrarRequisitosFechaAlFocus}
                        onBlur={ocultarRequisitosFechaAlBlur}
                        {...registrarPaso1("fechaNacimiento", {
                          required: true,
                          validate: (value) => {
                            const fecha = new Date(value)
                            const hoy = new Date()
                            const edad = hoy.getFullYear() - fecha.getFullYear()
                            return edad >= 18
                          },
                        })}
                      />
                      {erroresPaso1.fechaNacimiento && (
                        <p className="mensaje-error">
                          {erroresPaso1.fechaNacimiento.type === "required"
                            ? "La fecha de nacimiento es obligatoria"
                            : "Debes ser mayor de 18 años para registrarte"}
                        </p>
                      )}
                      {mostrarRequisitosFecha && (
                        <p className="mensaje-info">Debes ser mayor de 18 años para registrarte</p>
                      )}
                    </div>

                    <div className="grupo-campo">
                      <label>
                        Género <span className="obligatorio">*</span>
                      </label>
                      <select
                        className={erroresPaso1.genero ? "campo-error" : ""}
                        {...registrarPaso1("genero", {
                          required: true,
                        })}
                      >
                        <option value="" disabled selected>
                          Seleccione...
                        </option>
                        <option value="F">Femenino</option>
                        <option value="M">Masculino</option>
                        <option value="O">Otro</option>
                      </select>
                      {erroresPaso1.genero && <p className="mensaje-error">Debes seleccionar un género</p>}
                    </div>

                    <div className="grupo-campo">
                      <label>
                        Teléfono <span className="obligatorio">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: 65642312"
                        maxLength={10}
                        className={erroresPaso1.telefono ? "campo-error" : ""}
                        onKeyPress={permitirSoloNumeros}
                        {...registrarPaso1("telefono", {
                          required: true,
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "El teléfono debe tener 10 dígitos numéricos",
                          },
                        })}
                      />
                      {erroresPaso1.telefono && (
                        <p className="mensaje-error">
                          {erroresPaso1.telefono.type === "required"
                            ? "El teléfono es obligatorio"
                            : "El teléfono debe tener 10 dígitos numéricos"}
                        </p>
                      )}
                    </div>

                    <div className="grupo-campo">
                      <label>
                        Dirección <span className="obligatorio">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Calle 123 Nro. 456"
                        maxLength={100}
                        className={erroresPaso1.direccion ? "campo-error" : ""}
                        {...registrarPaso1("direccion", {
                          required: true,
                          minLength: {
                            value: 5,
                            message: "La dirección debe tener al menos 5 caracteres",
                          },
                          maxLength: 100,
                        })}
                      />
                      {erroresPaso1.direccion && (
                        <p className="mensaje-error">
                          {erroresPaso1.direccion.type === "required"
                            ? "La dirección es obligatoria"
                            : "La dirección debe tener al menos 5 caracteres"}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="navegacion-botones">
                    <button type="submit" className="boton-siguiente">
                      Siguiente
                    </button>
                  </div>
                </div>
              </form>
            ) : paso === 2 ? (
              // Formulario del paso 2: Datos de Acceso
              <form onSubmit={manejarEnvioPaso2(enviarPaso2)} id="formularioPaso2">
                <div className="contenido-paso">
                  <div className="grid-campos">
                    <div className="grupo-campo">
                      <label>
                        Email <span className="obligatorio">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="Ej: juan.lopez@example.com"
                        maxLength={320}
                        className={erroresPaso2.email ? "campo-error" : ""}
                        onPaste={evitarPegado}
                        {...registrarPaso2("email", {
                          required: true,
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "El correo electrónico es inválido",
                          },
                          maxLength: 320,
                        })}
                      />
                      {erroresPaso2.email && (
                        <p className="mensaje-error">
                          {erroresPaso2.email.type === "required"
                            ? "El email es obligatorio"
                            : "El formato del correo electrónico es inválido"}
                        </p>
                      )}
                    </div>

                    <div className="grupo-campo">
                      <label>
                        Confirmación Email <span className="obligatorio">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="Confirmar correo electrónico"
                        maxLength={320}
                        className={erroresPaso2.confirmEmail ? "campo-error" : ""}
                        onPaste={evitarPegado}
                        {...registrarPaso2("confirmEmail", {
                          required: true,
                          validate: (value) => {
                            const emailValue = observarPaso2("email")
                            return value === emailValue || "Los correos electrónicos no coinciden"
                          },
                          maxLength: 320,
                        })}
                      />
                      {erroresPaso2.confirmEmail && (
                        <p className="mensaje-error">
                          {erroresPaso2.confirmEmail.type === "required"
                            ? "La confirmación de email es obligatoria"
                            : "Los correos electrónicos no coinciden"}
                        </p>
                      )}
                    </div>

                    <div className="grupo-campo">
                      <label>
                        Contraseña <span className="obligatorio">*</span>
                      </label>
                      <div className="contenedor-input-password">
                        <input
                          type={verPassword ? "text" : "password"}
                          placeholder="Contraseña"
                          maxLength={64}
                          className={erroresPaso2.password ? "campo-error" : ""}
                          onPaste={evitarPegado}
                          onFocus={mostrarRequisitosPasswordAlFocus}
                          onBlur={ocultarRequisitosPasswordAlBlur}
                          {...registrarPaso2("password", {
                            required: true,
                            minLength: {
                              value: 8,
                              message: "La contraseña debe tener al menos 8 caracteres",
                            },
                            maxLength: 64,
                            pattern: {
                              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                              message:
                                "La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial",
                            },
                          })}
                        />
                        <button type="button" className="boton-toggle-password" onClick={cambiarVisibilidadPassword}>
                          {verPassword ? (
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
                              className="icono-ojo"
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
                              className="icono-ojo"
                            >
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          )}
                        </button>
                      </div>
                      {erroresPaso2.password && (
                        <p className="mensaje-error">
                          {erroresPaso2.password.type === "required"
                            ? "La contraseña es obligatoria"
                            : erroresPaso2.password.type === "minLength"
                              ? "La contraseña debe tener al menos 8 caracteres"
                              : "La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial"}
                        </p>
                      )}
                      {mostrarRequisitosPassword && (
                        <p className="mensaje-info">
                          La contraseña debe contener: al menos 8 caracteres, una mayúscula, una minúscula, un número y
                          un carácter especial (@$!%*?&)
                        </p>
                      )}
                    </div>

                    <div className="grupo-campo">
                      <label>
                        Confirmación Contraseña <span className="obligatorio">*</span>
                      </label>
                      <div className="contenedor-input-password">
                        <input
                          type={verConfirmarPassword ? "text" : "password"}
                          placeholder="Confirmar contraseña"
                          maxLength={64}
                          className={erroresPaso2.confirmPassword ? "campo-error" : ""}
                          onPaste={evitarPegado}
                          {...registrarPaso2("confirmPassword", {
                            required: true,
                            maxLength: 64,
                            validate: (value) => value === password || "Las contraseñas no coinciden",
                          })}
                        />
                        <button
                          type="button"
                          className="boton-toggle-password"
                          onClick={cambiarVisibilidadConfirmarPassword}
                        >
                          {verConfirmarPassword ? (
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
                              className="icono-ojo"
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
                              className="icono-ojo"
                            >
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          )}
                        </button>
                      </div>
                      {erroresPaso2.confirmPassword && (
                        <p className="mensaje-error">
                          {erroresPaso2.confirmPassword.type === "required"
                            ? "La confirmación de contraseña es obligatoria"
                            : "Las contraseñas no coinciden"}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grupo-campo checkbox campo-ancho-completo">
                    <input
                      type="checkbox"
                      id="terminos"
                      className={erroresPaso2.terminos ? "campo-error" : ""}
                      {...registrarPaso2("terminos", {
                        required: true,
                      })}
                    />
                    <label htmlFor="terminos">
                      Acepto los términos y condiciones <span className="obligatorio">*</span>
                    </label>
                    {erroresPaso2.terminos && <p className="mensaje-error">Debes aceptar los términos y condiciones</p>}
                  </div>

                  <div className="navegacion-botones">
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
              <div className="contenido-paso">
                <div className="verificacion-email">
                  <div className="icono-verificacion">
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

                  <h3 className="titulo-verificacion">Verifica tu correo electrónico</h3>

                  <p className="descripcion-verificacion">
                    Hemos enviado un código de verificación a <strong>{correoUsuario}</strong>. Por favor, introduce el
                    código de 6 dígitos para verificar tu cuenta.
                  </p>

                  <div className="contenedor-codigo">
                    {codigoIngresado.map((digito, indice) => (
                      <input
                        key={indice}
                        id={`codigo-input-${indice}`}
                        type="text"
                        maxLength="1"
                        className={`input-codigo ${errorCodigo ? "codigo-error" : ""}`}
                        value={digito}
                        onChange={(e) => manejarCambioCodigo(indice, e.target.value)}
                        onPaste={indice === 0 ? manejarPegadoCodigo : null}
                        autoFocus={indice === 0}
                      />
                    ))}
                  </div>

                  {errorCodigo && (
                    <p className="mensaje-error mensaje-error-codigo">
                      El código ingresado no es válido. Por favor, intenta nuevamente.
                    </p>
                  )}

                  <div className="contenedor-timer">
                    <p className="texto-timer">
                      Tiempo restante: <span className="contador-timer">{formatearTiempo(tiempoRestante)}</span>
                    </p>
                  </div>

                  <div className="botones-verificacion">
                    <button type="button" className="boton-verificar" onClick={verificarCodigo}>
                      Verificar
                    </button>

                    <button
                      type="button"
                      className="boton-reenviar"
                      onClick={reenviarCodigo}
                      disabled={timerActivo && tiempoRestante > 240} // Deshabilitar por 1 minuto
                    >
                      Reenviar código
                    </button>
                  </div>

                  <p className="ayuda-verificacion">
                    ¿No recibiste el código? Revisa tu carpeta de spam o solicita un nuevo código.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sección de inicio de sesión (solo visible en el paso 1) */}
          {paso === 1 && (
            <div className="seccion-login">
              <p className="texto-login">¿Ya haces parte de PetsHeaven?</p>
              <a href="/login" className="link">
                Inicia sesión
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


