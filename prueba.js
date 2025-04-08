async function PostData(URL,datas) {
    try {
        const response = await fetch(URL,{
            method:"POST",
            body: datas,
        })
        if (!response.status === 201) {
            // response.status >= 500? window.location.href = "/internal":
            // window.location.href = "/notfound"
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response
        return data.result
    } catch (error) {
        // window.location.href = "/internal"
        console.error("Error:", error)
        throw error
    }
}

let datas = await PostData("http://localhost:3000/user/register",{
    apellidos: "Perra",
    celular: "1231312331",
    celular2: "",
    codigoVerificacion: "501261",
    direccion: "dfdfsdf",
    email: "kevinstivenasd04@gmail.com",
    fechaNacimiento: "2002-12-09",
    genero: "F",
    nombres: "Juana",
    numeroDocumento: "2256652254",
    password:"Unaperra123@",
    tipoDocumento:"CC"
})