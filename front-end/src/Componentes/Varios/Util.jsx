// Vars
// const HeaderWeb = {
//     "Content-Type": "application/x-www-form-urlencoded",
// }
const HeaderWeb = {
    "Content-Type": "application/json",
}

// Functions 
// Traer datos
export async function GetData(URL) {
    try {
        const response = await fetch(URL,{
            method: "GET",
            headers: HeaderWeb,
        })
        if (!response.ok) {
            response.status >= 500? window.location.href = "/internal":
            window.location.href = "/notfound"
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data.result[0]
    } catch (error) {
        window.location.href = "/internal"
        console.error("Error:", error)
        throw error
    }
}
// Enviar datos 
export async function PostData(URL, datas) {
    console.log(datas)
    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: HeaderWeb,
            body: JSON.stringify(datas)
        })
  
      // Manejar diferentes códigos de estado
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const error = new Error(errorData.message || `HTTP error! status: ${response.status}`)
        error.status = response.status
        error.data = errorData
        throw error
      }
  
      // Parsear la respuesta como JSON
      const data = await response
      return data
  
    } catch (error) {
        
        // Manejo de errores
        if (error.status) {

            if (error.status >= 500) {
                navigate('/internal')
                throw Error('Error del servidor:', error)
            }

            else if (error.status === 404) console.log("No estas en mi corazon")
            else if (error.status === 302) console.log("Ya estas en mi corazon")

        } else throw Error('Error de conexión:', error)
        
        throw error
    }
}
// Modificar datos
export async function ModifyData(URL,datas) {
    try {
        const response = await fetch(URL,{
            method:"PUT",
            headers: HeaderWeb,
            body: JSON.stringify(datas),
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            const error = new Error(errorData.message || `HTTP error! status: ${response.status}`)
            error.status = response.status
            error.data = errorData
            throw error
        }

        // Parsear la respuesta como JSON
        const data = await response
        return data

    } catch (error) {
        // Manejo de errores
        if (error.status) {
            
            if (error.status >= 500) {
                navigate('/internal')
                throw Error('Error del servidor:', error)
            }

            else if (error.status === 404) console.log("No estas en mi corazon")
            else if (error.status === 302) console.log("Ya estas en mi corazon")

        } else throw Error('Error de conexión:', error)
        
        throw error
    }
}