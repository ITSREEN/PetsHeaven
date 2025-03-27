import React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import '../../public/styles/ForgotPassword.css'

const ForgotPassword = () => {

  const imagenFondo = "/imgs/fondo.png" // Ruta desde la carpeta public
  const logoUrl = "/imgs/1.png" // Ruta desde la carpeta public

  // Estados para controlar el envío del formulario
  const [enviando, setEnviando] = useState(false)
  const [exito, setExito] = useState(false)
  const [emailEnviado, setEmailEnviado] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  })

  const onSubmit = (datos) => {
    setEnviando(true)
    console.log("Datos de recuperación:", datos)

    //(reemplazar con llamada a API real)
    setTimeout(() => {
      setEnviando(false)
      setExito(true)
      setEmailEnviado(datos.email)
    }, 1500)
  }

  return (
    <div className="forgot-container">
      <div className="forgot-formulario-container">
        <div className="contenedor-logo-externo">
          <img src={logoUrl || "/placeholder.svg"} alt="Logo PetsHeaven" className="logo-veterinaria" />
        </div>

        {/* Contenedor del formulario */}
        <div className="formulario-card">
          <div className="contenido-formulario">
            <div className="encabezado-formulario">
              <h2 className="titulo-formulario">Recuperar Contraseña</h2>
              <p className="subtitulo-formulario">
                Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="contenido-paso">
                <div className="grupo-campo">
                  <label>
                    Correo Electrónico <span className="obligatorio">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Ingresa tu correo electrónico"
                    className={errors.email ? "campo-error" : ""}
                    {...register("email", {
                      required: "Este campo es obligatorio",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Ingresa un correo electrónico válido",
                      },
                    })}
                  />
                  {errors.email && <p className="mensaje-error">{errors.email.message}</p>}
                </div>

                {exito && (
                  <div className="mensaje-exito">
                    Se ha enviado un correo a <strong>{emailEnviado}</strong> con instrucciones para restablecer tu
                    contraseña.
                  </div>
                )}

                <button type="submit" className="boton-recuperar" disabled={enviando || exito}>
                  {enviando ? "Enviando..." : exito ? "Correo Enviado" : "Enviar"}
                </button>

                <div className="enlaces-container">
                  <a href="/login" className="enlace">
                    Volver a Iniciar Sesión
                  </a>
                  <a href="/registro" className="enlace">
                    ¿No tienes una cuenta? Regístrate
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Sección derecha - Imagen y cita */}
      <div className="forgot-imagen-container">
        <div className="imagen-fondo-contenedor">
          <img src={imagenFondo || "/placeholder.svg"} alt="Imagen de fondo" className="imagen-fondo" />
        </div>
        <div className="overlay-imagen"></div>
        <div className="contenedor-cita">
          <h2 className="texto-cita">"El amor por los animales es el reflejo de nuestra humanidad"</h2>
          <p className="subtexto-cita">En PetsHeaven cuidamos de quienes más amas</p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword

