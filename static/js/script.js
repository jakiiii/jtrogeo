// var map = L.map('map').setView([23.8103, 90.4125], 10);
var map = L.map('map').setView([38.8610, 71.2761], 7);
map.zoomControl.setPosition('topright');

// adding osm tilelayer
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var waterColorMap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 16,
    ext: 'jpg'
});

var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var singleMarket = L.marker([38.8610, 71.2761])
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();

// add map scale
L.control.scale().addTo(map);

// full screen map view
var mapID = document.getElementById("map");

function fullScreenView(){
    if (document.fullscreenElement){
        document.exitFullscreen();
    } else {
        mapID.requestFullscreen();
    }
}

// Map coordinate display
map.on('mousemove', function (e) {
    $('.coordinate').html(`Lat: ${e.latlng.lat}, Lng: ${e.latlng.lng}`)
});

// Leaflet browser print function
// https://github.com/Igor-Vladyka/leaflet.browser.print#usage
L.control.browserPrint({'position': 'topright'}).addTo(map);

// loadjson data
var marker = L.markerClusterGroup();
var taji = L.geoJSON(data, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name);
    }
});
taji.addTo(marker);
// marker.addTo(map);

// leaflet geocoder search
L.Control.geocoder().addTo(map);

// Leaflet measure
L.control.measure({
    position: 'topright',
    primaryLengthUnit: 'kilometers',
    secondaryLengthUnit: 'miles',
    primaryAreaUnit: 'sqmeters',
    secondaryAreaUnit: 'sqmiles',
}).addTo(map);

// Leaflef layer control
var baseMap = {
    'OSM': osm,
    'Water Color Map': waterColorMap,
    'Street Map': streetMap,
};

var overLayMaps = {
    'GeoJSON Markets': marker,
    'Single Market': singleMarket,
};

L.control.layers(baseMap, overLayMaps, {'collapsed': false, 'position': 'topleft'}).addTo(map);

// zoom to layer
$('.zoom-to-layer').click(function () {
    map.setView([38.8610, 71.2761], 7)
})