
// One page application
document.querySelector("#btn-search-home").addEventListener('click', function () {
  document.querySelector('#container').style.display = "block";
  document.querySelector('#carouselExampleIndicators').style.display = "none"
})

// Set the map location to Singapore
let singapore = [1.29, 103.85];
let map = L.map('map').setView(singapore, 13);


// Allow map to locate current location
map.locate({ setView: true, maxZoom: 12 })

function onLocationFound(e) {
  var radius = 2000

  let userIcon = L.icon({
    iconUrl: 'user-location1.png',
    iconSize: [50, 50],
    className: 'myuserIcon',
    popupAnchor: [0, -12]
    
  })

  let marker = L.marker(e.latlng, {
    icon: userIcon
  })

  marker.addTo(map).bindPopup("Your current location on the map").openPopup();

  L.circle(e.latlng, radius, {
    opacity: 0.8,
    weight: 1,
    fillOpacity: 0.2
  }).addTo(map);
  // console.log(e.latlng)
  let lat = e.latlng.lat
  let lng = e.latlng.lng

  let clusterhotels = L.layerGroup()
  async function gethotels1() {

    let response1 = await axios.get('https://api.foursquare.com/v2/venues/explore', {
      params: {
        'll': lat + ',' + lng,
        'client_id': 'AG5GPKHMNCXQMMBJ3OYZRJC5C5EVRPVN4XMUAVYJBJQOGN3H',
        'client_secret': 'JN0CP4TS12X4V3IIJEV3DII5SUAUJJJ53V3NARHFYKRDMOFB',
        'v': '20210903',
        'categoryId': '4bf58dd8d48988d1fa931735',
        'radius': '2000',

      }

    })

    for (let results of response1.data.response.groups[0].items) {

      let hotelIcon = L.divIcon({
        html: '<i class="fas fa-bed"></i>',
        iconSize: [20, 20],
        className: 'myhotelIcon'
      });


      let marker = L.marker([results.venue.location.lat, results.venue.location.lng], {
        icon: hotelIcon,
      })


      marker.bindPopup(`<h5>Reason for recommendation: ${results.reasons.items[0].summary}</h5><h5>Name of recommended venue: ${results.venue.name}</h5><h5>Cateogory: ${results.venue.categories[0].name}</h5><h5>Address: ${results.venue.location.address}</h5>`)
      marker.addTo(clusterhotels)
      clusterhotels.addTo(map)


    }
  }
  gethotels1()

}
map.on('locationfound', onLocationFound);


// setup the tile layers from leaflet
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

// consume 1st API from gov website for taxicoordinates

let taxiGroup = L.layerGroup()
async function gettaxi() {
  
  let response = await axios.get('https://api.data.gov.sg/v1/transport/taxi-availability')
  let coordinates = response.data.features[0].geometry.coordinates
  // create a cluster of markers for taxi coordinates

  let cluster = L.markerClusterGroup()

  // added a custom taxi marker icon and positioned the popup just above the marker
  let taxiIcon = L.divIcon({
    html: '<i class="fas fa-taxi"></i>',
    iconSize: [200, 200],
    className: 'mytaxiIcon',
    popupAnchor: [0, -100]
  });

  // extract out each taxi coordinates
  for (let points of coordinates) {
    let lng = points[0]
    let lat = points[1]
    let actualcoordinates = [lat, lng]

    let marker = L.marker(actualcoordinates, {
      icon: taxiIcon
    })
    // added a first popup to the marker to show the user that data is being called from the next API as it needs 1 second for it to get
    marker.bindPopup('Loading...')

    // Consume a 2nd API for an external search to get the taxi coordinates address when the marker is clicked
    marker.addEventListener('click', async function () {
      const API_BASE_URL = "https://nominatim.openstreetmap.org/search"
      let response1 = await axios.get(API_BASE_URL, {
        'params': {
          'q': lat + ' ' + lng,
          'countrycodes': 'sg',
          'format': 'jsonv2'
        }
      })
      // display the address of the taxi in the marker popup 
      marker.bindPopup(response1.data[0].display_name)
    })
    marker.addTo(cluster)
    cluster.addTo(taxiGroup);
  }
  // Refresh the real time taxi-coordinates every 2 minutes to get latest taxi locations
  setInterval(() => gettaxi(), 120000)
}

gettaxi()





document.querySelector('#taxiresults').addEventListener('click', function () {
  if (map.hasLayer(taxiGroup)) {
    map.removeLayer(taxiGroup)
  }
  else {
    map.addLayer(taxiGroup)
  }
})



