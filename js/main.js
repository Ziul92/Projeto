const form = document.querySelector("[data-formulario]")
const lista = document.querySelector("[data-lista]")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach((elemento) => {
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault()
    const nome = evento.target.elements["nome"]
    const quantidade = evento.target.elements["quantidade"]
    const existe = itens.find(elemento => elemento.nome === nome.value)
    
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    

    if(existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1].id) + 1 : 0;

        criaElemento(itemAtual)
        
        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
    nome.focus()
})

function criaElemento(item) {
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")

    const novoNumero = document.createElement("strong")
    novoNumero.innerHTML = item.quantidade
    novoNumero.dataset.id = item.id
    novoItem.appendChild(novoNumero)
    novoItem.innerHTML += item.nome
    novoItem.appendChild(botao(item.id))
    

    lista.appendChild(novoItem)
}

function atualizaElemento(item) {
    document.querySelector(`[data-id="${item.id}"]`).innerHTML = item.quantidade
}

function botao(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerHTML = "X"

    elementoBotao.addEventListener("click", function() {
        deletaBotao(this.parentNode, id)
    })

    return elementoBotao
}

function deletaBotao(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
    
}