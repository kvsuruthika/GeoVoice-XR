const apiKey = 'YOUR_GOOGLE_API_KEY'; // Replace with your API key
const placesUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

let userLocation = null;

function fetchPOIs(location) {
    return fetch(`${placesUrl}?location=${location.lat},${location.lng}&radius=500&key=${apiKey}`)
        .then(response => response.json())
        .then(data => data.results);
}

function updateARWithPOIs() {
    if (userLocation) {
        fetchPOIs(userLocation)
            .then(pois => {
                const poisContainer = document.getElementById('pois');
                poisContainer.innerHTML = '';

                pois.forEach(poi => {
                    const poiEntity = document.createElement('a-entity');
                    poiEntity.setAttribute('gps-entity-place', `latitude: ${poi.geometry.location.lat}; longitude: ${poi.geometry.location.lng};`);
                    poiEntity.setAttribute('geometry', 'primitive: box; width: 1; height: 1; depth: 1;');
                    poiEntity.setAttribute('material', `color: ${getColorForType(poi.types[0])}`);
                    poiEntity.setAttribute('text', `value: ${poi.name}; color: white; align: center;`);
                    poisContainer.appendChild(poiEntity);
                });
            });
    }
}

function getColorForType(type) {
    switch (type) {
        case 'restaurant': return 'green';
        case 'shop': return 'blue';
        case 'landmark': return 'red';
        default: return 'gray';
    }
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(position => {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            updateARWithPOIs();
        }, error => {
            console.error('Error getting location: ', error);
            alert('Unable to retrieve your location');
        });
    } else {
        alert('Geolocation is not supported by your browser');
    }
}

window.onload = getUserLocation;
