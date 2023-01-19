

// Create the map object with center and zoom level.
let map = L.map('mapid').setView([30, 30], 2);


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY

});
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
let airportData = "https://raw.githubusercontent.com/israelmejia12/Mapping_Earthquakes/main/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function (data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data).addTo(map);
});



// Add GeoJSON data.
L.geoJSON(LesterBPearsonInternationalAirport, {

pointTolayer: function (feature, latlng) {
  console.log(feature);
return L.marker(latlng)
.bindPopup("<h2>" +feature.properties.city + "<h/2>");


  }

}).addTo(map);

// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(LesterBPearsonInternationalAirport).addTo(map);

