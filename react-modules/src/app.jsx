import React from "react";

//polyfill for the fetch() API so that we can use
//it in Safari and older browsers
import "whatwg-fetch";

//import our CSS file
//Webpack will actually transform this
//into an inline <style> element in the 
//<head> section so that the browser doesn't 
//have to make a separate network request!
import "./css/main.css";

const spotifySearchURL = "https://api.spotify.com/v1/search?type=track&q=";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tracks: []};
    }

    render() {
        return (
            <main className="container">
                <h1>Hello React!</h1>
            </main>
        );
    }
}
