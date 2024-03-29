﻿
const baseURLSpotify = 'https://accounts.spotify.com';
const clientId = '760ce7f0d7bd46cb935a4b84adf27f75';
const redirectUri = 'http://localhost/Castor/Index';
const scope = 'user-read-private user-read-email';


function loginWithSpotify() {  
    let authUrl = `${baseURLSpotify}/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
}

async function exchangeCodeForToken(authorizationCode) {
    const tokenUrl = `${baseURLSpotify}/api/token `;
    let requestBody = {
        grant_type: 'authorization_code',
        code: authorizationCode,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: 'e9bee463e4df4136a0e685f58d1132ac'
    };

    let response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(requestBody)
    });

    if (!response.ok) {
        MensajeError('Error al intercambiar código de autorización por token de acceso');
        throw new Error('Error al intercambiar código de autorización por token de acceso');
    }

    let data = await response.json();
    return data.access_token;
}


async function SesionActiva() {
    let urlParams = new URLSearchParams(window.location.search);
    let authorizationCode = urlParams.get('code');
    if (authorizationCode) {
        let response = await exchangeCodeForToken(authorizationCode)
            .then(accessToken => {         
                sessionStorage.setItem("accessToken", accessToken);
                return true;
            })
            .catch(error => {
                MensajeError('Error de autorización')
                console.error(error)
                return false;
            });
        return await response;
    } else {    
        let accessToken = sessionStorage.getItem('accessToken');    
        if (!accessToken) {
            MensajeError('No hay un token de acceso almacenado');
            return false; 
        }
       
        let response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                if (response.ok) {
                    return true;
                } else {
                    MensajeError('El token de acceso no es válido');
                    return false; 
                }
            })
            .catch(error => {
                MensajeError('Error al verificar la sesión con Spotify');
                console.error(error)
                return false;
            });
        return await response;
    }
}
