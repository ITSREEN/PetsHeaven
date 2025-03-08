// Librarys
import React from "react"
import 'boxicons'

// Imports
import "../../public/styles/footer.css"

// Component
const Footer = () => {
    // Vars 
    const todayFec = new Date().toLocaleDateString()

    return (
        <footer className="main-container">
            <section className="data-container">
                <img src="../../public/imgs/1.png" alt="Logo PetsHeaven" />
                <section className="redes">
                    <ul className="canales">
                        <li className="social">1</li>
                        <li className="social">2</li>
                        <li className="social">3</li>
                        <li className="social">4</li>
                    </ul>
                </section>
                <p className="fecha-act">
                    { todayFec }
                </p>
            </section>
            <div className="data-container">
                <h3 className="title-conocenos">Conocenos</h3>
                <a className="parra-conocenos">Linea de atencion</a>
                <a className="parra-conocenos">Cel 32131231212/Whatsapp</a>
                <a className="parra-conocenos">Linea Gratuita Nacional</a>
                <a className="parra-conocenos">petsHeaven@sena.edu.co</a>
                <a className="parra-conocenos">Trabaje con nosotros</a>
                <a className="parra-conocenos">Ingreso corporativo</a>
            </div>
            <div className="data-container">
                <h3 className="title-conocenos">Terminos y condiciones</h3>
                <a className="parra-conocenos">Quienes somos</a>
                <a className="parra-conocenos">Nuestra historia</a>
                <a className="parra-conocenos">Sedes</a>
                <a className="parra-conocenos">Contactenos</a>
                <a className="parra-conocenos">Preguntas Frecuentes</a>
                <a className="parra-conocenos">Politcas de cambio y garantia</a>
                <a className="parra-conocenos">Politica de tratamiento de datos</a>
                <a className="parra-conocenos">Area Legal</a>
            </div>
        </footer>
    );
}

export default Footer;