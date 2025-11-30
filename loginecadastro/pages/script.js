const button = document.querySelector("button")

button.addEventListener("click", receberMensagemDoBackend)

async function receberMensagemDoBackend () {
    const response = await fetch("http://localhost:3333").then (response => response.json())

    console.log(response)
}