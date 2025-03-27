import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../public/styles/RegistroMascota.css";

const RegistroMascota = () => {
  const [imageUrl, setImageUrl] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("foto", data.foto[0]); // Suponiendo que el input se llama "foto"
    formData.append("nombre", data.nombre);
    formData.append("especie", data.especie);
    formData.append("raza", data.raza);
    formData.append("edad", data.edad);
    formData.append("peso", data.peso);

    // Enviar la imagen al backend
    const response = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (result.success) {
      setImageUrl(result.imageUrl); 
    } else {
      console.log("Error al cargar la imagen");
    }
  };

  return (
    <div className="conteiner">
      <div className="registro-mascota-container">
        <h2>Registro de Mascota</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campos de formulario para la mascota */}
          <div className="campo-formulario">
            <label>Foto:</label>
            <input
              type="file"
              {...register("foto", { required: "La foto es obligatoria" })}
            />
            {errors.foto && <span className="error">{errors.foto.message}</span>}
          </div>

          <div className="campo-formulario">
            <label>Nombre:</label>
            <input
              type="text"
              placeholder="Nombre"
              {...register("nombre", {
                required: "El nombre es obligatorio",
                minLength: { value: 3, message: "El nombre debe tener al menos 3 caracteres" },
              })}
            />
            {errors.nombre && <span className="error">{errors.nombre.message}</span>}
          </div>

          {/* Otros campos de formulario */}
          
          <button type="submit">Registrar</button>
        </form>

        {/* Mostrar imagen cargada */}
        {imageUrl && (
          <div>
            <h3>Foto de la mascota</h3>
            <img src={imageUrl} alt="Foto de la mascota" />
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistroMascota;
