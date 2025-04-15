const HeaderWeb = {
    "Content-Type": "application/json",
    "x-api-key": "pets_heaven_vite",
    "User": "Cristian_Admin"
}

async function login(url, first, second) {
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
            throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Respuesta del servidor:", data);
        return data; // Para usar la respuesta fuera de la función
  
    } catch (error) {
        console.error("Error en la petición:", error);
        throw error; // Propaga el error para manejo externo
    }
}