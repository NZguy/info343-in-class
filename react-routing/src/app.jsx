import React from "react";

//import our CSS file
//Webpack will actually merge the contents
//of this file into an inline <style></style>
//attribute within the <head> section, so that
//the browser doesn't have to make another
//network request to get the styles!
//note that here we start the path with a `.`
//to signal that this is a relative file
//path and not a module in our node_modules
//directory 
import "./css/main.css";

//polyfill for the fetch() API so that we can use
//it in Safari and older browsers
//this module was already included in our package.json
//so after you execute `npm install` this module will
//be in the node_modules directory, so we can load it
//simply by importing it's module name
import "whatwg-fetch";

const APIKEY = "...paste your api key here...";
const DISCOVER_API = "https://api.themoviedb.org/3/discover/movie?api_key=" + APIKEY;

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <main>
                    <div className="container">
                        <h1>Hello React!</h1>
                    </div>
                </main>
            </div>
        );
    }
}
