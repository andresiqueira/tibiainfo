const erro = document.querySelector('[data-js="erro"]');
const findCharacter = document.querySelector('[data-js="find-character"]');
const submitButton = document.querySelector('[data-js="submit-button"]');

function reqAPI (data) {
    fetch(`https://api.tibiadata.com/v2/characters/${data}.json`, {method: 'GET'})
    .then( response => {
        return response.json();
    })
    .then(data => {
        if ( data.characters.error === "Character does not exist." ) {
            erro.textContent = 'Personagem não existe';
        }

        const character = [
            data.characters.data.name,
            data.characters.data.sex,
            data.characters.data.level,
            data.characters.data.vocation,
            data.characters.data.status,
            data.characters.data.world,
            data.characters.data.residence,
            data.characters.data.account_status,
            data.characters.data.last_login[0].date 
        ]

        handleTable(character)
    })
}

submitButton.addEventListener('click', event => {
    event.preventDefault();
    reqAPI(validateField(findCharacter.value));
    removeTable();
})

function removeTable () {
    const table = document.querySelector('table');
    table ? table.remove() : null
}

function validateField (field) {
    if (field) {
        return field;
    }
    erro.textContent = 'Preencha o campo acima'
    setTimeout(()=> { erro.textContent = ''}, 2000);
    return '';
}

function handleTable(...arguments) {
    arguments.map( element =>{
        const table = document.createElement('table');
        element.forEach(elements => {
            const column = document.createElement('tr');
            const row = document.createElement('td');
            row.textContent = elements;
            column.appendChild(row);
            table.appendChild(column);  
            table.classList.add('table');
            document.body.appendChild(table);
        });
    });   
}

