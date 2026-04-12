// Pegando os elementos do HTML: Busca
const busca = document.querySelector('#search')
const btnBusca = document.querySelector('#search-agent')
// Catálogo
const catalogoAgents = document.querySelector('#catalogo-agents')
// Função
const descricao = document.querySelector('#description')
const imgFuncao = document.querySelector('#img-funcao')
const txtFuncao = document.querySelector('#text-funcao')
// Habilidades
const imgHab1 = document.querySelector('#img-hab1')
const imgHab2 = document.querySelector('#img-hab2')
const imgHab3 = document.querySelector('#img-hab3')
const imgHab4 = document.querySelector('#img-hab4')
const textHab1 = document.querySelector('#text-hab1')
const textHab2 = document.querySelector('#text-hab2')
const textHab3 = document.querySelector('#text-hab3')
const textHab4 = document.querySelector('#text-hab4')
// Agente
const agenteFoto = document.querySelector('#agent-photo img')
const agenteNome = document.querySelector('#person h1')
const fundoAgente = document.querySelector('#agent-photo')
// Guardar os agentes da API
let listaAgentes = []


//Funções
async function getAgents() {
    const url = 'https://valorant-api.com/v1/agents'
    const response = await fetch(url)
    const data = await response.json()

    // Colocando os agentes na lista
    listaAgentes = data.data.filter(agent => agent.isPlayableCharacter)

    // Renderiza o catálogo
    renderizarCatalogo(listaAgentes)

    // Exibir agente inicial ao abrir a página
    mostrarDetalhes(listaAgentes[0])
}

function mostrarDetalhes(agent) {
    // Verificar agente
    if (!agent) {
        alert('Agente inválido!')
        return
    }

    // Mostrando o nome
    agenteNome.textContent = agent.displayName

    // Mostrando a descrição
    descricao.textContent = agent.description

    // Imagem do agente
    agenteFoto.src = agent.fullPortrait || agent.bustPortrait || agent.displayIcon
    agenteFoto.alt = agent.displayName

    //Imagem de fundo do agente, background do Agente
    agenteFoto.src = agent.fullPortrait || agent.bustPortrait || agent.displayIcon
    agenteFoto.alt = agent.displayName

    // Remove qualquer fundo preso no img
    agenteFoto.style.backgroundImage = 'none'
    agenteFoto.style.background = 'none'

    // Imagem de fundo do agente
    if (agent.background) { 
        fundoAgente.style.backgroundImage = `url(${agent.background})`
        fundoAgente.style.backgroundRepeat = 'no-repeat'
        fundoAgente.style.backgroundPosition = 'center'
        fundoAgente.style.backgroundSize = 'cover'
    } else {
        fundoAgente.style.backgroundImage = 'none'
    }

    // Função do agente
    if (agent.role) {
        imgFuncao.src = agent.role.displayIcon
        imgFuncao.alt = agent.role.displayName
        txtFuncao.textContent = agent.role.displayName
    } else {
        imgFuncao.src = ''
        imgFuncao.alt = ''
        txtFuncao.textContent = 'Sem função'
    }

    // Habilidades
    imgHab1.src = agent.abilities[0]?.displayIcon || ''
    imgHab1.alt = agent.abilities[0]?.displayName || ''
    textHab1.textContent = agent.abilities[0]?.displayName || 'Sem habilidade'

    imgHab2.src = agent.abilities[1]?.displayIcon || ''
    imgHab2.alt = agent.abilities[1]?.displayName || ''
    textHab2.textContent = agent.abilities[1]?.displayName || 'Sem habilidade'

    imgHab3.src = agent.abilities[2]?.displayIcon || ''
    imgHab3.alt = agent.abilities[2]?.displayName || ''
    textHab3.textContent = agent.abilities[2]?.displayName || 'Sem habilidade'

    imgHab4.src = agent.abilities[3]?.displayIcon || ''
    imgHab4.alt = agent.abilities[3]?.displayName || ''
    textHab4.textContent = agent.abilities[3]?.displayName || 'Sem habilidade'
}

function buscarAgente() {
    // Pegar o nome
    const nomeAgente = busca.value.trim().toLowerCase()

    // Possível erro
    if (nomeAgente === '') {
        alert('Digite o nome do agente.')
        return
    }

    const agenteEncontrado = listaAgentes.find(agent =>
        agent.displayName.toLowerCase() === nomeAgente
    )

    // Se achar, mostra os dados
    if (agenteEncontrado) {
        mostrarDetalhes(agenteEncontrado)
    } else {
        alert('Agente não encontrado.')
    }
}

function renderizarCatalogo(agentes) {
    // Mantém apenas o título h1 e remove os cards antigos
    catalogoAgents.innerHTML = '<h1>Agentes</h1>'

    agentes.forEach(agent => {
        // Criando a div principal do card
        const card = document.createElement('div')
        card.classList.add('agent')

        // Inserindo imagem e nome do agente
        card.innerHTML = `
            <img src="${agent.displayIcon}" alt="${agent.displayName}">
            <h2>${agent.displayName}</h2>`

        // Ao clicar no card, mostra os detalhes do agente
        card.addEventListener('click', () => {
            mostrarDetalhes(agent)
        })

        // Adiciona o card no catálogo
        catalogoAgents.appendChild(card)
    })
}

// EVENTOS
btnBusca.addEventListener('click', buscarAgente)

busca.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        buscarAgente()
    }
})

// INICIANDO A API
getAgents()