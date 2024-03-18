document.addEventListener('DOMContentLoaded', function () {
    SesionActiva().then(resultado => {    
        if (!resultado) {
            var mensaje = document.getElementById("btninicio");
            mensaje.style.display = "block";
        } else {
            var mensaje = document.getElementById("btninicio");
            mensaje.style.display = "none";
        }
    })
        .catch(error => {
            MensajeError('Error en la autenticación:', error);
        });

});