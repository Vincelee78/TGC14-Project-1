

  document.querySelector("#btn-search-home").addEventListener('click', function(){
    document.querySelector('#container').style.display = "block";
    document.querySelector('#carouselExampleIndicators').style.display = "none"
  })
  

window.addEventListener('DOMContentLoaded', function(){

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
// let accessToken = axios.post('https://developers.onemap.sg/privateapi/auth/post/getToken', { email: 'leeweixg2001@yahoo.com', password: 'Scatyim777' }).then(response => accessToken = response.data.access_token)

// setup the tile layers from leaflet
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

// consume API from gov website for taxicoordinates
taxiCoordinates = []
let taxiGroup = L.layerGroup()
async function gettaxi(map) {
  let response = await axios.get('https://api.data.gov.sg/v1/transport/taxi-availability')
  let coordinates = response.data.features[0].geometry.coordinates
  // create a cluster of markers for taxi coordinates
  // let cluster=L.markerClusterGroup()
  let cluster = L.markerClusterGroup()

  let taxiIcon = L.divIcon({
    html: '<i class="fas fa-taxi"></i>',
    iconSize: [200, 200],
    className: 'mytaxiIcon'
  });

  // extract out each taxi coordinates
  for (let points of coordinates) {
    let lng = points[0]
    let lat = points[1]
    let actualcoordinates = [lat, lng]
    let marker = L.marker(actualcoordinates, {
      icon: taxiIcon
    })


    marker.addTo(cluster)
    cluster.addTo(taxiGroup);
    for (let a of actualcoordinates){
    taxiCoordinates.push(a);
    }

    marker.addEventListener('click', function () {
      map.flyTo(actualcoordinates, 15)
    })
  }
}
gettaxi(map)
// console.log(taxiCoordinates)


async function getaddress(taxiCoordinates) {
  let arrayLength = taxiCoordinates.length;
  // console.log(taxiCoordinates)
  // console.log(taxiCoordinates.length)
  for (let i = 0; i < taxiCoordinates.length; i++) {
    let coordi = taxiCoordinates[i]
    console.log(coordi)
    //     let coorString = String(coordi[0]) + ',' + String(coordi[1]);
    //     let response1 = await axios.get('https://developers.onemap.sg//privateapi/commonsvc/revgeocode', {params:{
    //     location: coorString,
    //     token: accessToken}
    // })
    //   let address = response1.data.GeocodeInfo[0];
    // //  console.log(address)
  };
}
getaddress(taxiCoordinates)

// extract geojson from gov website for hawker centers
let hawkerGroup = L.layerGroup()
async function getHawkers() {
  let response = await axios.get('hawker_centres.geojson');

  for (let points of response.data.features) {
    let lng = points.geometry.coordinates[0]
    let lat = points.geometry.coordinates[1]
    let hawkerActualCoordinates = [lat, lng]
  
    let hawkerIcon = L.divIcon({
      html: '<i class="fas fa-utensils"></i>',
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

    let hotelIcon = L.divIcon({
      html: '<i class="fas fa-hotel"></i>',
      iconSize: [20, 20],
      className: 'myhotelIcon'
    });

    let marker = L.marker(hotelsActualCoordinates, {
      icon: hotelIcon,
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


document.querySelector('#toggle').addEventListener('click', function () {
  if (map.hasLayer(hawkerGroup)) {
    map.removeLayer(hawkerGroup)
  }
  else {
    map.addLayer(hawkerGroup)
  }

})


let baseURL='https://api.foursquare.com/v2/venues/explore'
async function search(query){
  // let ll=lat +','+ lng
  let response= await axios.get(baseURL,{
    params:{
      'near': 'singapore',
      'client_id': 'AG5GPKHMNCXQMMBJ3OYZRJC5C5EVRPVN4XMUAVYJBJQOGN3H',
      'client_secret': 'JN0CP4TS12X4V3IIJEV3DII5SUAUJJJ53V3NARHFYKRDMOFB',
      'query': query,
      'v': '20210903',
      
    }
  })
 

return response.data

}
// console.log(search('tacos'))

let searchCluster=L.layerGroup()
document.querySelector('#button').addEventListener('click',async function(){
  searchCluster.clearLayers()
  let searchresult= document.querySelector('#textinput').value;
  let response2=await search(searchresult)
  // console.log(search(searchresult))

let searchresultsinfo=document.querySelector('#search-results')
searchresultsinfo.innerHTML="";

  for (let results of response2.response.groups[0].items){
    let marker=L.marker([results.venue.location.lat, results.venue.location.lng])
    let searchcoordinates=[results.venue.location.lat, results.venue.location.lng]
    // console.log(coordinates)

    marker.bindPopup(`<h5>Reason for recommendation: ${results.reasons.items[0].summary}</h5><h5>Name of recommended venue: ${results.venue.name}</h5><h5>Cateogory: ${results.venue.categories[0].name}</h5><h5>Address: ${results.venue.location.address}</h5>`)
    marker.addTo(searchCluster)
    searchCluster.addTo(map)
  // console.log(searchCluster)

  let resultname=document.createElement('div')
  resultname.innerHTML=results.venue.name
  searchresultsinfo.appendChild(resultname)
  // console.log(searchresultsinfo)

  resultname.addEventListener('click',function(){
  map.flyTo(searchcoordinates,16);
  marker.openPopup()

})
  
  }
})

})