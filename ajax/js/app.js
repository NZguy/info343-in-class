"use strict";

//base URL for the Spotfiy api
//see https://developer.spotify.com/web-api/search-item/
//The ? separates the URL path from the "query string"
//A query string is a set of name/value pairs. They are
//commonly used in APIs to specify parameters.
//We are passing two parameters here: type=track (search only for tracks)
//and q=... (string to search for, which we will get from the user)
var baseURL = "https://api.spotify.com/v1/search?type=track&q=";

var queryResults = document.querySelector(".query-results");
var searchForm = document.querySelector(".search-form");
var searchInput = searchForm.querySelector("input");
var searchButton = searchForm.querySelector("button");
var spinner = document.querySelector("header .mdl-spinner");
var previewAudio = new Audio();

function doAnimation(elem, aniName) {
    elem.classList.add("animated", aniName);
    elem.addEventListener("animationend", function() {
        elem.classList.remove(aniName);
    });
}

function renderTrack(track) {
    var img = document.createElement("img");
    img.src = track.album.images[0].url;
    img.alt = track.name;
    img.title = img.alt;
    doAnimation(img, "bounceIn");

    img.addEventListener("click", function() {
        if (previewAudio.src !== track.preview_url) {
            previewAudio.pause();
            previewAudio = new Audio(track.preview_url);
            previewAudio.play();
        } else {
            if (previewAudio.paused) {
                previewAudio.play();
            } else {
                previewAudio.pause();
            }
        }
        doAnimation(img, "pulse");
    });

    queryResults.appendChild(img);
}

function render(data) {
    console.log(data);
    queryResults.innerHTML = "";

    if (data.error || 0 == data.tracks.items.length) {
        renderError(data.error || new Error("No results found"));
    } else {
        data.tracks.items.forEach(renderTrack);
    }
}

function renderError(err) {
    console.error(err);
    var message = document.createElement("p");
    message.classList.add("error-message");
    message.textContent = err.message;
    queryResults.appendChild(message);
}

searchForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    var query = searchInput.value.trim();
    if (query.length <= 0) {
        return false;
    }

    //remove the `hidden` style class from
    //the spinner show it shows up while we
    //are querying spotify 
    spinner.classList.remove("hidden");
    fetch(baseURL + query)
        .then(function(response) {
            return response.json();
        })
        .then(render)
        .catch(renderError)
        .then(function() {
            //after the data comes back and after
            //we render the results, add the `hidden`
            //style class to the spinner again to 
            //hide it
            spinner.classList.add("hidden");
        });

    return false;
});