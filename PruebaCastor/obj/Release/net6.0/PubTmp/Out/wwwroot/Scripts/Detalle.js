function openModal(id) {

    let cardItemDv = document.getElementById(id);
    let encryptedData = cardItemDv.getAttribute('data-custom-data');
    let decryptedBytes = CryptoJS.AES.decrypt(encryptedData, 'Castor2024*..');
    let decryptedJsonString = decryptedBytes.toString(CryptoJS.enc.Utf8);
    let dataObj = JSON.parse(decryptedJsonString);

    let modalBody = document.querySelector('#modalDetalle .modal-body');
    modalBody.innerHTML = '';

    dataObj.forEach(prop => {
        let paragraph = document.createElement('p');
        if (prop.type == 'imagen') {
            let img = document.createElement('img');
            img.src = prop.value.url;
            img.width = prop.value.width;
            img.height = prop.value.height;
            paragraph.appendChild(img);
            paragraph.img = img;
        } else if (prop.type == 'reproductor') {
            let audioPlayer = document.createElement('audio');
            audioPlayer.controls = true;
            audioPlayer.src = prop.value;
            paragraph.appendChild(audioPlayer);
        } else if (prop.type == 'array') {
            paragraph.textContent += prop.label + ': ';
            prop.value.forEach(propvalue => {
                paragraph.textContent += `${propvalue.name}, `;
            });
            paragraph.textContent = paragraph.textContent.slice(0, -2);
        } else if (prop.type == 'object') {
            paragraph.textContent += prop.label + ': ';
            prop.value.forEach(propvalue => {
                paragraph.textContent += `${propvalue}, `;
            });
            paragraph.textContent = paragraph.textContent.slice(0, -2);
        }
        else {
            paragraph.textContent += `${prop.label} : ${prop.value} `;
        }
        modalBody.appendChild(paragraph);
    });
   
    var myModal = new bootstrap.Modal(document.getElementById('modalDetalle'));
    myModal.show();
}