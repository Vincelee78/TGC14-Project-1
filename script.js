let singapore = [1.29, 103.85];
let changiairport = [1.3644, 103.9915];
let map = L.map('map')
// Set the default center point
let marker = L.marker(changiairport)
marker.addTo(map)
marker.bindPopup('Your location at Changi Airport')
map.setView(singapore, 12)

// Refresh the page every 5 minutes to get latest taxi locations
setTimeout("location.reload();", 300000)

// OneMap Authentication
let accessToken = axios.post('https://developers.onemap.sg/privateapi/auth/post/getToken', { email: 'leeweixg2001@yahoo.com', password: 'Scatyim777' }).then(response => accessToken = response.data.access_token)

// setup the tile layers from leaflet
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);