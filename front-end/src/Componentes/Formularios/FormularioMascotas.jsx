// Librarys
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../../supabaseClient";
import "../../../public/styles/Formularios/FormularioMascotas.css";

// Main component
const FormularioRegMascota = ({ onClose }) => {
  // States
  const [imagen, setImagen] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // Inicialmente sin previsualización
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form hook
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Effects
  useEffect(() => {
    if (imagen) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(imagen);
    } else {
      setPreviewUrl(null); // Limpiar la previsualización si no hay imagen
    }
  }, [imagen]);

  // Handlers
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleImagenChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagen(file);
    }
  };

  const handleRemoverImagen = () => {
    setImagen(null);
  };

  const onSubmit = async (formData) => {
    if (!imagen) {
      alert("Por favor selecciona una imagen");
      return;
    }

    setIsLoading(true);

    try {
      let publicUrl = null;

      // 1. Subir la imagen a Supabase Storage
      const fileExt = imagen.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('mascotas') // Usamos el bucket 'mascotas'
        .upload(fileName, imagen);

      if (uploadError) throw uploadError;

      // 2. Obtener URL pública de la imagen
      const { data: { publicUrl: url } } = supabase.storage
        .from('mascotas')
        .getPublicUrl(uploadData.path);
      publicUrl = url;

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
    <main className="loginContMascota">
      <section className="formContMascota">
        <article className="formCardMascota">
          <header className="formHeadMascota">
            <h1 className="formTituloMascota">Registrar Mascota</h1>
            <p className="formSubtituloMascota">Completa los datos de tu mascota</p>
          </header>

          {/* Contenedor superior para imagen y botones */}
          <div className="supContBotonesMascota">
            <div
              className="imgPrevContMascota contenedor-preview-m"
              onClick={handleIconClick}
              style={{
                backgroundImage: previewUrl ? `url(${previewUrl})` : null,
              }}
            >
              <input
                  id="imagen"
                  type="file"
                  onChange={handleImagenChange}
                  accept="image/*"
                  disabled={isLoading}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
              {!previewUrl && (
                <div className="iconoCargaMascota icono-carga-m">
                  {/* Texto dentro del círculo */}
                  Subir foto
                </div>
                
              )}
            </div>
            <div className="botonesMascota">
              <button type="button" className="btn-container secundary" onClick={onClose}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Cerrar
              </button>
              <button type="submit" className="btn-container primary" disabled={isLoading}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-save-icon lucide-save">
                  <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/>
                </svg>
                {isLoading ? <span className="spinner" aria-hidden="true"></span> : "Guardar"}
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="contPasoMascota">
              <legend className="sr-only">Información de la mascota</legend>

              {/* Campos del formulario debajo de la imagen */}
              <div className="grupoCampoMascota">
                <label htmlFor="nombre">Nombre de la mascota <span className="obligatorio-m">*</span></label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Nombre"
                  className={errors.nombre ? "campoErrorMascota campo-error-m" : ""}
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
                {errors.nombre && <p className="msjErrorMascota mensaje-error-m">{errors.nombre.message}</p>}
              </div>

              <div className="grupoCampoMascota">
                <label htmlFor="especie">Especie <span className="obligatorio-m">*</span></label>
                <select
                  id="especie"
                  className={errors.especie ? "campoErrorMascota campo-error-m" : ""}
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
                {errors.especie && <p className="msjErrorMascota mensaje-error-m">{errors.especie.message}</p>}
              </div>

              <div className="grupoCampoMascota">
                <label htmlFor="raza">Raza de la mascota <span className="obligatorio-m">*</span></label>
                <input
                  id="raza"
                  type="text"
                  placeholder="Raza"
                  className={errors.raza ? "campoErrorMascota campo-error-m" : ""}
                  {...register("raza", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.raza && <p className="msjErrorMascota mensaje-error-m">{errors.raza.message}</p>}
              </div>

              <div className="grupoCampoMascota">
                <label htmlFor="edad">Edad de la mascota <span className="obligatorio-m">*</span></label>
                <input
                  id="edad"
                  type="number"
                  placeholder="Edad (en años)"
                  className={errors.edad ? "campoErrorMascota campo-error-m" : ""}
                  {...register("edad", {
                    required: "Este campo es obligatorio",
                    min: {
                      value: 0,
                      message: "La edad debe ser mayor o igual a 0",
                    },
                  })}
                />
                {errors.edad && <p className="msjErrorMascota mensaje-error-m">{errors.edad.message}</p>}
              </div>

              <div className="grupoCampoMascota">
                <label htmlFor="peso">Peso de la mascota <span className="obligatorio-m">*</span></label>
                <input
                  id="peso"
                  type="number"
                  placeholder="Peso (en kg)"
                  className={errors.peso ? "campoErrorMascota campo-error-m" : ""}
                  {...register("peso", {
                    required: "Este campo es obligatorio",
                    min: {
                      value: 0,
                      message: "El peso debe ser mayor o igual a 0",
                    },
                  })}
                />
                {errors.peso && <p className="msjErrorMascota mensaje-error-m">{errors.peso.message}</p>}
              </div>

              <div className="grupoCampoMascota">
                <label htmlFor="sexo">Sexo de la mascota <span className="obligatorio-m">*</span></label>
                <select
                  id="sexo"
                  className={errors.sexo ? "campoErrorMascota campo-error-m" : ""}
                  {...register("sexo", {
                    required: "Este campo es obligatorio",
                  })}
                >
                  <option value="">Selecciona el sexo</option>
                  <option value="F">Femenino</option>
                  <option value="M">Masculino</option>
                </select>
                {errors.sexo && <p className="msjErrorMascota mensaje-error-m">{errors.sexo.message}</p>}
              </div>

              <div className="grupoCampoMascota">
                <label htmlFor="idPropietario">Número de identidad <span className="obligatorio-m">*</span></label>
                <input
                  id="idPropietario"
                  type="text"
                  placeholder="ID del propietario"
                  className={errors.idPropietario ? "campoErrorMascota campo-error-m" : ""}
                  {...register("idPropietario", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.idPropietario && <p className="msjErrorMascota mensaje-error-m">{errors.idPropietario.message}</p>}
              </div>

            </fieldset>
          </form>
        </article>
      </section>
    </main>
  );
}

export default FormularioRegMascota;