// extract geojson from gov website for hawker centers
let hawkerGroup = L.layerGroup()
async function getHawkers() {
  let response = await axios.get('hawker_centres.geojson');

  for (let points of response.data.features) {
    let lng = points.geometry.coordinates[0]
    let lat = points.geometry.coordinates[1]
    let hawkerActualCoordinates = [lat, lng]

    let hawkerIcon = L.divIcon({
      html: "<span class='fa-stack fa-lg'><i class='fas fa-circle fa-stack-2x'></i><i class='fas fa-utensils fa-stack-1x fa-inverse'></i></i></span>",
      iconSize: [40, 40],
      className: 'myhawkerIcon'
    });

    let marker = L.marker(hawkerActualCoordinates, {
      icon: hawkerIcon,
    })

    marker.addTo(hawkerGroup)
    marker.addEventListener('click', function () {
      map.flyTo(hawkerActualCoordinates, 14)
    })
    let hawkerLayer = L.geoJson(response.data, {
      onEachFeature: function (feature, layer) {
        let newdoc = document.createElement('div');

        newdoc.innerHTML = points.properties.Description;

        let td1 = newdoc.querySelectorAll('td')

        let name = td1[19].innerHTML;
        let postalCode = td1[26].innerHTML;
        let establishedDate = td1[2].innerHTML

        marker.bindPopup(`<h6>Name of Hawker Center: ${name}</h6><h6>Established Date: ${establishedDate}</h6><h6>Postal Code: ${postalCode}</h6>`);
      }
    })
  }

}

getHawkers()

let hotelGroup = L.layerGroup()
async function getHotels() {
  let response = await axios.get('hotels.geojson');


  for (let points of response.data.features) {
    let lng = points.geometry.coordinates[0]
    let lat = points.geometry.coordinates[1]
    let hotelsActualCoordinates = [lat, lng]
    let hotelName = points.properties.Name
    let totalRooms = points.properties.TOTALROOMS
    let address = points.properties.ADDRESS

    let allhotelIcon = L.divIcon({
      html: "<span class='fa-stack fa-lg'><i class='fas fa-square fa-stack-2x fa-inverse'></i><i class='fas fa-hotel fa-stack-1x'></i></span>",
      className: 'allhotelsIcon'
    });

    let marker = L.marker(hotelsActualCoordinates, {
      icon: allhotelIcon,
    })
    marker.addTo(hotelGroup)

    marker.addEventListener('click', function () {
      map.flyTo(hotelsActualCoordinates, 14)
    })

    marker.bindPopup(`<h3>Name of Hotel: ${hotelName}</h3><h3>Total Rooms: ${totalRooms}</h3><h3>Address: ${address}</h3>`);
  }

}

getHotels()



let baseLayers = {
  'Hawker centers': hawkerGroup,

}

let overlay = {
  'Hotels': hotelGroup,
  'Taxi locations': taxiGroup
}

L.control.layers(baseLayers, overlay).addTo(map)

// Toggle locations of hawker centers on and off
document.querySelector('#toggle').addEventListener('click', function () {
  if (map.hasLayer(hawkerGroup)) {
    map.removeLayer(hawkerGroup)
  }
  else {
    map.addLayer(hawkerGroup)
  }

})

// Consume a 3rd API for search recommended venues in Singapore
let baseURL = 'https://api.foursquare.com/v2/venues/explore'
async function search(query) {
  // let ll=lat +','+ lng
  let response = await axios.get(baseURL, {
    params: {
      'near': 'singapore',
      'client_id': 'AG5GPKHMNCXQMMBJ3OYZRJC5C5EVRPVN4XMUAVYJBJQOGN3H',
      'client_secret': 'JN0CP4TS12X4V3IIJEV3DII5SUAUJJJ53V3NARHFYKRDMOFB',
      'query': query,
      'v': '20210903',
      'radius': 20000,

    }
  })


  return response.data

}
// console.log(search('tacos'))

