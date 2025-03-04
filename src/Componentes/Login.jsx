import React from "react"
import { useForm } from "react-hook-form"

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
                <img src="" alt="" />
            </picture>
            <form className="login" onSubmit={handleSubmit(onSubmit)}>
                <span className="title">
                    <h1>Login</h1>
                </span>
                <span className="campo-formulario">
                    <p>Documento o Email</p>
                    <input type="text" name="docEmail" id="docEmail" {
                        ...register("docEmail",{
                            required: "Este campo es obligatorio",
                            minLength: {
                                value:6,
                                message: "Debe contener mas de 6 caractéres"
                            }
                        })
                    }/>
                    { errors.docEmail && <p>{errors.docEmail.message}</p> }
                </span>
                <span className="campo-formulario">
                    <p>Password</p>
                    <input type="password" name="password" id="password" {...register("passw",{
                        required: "Este campo es obligatorio",
                        minLength:{
                            value:8,
                            message:"La contraseña debe ser mayor a 8 caractéres"
                        }
                    })}/>
                    { errors.passw && <span className="error">{errors.passw.message}</span> }
                </span>
                <span>
                    <a href="#">¿Forgot you password?</a>
                </span>
                <button type="submit" className="send">Send</button>
            </form>
        </main>
    )
}

export default LoginForm