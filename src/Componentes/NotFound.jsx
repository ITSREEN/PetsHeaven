import React from 'react';
import '../../public/styles/notfound.css';

export const NotFound = () => {
  return (
    <section className="notfound-container">
      <div className="glitch-container">
        <h1 className="title-num glitch" data-text="404">404</h1>
        <h2 className="sub-title">Página no encontrada</h2>
        <p className="text">
          La página que estás buscando no existe o ha sido movida.
        </p>
        <div className="particles">
          {[...Array(30)].map((_, i) => <div key={i} className="particle"></div>)}
        </div>
        <a className="home-button" href="/">
          Volver al inicio
        </a>
      </div>
    </section>
  );
};