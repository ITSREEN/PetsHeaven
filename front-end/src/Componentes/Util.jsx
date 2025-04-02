export async function GetData(URL) {
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            response.status >= 500? window.location.href = "/internal":
            window.location.href = "/notfound"
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.result[0];
    } catch (error) {
        window.location.href = "/internal"
        console.error("Error:", error);
        throw error;
    }
}
