// Librarys
import React from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router"
import "boxicons"

// Style
import "../../public/styles/login.css"

// Components 
export const LoginForm = () => {
    // Functions
    const {
        register,handleSubmit,watch,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    })

    const onSubmit = (data) => {
        alert("Validando Datos")
    }

    const showPass = () => {
        const pass = document.getElementById("password")
        pass.type === "text"?pass.type = "password":pass.type = "text"
    }

    const LoginFondo = "/imgs/fondo.png" 

    // Labels
    return (
        <main className="main-container">

            {/* foto derecha login  */}
            <div className="login-imagen-container">
                <div className="login-fondo-contenedor">
                    <img src={LoginFondo || "/placeholder.svg"} alt="Imagen de fondo" className="login-fondo" />
                </div>
                <div className="overlay-login"></div>
                <div className="contenedor-login">
                    <h2 className="texto-login">"El amor por los animales es el reflejo de nuestra humanidad"</h2>
                    <p className="subtexto-login">En PetsHeaven cuidamos de quienes más amas</p>
                </div>
            </div>


            {/* inicio formulario */}
            <form className="login" onSubmit={handleSubmit(onSubmit)}>
                <span className="title">
                    <h1>Iniciar Sesion</h1>
                </span>
                <span className="campo-formulario">
                    <p>Documento o Email</p>
                    <box-icon className="icon" name='user-circle'></box-icon>
                    <input className="input" type="text" placeholder="Número de doc o email" name="docEmail" id="docEmail" {
                        ...register("docEmail",{
                            required: "Este campo es obligatorio",
                            minLength: {
                                value:6,
                                message: "Debe contener mas de 6 caractéres"
                            },
                            maxLength: {
                                value:100,
                                message: "Debe contener menos de 100 caractéres"
                            }
                        })
                    }/>
                    { errors.docEmail && <span className="error">{errors.docEmail.message}</span> }
                </span>
                <span className="campo-formulario">
                    <p>Contraseña</p>
                    <span className="icon" onClick={showPass}>
                        <box-icon type='solid' name='lock'></box-icon>
                    </span>
                    <input className="input" type="password" placeholder="Contraseña" name="password" id="password" {...
                    register("passw",{  // Validate 
                        required: "Este campo es obligatorio",
                        minLength:{
                            value:8,
                            message:"La contraseña debe ser mayor a 8 caractéres"
                        },
                        maxLength: {
                            value:100,
                            message: "Debe contener menos de 100 caractéres"
                        }
                    })}/>
                    { errors.passw && <span className="error">{errors.passw.message}</span> }
                </span>
                <Link to="/login" className="link">¿Olvidaste tu contraseña?</Link>
                <a className="link" href="#"></a>
                <button type="submit" className="boton-enviar">Entrar</button>
                <Link to="/register" className="link">¿No tienes una cuenta?</Link>
            </form>
            <form className="inactive">
            </form>
        </main>
    )
}