import React from "react";
import "../../public/styles/footer.css"


const Footer = () => {
    return (
        <main className="main-container">
            <div className="data-container">
                <div className="logo-redes">
                    <img src="../../public/imgs/1.png" alt="Logo PetsHeaven" />
                    <section className="redes">
                        <ul className="canales">
                            <li className="social">1</li>
                            <li className="social">2</li>
                            <li className="social">3</li>
                            <li className="social">4</li>
                        </ul>
                    </section>
                </div>
                <p className="fecha-act">
                    © 2025 PetsHeaven   
                </p>
            </div>
            <div className="data-container">
                <h2 className="title">Conocenos</h2>
                <a className="redireccionable">Linea de atencion</a>
                <a className="redireccionable">Cel 32131231212/Whatsapp</a>
                <a className="redireccionable">Linea Gratuita Nacional</a>
                <a className="redireccionable">petsHeaven@sena.edu.co</a>
                <a className="redireccionable">Trabaje con nosotros</a>
                <a className="redireccionable">Ingreso corporativo</a>
            </div>
            <div className="data-container">
                <h2 className="title">Terminos y condiciones</h2>
                <a className="redireccionable">Quienes somos</a>
                <a className="redireccionable">Nuestra historia</a>
                <a className="redireccionable">Sedes</a>
                <a className="redireccionable">Contactenos</a>
                <a className="redireccionable">Preguntas Frecuentes</a>
                <a className="redireccionable">Politcas de cambio y garantia</a>
                <a className="redireccionable">Politica de tratamiento de datos</a>
                <a className="redireccionable">Area Legal</a>
            </div>
        </main>
    );
}

export default Footer;