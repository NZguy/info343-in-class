"use strict";

//base URL for the Spotfiy api
//The ? separates the URL path from the "query string"
//A query string is a set of name/value pairs. They are
//commonly used in APIs to specify parameters.
//We are passing two parameters here: type=track (search only for tracks)
//and q=... (string to search for, which we will get from the user)
var baseURL = "https://api.spotify.com/v1/search?type=track&q=";

//add an `input` event listener to the `music-search-input` element
//if search text is > 2 chars, search Spotify for matching tracks
//and render preview images to the `query-results` div element
