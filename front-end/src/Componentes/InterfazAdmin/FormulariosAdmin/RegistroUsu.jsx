import React from 'react';
import '../../../../public/styles/InterfazAdmin/FormuariosAdmin/RegistroUsu.css';

export const RegistroUsu = ({ URL = "" }) => {
  return (
    <div className="cont-regusu">
      <h1 className="titulo-principal-regusu">Configuración de usuario</h1>

      <div className="seccion-regusu">
        <h2 className="subtitulo-regusu">Información personal</h2>
        <ul className="lista-principal-regusu">
          <li>Creadón</li>
          <li>Bol y privilegios</li>
          <li>Información profesional</li>
          <li>Contratado</li>
          <li>Preferencias</li>
        </ul>
      </div>

      <div className="separador-regusu"></div>

      <div className="seccion-regusu">
        <h3 className="subtitulo-regusu">Información personal:</h3>
        <ul className="lista-regusu">
          <li>Imagen de perfil</li>
          <li>Documento</li>
          <li>Número de identificación</li>
        </ul>
      </div>

      <div className="separador-regusu"></div>

      <div className="seccion-regusu">
        <h3 className="subtitulo-regusu">Normales y apellidos</h3>
        <ul className="lista-regusu">
          <li>Normales y apellidos</li>
        </ul>
      </div>

      <div className="separador-regusu"></div>

      <div className="seccion-regusu">
        <h3 className="subtitulo-regusu">Correo electrónico</h3>
        <div className="item-destacado-regusu">
          <strong>hola@gmail.com</strong>
          <div className="texto-secundario-regusu">Email de contacto para comunicaciones y recuperación de la cuenta</div>
        </div>
      </div>

      <div className="separador-regusu"></div>

      <div className="seccion-regusu">
        <h3 className="subtitulo-regusu">Móvil / WhatsApp</h3>
        <div className="item-destacado-regusu">
          +57 231 1234567
          <div className="texto-secundario-regusu">Calder de contacto para alertas de la cuenta y recordatorias</div>
        </div>
      </div>

      <div className="separador-regusu"></div>

      <div className="seccion-regusu">
        <h3 className="subtitulo-regusu">Firma</h3>
        <div className="item-destacado-regusu">
          Firma N/D
          <div className="texto-secundario-regusu">Firma para impresión, auguráse 2008/09 y funda transparente</div>
        </div>
      </div>
    </div>
  );
};
