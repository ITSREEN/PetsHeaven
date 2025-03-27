import React from 'react';
import '../../public/styles/notfound.css'

export const NotFound = () => {
  return (
    <section className="notfound-container">
      <h1 className="title-num">404</h1>
      <h2 className="sub-title">Página no encontrada</h2>
      <p className="text">
        La página que estás buscando no existe o ha sido movida.
      </p>
    </section>
  );
};