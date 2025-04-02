async function GetData(URL) {
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            response.status === 500? window.location.href = "/internal":
            window.location.href = "/notfound"
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

let datas = GetData("http://localhost:3000/user/all")
console.log(datas)