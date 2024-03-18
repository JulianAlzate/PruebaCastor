
function showResults(results) {

    let searchResults = document.getElementById('searchResults');
    searchResults.style.display = 'block';
    searchResults.innerHTML = '';

    if (typeof results !== 'object' || results === null || Object.keys(results).length === 0) {
        searchResults.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    for (const key in results) {
        let collapseId = `collapse-${key}`;
        let accordionItem = document.createElement('div');
        accordionItem.classList.add('accordion-item');
        let accordionHeader = `
                <h2 class="accordion-header" id="heading-${key}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">
                        ${key}
                    </button>
                </h2>
            `;

        let accordionCollapse = document.createElement('div');
        accordionCollapse.classList.add('accordion-collapse', 'collapse');
        accordionCollapse.id = collapseId;
        accordionCollapse.setAttribute('aria-labelledby', `heading-${key}`);

        let accordionBody = document.createElement('div');
        accordionBody.classList.add('accordion-body');

        let table = document.createElement('table');
        table.setAttribute('id', key);
        table.classList.add('table'); // Agrega clases según sea necesario para estilos de Bootstrap u otros frameworks
        let tableHeader = document.createElement('thead');
        let headerRow = document.createElement('tr');
        let nameHeader = document.createElement('th');
        nameHeader.textContent = 'Nombre'; // Aquí puedes establecer el texto del encabezado
        headerRow.appendChild(nameHeader);
        let accionHeader = document.createElement('th');
        accionHeader.textContent = 'accion'; // Aquí puedes establecer el texto del encabezado
        headerRow.appendChild(accionHeader);
        tableHeader.appendChild(headerRow);
        table.appendChild(tableHeader);
        let tableBody = document.createElement('tbody');
        results[key].items.forEach(result => {
            var objetoDataSend = getDataSend(result)
            let jsonData = JSON.stringify(objetoDataSend);
            var encrypted = CryptoJS.AES.encrypt(jsonData, 'Castor2024*..');
            var encryptedString = encrypted.toString();


            let row = document.createElement('tr');
            row.setAttribute('id', result.id);
            row.setAttribute('data-custom-data', encryptedString);
            let nameCell = document.createElement('td');
            nameCell.textContent = result.name;

            let buttonCell = document.createElement('td');
            let buttonElement = document.createElement('button');
            buttonElement.textContent = "Ver detalle";
            buttonElement.classList.add('btn', 'btn-info');
            buttonElement.addEventListener('click', () => openModal(result.id));
            buttonCell.appendChild(buttonElement);

            row.appendChild(nameCell);
            row.appendChild(buttonCell);
            tableBody.appendChild(row);

        });
        table.appendChild(tableBody);
        accordionBody.appendChild(table);
        accordionCollapse.appendChild(accordionBody);
        accordionItem.innerHTML = accordionHeader;
        accordionItem.appendChild(accordionCollapse);
        searchResults.appendChild(accordionItem);
        TablaJQDT(key,0, "asc", null, false);
    }
}
function pintarcard(result) {
  /*  var objetoDataSend = getDataSend(result)

    let cardItemDv = document.createElement('div');
    cardItemDv.classList.add('card');
    cardItemDv.setAttribute('id', result.id);
    let cardItembody = document.createElement('div');
    cardItembody.classList.add('card-body');


    let jsonData = JSON.stringify(objetoDataSend);


    var encrypted = CryptoJS.AES.encrypt(jsonData, 'Castor2024*..');
    var encryptedString = encrypted.toString();
    cardItemDv.setAttribute('data-custom-data', encryptedString);
    cardItembody.innerHTML = result.name;


    let buttonElement = document.createElement('button');
    buttonElement.innerText = "Ver detalle";
    buttonElement.classList.add('btn', 'btn-info');
    buttonElement.addEventListener('click', () => openModal(result.id));

    cardItemDv.appendChild(cardItembody);
    cardItemDv.appendChild(buttonElement);
    accordionBody.appendChild(cardItemDv);*/
}
function crearobjeto(namevalue, labelvalue, typevalue, valueresult) {
    return {
        name: namevalue,
        label: labelvalue,
        type: typevalue,
        value: valueresult,
    }
}

function getDataSend(result) {
    if (result.type.toLowerCase() == 'album') {
        return [
            crearobjeto('Nombre', 'Nombre', 'texto', result.name),
            crearobjeto('Artista', 'Artista', 'array', result.artists),
            crearobjeto('TotCanciones', 'Total canciones', 'texto', result.total_tracks),
            crearobjeto('FechLanzamiento', 'Fecha de Lanzamiento', 'texto', result.release_date),
            crearobjeto('Imagen', 'Imagen', 'imagen', result.images[1])            
        ]
    }
    else if (result.type.toLowerCase() == 'artist') {
        return [
            crearobjeto('Nombre', 'Nombre', 'texto', result.name),
            crearobjeto('Genero', 'Genero', 'object', result.genres),
            crearobjeto('Seguidores', 'Seguidores', 'texto', result.followers.total),
            crearobjeto('Imagen', 'Imagen', 'imagen', result.images[1])
        ]
    }
    else if (result.type.toLowerCase() == 'track') {
        return [
            crearobjeto('Nombre', 'Nombre', 'texto', result.name),
            crearobjeto('Duracion', 'Duración', 'texto', result.duration_ms),
            crearobjeto('Artistas', 'Artistas', 'array', result.artists),
            crearobjeto('Tipo', 'Tipo', 'texto', result.type),
            crearobjeto('Previa', 'Previa', 'reproductor', result.preview_url),
            crearobjeto('Imagen', 'Imagen', 'imagen', result.album.images[1])
        ]
    }
}