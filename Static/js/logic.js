
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
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
  Street: streets,
  Dark: dark
};
// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Then we add our 'streets' tile layer to the map.
streets.addTo(map);

// Add GeoJSON data.
let LesterBPearsonInternationalAirport =
{
  "type": "FeatureCollection", "features": [{
    "type": "Feature",
    "properties": {
      "id": "193",
      "name": "Lester B. Pearson International Airport",
      "city": "Toronto",
      "country": "Canada",
      "faa": "YYZ",
      "icao": "CYYZ",
      "alt": "569",
      "tz-offset": "-5",
      "dst": "A",
      "tz": "America/Toronto"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-79.63059997559999, 43.6772003174]
    }
  }
  ]
};

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/Israelmejia12/Mapping_Earthquakes/Mapping_GeoJSON_Points/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function (data) {
  console.log(data);

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {

    pointTolayer: function (feature, latlng) {
      console.log(feature);
      return L.marker(latlng)
  
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<h2> Airport Code: " + feature.properties.faa + "<h/2>"+
      "<hr> Airport Name: " + feature.properties.name + "<h/r>");
    }
  
  }).addTo(map);
});