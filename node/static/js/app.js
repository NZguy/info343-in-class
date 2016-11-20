/**
 * app.js
 * 
 * Main script for this client-side application.
 * This application demonstrates how to build
 * and interactive map using the Leaflet.js
 * library. For more info on Leaflet, see
 * http://leafletjs.com/ 
 */

"use strict";

//OpenStreetMap tile server (no access token required)
//see http://wiki.openstreetmap.org/wiki/Tile_servers
//for more information and styles
var osmTiles = {
    url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
};

//the <div id="map"> element, which will contain the map
var mapDiv = document.getElementById("map");
//coordinates for seattle [latitude, longitude]
var seattleCoords = [47.61, -122.33];
//default zoom level (0-18 for street maps)
//other map styles may have different zoom ranges
var defaultZoom = 14;

var map = L.map(mapDiv).setView(seattleCoords, defaultZoom);
L.tileLayer(osmTiles.url, {
    attribution: osmTiles.attribution
}).addTo(map);

function onPosition(position) {
    var latlng = [position.coords.latitude, position.coords.longitude];
    //add a "you are here" marker to the map
    //and pan to that marker
    var marker = L.marker(latlng).addTo(map);
    map.panTo(latlng);

    //fetch the bars near our current coordinates
    fetchBars(latlng);
}

function onPositionError(err) {
    console.error(err);
    alert(err.message);
    
    //fetch the bars near our default coordinates
    fetchBars(seattleCoords);
}

/**
 * fetchBars() fetches the nearby bars from our server
 * and plots them on the map
 * @param {Array} coords coordinates array [latitude, longitude]
 */
function fetchBars(coords) {
    //TODO: fetch the nearby bars
    //and add them to the map

    
} 

if (navigator && navigator.geolocation) {
    //ask the user to get our current position
    navigator.geolocation.getCurrentPosition(onPosition, onPositionError, 
        {enableHighAccuracy: true});
} else {
    //just fetch bars around our default coordinates
    fetchBars(seattleCoords);
}
