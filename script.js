
// One page application
document.querySelector('#btn-search-home').addEventListener('click', function(){
  // hide all the landing page
  let pages = document.querySelectorAll('.page');
  for (let section of pages) {
      section.classList.remove('show')
  }

  // show map container
  document.querySelector('#container').classList.add('show')

})


// Set the map location to Singapore
let singapore = [1.29, 103.85];
let map = L.map('map').setView(singapore, 13);


// Allow map to locate current location
map.locate({ setView: true, maxZoom: 12 })

function onLocationFound(e) {
  var radius = 2000

  let userIcon = L.icon({
    iconUrl: 'images/userLocation.png',
    iconSize: [50, 50],
    className: 'myuserIcon',
    popupAnchor: [0, -12]

  })

  let marker = L.marker(e.latlng, {
    icon: userIcon
  })

  marker.addTo(map).bindPopup("Your current location on the map").openPopup();

  // Create a circle radius from current user location of approximate 2km
  L.circle(e.latlng, radius, {
    opacity: 0.8,
    weight: 2,
    fillColor: 'blue',
    color:'orange',
    fillOpacity: 0.2
  }).addTo(map);

  // Locate all hostels and hotels within 2km of current location
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
      // Custom hotel marker icon
      let hotelIcon = L.divIcon({
        html: '<i class="fas fa-bed"></i>',
        iconSize: [20, 20],
        className: 'myhotelIcon'
      });

      // Coordinates of the nearby hostels and hotels
      let marker = L.marker([results.venue.location.lat, results.venue.location.lng], {
        icon: hotelIcon,
      })

      // Details of popup of the hostels and hotels
      marker.bindPopup(`<h5>Reason for recommendation: ${results.reasons.items[0].summary}</h5><h5>Name of recommended venue: ${results.venue.name}</h5><h5>Cateogory: ${results.venue.categories[0].name}</h5><h5>Address: ${results.venue.location.address}</h5>`)
      marker.addTo(clusterhotels)
      clusterhotels.addTo(map)


    }
  }
  gethotels1()

}
// Display the marker of the current location of user on map 
map.on('locationfound', onLocationFound);


// setup the tile layers from leaflet
// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//   maxZoom: 18,
//   id: 'mapbox/streets-v11',
//   tileSize: 512,
//   zoomOffset: -1,
//   accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
// }).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// asynchronous function calls in parallel

async function loadData(){
  let hawkers=await axios.get('geojson-files/hawker-centres.geojson');
  let hotels= await axios.get('geojson-files/hotels.geojson');
  let taxis= await axios.get('https://api.data.gov.sg/v1/transport/taxi-availability');
  return {hawkers,hotels,taxis}
}


// consume 1st API from gov website for taxicoordinates

let taxiGroup = L.layerGroup()
async function gettaxi() {

  let {taxis} = await loadData();
  let coordinates = taxis.data.features[0].geometry.coordinates
  // create a cluster of markers for taxi coordinates

  let cluster = L.markerClusterGroup()

  // added a custom taxi marker icon and positioned the popup just above the marker
  let taxiIcon = L.divIcon({
    html: '<i class="fas fa-taxi"></i>',
    iconSize: [200, 200],
    className: 'mytaxiIcon',
    popupAnchor: [0, -100]
  });

  // extract out each taxi coordinates by array mapping
  coordinates.map((points)=>{
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
  })
  // Refresh the real time taxi-coordinates every 2 minutes to get latest taxi locations
  setInterval(() => gettaxi(), 120000)
}

gettaxi()




