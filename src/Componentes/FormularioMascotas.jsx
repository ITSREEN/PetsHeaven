import { useForm } from "react-hook-form";
import "../Stylos/RegistroMascota.css";

const RegistroMascota = () => {
  const {
    register,
    handleSubmit,
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
        <label>Foto:</label>
        <input type="file" {...register("foto", { required: true })} />
        {errors.foto && <span className="error">La foto es obligatoria</span>}

        <label>Nombre:</label>
        <input type="text" {...register("nombre", { required: true })} />
        {errors.nombre && <span className="error">El nombre es obligatorio</span>}

        <label>Especie:</label>
        <input type="text" {...register("especie", { required: true })} />
        {errors.especie && <span className="error">La especie es obligatoria</span>}

        <label>Raza:</label>
        <input type="text" {...register("raza", { required: true })} />
        {errors.raza && <span className="error">La raza es obligatoria</span>}

        <label>Edad:</label>
        <input type="number" {...register("edad", { required: true, min: 0 })} />
        {errors.edad && <span className="error">Ingrese una edad válida</span>}

        <label>Peso (kg):</label>
        <input type="number" step="0.1" {...register("peso", { required: true, min: 0 })} />
        {errors.peso && <span className="error">Ingrese un peso válido</span>}

        <button type="submit">Registrar</button>
      </form>
    </div>
     </div>
    
  );
};

export default RegistroMascota;
