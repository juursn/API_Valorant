async function getAgents() { 
    const url = 'https://valorant-api.com/v1/agents'
    const API = await fetch(url)
    const data = await API.json()

    const agents = data.data.map(agent => ({
        uuid: agent.uuid,
        displayName: agent.displayName
    }))
    console.log(agents)
}

getInfo()