let searchCluster = L.layerGroup()
document.querySelector('#button').addEventListener('click', async function () {
  searchCluster.clearLayers()
  document.querySelector('#search-results').style.display = 'block'
  let searchresult = document.querySelector('#textinput').value;

  let response2 = await search(searchresult)
  // console.log(search(searchresult))

  let searchresultsinfo = document.querySelector('#search-results')
  searchresultsinfo.innerHTML = "";

  let attractionsIcon = L.divIcon({
    html: "<span class='fa-stack fa-lg'><i class='fas fa-map-marker fa-stack-2x'></i><i class='fas fa-camera-retro fa-stack-1x fa-inverse'></i></i></span>",
    className: 'myattractionsIcon'
  });


  for (let results of response2.response.groups[0].items) {
    let marker = L.marker([results.venue.location.lat, results.venue.location.lng], {
      icon: attractionsIcon,
    })
    let searchcoordinates = [results.venue.location.lat, results.venue.location.lng]
    // console.log(coordinates)


    marker.bindPopup(`<h5>Reason for recommendation: ${results.reasons.items[0].summary}</h5><h5>Name of recommended venue: ${results.venue.name}</h5><h5>Cateogory: ${results.venue.categories[0].name}</h5><h5>Address: ${results.venue.location.address}</h5>`)
    marker.addTo(searchCluster)
    searchCluster.addTo(map)
    // console.log(searchCluster)

    let resultname = document.createElement('div')
    resultname.innerHTML = results.venue.name
    searchresultsinfo.appendChild(resultname)
    // console.log(searchresultsinfo)

    resultname.addEventListener('click', function () {
      map.flyTo(searchcoordinates, 16);
      marker.openPopup()
    })

    // Remove search results and markers
    document.querySelector('#remove-search').addEventListener('click', function () {
      if (searchresultsinfo.contains(resultname)) {
        document.querySelector('#search-results').style.display = 'none',
          searchCluster.clearLayers()
      }
      else {
        document.querySelector('#search-results').style.display = 'block'
      }

    })


    // Collapse search results
    document.querySelector('#tab-toggle').addEventListener('click', function () {
      if (searchresultsinfo.contains(resultname)) {
        document.querySelector('#search-results').style.display = 'none'
      } else {
        document.querySelector('#search-results').style.display = 'block'
      }
    })
  }
})


// ESRI Leaflet API Token
let apiToken = 'AAPKa44cc3d9e4ae4facae3db37598891536u8VcocjPLyXxxaguleDVkZdePzQo7nEOjYWuzaKIfZfzB0QumPr6svIIJ-IBz8b8'


// ESRI Geocoding Service
let geocodeService = L.esri.Geocoding.geocodeService({
  apikey: apiToken // 
})
let geocooding = L.layerGroup()
let resturants = L.layerGroup()
map.on('dblclick', function (e) {
  geocooding.clearLayers();
  resturants.clearLayers();
  geocodeService.reverse().latlng(e.latlng).run(function (error, result) {
    if (error) {
      return;
    }

    let marker = L.marker(result.latlng);
    marker.addTo(geocooding);
    marker.bindPopup(result.address.Match_addr);
    marker.openPopup();
    geocooding.addTo(map);


    let lat = result.latlng.lat
    let lng = result.latlng.lng

// Consume a 4th API for all eateries within 1km on clicked location in Singapore
    async function getresturants() {

      let response1 = await axios.get('https://api.foursquare.com/v2/venues/explore', {
        params: {
          'll': lat + ',' + lng,
          'client_id': 'AG5GPKHMNCXQMMBJ3OYZRJC5C5EVRPVN4XMUAVYJBJQOGN3H',
          'client_secret': 'JN0CP4TS12X4V3IIJEV3DII5SUAUJJJ53V3NARHFYKRDMOFB',
          'v': '20210903',
          'categoryId': '4d4b7105d754a06374d81259',
          'radius': '1000',

        }

      })
      for (let results of response1.data.response.groups[0].items) {

        let resturantsIcon = L.divIcon({
          html: "<span class='fa-stack fa-lg'><i class='fas fa-square fa-stack-2x'></i><i class='fas fa-utensils fa-stack-1x fa-inverse'></i></span>",
          iconSize: [20, 20],
          className: 'myresturantsIcon'
        });


        let marker = L.marker([results.venue.location.lat, results.venue.location.lng], {
          icon: resturantsIcon,
        })


        marker.bindPopup(`<h5>Reason for recommendation: ${results.reasons.items[0].summary}</h5><h5>Name of recommended venue: ${results.venue.name}</h5><h5>Cateogory: ${results.venue.categories[0].name}</h5><h5>Address: ${results.venue.location.address}</h5>`)
        marker.addTo(resturants)
        resturants.addTo(map)

      }
    }
    document.querySelector('#remove-georesturants').addEventListener('click', function () {
      // if (map.hasLayer(resturants)) {
        map.removeLayer(resturants)
      // }
      // else {
      //   map.addLayer(resturants)
      // }
    })

    getresturants()

  });
});

document.querySelector('#gardensAttraction').addEventListener('click', function(){
  let gardensIcon = L.icon({
    iconUrl: 'user-location1.png',
    iconSize: [50, 50],
    className: 'myuserIcon',
    
  })
  
  let marker = L.marker([1.2847, 103.8610], {
    icon: gardensIcon,
  })
  marker.addTo(map);
  marker.bindPopup(`<center><h4>Gardens By The Bay</h4>A national garden and premier horticultural attraction for local and international visitors, Gardens by the Bay is a showpiece of horticulture and garden artistry that presents the plant kingdom in a whole new way, entertaining while educating visitors with plants seldom seen in this part of the world, ranging from species in cool, temperate climates to tropical forests and habitats. </center></br><img src="thegardens-info.jpeg" height="300px" width="300px"/>`);
  map.flyTo([1.2847, 103.8610], 16);
  marker.openPopup()
  
})





