import React from "react"
import { Users, Eye } from "lucide-react"
import "../../../public/styles/InterfazAdmin/GesPropietario.css"
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi';

export function GesPropietario() {
  return (
    <div className="appgespropietario">
      <NavBarAdmin />

      <main className="contenedorgespropietario">
        <div className="panelgespropietario">
          <div className="cabeceragespropietario">
            <h1 className="titulogespropietario">
              <Users className="iconotitulogespropietario" size={20} />
              Gestión de propietarios
            </h1>
            <span className="subtitulogespropietario">/ Administración</span>
          </div>

          <h2 className="subtitulopanelgespropietario">Propietarios registrados</h2>

          <div className="controlesgespropietario">
            <div className="mostrargespropietario">
              <span>Mostrar</span>
              <select className="selectgespropietario">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span>registros</span>
            </div>

            <div className="buscargespropietario">
              <span>Buscar:</span>
              <input type="text" className="inputgespropietario" />
            </div>
          </div>

          <div className="tablacontgespropietario">
            <table className="tablagespropietario">
              <thead>
                <tr>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>T Doc</th>
                  <th>Documento</th>
                  <th>Dirección</th>
                  <th>Celular</th>
                  <th>Correo</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody> 
                <tr>
                  <td className="nombrecontainergespropietario" data-label="Nombres">
                        <div className="infogespropietario">
                          <span className="nombregespropietario">Juan</span>
                          <span className="infogespropietario">Creado el 20/05/2025</span>
                        </div>
                  </td>
                  <td data-label="Apellidos">Pérez</td>
                  <td data-label="T Doc">CC</td>
                  <td data-label="Documento">12345678</td>
                  <td data-label="Dirección">Calle 123 #45-67</td>
                  <td data-label="Celular">3001234567</td>
                  <td data-label="Correo">juan@example.com</td>
                  <td data-label="Opciones" className="opcionesgespropietario">
                    <Eye className="iconogespropietario" size={16} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="paginaciongespropietario">
            <div className="infogespropietario">Mostrando registros del 1 al 3 de un total de 3 registros.</div>
            <div className="botonesgespropietario">
              <button className="btngespropietario" disabled>
                Anterior
              </button>
              <button className="btngespropietario btnactivogespropietario">1</button>
              <button className="btngespropietario">Siguiente</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

