// Librarys
import React from "react"
import { useForm } from "react-hook-form"
import "boxicons"

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

    // Labels
    return (
        <main>
            <picture>
                <img className="logo" src="../../public/imgs/1.png" alt="logo"/>
            </picture>
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
                <a className="link" href="#">¿Olvidaste tu contraseña?</a>
                <button type="submit" className="boton-enviar">Entrar</button>
                <a className="link" href="registro-usuario.html">¿No tienes una cuenta?</a>
            </form>
            <form className="inactive">
            </form>
        </main>
    )
}