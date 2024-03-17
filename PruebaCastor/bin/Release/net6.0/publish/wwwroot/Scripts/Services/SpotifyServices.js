let accessToken = sessionStorage.getItem('accessToken');
async function searchSpotify(query, type) {
    let apiUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${type}`;
    let response = await fetch(apiUrl, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        alert('No se pudieron obtener los resultados de búsqueda')
        throw new Error('No se pudieron obtener los resultados de búsqueda');
    }
    let data = await response.json();
    return data;
}

