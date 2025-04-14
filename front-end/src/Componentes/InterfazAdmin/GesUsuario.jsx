// Librarys 
import React, { useEffect, useState } from "react"
import { ChevronUp, ChevronDown, Plus, Edit, MoreHorizontal } from "lucide-react"

// Imports 
import '../../../public/styles/InterfazAdmin/GesUsuario.css'
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi';
import { GetData } from '../Varios/Requests';
import { Loader } from '../Errores/Loader';


export function GesUsuario() {
  const URL = "http://localhost:3000/user"
  const [users,setUsers] = useState([])
  const [loading,setLoading] = useState(true)

  const GetUsers = async ( data = null ) => {
    // Vars 
    const url = data? `${URL}/by:${data}`: URL + "/all"
    try {
      const data = await GetData(url)
      setUsers(data)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    GetUsers()
  },[])

  return (
    <>
      {
        loading ? (
          <Loader />
        ) : (
        <div className="contenedorgesusuario">
          <NavBarAdmin />

          <div className="principalgesusuario">
            <div className="tarjetagesusuario">
              <div className="contenidogesusuario">
                <div className="encabezadogesusuario">
                  <div className="titulogesusuario">
                    <h1 className="textogesusuario">Gestión de usuarios</h1>
                    <span className="subtitulogesusuario">Administración</span>
                  </div>
                </div>

                <div className="subencabezadogesusuario">
                  <div className="veterinariagesusuario">
                    <h2 className="subtitulovegesusuario">Usuarios vinculados a la veterinaria: Petsheaven</h2>
                  </div>
                  <div className="accionesgesusuario">
                    <button className="botonregistrargesusuario">
                      <Plus size={16} className="iconoplusgesusuario" />
                      Registrar usuario
                    </button>
                  </div>
                </div>

                <div className="controlestablagesusuario">
                  <div className="mostrargesusuario">
                    <span>Mostrar</span>
                    <select className="selectgesusuario">
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    <span>registros</span>
                  </div>
                  <div className="buscargesusuario">
                    <span>Buscar:</span>
                    <input type="text" className="inputbuscargesusuario" placeholder="" onChange={(e) => GetUsers(e.target.value)} />
                  </div>
                </div>

                <div className="tablagesusuario">
                  <table className="tablausuariosgesusuario">
                    <thead>
                      <tr className="encabezadotablagesusuario">
                        <th className="celdaencabezadogesusuario opciones">
                          <div className="contenidoencabezadogesusuario">Opciones</div>
                        </th>
                        <th className="celdaencabezadogesusuario">
                          <div className="contenidoencabezadogesusuario">
                            Nombre
                            <div className="ordenargesusuario">
                              <ChevronUp size={14} className="iconoordengesusuario" />
                              <ChevronDown size={14} className="iconoordengesusuario" />
                            </div>
                          </div>
                        </th>
                        <th className="celdaencabezadogesusuario">
                          <div className="contenidoencabezadogesusuario">
                            Correo
                            <div className="ordenargesusuario">
                              <ChevronUp size={14} className="iconoordengesusuario" />
                              <ChevronDown size={14} className="iconoordengesusuario" />
                            </div>
                          </div>
                        </th>
                        <th className="celdaencabezadogesusuario">
                          <div className="contenidoencabezadogesusuario">
                            Rol
                            <div className="ordenargesusuario">
                              <ChevronUp size={14} className="iconoordengesusuario" />
                              <ChevronDown size={14} className="iconoordengesusuario" />
                            </div>
                          </div>
                        </th>
                        <th className="celdaencabezadogesusuario">
                          <div className="contenidoencabezadogesusuario">
                            Creación
                            <div className="ordenargesusuario">
                              <ChevronUp size={14} className="iconoordengesusuario" />
                              <ChevronDown size={14} className="iconoordengesusuario" />
                            </div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(usuario => (
                        <tr key={usuario.doc_usu} className="filagesusuario">
                          <td className="celdagesusuario" data-label="Opciones">
                            <div className="accionesusuariogesusuario">
                              <button className="botonacciongesusuario">
                                <Edit size={16} className="iconoacciongesusuario" />
                              </button>
                              <button className="botonacciongesusuario">
                                <MoreHorizontal size={16} className="iconoacciongesusuario" />
                              </button>
                            </div>
                          </td>
                          <td className="celdagesusuario" data-label="Nombre">
                            <div className="usuarioinfogeneralgesusuario">
                              <span>{usuario.nom_usu}</span>
                            </div>
                          </td>
                          <td className="celdagesusuario" data-label="Correo">
                            {usuario.email_usu}
                          </td>
                          <td className="celdagesusuario" data-label="Rol">
                            <span className={`rolgesusuario ${usuario.roles.toLowerCase()}`}>{usuario.roles}</span>
                          </td>
                          <td className="celdagesusuario" data-label="Creación">
                            {usuario.fec_cre_usu}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="paginaciongesusuario">
                  <div className="infopaginaciongesusuario">
                    <span>Mostrando registros del 1 al 2 de un total de 2 registros.</span>
                  </div>
                  <div className="controlesgesusuario">
                    <button className="botonpaginaciongesusuario">Anterior</button>
                    <button className="botonpaginaciongesusuario activogesusuario">1</button>
                    <button className="botonpaginaciongesusuario">Siguiente</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>)
      }
      </>
  )
}
