(function () {
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

            const character = Object.entries(data.characters.data);
            const characterInfos = [
                character[0],
                character[2],
                character[3],
                character[4],
                character[6],
                character[7],
                character[9],
                character[10],
                formatDate(character[8][1][0].date) 
            ]

            createTable(characterInfos)
        })
    }

    submitButton.addEventListener('click', event => {
        event.preventDefault();
        reqAPI(validateInput(findCharacter.value));
        removeTable();
    });

    function replaceComma(string) {
        return string.replace(',',': ');
    }

    function acceptOnlyWordsAndWhiteSpace(inputValue) {
        const regex = /[\d]|[^a-zA-Z ]/;
        return regex.test(inputValue);
    }

    function validateInput (inputValue) {
        if (inputValue && acceptOnlyWordsAndWhiteSpace(inputValue) === false) {
            return inputValue;
        }
        erro.textContent = 'Preencha o campo com caracteres válidos'
        setTimeout(()=> { erro.textContent = ''}, 2000);
        return '';
    }

    function createTable(...argument) {
        argument.map( elements =>{
            const table = document.createElement('table');
            elements.forEach(element => {
                const column = document.createElement('tr');
                const row = document.createElement('td');
                row.textContent = replaceComma(element.toString())[0]
                .toUpperCase() + replaceComma(element.toString())
                .substring(1);
                column.appendChild(row);
                table.appendChild(column);  
                table.classList.add('table');
                document.body.appendChild(table);
            });
        });   
    }

    function removeTable () {
        const table = document.querySelector('table');
        table ? table.remove() : null
    }

    function formatDate(date) {
        const dateToFormat = new Date(date);
        const formattedDate = dateToFormat.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
        const formattedTime = dateToFormat.toLocaleTimeString('pt-BR')
        return `${formattedDate}  ${formattedTime}`;
    }
})();