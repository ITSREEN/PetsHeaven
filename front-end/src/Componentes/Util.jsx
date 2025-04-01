export async function GetData(URL) {
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.result[0])
        return data.result[0];
    } catch (error) {
        console.error("Error:", error);
        throw error;
    } finally {
        console.log("Procedimiento Terminado");
    }
}
