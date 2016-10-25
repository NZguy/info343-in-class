"use strict";

//base URL for the Spotfiy api
//see https://developer.spotify.com/web-api/search-item/
//The ? separates the URL path from the "query string"
//A query string is a set of name/value pairs. They are
//commonly used in APIs to specify parameters.
//We are passing two parameters here: type=track (search only for tracks)
//and q=... (string to search for, which we will get from the user)
var baseURL = "https://api.spotify.com/v1/search?type=track&q=";

// NOTE: Not my code, I accidentally irreversably deleted my code with git checkout -- <file>

//get references to various DOM elements that we will need
//document.querySelector() will select the first element that
//matches the given CSS selector
//every element has this method as well, so if you select
//an element using document.querySelector(), you can then
//search *within* just that element using it's querySelector() method 
var queryResults = document.querySelector(".query-results");
var searchForm = document.querySelector(".search-form");
var searchInput = searchForm.querySelector("input");
var searchButton = searchForm.querySelector("button");
var spinner = document.querySelector("header .mdl-spinner");

//global variable to track the last preview audio that was played
var previewAudio = new Audio();

/**
 * doAnimation() adds an Animate.css style class, and then
 * removes that style class after the animation is complete.
 * This allows us to trigger the animation repeatedly.
 * See https://daneden.github.io/animate.css/ for a list
 * of animations defined in that stylesheet
 * @param {DOMElement} elem - a reference to a DOM element you want to animate
 * @param {string} aniName - the name of an animate.css style class
 */
function doAnimation(elem, aniName) {
    //animate.css requires the "animated" style class as well as
    //the style class for your particular animation 
    elem.classList.add("animated", aniName);
    //the "animationend" event is raised after the animation is
    //complete, at which time we can remove the animation style class
    //so that the next time we add it, the browser will replay the
    //animation 
    elem.addEventListener("animationend", function() {
        elem.classList.remove(aniName);
    });
}

/**
 * renderTrack() renders the track object data as an
 * `img` element, setting the `src` attribute to the
 * first album cover image.
 * @param {Object} track - the track data object from Spotify
 */
function renderTrack(track) {
    //create a new <img> element
    var img = document.createElement("img");

    //a given track may have more than one artist, so build
    //up a string of artist names that we can use in the `alt` attr
    var artists = track.artists.map(function(artist) {
        return artist.name;
    });
    //.join() will join all array elements together into a single string,
    //separating each element with the string you pass as the parameter
    var artistList = artists.join(", ");
    
    //set the `src` attribute to be the first album cover image
    //note some obscure tracks may not have album cover images,
    //so you should have a fallback image you use in that case
    img.src = track.album.images[0].url;
    img.alt = track.name + " by " + artistList;
    img.title = img.alt;
    doAnimation(img, "bounceIn");

    //add an event listener for the "click" event on the image
    img.addEventListener("click", function() {
        //if the user clicked a different track...
        if (previewAudio.src !== track.preview_url) {
            //pause the preview audio
            previewAudio.pause();
            //reset previewAudio to a new Audio() for the clicked track
            previewAudio = new Audio(track.preview_url);
            //start playing it
            previewAudio.play();
        } else {
            //user clicked the same track
            //if audio is currently paused, start playing again
            //else, pause it
            if (previewAudio.paused) {
                previewAudio.play();
            } else {
                previewAudio.pause();
            }
        }
        //do a "pulse" animation for feedback
        doAnimation(img, "pulse");
    });

    //append the image to the query results <div>
    queryResults.appendChild(img);
}

/**
 * render() renders the data returned from the Spotfiy API.
 * If there was an error, it will call renderError.
 * @param {Object} data - the data returned from the Spotify API
 */
