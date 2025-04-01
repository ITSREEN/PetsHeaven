import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../supabaseClient"; // Usamos Supabase para almacenar la imagen y los datos
import "../../public/styles/FormularioMascotas.css";

const FormularioMascotas = () => {
  const imagenFondo = "/imgs/fondo.png";
  const logoUrl = "/imgs/1.png";
  const [imagen, setImagen] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    if (!imagen) {
      alert("Por favor selecciona una imagen");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Subir la imagen a Supabase Storage
      const fileExt = imagen.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('mascotas') // Usamos el bucket 'mascotas'
        .upload(fileName, imagen);

      if (uploadError) throw uploadError;

      // 2. Obtener URL pública de la imagen
      const { data: { publicUrl } } = supabase.storage
        .from('mascotas')
        .getPublicUrl(uploadData.path);

      // 3. Insertar datos en la base de datos de PetsHeaven (tabla 'mascotas')
      const { error: dbError } = await supabase
        .from('mascotas')
        .insert([{
          imagen_url: publicUrl,
          creado_en: createdAt, 
        }]);

      if (dbError) throw dbError;

      alert('¡Mascota registrada con éxito!');
      window.location.href = '/mis-mascotas'; // Redirigir a la página "Mis Mascotas"
      
    } catch (error) {
      console.error('Error:', error);
      alert(`Error al registrar: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-formulario-container">
        <div className="contenedor-logo-externo">
          <img
            src={logoUrl || "/placeholder.svg"}
            alt="Logo PetsHeaven"
            className="logo-veterinaria"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder.svg";
            }}
          />
        </div>

        <div className="formulario-card">
          <div className="contenido-formulario">
            <div className="encabezado-formulario">
              <h2 className="titulo-formulario">Registrar Mascota</h2>
              <p className="subtitulo-formulario">Completa los datos de tu mascota</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="contenido-paso">
                {/* Campo Nombre */}
                <div className="grupo-campo">
                  <label htmlFor="nombre">Nombre de la mascota <span className="obligatorio">*</span></label>
                  <input
                    id="nombre"
                    type="text"
                    placeholder="Nombre"
                    className={errors.nombre ? "campo-error" : ""}
                    {...register("nombre", {
                      required: "Este campo es obligatorio",
                      minLength: {
                        value: 2,
                        message: "Debe contener al menos 2 caracteres",
                      },
                      maxLength: {
                        value: 50,
                        message: "Debe contener menos de 50 caracteres",
                      },
                    })}
                  />
                  {errors.nombre && <p className="mensaje-error">{errors.nombre.message}</p>}
                </div>

                {/* Campo Especie */}
                <div className="grupo-campo">
                  <label htmlFor="especie">Especie <span className="obligatorio">*</span></label>
                  <select
                    id="especie"
                    className={errors.especie ? "campo-error" : ""}
                    {...register("especie", {
                      required: "Este campo es obligatorio",
                    })}
                  >
                    <option value="">Selecciona una especie</option>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                    <option value="Ave">Ave</option>
                    <option value="Roedor">Roedor</option>
                    <option value="Reptil">Reptil</option>
                    <option value="Otro">Otro</option>
                  </select>
                  {errors.especie && <p className="mensaje-error">{errors.especie.message}</p>}
                </div>

                {/* Campo Raza */}
                <div className="grupo-campo">
                  <label htmlFor="raza">Raza de la mascota <span className="obligatorio">*</span></label>
                  <input
                    id="raza"
                    type="text"
                    placeholder="Raza"
                    className={errors.raza ? "campo-error" : ""}
                    {...register("raza", {
                      required: "Este campo es obligatorio",
                    })}
                  />
                  {errors.raza && <p className="mensaje-error">{errors.raza.message}</p>}
                </div>

                {/* Campo Edad */}
                <div className="grupo-campo">
                  <label htmlFor="edad">Edad de la mascota <span className="obligatorio">*</span></label>
                  <input
                    id="edad"
                    type="number"
                    placeholder="Edad (en años)"
                    className={errors.edad ? "campo-error" : ""}
                    {...register("edad", {
                      required: "Este campo es obligatorio",
                      min: {
                        value: 0,
                        message: "La edad debe ser mayor o igual a 0",
                      },
                    })}
                  />
                  {errors.edad && <p className="mensaje-error">{errors.edad.message}</p>}
                </div>

                {/* Campo Peso */}
                <div className="grupo-campo">
                  <label htmlFor="peso">Peso de la mascota <span className="obligatorio">*</span></label>
                  <input
                    id="peso"
                    type="number"
                    placeholder="Peso (en kg)"
                    className={errors.peso ? "campo-error" : ""}
                    {...register("peso", {
                      required: "Este campo es obligatorio",
                      min: {
                        value: 0,
                        message: "El peso debe ser mayor o igual a 0",
                      },
                    })}
                  />
                  {errors.peso && <p className="mensaje-error">{errors.peso.message}</p>}
                </div>

                {/* Campo Sexo */}
                <div className="grupo-campo">
                  <label htmlFor="sexo">Sexo de la mascota <span className="obligatorio">*</span></label>
                  <select
                    id="sexo"
                    className={errors.sexo ? "campo-error" : ""}
                    {...register("sexo", {
                      required: "Este campo es obligatorio",
                    })}
                  >
                    <option value="">Selecciona el sexo</option>
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                  </select>
                  {errors.sexo && <p className="mensaje-error">{errors.sexo.message}</p>}
                </div>

                {/* Campo ID Propietario */}
                <div className="grupo-campo">
                  <label htmlFor="idPropietario">Numero de identidad <span className="obligatorio">*</span></label>
                  <input
                    id="idPropietario"
                    type="text"
                    placeholder="ID del propietario"
                    className={errors.idPropietario ? "campo-error" : ""}
                    {...register("idPropietario", {
                      required: "Este campo es obligatorio",
                    })}
                  />
                  {errors.idPropietario && <p className="mensaje-error">{errors.idPropietario.message}</p>}
                </div>

                {/* Campo Imagen */}
                <div className="grupo-campo">
                  <label htmlFor="imagen">Imagen de la mascota <span className="obligatorio">*</span></label>
                  <input
                    id="imagen"
                    type="file"
                    onChange={(e) => setImagen(e.target.files[0])}
                    accept="image/*"
                    disabled={isLoading}
                    className={!imagen ? "campo-error" : ""}
                  />
                  {!imagen && <p className="mensaje-error">Debes subir una imagen</p>}
                  {imagen && (
                    <div className="imagen-preview">
                      <p>Imagen seleccionada: {imagen.name}</p>
                      <button 
                        type="button" 
                        className="btn-eliminar-imagen"
                        onClick={() => setImagen(null)}
                      >
                        Cambiar imagen
                      </button>
                    </div>
                  )}
                </div>

                {/* Botón de enviar */}
                <button 
                  type="submit" 
                  className="boton-login" 
                  disabled={isLoading}
                  aria-busy={isLoading}
                >
                  {isLoading ? (
                    <span className="spinner"></span>
                  ) : (
                    "Registrar Mascota"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioMascotas;
