// Vars
const HeaderWeb = {
    "Content-Type": "application/json",
    "x-api-key": "pets_heaven_vite",
    "User": "Cristian_Admin"
}

// Functions 
// Traer datos
export async function GetData(URL) {
    try {
        const response = await fetch(URL,{
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                ...HeaderWeb
            }
        })

        if (!response.ok) {
            throw response
        }

        const data = await response.json()
        return data.result[0]
    } catch (error) {
        throw error
    }
}
// Enviar datos 
export async function PostData(URL, datas) {
    console.log(datas)
    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                ...HeaderWeb
            },
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
        throw error
    }
}
// Modificar datos
export async function ModifyData(URL,datas) {
    try {
        const response = await fetch(URL,{
            method:"PUT",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                ...HeaderWeb
            },
            body: JSON.stringify(datas),
        })

        if (!response.ok) {
            throw response
        }

        // Parsear la respuesta como JSON
        const data = await response.json()
        return data

    } catch (error) {
        throw error
    }
}

export async function login(url, first, second) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: HeaderWeb,
            body: JSON.stringify({
                firstData: first, 
                secondData: second 
            })
        })
  
        if (!response.ok) {
            throw response
        }
  
        const data = await response.json()
        localStorage.setItem("token",data.token)
  
    } catch (error) {
        throw error
    }
}