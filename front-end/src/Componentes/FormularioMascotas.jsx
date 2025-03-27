import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function FormularioMascotas() {
  const [imagen, setImagen] = useState(null);
  const [urlImagen, setUrlImagen] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imagen) return;

    setIsLoading(true);
    try {
      // Genera un nombre único para el archivo
      const fileExt = imagen.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Sube el archivo directamente al bucket 'mascotas'
      const { data, error: uploadError } = await supabase.storage
        .from('mascotas')
        .upload(filePath, imagen);

      if (uploadError) {
        throw uploadError;
      }

      // Obtiene la URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('mascotas')
        .getPublicUrl(data.path);

      setUrlImagen(publicUrl);
      alert('¡Imagen subida con éxito!');
    } catch (error) {
      console.error('Error completo:', error);
      alert(`Error al subir: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setImagen(e.target.files[0])}
        accept="image/*"
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Subiendo...' : 'Subir imagen'}
      </button>
      {urlImagen && (
        <div>
          <img src={urlImagen} alt="Mascota" width="200" />
          <p>URL: {urlImagen}</p>
        </div>
      )}
    </form>
  );
}

export default FormularioMascotas;