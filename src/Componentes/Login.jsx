import React from "react"
import { useForm } from "react-hook-form"
import "boxicons"

const LoginForm = () => {
    const {register,handleSubmit,watch,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    })

    const onSubmit = (data) => {
        console.log(data)
        alert("Validando Datos")
    }

    return (
        <main>
            <picture>
                <img src="../../public/imgs/1.png" alt="logo" />
            </picture>
            <form className="login" onSubmit={handleSubmit(onSubmit)}>
                <span className="title">
                    <h1>Iniciar Sesion</h1>
                </span>
                <span className="campo-formulario">
                    <p>Documento o Email</p>
                    <box-icon className="icon" name='user-circle'></box-icon>
                    <input type="text" name="docEmail" id="docEmail" {
                        ...register("docEmail",{
                            required: "Este campo es obligatorio",
                            minLength: {
                                value:6,
                                message: "Debe contener mas de 6 caractéres"
                            }
                        })
                    }/>
                    { errors.docEmail && <span className="error">{errors.docEmail.message}</span> }
                </span>
                <span className="campo-formulario">
                    <p>Contraseña</p>
                    <box-icon className="icon" type='solid' name='lock'></box-icon>
                    <input type="password" name="password" id="password" {...register("passw",{
                        required: "Este campo es obligatorio",
                        minLength:{
                            value:8,
                            message:"La contraseña debe ser mayor a 8 caractéres"
                        }
                    })}/>
                    { errors.passw && <span className="error">{errors.passw.message}</span> }
                </span>
                <span className="link"><a href="#">¿Olvidaste tu contraseña?</a></span>
                <button type="submit" className="boton-enviar">Entrar</button>
                <span className="link"><a href="registro-usuario.html">¿No tienes una cuenta?</a></span>
            </form>
        </main>
    )
}

export default LoginForm