
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
        table.classList.add('table'); 
        let tableHeader = document.createElement('thead');
        let headerRow = document.createElement('tr');
        let nameHeader = document.createElement('th');
        nameHeader.textContent = 'Nombre'; 
        headerRow.appendChild(nameHeader);
        let accionHeader = document.createElement('th');
        accionHeader.textContent = 'accion'; 
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
function crateObjet(namevalue, labelvalue, typevalue, valueresult) {
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
            crateObjet('Nombre', 'Nombre', 'texto', result.name),
            crateObjet('Artista', 'Artista', 'array', result.artists),
            crateObjet('TotCanciones', 'Total canciones', 'texto', result.total_tracks),
            crateObjet('FechLanzamiento', 'Fecha de Lanzamiento', 'texto', result.release_date),
            crateObjet('Imagen', 'Imagen', 'imagen', result.images[1])            
        ]
    }
    else if (result.type.toLowerCase() == 'artist') {
        return [
            crateObjet('Nombre', 'Nombre', 'texto', result.name),
            crateObjet('Genero', 'Genero', 'object', result.genres),
            crateObjet('Seguidores', 'Seguidores', 'texto', result.followers.total),
            crateObjet('Imagen', 'Imagen', 'imagen', result.images[1])
        ]
    }
    else if (result.type.toLowerCase() == 'track') {
        return [
            crateObjet('Nombre', 'Nombre', 'texto', result.name),
            crateObjet('Duracion', 'Duración', 'texto', result.duration_ms),
            crateObjet('Artistas', 'Artistas', 'array', result.artists),
            crateObjet('Tipo', 'Tipo', 'texto', result.type),
            crateObjet('Previa', 'Previa', 'reproductor', result.preview_url),
            crateObjet('Imagen', 'Imagen', 'imagen', result.album.images[1])
        ]
    }
}