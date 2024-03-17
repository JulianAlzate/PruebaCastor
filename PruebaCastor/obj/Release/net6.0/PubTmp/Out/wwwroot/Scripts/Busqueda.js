
document.addEventListener('DOMContentLoaded', function () {
    let searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        let query = document.getElementById('txtSearch');
        let searchType = document.querySelector('input[name="searchType"]:checked').value;
        if (query.value  == '') {
            alert('El campo es obligatorio');
            query.focus();
        }
        else {
            searchSpotify(query.value, searchType)
                .then(data => {
                    showResults(data);
                })
                .catch(error => {
                    console.log('Error:', error);
                });
        }
      
    });

});





