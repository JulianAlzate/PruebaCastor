function MensajeError(msg) {
    MostrarMensaje("alert-danger", "Error!", msg)
}
function MensajeAdvertencia(msg) {
    MostrarMensaje("alert-warning", "Advertencia!", msg)
}
function MensajeInfo(msg) {
    MostrarMensaje("alert-info", "Importante!", msg)
}
function MensajeExito(msg) {
    MostrarMensaje("alert-success", "Éxito!", msg)
}

function MostrarMensaje(classMsg, titleMsj, msg) {
    var message = document.getElementById("mensaje");
    message.classList.remove();
    message.style.display = "block";
    message.className = `alert ${classMsg}`;
    document.getElementById("titleMsj").innerHTML = titleMsj;
    document.getElementById("dataMsj").innerHTML = msg;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function OcultarMensaje() {
    var message = document.getElementById("mensaje");
    message.style.display = "none";
    message.className = "";
    document.getElementById("titleMsj").innerHTML = "";
    document.getElementById("dataMsj").innerHTML = "";
}
