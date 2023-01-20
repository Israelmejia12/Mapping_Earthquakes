

// Create the map object with center at the San Francisco airport.
let map = L.map('mapid').setView([37.5, -122.5], 10);


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});
// Then we add our 'streets' tile layer to the map.
streets.addTo(map);

// Add GeoJSON data.
let sanFranAirport =
{
  "type": "FeatureCollection", "features": [{
    "type": "Feature",
    "properties": {
      "id": "3469",
      "name": "San Francisco International Airport",
      "city": "San Francisco",
      "country": "United States",
      "faa": "SFO",
      "icao": "KSFO",
      "alt": "14",
      "tz-offset": "-8",
      "dst": "A",
      "tz": "America/Los_Angeles"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-122.375, 37.61899948120117]
    }
  }
  ]
};

// Grabbing our GeoJSON data.
L.geoJSON(sanFranAirport, {
  onEachFeature: function(feature, layer) {
    console.log(layer);
    layer.bindPopup("<h1>"+ feature.properties.city +"</h1>"
    + "<h3>" + feature.properties.tz-offset + "<h/r>")
  
   }

}).addTo(map);