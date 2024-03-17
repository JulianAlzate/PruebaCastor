
function displayResults(results) {
    let searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = ''; // Clear previous results

    // Check if results is an object
    if (typeof results !== 'object' || results === null || Object.keys(results).length === 0) {
        searchResults.innerHTML = '<p>No results found.</p>';
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
            let cardItemDv = document.createElement('div');
            cardItemDv.classList.add('card');
            let cardItembody = document.createElement('div');
            cardItembody.classList.add('card-body');
            cardItembody.innerHTML = result.name;
            cardItemDv.appendChild(cardItembody);
            accordionBody.appendChild(cardItemDv);
        });

        accordionCollapse.appendChild(accordionBody);
        accordionItem.innerHTML = accordionHeader;
        accordionItem.appendChild(accordionCollapse);
        searchResults.appendChild(accordionItem);
    }
}