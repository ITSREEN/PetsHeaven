import React from "react";

export default function Footer(){
    return (
        <footer className="main-container">
            <div className="left-container">
                <img src={require(`../../public/imgs/logoTitle.jpg`)} alt="Logo PetsHeaven" />
                <section className="redes">

                </section>
                <p className="fecha-act">

                </p>
            </div>
            <div className="center-container">
                <h3 className="title-conocenos">Conocenos</h3>
                <a className="parra-conocenos">Linea de atencion</a>
                <a className="parra-conocenos"></a>
                <a className="parra-conocenos"></a>
                <a className="parra-conocenos"></a>
            </div>
            <div className="right-container">

            </div>
        </footer>
    );
}