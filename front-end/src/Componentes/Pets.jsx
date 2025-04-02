// Imports
import { GetData } from './Util'
import { Loader } from './Errores/Loader'

// Librarys 
import React,{ useState, useEffect} from "react"

// Main component
export const Pets = () => {
    // Declare Vars
    const URL = "http://localhost:3000/pet/all"
    const [petsData, setPetsData] = useState([])
    const [loading,setLoading] = useState(true)

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

    return  (
        <main>
        {
          loading? (<Loader />):
            (<section>
            {
                petsData.map(i => (
                    <aside>
                        <img src={i.fot_mas} alt={i.nom_mas} />
                        <span>
                            <p><strong>Nombre: </strong> {i.nom_mas}</p>
                            <p><strong>Especie: </strong> {i.esp_mas}</p>
                            <p><strong>Color: </strong> {i.col_mas}</p>
                            <p><strong>Raza: </strong> {i.raz_mas}</p>
                            <p><strong>Propietario: </strong>{i.nom_usu} {i.ape_usu}</p>
                        </span>
                    </aside>
                ))
            }
            </section>)
        }   
        </main>
    )
}