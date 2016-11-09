import React from "react";

//polyfill for the fetch() API so that we can use
//it in Safari and older browsers
//this module was already included in our package.json
//so after you execute `npm install` this module will
//be in the node_modules directory, so we can load it
//simply by importing it's module name.
//importing it is all we need to do. If our page is
//loaded on Safari or an older browser that doesn't 
//support fetch() natively, this module will add that
//function to the global namespace so our code can 
//use it without error.
import "whatwg-fetch";

import Movie from "./movie.jsx";

const APIKEY = "...your api key here...";
const BASE_URL = "https://api.themoviedb.org/3"
const DISCOVER_API = BASE_URL + "/discover/movie?api_key=" + APIKEY;
const GENRES_API = BASE_URL + "/genre/movie/list?api_key=" + APIKEY;

export default class extends React.Component {
    constructor(props) {
        super(props);
        
        //initialize the component state to an empty object
        this.state = {}
    }

    /**
     * componentDidMount() is a method defined in our
     * super class, React.Component. This is one of the React
     * component lifecycle methods, which are called at various
     * points in a component's existence. See this for more detail:
     * 
     * https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle 
     * 
     * The componentDidMount() method is called after this component 
     * has been instantiated and rendered once to the page. After that
     * point, it's safe to call `this.setState()`. So if you are going
     * to fetch() some data and call `this.setState()` when the data
     * arrives, you should start that fetch() operation in the
     * componentDidMount() method rather than the class constructor. 
     */
    componentDidMount() {
        //fetch the data returned from the /discover/movie API 
        //and when it returns, parse the results as JSON and 
        //set the `movies` property on our state to be equal
        //to the parsed data
        fetch(DISCOVER_API)
            .then(response => response.json())
            .then(data => this.setState({movies: data}));            
    }

    render() {
        var totalPages;
        var movies;

        //since we need to wait until componentDidMount() to start
        //the fetch() operation, this component will be rendered
        //at least once before we get the data back from the /discover/movie
        //API. Since the `movies` property on the state object won't be 
        //set until the data returns, we use a simple if() check here to
        //see if we have the data yet, and if not, we don't set the 
        //`totalPages` nor `movies` varables. If they remain `undefined`
        //React will simply ignore them when rendering.
        if (this.state.movies) {
            //set total pages to a <p> tag containing the total number of pages
            totalPages = (<p>{this.state.movies.total_pages} pages</p>);

            //set movies to an array of <Movie> components, each of which gets
            //a property named `movie` set to the current movie object
            movies = this.state.movies.results.map(m => <Movie key={m.id} movie={m} />);
        }
        
        return (
            <div className="container">
                <h1>Products View</h1>
                <p>some nifty products for sale</p>
                {totalPages}
                {movies}
            </div>
        );
    }
}