
function showResults(results) {

    let searchResults = document.getElementById('searchResults');
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

        results[key].items.forEach(result => {
            debugger;
            var objetoDataSend = {};

            if (result.type.toLowerCase() == 'album') {
                objetoDataSend = {
                    Nombre: result.name,
                    Artista: result.artists,
                    TotCanciones: result.total_tracks,
                    FechLanzamiento: result.release_date,
                    Imagen: result.images
                };
            }
            if (result.type.toLowerCase() == 'artist') {
                 objetoDataSend = {
                    Nombre: result.name,
                    Genero: result.genres,
                    Seguidores: result.followers,
                    Imagen: result.images
                };
            }

            if (result.type.toLowerCase() == 'track') {
                objetoDataSend = {
                    Nombre: result.name,
                    Duracion: result.duration_ms,
                    Artistas: result.total_tracks,
                    Tipo: result.type,
                    Imagen: result.album.images,
                    Previa: result.preview_url
                };
            }
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
            accordionBody.appendChild(cardItemDv);
            cardItemDv.appendChild(buttonElement);
        });

        accordionCollapse.appendChild(accordionBody);
        accordionItem.innerHTML = accordionHeader;
        accordionItem.appendChild(accordionCollapse);
        searchResults.appendChild(accordionItem);
    }
}