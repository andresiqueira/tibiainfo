//import fetch from 'node-fetch'
const name = document.querySelector('[data-js="name"]')
const level = document.querySelector('[data-js="level"]')
const vocation = document.querySelector('[data-js="vocation"]')
const sex = document.querySelector('[data-js="sex"]')
const status = document.querySelector('[data-js="status"]')
const world = document.querySelector('[data-js="world"]')
const residence = document.querySelector('[data-js="residence"]')
const accountStatus = document.querySelector('[data-js="accont-status"]')
const lastLogin = document.querySelector('[data-js="last-login"]')



const findCharacter = document.querySelector('[data-js="find-character"]')
const submitButton = document.querySelector('[data-js="submit-button"]')

function reqAPI (data) {
    fetch(`https://api.tibiadata.com/v2/characters/${data}.json`, {method: 'GET'})
    .then( response => {
    return response.json()
    })
    .then(data => {
        const character = {
            name: data.characters.data.name,
            sex: data.characters.data.sex,
            level: data.characters.data.level,
            vocation: data.characters.data.vocation,
            status: data.characters.data.status,
            world: data.characters.data.world,
            residence: data.characters.data.residence,
            accountStatus: data.characters.data.account_status,
            lastLogin: data.characters.data.last_login[0].date 
        }

        name.textContent = character.name
        sex.textContent = character.sex
        level.textContent = character.level
        vocation.textContent = character.vocation
        status.textContent = character.status
        world.textContent = character.world
        residence.textContent = character.residence
        accountStatus.textContent = character.accountStatus
        lastLogin.textContent = character.lastLogin

        findCharacter.value = ''
    })
}



submitButton.addEventListener('click', event => {
    event.preventDefault()
    reqAPI(findCharacter.value)
})
