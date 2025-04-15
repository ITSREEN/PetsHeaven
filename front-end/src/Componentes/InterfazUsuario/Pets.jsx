// Imports
import { GetData } from '../Varios/Requests'
import { Loader } from '../Errores/Loader'
import { SubNotFound } from '../Errores/NotFound'
import { EditPetButton } from './EditPet'
import { decodeJWT,errorStatusHandler } from '../Varios/Util'
import '../../../public/styles/InterfazUsuario/pets.css'
// import NavBar from './NavBarAdmi'

// Librarys 
import React, { useState, useEffect } from "react"

// Main component
export const Pets = ({ token, all = false}) => {
    // Declare Vars
    const mainURL = "http://localhost:3000/pet/all/"
    const [petsData, setPetsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedPet, setSelectedPet] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [searchBy,setSearchBy] = useState("")
    const [found,setfound] = useState(false)
    const [editMode,setEditMode] = useState(false)

    // fetch para traer datos
    const fetchData = async (url) => {
        setfound(false)
        setLoading(true)
        try {
            const pets = await GetData(url)
            setLoading(false)
            setPetsData(pets)
            if(pets[0]) setfound(true)
        } catch (err) {
            // if(err.status) {
            //     const message = errorStatusHandler(err.status)
            //     swal({
            //       title: 'Error',
            //       text: `${message}`,
            //       icon: 'warning',
            //     })
            // } else
             
            console.log(err)
        }
    }
    
    const namePro = gen => {
        return gen === "Hombre" ? "Propietario" : "Propietaria"
    }

    const openModal = (pet) => {
        setSelectedPet(pet)
        setEditMode(false)
        setShowModal(true)
        document.body.style.overflow = 'hidden' // Deshabilita el scroll del body
    }

    const closeModal = () => {
        setShowModal(false)
        document.body.style.overflow = 'auto' // Habilita el scroll del body
    }

    const changeEditMode = () => {
        closeModal()
        setEditMode(true)
    }

    // Ejecutar el fetch para traer datos
    useEffect(() => {
        // Vars 
        const tokenData = decodeJWT(token)
        const roles = Array(tokenData.roles)

        // verify rol
        const URL = roles.includes("Administrador")? mainURL: `${mainURL}:${by}`
      
        fetchData(URL)
    }, [])

    

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <main className='main-pets-container'>
                    <nav className='nav-search-container'>
                        <span className='search-container'>
                            <input className='search-input input' type="search" placeholder='Buscar' onChange={e => setSearchBy(e.target.value)}/>
                            <button className='boton-enviar' type='button' onClick={() => fetchData(mainURL + "all:" + searchBy)} >Buscar</button>
                        </span>
                        <picture className='img-container'>
                            
                        </picture>
                    </nav>

                    {/* <NavBar /> */}

                    {/* Cards  */}
                    {
                        found?
                        (
                        <section className='pets-container'>
                            {petsData.map((i, index) => (
                                <aside key={index} className='pets-card'>
                                <div className='pets-img-container'>
                                    <img 
                                        className='pets-card-img' 
                                        src={i.fot_mas || '/default-pet.jpg'}
                                        alt={`${i.esp_mas} de raza ${i.raz_mas} color ${i.col_mas} con nombre ${i.nom_mas}`}
                                        onError={(e) => e.target.src = '/default-pet.jpg'}
                                    />
                                    <span className='pets-species-badge'>{i.esp_mas}</span>
                                </div>
                                
                                <section className='pets-info-wrapper'>
                                    <p className='pets-name'><strong>{i.nom_mas}</strong></p>
                                    <span className='pets-meta'>
                                        {i.raz_mas || 'Raza no especificada'} {i.col_mas || 'Color no especificado'}
                                    </span>
                                    
                                    <button 
                                        type='button' 
                                        className='boton-enviar pets-detail-btn'
                                        onClick={() => openModal(i)}
                                    >Descripción
                                    </button>
                                </section>
                            </aside>
                            ))}
                        </section>
                        ):(
                            <SubNotFound />
                        )
                    }

                    {/* Modal para mostrar detalles completos */}
                    {showModal && selectedPet && (
                        <section className="pet-modal-overlay" onClick={closeModal}>
                            <div className="pet-modal-content" onClick={e => e.stopPropagation()}>
                                {/* <button className="pet-modal-close" onClick={closeModal}>×</button> */}
                                <button className="pet-modal-close" onClick={changeEditMode}>Edit</button>
                                
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
                                                <p><strong>Fecha de Nacimiento: </strong> {new Date(selectedPet.fec_nac_mas).toLocaleDateString()}</p>
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
                            onSave={(state) => setEditMode(state)}
                            open={true}
                        />
                    )}
                </main>
            )}   
        </>
    )
}