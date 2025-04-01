function GetPets(URL) {
    let datas
    fetch(URL)
    .then(res => {
        datas = res.json()
        datas.status == 200? console.log(datas.result):console.log("Error" + datas.status)
    })
    .catch(err => {
        console.log(err)
    })
    .finally(() => {
        console.log("Procedimiento completado correctamente")
    })
    console.log(datas)
    // return res
}

get = GetPets("http://localhost:3000/user/all")
console.log(get)