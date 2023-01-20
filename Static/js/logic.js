
let light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/light-v10',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: API_KEY

});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  light: light,
  Dark: dark
};
// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [light]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Then we add our 'streets' tile layer to the map.
light.addTo(map);

// // Add GeoJSON data.
// let torontoData =

// {"type":"Feature",
// "properties":{"airline":"AC",
// "airline_id":"330",
// "src":"YYZ",
// "src_id":"193","dst":"AUH",
// "dst_id":"2179","codeshare":"",
// "stops":"0","equipment":"77W"},
// "geometry":{"type":"LineString",
// "coordinates":[[-79.63059997559999,43.6772003174],[54.651100158691406,24.433000564575195]]}}


// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/Israelmejia12/Mapping_Earthquakes/main/torontoRoutes.json";

// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2
}

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data, {
  style: myStyle,
onEachFeature: function (feature, layer) {
  layer.bindPopup("<h3> Airport Code: " + feature.properties.airline + "<h/3>"+
  "<hr> Destination: " + feature.properties.dst + "<h/r>");
}
})
.addTo(map);
});