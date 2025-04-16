// Librarys
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../../supabaseClient";
import "../../../public/styles/Formularios/FormularioMascotas.css";

const DEFAULT_IMAGE_URL = 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Logos/default_veterinario.png';

// Main component
const FormularioMascotas = ({ onClose }) => { // Agregamos onClose como prop para el botón cerrar
  const [imagen, setImagen] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(DEFAULT_IMAGE_URL);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (imagen) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(imagen);
    } else {
      setPreviewUrl(DEFAULT_IMAGE_URL);
    }
  }, [imagen]);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagen(file);
    }
  };

  const handleRemoveImage = () => {
    setImagen(null);
  };

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
          ...formData, // Incluimos los otros datos del formulario
          imagen_url: publicUrl,
          creado_en: new Date().toISOString(),
        }]);

      if (dbError) throw dbError;

      alert('¡Mascota registrada con éxito!');
      // Puedes agregar aquí lógica para cerrar el formulario o redirigir
      if (onClose) {
        onClose(); // Llama a la función onClose si se proporciona
      }

    } catch (error) {
      console.error('Error:', error);
      alert(`Error al registrar: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <main className="login-container-m">
      <section className="login-formulario-container-m">
        <article className="formulario-card-m">
          <header className="encabezado-formulario-m">
            <h1 className="titulo-formulario-m">Registrar Mascota</h1>
            <p className="subtitulo-formulario-m">Completa los datos de tu mascota</p>
          </header>

          {/* Contenedor de botones superior */}
          <div className="contenedor-botones-superior-m">
                    <div
                    className="contenedor-preview-m-circular" // Nueva clase para el círculo
                    onClick={handleIconClick}
                    style={{
                      backgroundImage: `url(${previewUrl})`,
                    }}
                  >
                    {previewUrl === DEFAULT_IMAGE_URL && (
                      <div className="icono-carga-m">
                        {/* Puedes agregar aquí un icono SVG o texto que represente la carga */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '40%', height: '40%', opacity: 0.7 }}>
                          
                        </svg>
                      </div>
                    )}
                  </div>
            <button type="button" className="boton-cerrar-m" onClick={onClose}>
              Cerrar
            </button>
            <button type="submit" className="boton-guardar-m" disabled={isLoading}>
              {isLoading ? <span className="spinner" aria-hidden="true"></span> : "Guardar"}
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="contenido-paso-m">
              <legend className="sr-only">Información de la mascota</legend>

              {/* Campo Imagen (al principio) */}
              <div className="grupo-campo-completo">
                <div className="contenedor-imagen-carga-m">
                  <input
                    id="imagen"
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    disabled={isLoading}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    className={!imagen ? "campo-error-m" : ""}
                  />
                  {imagen && (
                    <div className="opciones-imagen-m">
                      <button
                        type="button"
                        className="btn-eliminar-imagen-m"
                        onClick={handleRemoveImage}
                        disabled={isLoading}
                      >
                        Cambiar imagen
                      </button>
                      <p className="nombre-archivo-m">Archivo: {imagen.name}</p>
                    </div>
                  )}
                  {!imagen && <p className="mensaje-error-m">Debes subir una imagen</p>}
                </div>
              </div>

              {/* Campos del formulario debajo de la imagen */}
              <div className="grupo-campo-m">
                <label htmlFor="nombre">Nombre de la mascota <span className="obligatorio-m">*</span></label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Nombre"
                  className={errors.nombre ? "campo-error-m" : ""}
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
                {errors.nombre && <p className="mensaje-error-m">{errors.nombre.message}</p>}
              </div>

              <div className="grupo-campo-m">
                <label htmlFor="especie">Especie <span className="obligatorio-m">*</span></label>
                <select
                  id="especie"
                  className={errors.especie ? "campo-error-m" : ""}
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
                {errors.especie && <p className="mensaje-error-m">{errors.especie.message}</p>}
              </div>

              <div className="grupo-campo-m">
                <label htmlFor="raza">Raza de la mascota <span className="obligatorio-m">*</span></label>
                <input
                  id="raza"
                  type="text"
                  placeholder="Raza"
                  className={errors.raza ? "campo-error-m" : ""}
                  {...register("raza", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.raza && <p className="mensaje-error-m">{errors.raza.message}</p>}
              </div>

              <div className="grupo-campo-m">
                <label htmlFor="edad">Edad de la mascota <span className="obligatorio-m">*</span></label>
                <input
                  id="edad"
                  type="number"
                  placeholder="Edad (en años)"
                  className={errors.edad ? "campo-error-m" : ""}
                  {...register("edad", {
                    required: "Este campo es obligatorio",
                    min: {
                      value: 0,
                      message: "La edad debe ser mayor o igual a 0",
                    },
                  })}
                />
                {errors.edad && <p className="mensaje-error-m">{errors.edad.message}</p>}
              </div>

              <div className="grupo-campo-m">
                <label htmlFor="peso">Peso de la mascota <span className="obligatorio-m">*</span></label>
                <input
                  id="peso"
                  type="number"
                  placeholder="Peso (en kg)"
                  className={errors.peso ? "campo-error-m" : ""}
                  {...register("peso", {
                    required: "Este campo es obligatorio",
                    min: {
                      value: 0,
                      message: "El peso debe ser mayor o igual a 0",
                    },
                  })}
                />
                {errors.peso && <p className="mensaje-error-m">{errors.peso.message}</p>}
              </div>

              <div className="grupo-campo-m">
                <label htmlFor="sexo">Sexo de la mascota <span className="obligatorio-m">*</span></label>
                <select
                  id="sexo"
                  className={errors.sexo ? "campo-error-m" : ""}
                  {...register("sexo", {
                    required: "Este campo es obligatorio",
                  })}
                >
                  <option value="">Selecciona el sexo</option>
                  <option value="F">Femenino</option>
                  <option value="M">Masculino</option>
                </select>
                {errors.sexo && <p className="mensaje-error-m">{errors.sexo.message}</p>}
              </div>

              <div className="grupo-campo-m">
                <label htmlFor="idPropietario">Número de identidad <span className="obligatorio-m">*</span></label>
                <input
                  id="idPropietario"
                  type="text"
                  placeholder="ID del propietario"
                  className={errors.idPropietario ? "campo-error-m" : ""}
                  {...register("idPropietario", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.idPropietario && <p className="mensaje-error-m">{errors.idPropietario.message}</p>}
              </div>

            </fieldset>
          </form>
        </article>
      </section>
    </main>
  );
}

export default FormularioMascotas;