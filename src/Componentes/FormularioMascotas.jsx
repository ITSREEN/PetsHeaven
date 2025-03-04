import { useForm } from "react-hook-form";
import "../Stylos/RegistroMascota.css";

const RegistroMascota = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Datos de la mascota:", data);
  };

  return (
    <div className="conteiner"> 
    <div className="registro-mascota-container">
      <h2>Registro de Mascota</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="campo-formulario">
        <label>Foto:</label>
        <input
          type="file"
          {...register("foto", {
            required: "La foto es obligatoria",
          })}
        />
        {errors.foto && (
          <span className="error">{errors.foto.message}</span>
        )}
      </div>

      <div className="campo-formulario">
        <label>Nombre:</label>
        <input
          type="text"
          placeholder="Nombre"
          {...register("nombre", {
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
        {errors.nombre && (
          <span className="error">{errors.nombre.message}</span>
        )}
      </div>

      <div className="campo-formulario">
        <label>Especie:</label>
        <input
          type="text"
          placeholder="Especie"
          {...register("especie", {
            required: "La especie es obligatoria",
            minLength: {
              value: 3,
              message: "La especie debe tener al menos 3 caracteres",
            },
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
              message: "La especie solo puede contener letras y espacios",
            },
          })}
        />
        {errors.especie && (
          <span className="error">{errors.especie.message}</span>
        )}
      </div>

      <div className="campo-formulario">
        <label>Raza:</label>
        <input
          type="text"
          placeholder="Raza"
          {...register("raza", {
            required: "La raza es obligatoria",
            minLength: {
              value: 3,
              message: "La raza debe tener al menos 3 caracteres",
            },
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
              message: "La raza solo puede contener letras y espacios",
            },
          })}
        />
        {errors.raza && (
          <span className="error">{errors.raza.message}</span>
        )}
      </div>

      <div className="campo-formulario">
        <label>Edad:</label>
        <input
          type="number"
          placeholder="Edad"
          {...register("edad", {
            required: "La edad es obligatoria",
            min: {
              value: 0,
              message: "La edad debe ser un número válido",
            },
          })}
        />
        {errors.edad && (
          <span className="error">{errors.edad.message}</span>
        )}
      </div>

      <div className="campo-formulario">
        <label>Peso (kg):</label>
        <input
          type="number"
          step="0.1"
          placeholder="Peso"
          {...register("peso", {
            required: "El peso es obligatorio",
            min: {
              value: 0,
              message: "El peso debe ser un número válido",
            },
          })}
        />
        {errors.peso && (
          <span className="error">{errors.peso.message}</span>
        )}
      </div>

        <button type="submit">Registrar</button>
      </form>
    </div>
     </div>
    
  );
};

export default RegistroMascota;
