// Librarys
import React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import "boxicons"

// Imports 
import "../../public/styles/formulario-registro.css"

// Component 
const FormularioRegistro = () => {
  // Vars 
  const [paso, setPaso] = useState(1)
  const password = watch("contrasena")
  const email = watch("email")

  // Functions
  const {register,handleSubmit,watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  })


  const avanzarPaso = () => {
    setPaso(2)
  }

  const retrocederPaso = () => {
    setPaso(1)
  }

  const onSubmit = (data) => {
    console.log(data)
    alert("Formulario enviado con éxito")
  }

  const handlePaste = (e) => {
    e.preventDefault()
  }
  return (
    <main className="page-container">
      <img src="../../public/imgs/1.png" alt="foto" className="logo-register"/>
      <a href="index.jsx"><box-icon name='left-arrow-alt' className="icon-arrow" ></box-icon></a>
      <div className="formulario-container">
        <div className="formulario-header">
          <h2>Registrarse</h2>
          <div className="pasos-indicador">
            <div className={`paso ${paso >= 1 ? "activo" : ""}`}>1</div>
            <div className="linea"></div>
            <div className={`paso ${paso >= 2 ? "activo" : ""}`}>2</div>
          </div>
          <p className="paso-descripcion">{paso === 1 ? "Información Personal" : "Datos de Acceso"}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {paso === 1 ? (
            <div className="paso-contenido">
              <div className="campos-grid">
                <div className="campo-formulario">
                  <label>Tipo de documento</label>
                  <select 
                    {...register("tipoDocumento", {
                      required: "El tipo de documento es obligatorio",
                    })}
                  >
                    <option value="" selected disabled>Seleccione...</option>
                    <option value="CC">Cédula de Ciudadanía (CC)</option>
                    <option value="CE">Cédula de Extranjería (CE)</option>
                  </select>
                  {errors.tipoDocumento && <span className="error">{errors.tipoDocumento.message}</span>}
                </div>

                <div className="campo-formulario">
                  <label>Número de documento</label>
                  <input
                    type="text"
                    placeholder="Ej: 65642312"
                    {...register("numeroDocumento", {
                      required: "El número de documento es obligatorio",
                      minLength: "6",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Solo se permiten números",
                      },
                    })}
                  />
                  {errors.numeroDocumento && <span className="error">{errors.numeroDocumento.message}</span>}
                </div>

                <div className="campo-formulario">
                  <label>Nombres</label>
                  <input
                    type="text"
                    placeholder="Ej: Pepito Juan"
                    {...register("nombres", {
                      required: "El nombre es obligatorio",
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
                  {errors.nombres && <span className="error">{errors.nombres.message}</span>}
                </div>

                <div className="campo-formulario">
                  <label>Apellidos</label>
                  <input
                    type="text"
                    placeholder="Ej: Lopez Perez"
                    {...register("apellidos", {
                      required: "El apellido es obligatorio",
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
                  {errors.apellidos && <span className="error">{errors.apellidos.message}</span>}
                </div>

                <div className="campo-formulario">
                  <label>Fecha de nacimiento</label>
                  <input
                    type="date"
                    {...register("fechaNacimiento", {
                      required: "La fecha de nacimiento es obligatoria",
                      validate: (value) => {
                        const fecha = new Date(value)
                        const hoy = new Date()
                        const edad = hoy.getFullYear() - fecha.getFullYear()
                        return edad >= 18 || "Debes ser mayor de 18 años"
                      },
                    })}
                  />
                  {errors.fechaNacimiento && <span className="error">{errors.fechaNacimiento.message}</span>}
                </div>
                <div className="campo-formulario">
                  <label>Genero</label>
                  <select
                    {...register("genero", {
                      required: "El genero es obligatorio",
                    })}
                  >
                    <option value="" selected disabled>Seleccione...</option>
                    <option value="CC">Femenino</option>
                    <option value="CE">Masculino</option>
                    <option value="CE">Otro</option>
                  </select>
                  {errors.genero && <span className="error">{errors.genero.message}</span>}
                </div>
                <div className="campo-formulario">
                  <label>Teléfono</label>
                  <input
                    type="text"
                    placeholder="Eje: 65642312"
                    {...register("telefono", {
                      required: "El teléfono es obligatorio",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "El teléfono debe tener 10 dígitos numéricos",
                      },
                    })}
                  />
                  {errors.telefono && <span className="error">{errors.telefono.message}</span>}
                </div>
                <div className="campo-formulario campo-ancho-completo">
                <label>Dirección</label>
                <input
                  type="text"
                  placeholder="Eje: Calle 123, Nro. 456"
                  {...register("direccion", {
                    required: "La dirección es obligatoria",
                    minLength: {
                      value: 5,
                      message: "La dirección debe tener al menos 5 caracteres",
                    },
                  })}
                />
                {errors.direccion && <span className="error">{errors.direccion.message}</span>}
                </div>
              </div>

              <div className="botones-navegacion">
                <button type="button" className="boton-siguiente" onClick={avanzarPaso}>
                  Siguiente
                </button>
              </div>
            </div>
          ) : (
            <div className="paso-contenido">
              <div className="campos-grid">
                <div className="campo-formulario">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="ej: juan.lopez@example.com"
                    onPaste={handlePaste}
                    {...register("email", {
                      required: "El correo electrónico es obligatorio",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "El correo electrónico es inválido",
                      },
                    })}
                  />
                  {errors.email && <span className="error">{errors.email.message}</span>}
                </div>

                <div className="campo-formulario">
                  <label>Confirmación Email</label>
                  <input
                    type="email"  
                    placeholder="Confirmar correo electrónico"
                    onPaste={handlePaste}
                    {...register("confirmEmail", {
                      required: "La confirmación de correo es obligatoria",  
                      validate: (value) => value === email || "Los correos electrónicos no coinciden",
                    })}
                  />
                  {errors.confirmEmail && <span className="error">{errors.confirmEmail.message}</span>}
                </div>

                <div className="campo-formulario">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    onPaste={handlePaste}
                    {...register("contrasena", {
                      required: "La contraseña es obligatoria",
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
                  {errors.contrasena && <span className="error">{errors.contrasena.message}</span>}
                </div>

                <div className="campo-formulario">
                  <label>Confirmación Contraseña</label>
                  <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    onPaste={handlePaste}
                    {...register("confirmContrasena", {
                      required: "La confirmación de contraseña es obligatoria",
                      validate: (value) => value === password || "Las contraseñas no coinciden",
                    })}
                  />
                  {errors.confirmContrasena && <span className="error">{errors.confirmContrasena.message}</span>}
                </div>
              </div>

              <div className="campo-formulario checkbox campo-ancho-completo">
                <input
                  type="checkbox"
                  id="terminos"
                  {...register("terminos", {
                    required: "Debes aceptar los términos y condiciones",
                  })}
                />
                <label htmlFor="terminos">Acepto los términos y condiciones</label>
                {errors.terminos && <span className="error">{errors.terminos.message}</span>}
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
          )}
        </form>
      </div>
    </main>
  )
}

export default FormularioRegistro;
