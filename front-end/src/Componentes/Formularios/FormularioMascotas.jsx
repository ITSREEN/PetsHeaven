
import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../supabaseClient";
import { Link } from 'react-router';

  const FormularioMascotas = () => {
  const imagenFondo = "/imgs/fondo.png";
  const logoUrl = "/imgs/1.png";
  const [imagen, setImagen] = useState(null);
  const [urlImagen, setUrlImagen] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (datos) => {
    if (!imagen) return;

    setIsLoading(true);
    try {
      // Genera un nombre único para el archivo
      const fileExt = imagen.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Sube el archivo al bucket 'mascotas'
      const { data, error: uploadError } = await supabase.storage
        .from('mascotas')
        .upload(filePath, imagen);

      if (uploadError) throw uploadError;

      // Obtiene la URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('mascotas')
        .getPublicUrl(data.path);

      setUrlImagen(publicUrl);
      alert('¡Imagen de mascota subida con éxito!');
      console.log("Datos del formulario:", datos);
    } catch (error) {
      console.error('Error:', error);
      alert(`Error al subir: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-formulario-container">
        <div className="contenedor-logo-externo">
          <img src={logoUrl || "/placeholder.svg"} alt="Logo PetsHeaven" className="logo-veterinaria" />
        </div>

        {/* Contenedor del formulario */}
        <div className="formulario-card">
          <div className="contenido-formulario">
            <div className="encabezado-formulario">
              <h2 className="titulo-formulario">Registrar Mascota</h2>
              <p className="subtitulo-formulario">Completa los datos de tu mascota</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="contenido-paso">
                <div className="grupo-campo">
                  <label>
                    Nombre de la mascota <span className="obligatorio">*</span>
                  </label>
                  <input
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

                <div className="grupo-campo">
                  <label>
                    Especie <span className="obligatorio">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Perro, Gato, etc."
                    className={errors.especie ? "campo-error" : ""}
                    {...register("especie", {
                      required: "Este campo es obligatorio",
                    })}
                  />
                  {errors.especie && <p className="mensaje-error">{errors.especie.message}</p>}
                </div>

                <div className="grupo-campo">
                  <label>
                    Imagen de la mascota <span className="obligatorio">*</span>
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setImagen(e.target.files[0])}
                    accept="image/*"
                    disabled={isLoading}
                    className={!imagen && errors?.imagen ? "campo-error" : ""}
                  />
                  {!imagen && errors?.imagen && (
                    <p className="mensaje-error">Debes subir una imagen</p>
                  )}
                </div>

                <button type="submit" className="boton-login" disabled={isLoading}>
                  {isLoading ? "Subiendo..." : "Registrar Mascota"}
                </button>

                {urlImagen && (
                  <div className="imagen-subida-container">
                    <img src={urlImagen} alt="Mascota" className="imagen-mascota" />
                    <p className="url-imagen">Imagen subida correctamente</p>
                  </div>
                )}

                <div className="enlaces-container">
                  <Link to="/mis-mascotas" className="enlace">
                    Ver mis mascotas
                  </Link>
                  <Link to="/" className="enlace">
                    Volver al inicio
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Sección derecha - Imagen y cita */}
      <div className="login-imagen-container">
        <div className="imagen-fondo-contenedor">
          <img src={imagenFondo || "/placeholder.svg"} alt="Imagen de fondo" className="imagen-fondo" />
        </div>
        <div className="overlay-imagen"></div>
        <div className="contenedor-cita">
          <h2 className="texto-cita">"El amor por los animales es el reflejo de nuestra humanidad"</h2>
          <p className="subtexto-cita">En PetsHeaven cuidamos de quienes más amas</p>
        </div>
      </div>
    </div>
  );
};

export default FormularioMascotas;