// Added a toggle button to turn on and off the coordinates of all taxis available
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
  let {hawkers} = await loadData();
  // Created a cluster group for hawker centers
  let cluster = L.markerClusterGroup()

  // array transversal
  for (let points of hawkers.data.features) {
    let lng = points.geometry.coordinates[0]
    let lat = points.geometry.coordinates[1]
    let hawkerActualCoordinates = [lat, lng]
    // Custom marker for hawker icons
    let hawkerIcon = L.divIcon({
      html: "<span class='fa-stack fa-lg'><i class='fas fa-circle fa-stack-2x'></i><i class='fas fa-utensils fa-stack-1x fa-inverse'></i></i></span>",
      iconSize: [40, 40],
      className: 'myhawkerIcon'
    });

    let marker = L.marker(hawkerActualCoordinates, {
      icon: hawkerIcon,
    })

    marker.addTo(cluster);
    cluster.addTo(hawkerGroup)
    
    // Editing the inner html of geojson data of hawker centers
    let hawkerLayer = L.geoJson(hawkers.data, {
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

// extract geojson from gov website for all hotels
let hotelGroup = L.layerGroup()
async function getHotels() {
  let {hotels} = await loadData();
  // Create a cluster group for hotels
  let cluster = L.markerClusterGroup()

  // array mapping transformation
  hotels.data.features.map((points)=>{
    let lng = points.geometry.coordinates[0]
    let lat = points.geometry.coordinates[1]
    let hotelsActualCoordinates = [lat, lng]
    let hotelName = points.properties.Name
    let totalRooms = points.properties.TOTALROOMS
    let address = points.properties.ADDRESS
    // Create custom hotel markers
    let allhotelIcon = L.divIcon({
      html: "<span class='fa-stack fa-lg'><i class='fas fa-square fa-stack-2x fa-inverse'></i><i class='fas fa-hotel fa-stack-1x'></i></span>",
      className: 'allhotelsIcon'
    });
    console.log(lng)
    let marker = L.marker(hotelsActualCoordinates, {
      icon: allhotelIcon,
    })
    marker.addTo(cluster)
    cluster.addTo(hotelGroup)

    // Details of popup of the hotels
    marker.bindPopup(`<h3>Name of Hotel: ${hotelName}</h3><h3>Total Rooms: ${totalRooms}</h3><h3>Address: ${address}</h3>`);
  
  })
}

getHotels()


// Create checkboxes for all hotels and taxi locations
let baseLayers = {
}

let overlay = {
  'Hotels': hotelGroup,
  'Taxi locations': taxiGroup,
  'Hawker centers': hawkerGroup,
}

L.control.layers(baseLayers, overlay).addTo(map)


// Consume a 3rd API for search recommended venues in Singapore
let baseURL = 'https://api.foursquare.com/v2/venues/explore'
async function search(query) {

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

// Search result locations layer
let searchCluster = L.layerGroup()
document.querySelector('#searchContainerbutton').addEventListener('click', async function () {
  // clear previous search results after new search
  searchCluster.clearLayers()
  document.querySelector('#search-results').style.display = 'block'
  let searchresult = document.querySelector('#textinput').value;

  let response2 = await search(searchresult)

  let searchresultsinfo = document.querySelector('#search-results')
  searchresultsinfo.innerHTML = "";
  // custom search result marker icon
  let attractionsIcon = L.divIcon({
    html: "<span class='fa-stack fa-lg'><i class='fas fa-map-marker fa-stack-2x'></i><i class='fas fa-camera-retro fa-stack-1x fa-inverse'></i></i></span>",
    className: 'myattractionsIcon',
    popupAnchor: [15, 0]
  });

  // Coordinates of search results
  for (let results of response2.response.groups[0].items) {
    let marker = L.marker([results.venue.location.lat, results.venue.location.lng], {
      icon: attractionsIcon,
    })
    let searchcoordinates = [results.venue.location.lat, results.venue.location.lng]


    // Popup details for search results
    marker.bindPopup(`<h5>Reason for recommendation: ${results.reasons.items[0].summary}</h5><h5>Name of recommended venue: ${results.venue.name}</h5><h5>Cateogory: ${results.venue.categories[0].name}</h5><h5>Address: ${results.venue.location.address}</h5>`)
    marker.addTo(searchCluster)
    searchCluster.addTo(map)

    // Append a newly created div with the name of the search result to the parent search-results block
    let resultname = document.createElement('div')
    resultname.innerHTML = results.venue.name
    searchresultsinfo.appendChild(resultname)

    // Allow clicking on the search results to fly to corresponding location
    resultname.addEventListener('click', async function () {
      map.flyTo(searchcoordinates, 16);
      marker.openPopup()
    })

    // Remove search results and markers button
    document.querySelector('#nav-contact-removeSearch').addEventListener('click', function () {
      if (searchresultsinfo.contains(resultname)) {
        document.querySelector('#search-results').style.display = 'none',
          searchCluster.clearLayers()
      }
      else {
        document.querySelector('#search-results').style.display = 'block'
      }

    })


    // Collapse search results in the arrowdown icon of the Navtab
    document.querySelector('#tab-toggle').addEventListener('click', function () {
      if (searchresultsinfo.contains(resultname)) {
        document.querySelector('#search-results').style.display = 'none'
      } else {
        document.querySelector('#search-results').style.display = 'block'
      }
    })
  }
})

// Slide in and out the info tab
document.querySelector('#toggle-info').addEventListener('click', function () {
  if (document.querySelector("#info-tab").classList.contains("slide-in")) {
    document.querySelector("#info-tab").classList.remove("slide-in")
    document.querySelector("#info-tab").classList.add("slide-out")
  } else {

    document.querySelector("#info-tab").classList.add("slide-in")
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
    // Reverse geocoding of the coordinates on the map
    let marker = L.marker(result.latlng);
    marker.addTo(geocooding);
    marker.bindPopup(result.address.Match_addr);
    marker.openPopup();
    geocooding.addTo(map);


    let lat = result.latlng.lat
    let lng = result.latlng.lng

    // Consume a 4th API for all eateries within 1km on double-clicked location in Singapore
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
        // Custom eateries marker icons
        let resturantsIcon = L.divIcon({
          html: "<span class='fa-stack fa-lg'><i class='fas fa-square fa-stack-2x'></i><i class='fas fa-utensils fa-stack-1x fa-inverse'></i></span>",
          iconSize: [20, 20],
          className: 'myresturantsIcon'
        });

        // Create markers based on the coordinates of all nearby eateries within 1 km of double-clicked location
        let marker = L.marker([results.venue.location.lat, results.venue.location.lng], {
          icon: resturantsIcon,
        })

        // Details of popup of the eateries
        marker.bindPopup(`<h5>Reason for recommendation: ${results.reasons.items[0].summary}</h5><h5>Name of recommended venue: ${results.venue.name}</h5><h5>Cateogory: ${results.venue.categories[0].name}</h5><h5>Address: ${results.venue.location.address}</h5>`)
        marker.addTo(resturants)
        resturants.addTo(map)

      }
    }
    // Remove all nearby eateries button
    // document.querySelector('#remove-georesturants').addEventListener('click', function () {
    //   map.removeLayer(resturants)
    // })

    getresturants()

  });
});
// Gardens by the Bay dropdown button
document.querySelector('#gardensAttraction').addEventListener('click', async function () {
  // Custom gardens by the bay icon
  let gardensIcon = L.icon({
    iconUrl: 'images/gardensicon.png',
    iconSize: [50, 50],
    className: 'gardensIcon',

  })
  // Create Gardens by the Bay marker location
  let marker = L.marker([1.2816, 103.8636], {
    icon: gardensIcon,
  })
  marker.addTo(map);
  // Gardens by the Bay popup details
  map.flyTo([1.2816, 103.8636])
  marker.bindPopup(`<center><h4>Gardens By The Bay</h4>A national garden and premier horticultural attraction for local and international visitors, Gardens by the Bay is a showpiece of horticulture and garden artistry that presents the plant kingdom in a whole new way, entertaining while educating visitors with plants seldom seen in this part of the world, ranging from species in cool, temperate climates to tropical forests and habitats. </center></br><center><a href="https://ticket.gardensbythebay.com.sg/product/listing" target="_blank"><img src="images/theGardensInfo.png" height="100px" width="200px"/></a></center>`, {
    maxWidth: "auto"
    
  })
  marker.openPopup();

})
// Marina Bay Sands dropdown button
document.querySelector('#mbsAttraction').addEventListener('click', async function () {
  let mbsIcon = L.icon({
    iconUrl: 'images/mbsMarker.png',
    iconSize: [50, 50],
    className: 'mbsIcon',

  })
  // Create Marina Bay Sands marker location
  let marker = L.marker([1.2847, 103.8610], {
    icon: mbsIcon,
  })
  marker.addTo(map);
  // Marina Bay Sands popup details
  map.flyTo([1.2847, 103.8610])
  marker.bindPopup(`<center><h4>Marina Bay Sands</h4>Marina Bay Sands® is a destination for those who appreciate luxury. An integrated resort notable for transforming Singapore’s city skyline, it comprises three 55-storey towers of extravagant hotel rooms and luxury suites with personal butler services. In addition, its architecture is made complete with the Sands SkyPark® which crowns the three towers. </center></br><center><a href="https://www.marinabaysands.com/" target="_blank"><img src="images/mbsInfoImage.jpg" height="100px" width="200px"/></a></center>`, {
    maxHeight: "fit",
    maxWidth: "fit"
  })
  marker.openPopup()

})
// Universal Studios Singapore dropdown button
document.querySelector('#universalAttraction').addEventListener('click',async function () {
  let universalStudiosIcon = L.icon({
    iconUrl: 'images/universalStudiosSingaporeMarker.png',
    iconSize: [100, 50],
    className: 'universalStudiosIcon',

  })
  // Create Universal Studios Singapore marker location
  let marker = L.marker([1.2540, 103.8238], {
    icon: universalStudiosIcon,
    
  })
  marker.addTo(map);
  
  // Universal Studios Singapore popup details
  map.flyTo([1.2540, 103.8238])
  marker.bindPopup(`<center><h4>Universal Studios Singapore</h4>As Southeast Asia’s first movie-themed park, Universal Studios Singapore offers a slew of exciting attractions, including 24 movie-themed rides, a festive walk, water park, marine life park and maritime experiential museum and aquarium. Opened in 2011 with director Steven Spielberg as a creative consultant, the kid-friendly park takes inspiration from some of Hollywood’s biggest hits, including Transformers, The Lost World, and Madagascar. </center></br><center><a href="https://www.rwsentosa.com/en/attractions/universal-studios-singapore/tickets" target="_blank"><img src="images/universalStudiosInfoImage.png" height="100px" width="200px"/></a></center>`, {
    maxHeight: "fit",
    maxWidth: "fit"
  })

  
  marker.openPopup()
  
})

