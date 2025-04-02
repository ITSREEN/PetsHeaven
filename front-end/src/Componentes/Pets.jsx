// Imports
import { GetData } from './Util'
import { Loader } from './Errores/Loader'
import "../../public/styles/pets.css"

// Librarys 
import React,{ useState, useEffect} from "react"

// Main component
export const Pets = () => {
    // Declare Vars
    const URL = "http://localhost:3000/pet/all"
    const [petsData, setPetsData] = useState([])
    const [loading,setLoading] = useState(true)

    // Ejecutar el fecth para traer datos
    useEffect(() => {
        const fetchData = async () => {
          try {
            const pets = await GetData(URL)
            setPetsData(pets)
            setLoading(false)
          } catch (error) {
            window.location.href = "/internal"
            setPetsData()
          }
        }
      
        fetchData()
    }, [])

    const namePro = gen => {
        return gen === "Hombre"?"Propietario":"Propietaria"
    }

    return (
        <main className='main-pets-container'>
            {
            // verificar el estado del fetch
            loading? (<Loader />):
                (<section className='pets-container'>
                {
                    petsData.map(i => (
                        <aside className='pets-card'>
                            <img className='pets-card-img' src={i.fot_mas} alt={`${i.esp_mas} de raza ${i.raz_mas} color ${i.col_mas} con nombre ${i.nom_mas}`} />
                            <span className='pets-card-info'>
                                <p><strong>Nombre: </strong> {i.nom_mas}</p>
                                <p><strong>Especie: </strong> {i.esp_mas}</p>
                                <p><strong>Color: </strong> {i.col_mas}</p>
                                <p><strong>Raza: </strong> {i.raz_mas}</p>
                                <p><strong>{namePro(i.gen_usu)}: </strong>{i.nom_usu} {i.ape_usu}</p>
                            </span>
                            <button type='button' className='link'>Descripción</button>
                        </aside>
                    ))
                }
                </section>)
            }   
        </main>
    )
}