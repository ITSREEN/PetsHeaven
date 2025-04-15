import React from "react"
import { Dog, Eye } from "lucide-react"
import "../../../public/styles/InterfazAdmin/GesMascota.css"
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi';

export function GesMascota() {
  return (
    <div className="appgesmascota">
      <NavBarAdmin />

      <main className="contenedorgesmascota">
        <div className="panelgesmascota">
          <div className="cabeceragesmascota">
            <h1 className="titulogesmascota">
              <Dog className="iconotitulogesmascota" size={20} />
              Gestión de mascotas
            </h1>
            <span className="subtitulogesmascota">/ Administración</span>
          </div>

          <h2 className="subtitulopanelgesmascota">Mascotas registradas</h2>

          <div className="controlesgesmascota">
            <div className="mostrargesmascota">
              <span>Mostrar</span>
              <select className="selectgesmascota">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span>registros</span>
            </div>

            <div className="buscargesmascota">
              <span>Buscar:</span>
              <input type="text" className="inputgesmascota" />
            </div>
          </div>

          <div className="tablacontgesmascota">
            <table className="tablagesmascota">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Especie</th>
                  <th>Raza</th>
                  <th>Edad</th>
                  <th>Propietario</th>
                  <th>Estado</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody> 
                <tr>
                  <td className="nombrecontainergesmascota" data-label="Nombre">
                        <div className="infogesmascota">
                          <span className="nombregesmascota">Max</span>
                          <span className="fechagesmascota">Registrado el 20/05/2025</span>
                        </div>
                  </td>
                  <td data-label="Especie">Perro</td>
                  <td data-label="Raza">Labrador</td>
                  <td data-label="Edad">3 años</td>
                  <td data-label="Propietario">Juan Pérez</td>
                  <td data-label="Estado">Activo</td>
                  <td data-label="Opciones" className="opcionesgesmascota">
                    <Eye className="iconogesmascota" size={16} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="paginaciongesmascota">
            <div className="infogesmascota">Mostrando registros del 1 al 3 de un total de 3 registros.</div>
            <div className="botonesgesmascota">
              <button className="btngesmascota" disabled>
                Anterior
              </button>
              <button className="btngesmascota btnactivogesmascota">1</button>
              <button className="btngesmascota">Siguiente</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}