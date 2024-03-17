document.addEventListener('DOMContentLoaded', function () {
    SesionActiva().then(resultado => {    
        if (!resultado) {         
           loginWithSpotify();
        }
    })
        .catch(error => {
            alert(error);
        });

});