function render(data) {
    //uncomment this to see the data returned from Spotfiy in the console
    //console.log(data);

    //clear the contents of the queryResults <div>
    queryResults.innerHTML = "";

    //if there was an error or no results...
    if (data.error || 0 == data.tracks.items.length) {
        //render an error
        renderError(data.error || new Error("No results found"));
    } else {
        //render the tracks 
        data.tracks.items.forEach(renderTrack);
    }
}

/**
 * renderError() will render error messages from the Spotify API
 * or any other exception that might be thrown during the
 * network request.
 * @param {Object} err - the error information
 * @param {string} err.message - the error message
 */
function renderError(err) {
    console.error(err);
    var message = document.createElement("p");
    message.classList.add("error-message");
    message.textContent = err.message;
    queryResults.appendChild(message);
}

/**
 * toggleFeedback() toggles the UI feedback during the
 * Spotify search. The first call will show the spinner and 
 * disables the search button, and the second call will
 * hide/enable those elements again. This is called just before
 * we query the Spotfiy API, and after we get the response
 */
function toggleFeedback() {
    //add/remove the `hidden` style class from the spinner so that 
    //it shows up while we are querying spotify, and hides again
    //after the query returns.
    //the `hidden` style class is defined in our css/main.css,
    //and it just sets `display: none` to hide the element; 
    //removing this class makes it visible again
    spinner.classList.toggle("hidden");

    //disable/enable the search button so that the user
    //knows to wait until the previous search is complete
    //before starting another search
    searchButton.disabled = !searchButton.disabled
}

//Add an event listener function for the "submit" event
//raised from our search form. This event is raised whenever
//the user types into an input and hits enter, or whenever the
//user clicks the <button type="submit"> button.
//This event handler will be passed an Event object, which we
//can use to cancel the browser's default behavior of posting
//the form data to some other web server and completely reloading
//the page with the response HTML. Instead, we will handle this
//locally by doing a search against the Spotify API using the
//fetch() function, rendering the results without ever reloading
//the page.
searchForm.addEventListener("submit", function(evt) {
    //tells the browser not to do its default behavior
    //for this sort of event (see comment above)
    evt.preventDefault();

    //get the text typed into the search input and trim it
    //of extra leading or traling spaces
    var query = searchInput.value.trim();
    
    //if the search query is empty, just return
    if (query.length <= 0) {
        return false;
    }

    //toggle 
    toggleFeedback();
    
    //query the Spotify API by fetching the base search API
    //URL, appending the query string the user typed in;
    //if the user types "hello", the full URL we fetch will be:
    //https://api.spotify.com/v1/search?type=track&q=hello
    //For those who have done AJAX before with the jQuery library,
    //the fetch() API provides a similarly-easy programming interface
    //but it's built-in to the DOM, so you don't need the jQuery
    //library anymore. See https://davidwalsh.name/fetch.
    //and for reasons why jQuery isn't really needed at all anymore,
    //see http://youmightnotneedjquery.com/

    //fetch() returns a Promise (https://davidwalsh.name/promises)
    //which is an object that represents an asynchronous operation
    //that will eventually succeed or fail. Since fetch() is executed
    //asynchronously, we have to tell the promise which function(s) we
    //want it to call once the request succeeds or fails. Any function
    //passed to the .then() method will be called once the request 
    //succeeds, and any function passed to .catch() will be called
    //if the request fails for some reason (e.g., network error).
    fetch(baseURL + query)
        .then(function(response) {
            //the first function executed after the request succeeds
            //will be passed the Response object 
            //(https://developer.mozilla.org/en-US/docs/Web/API/Response)
            //since the Spotfiy API returns data in the JSON format
            //we need to call the .json() method to parse it.
            //this parsing is done asynchronously, so this method returns
            //another Promise, and if we return that from our function
            //the next function passed to .then() will be called once
            //that parsing is complete.  
            return response.json();
        })
        .then(render)           //after parsing is complete, call render()
        .catch(renderError)     //if the request failed, call renderError() instead
        .then(toggleFeedback);  //after success or failure, toggle the feedback UI

    return false;
});