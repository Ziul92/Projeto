const form = document.querySelector("[data-formulario]")
const lista = document.querySelector("[data-lista]")
const itens = JSON.parse(localStorage.getItem("itens")) || []

console.log(itens)

itens.forEach((elemento) => {
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault()
    const nome = evento.target.elements["nome"]
    const quantidade = evento.target.elements["quantidade"]
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    criaElemento(itemAtual)

    itens.push(itemAtual)

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
    nome.focus()
})

function criaElemento(item) {
    const novoItem = document.createElement("li")
    const novoNumero = document.createElement("strong")
    
    novoItem.classList.add("item")
    novoNumero.innerHTML = item.quantidade
    novoItem.appendChild(novoNumero)
    novoItem.innerHTML += item.nome

    lista.appendChild(novoItem)
}