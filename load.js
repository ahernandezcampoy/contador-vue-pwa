if("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./serviceWorker.js").then(
        reg => console.log("Registro correcto")
    ).catch(
        err => console.log(err)
    )
}