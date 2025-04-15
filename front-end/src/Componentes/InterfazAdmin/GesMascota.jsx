// Librarys 
import React, {useEffect, useState} from "react"
import { Dog, Eye } from "lucide-react"

// Imports 
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi';
import { Loader } from '../Errores/Loader'
import { SubNotFound } from '../Errores/NotFound'
import { GetData } from '../Varios/Requests'
import { EditPetButton } from '../InterfazUsuario/EditPet'

// Import Styles 
import "../../../public/styles/InterfazAdmin/GesMascota.css"
import "../../../public/styles/InterfazUsuario/petDetails.css"

// Main component 
export function GesMascota() {
  // Declare Vars
  const mainURL = "http://localhost:3000/pet/all"
  const [petsData, setPetsData] = useState([])
  const [petsAlmac,setPetsAlmac] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPet, setSelectedPet] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editMode,setEditMode] = useState(false)

  // Functions
  const namePro = gen => {
    return gen === "Hombre" ? "Padre" : "Madre"
  }

  // fetch para traer datos
  const fetchData = async () => {
      try {
          const pets = await GetData(mainURL)
          setLoading(false)
          setPetsData(pets)
          setPetsAlmac(pets)
      } catch (err) {             
          console.log(err)
      }
  }

  // Abrir sección de detalles
  const openModal = (pet) => {
    setSelectedPet(pet)
    setEditMode(false)
    setShowModal(true)
    document.body.style.overflow = 'hidden' // Deshabilita el scroll del body
  }

  // Cerrar sección de detalles
  const closeModal = () => {
    setShowModal(false)
    document.body.style.overflow = 'auto' // Habilita el scroll del body
  }

  // cambiar a modo edicion 
  const changeEditMode = (pet) => {
    setSelectedPet(pet)
    setEditMode(true)
  }

  // Manejar busqueda 
  const handleSearch = term => {
    const termLower = term.toLowerCase()
  
    const find = petsAlmac.filter(pet => {
      // Campos específicos donde buscar
      const searchFields = ['nom_mas', 'raz_mas', 'esp_mas', 'est_rep_mas']
      return searchFields.some(field => 
        pet[field]?.toLowerCase().includes(termLower)
      )
    })

    if (find) setPetsData(find)
  }

  // Ejecutar el fetch para traer datos
  useEffect(() => {
      // Vars 
      const REFRESH_INTERVAL = 2 * 60 * 1000 // 2 minutos
      let intervalId
  
      // Execute the request
      fetchData()
  
      // Configure interval
      intervalId = setInterval(fetchData(), REFRESH_INTERVAL)
  
      // Clean
      return () => clearInterval(intervalId)
    }, [])

  return (
    <>
    {loading?(
      <Loader />
    ):(
      <main className="appgesmascota">
        <NavBarAdmin />
        {
          petsData?(
            <section className="contenedorgesmascota">
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
                    <input type="text" className="inputgesmascota" onChange={e => handleSearch(e.target.value)}/>
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
                      {
                        petsData.map((i,index) => (
                          <tr key={index}>
                            <td className="nombrecontainergesmascota" data-label="Nombre">
                                  <div className="infogesmascota">
                                    <span className="nombregesmascota">{i.nom_mas}</span>
                                    <span className="fechagesmascota">Registrado el 
                                      {new Date(i.fec_cre_mas).toLocaleDateString('to-ca')}</span>
                                  </div>
                            </td>
                            <td data-label="Especie">{i.esp_mas}</td>
                            <td data-label="Raza">{i.raz_mas}</td>
                            <td data-label="Edad">{new Date().getFullYear() - new Date(i.fec_nac_mas).getFullYear()} Años</td>
                            <td data-label="Propietario">{i.nom_usu}</td>
                            <td data-label="Estado">{i.estado?"Activo":"Inactivo"}</td>
                            <td data-label="Opciones" className="opcionesgesmascota">
                              <Eye className="iconogesmascota" size={16} onClick={() => openModal(i)}/>
                            </td>
                          </tr>
                        ))
                      }
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
            </section>
          ):(
            <SubNotFound />
          )
        }
        {showModal && selectedPet && (
          <section className="pet-modal-overlay" onClick={closeModal}>
              <div className="pet-modal-content" onClick={e => e.stopPropagation()}>
                  <button className="pet-modal-close" onClick={closeModal}>×</button>
                  
                  <section className="pet-modal-grid">
                      <picture className="pet-modal-image">
                          <img 
                              src={selectedPet.fot_mas} 
                              alt={`${selectedPet.esp_mas} ${selectedPet.nom_mas}`} 
                          />
                      </picture>
                      
                      <section className="pet-modal-info">
                          <h2>{selectedPet.nom_mas}</h2>
                          <aside className="pet-details-grid">
                              <article>
                                  <h3>Información Básica</h3>
                                  <p><strong>Especie: </strong> {selectedPet.esp_mas}</p>
                                  <p><strong>Raza: </strong> {selectedPet.raz_mas}</p>
                                  <p><strong>Color: </strong> {selectedPet.col_mas}</p>
                                  <p><strong>Género: </strong> {selectedPet.gen_mas === 'M' ? 'Macho' : 'Hembra'}</p>
                                  <p><strong>Fecha de Nacimiento: </strong> {new Date(selectedPet.fec_nac_mas).toLocaleDateString('en-CA')}</p>
                                  <p><strong>Peso: </strong> {selectedPet.pes_mas} kg</p>
                              </article>
                              
                              <article>
                                  <h3>{namePro(selectedPet.gen_usu)}</h3>
                                  <p><strong>{namePro(selectedPet.gen_usu)}: </strong> {selectedPet.nom_usu} {selectedPet.ape_usu}</p>
                                  <p><strong>Documento: </strong> {selectedPet.doc_usu}</p>
                                  <p><strong>Celular: </strong> {selectedPet.cel_usu}</p>
                                  <p><strong>Email: </strong> {selectedPet.email_usu}</p>
                              </article>
                              
                              <article>
                                  <h3>Salud</h3>
                                  <p><strong>Estado reproductivo: </strong> {selectedPet.est_rep_mas}</p>
                                  <p><strong>Alimento: </strong> {selectedPet.ali_mas}</p>
                              </article>

                              <article>
                                  <h3>Historial Medico</h3>
                                  <p><strong>Estado reproductivo: </strong> {selectedPet.est_rep_mas}</p>
                                  <p><strong>Alimento: </strong> {selectedPet.ali_mas}</p>
                              </article>
                          </aside>
                      </section>
                  </section>
              </div>
          </section>
        )}
        {editMode && (
            <EditPetButton 
                petData={selectedPet}
                open={editMode}
                onSave={(state) => setEditMode(state)}
            />
          )
        }
      </main>
    )}
    </>
  )
}