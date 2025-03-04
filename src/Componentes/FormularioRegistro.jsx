import { useState } from "react"
import { useForm } from "react-hook-form"
import "../Stylos/formulario-registro.css"

function FormularioRegistro() {
  const [paso, setPaso] = useState(1)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  })

  // Para validar que las contraseñas coincidan
  const password = watch("contrasena")
  // Para validar que los emails coincidan
  const email = watch("email")

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

  return (
    <div className="page-container">
      <div className="formulario-container">
        <div className="formulario-header">
          <h2>Registro de Usuario</h2>
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
                    <option value="">Seleccione...</option>
                    <option value="CC">Cédula de Ciudadanía (CC)</option>
                    <option value="CE">Cédula de Extranjería (CE)</option>
                  </select>
                  {errors.tipoDocumento && <span className="error">{errors.tipoDocumento.message}</span>}
                </div>

                <div className="campo-formulario">
                  <label>Número de documento</label>
                  <input
                    type="text"
                    placeholder="Número de documento"
                    {...register("numeroDocumento", {
                      required: "El número de documento es obligatorio",
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
                    placeholder="Nombres"
                    {...register("nombres", {
                      required: "El nombre es obligatorio",
                      minLength: {
                        value: 3,
                        message: "El nombre debe tener al menos 3 caracteres",
                      },
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
                    placeholder="Apellidos"
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
                  <label>Teléfono</label>
                  <input
                    type="text"
                    placeholder="Teléfono"
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
              </div>

              <div className="campo-formulario campo-ancho-completo">
                <label>Dirección</label>
                <input
                  type="text"
                  placeholder="Dirección"
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
                    placeholder="Correo electrónico"
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
    </div>
  )
}

export default FormularioRegistro;

