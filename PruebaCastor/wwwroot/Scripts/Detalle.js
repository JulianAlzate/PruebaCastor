function openModal(id) {

    let cardItemDv = document.getElementById(id);
    let encryptedData = cardItemDv.getAttribute('data-custom-data');
    let decryptedBytes = CryptoJS.AES.decrypt(encryptedData, 'Castor2024*..');


    let decryptedJsonString = decryptedBytes.toString(CryptoJS.enc.Utf8);


    let dataObj = JSON.parse(decryptedJsonString);


    let modalBody = document.querySelector('#modalDetalle .modal-body');


    modalBody.innerHTML = '';


    for (let key in dataObj) {
        if (dataObj.hasOwnProperty(key)) {
            let item = dataObj[key];

            let paragraph = document.createElement('p');

            paragraph.textContent = `${key}: `;

            if (Array.isArray(item)) {
                if (key.toLowerCase() == 'imagen') {

                    if (item.length > 0) {
                        let img = document.createElement('img');

                        img.src = item[1].url;
                        img.width = item[1].width;
                        img.height = item[1].height;
                        paragraph.appendChild(img);
                        paragraph.img = img;
                    }
                } else {
                    item.forEach(value => {
                        if (key.toLowerCase() != 'artista') {
                            paragraph.textContent += `${value}, `;
                        }
                        else {
                            paragraph.textContent += `${value.name}, `;
                        }
                    });

                    paragraph.textContent = paragraph.textContent.slice(0, -2);
                }
            } else {
                if (key.toLowerCase() == 'seguidores') {
                    paragraph.textContent += item.total;
                }
                else if (key.toLowerCase() == 'previa') {
                    let audioPlayer = document.createElement('audio');
                    audioPlayer.controls = true;
                    audioPlayer.src = item;
                    modalBody.appendChild(audioPlayer);
                }
                else {

                    paragraph.textContent += item;
                }
            }

            modalBody.appendChild(paragraph);
        }
    }


    var myModal = new bootstrap.Modal(document.getElementById('modalDetalle'));
    myModal.show();
}