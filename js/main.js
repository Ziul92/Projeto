const form = document.querySelector("[data-formulario]")
const lista = document.querySelector("[data-lista]")
const itens = []

form.addEventListener("submit", (evento) => {
    evento.preventDefault()
    const nome = evento.target.elements["nome"]
    const quantidade = evento.target.elements["quantidade"]

    criaElemento(nome.value, quantidade.value)

    nome.value = ""
    quantidade.value = ""
    nome.focus()
})

function criaElemento(nome, quantidade) {
    const novoItem = document.createElement("li")
    const novoNumero = document.createElement("strong")
    
    novoItem.classList.add("item")
    novoNumero.innerHTML = quantidade
    novoItem.appendChild(novoNumero)
    novoItem.innerHTML += nome

    lista.appendChild(novoItem)

    const itemAtual = {
        "nome": nome,
        "quantidade": quantidade
    }

    itens.push(itemAtual)

    localStorage.setItem("item", JSON.stringify(itens))
}