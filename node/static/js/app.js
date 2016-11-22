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
//coordinates for seattle (latitude, longitude)
var seattleCoords = L.latLng(47.61, -122.33);
//default zoom level (0-18 for street maps)
//other map styles may have different zoom ranges
var defaultZoom = 14;

var map = L.map(mapDiv).setView(seattleCoords, defaultZoom);
L.tileLayer(osmTiles.url, {
    attribution: osmTiles.attribution
}).addTo(map);

/**
 * onPosition() is called after a successful geolocation 
 * @param {object} position geolocation position data
 */
function onPosition(position) {
    //construct a new Leaflet latlng object using
    //the coordinates returned from the geolocation API
    var latlng = L.latLng(position.coords.latitude, position.coords.longitude);
    //fetch the bars near our current coordinates
    fetchBars(latlng);
}

/**
 * onPositionError() is called after a geolocation error
 * @param {Error} err the error 
 */
function onPositionError(err) {
    console.error(err);
    alert(err.message);
    //fetch the bars near our default coordinates
    fetchBars(seattleCoords);
}

//if geolocation services are available, ask the
//user to reveal their current location
if (navigator && navigator.geolocation) {
    //ask the user to get our current position
    navigator.geolocation.getCurrentPosition(onPosition, onPositionError, 
        {enableHighAccuracy: true});
} else {
    //just fetch bars around our default coordinates
    fetchBars(seattleCoords);
}

/**
 * fetchBars() fetches the nearby bars from our server
 * and plots them on the map
 * @param {object} latlng Leaflet.js LatLng object
 * @param {number} latlng.lat the latitude
 * @param {number} latlng.lng the longitude
 */
function fetchBars(latlng) {
    //add a marker for the current location
    var marker = L.marker(latlng).addTo(map);
    //pan to our current location
    map.panTo(latlng);

    //TODO: fetch the nearby bars
    //and add them to the map
} 
