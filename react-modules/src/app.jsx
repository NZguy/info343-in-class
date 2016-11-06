//import the React class from the `react` module
//this module is already listed as a dependency
//in our package.json file, so after running
//`npm install`, the "react" module will be in
//our node_modules directory, so we can import it
//simply by using the module name
import React from "react";

//polyfill for the fetch() API so that we can use
//it in Safari and older browsers
//this module was already included in our package.json
//so after you execute `npm install` this module will
//be in the node_modules directory, so we can load it
//simply by importing it's module name.
//with polyfills, you only need to load them using 
//import, and you don't need to assign the module
//interface to a variable, as the whole point of
//a polyfill is to provide some sort of new built-in
//functionality in older browsers that don't support
//that new functionality yet 
import "whatwg-fetch";

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

//GitHub Search Repos API URL
//for info on the GitHub Search Repos API
//see https://developer.github.com/v3/search/#search-repositories
const githubSearchURL = "https://api.github.com/search/repositories?per_page=30&q=";

//import our SearchForm and Repo components from 
//their respective modules. Since these modules are
//in files in the same directory as this one, we need
//to give a relative path to the file, starting with `./`
//that tells the module loader that this module is
//not in the node_modules directory, but is instead in
//the relative file path we specify 
import SearchForm from "./search-form.jsx";
import Repo from "./repo.jsx";

//when we start working with modules, we need to `export`
//any classes or variables that we want other modules to
//be able to `import`. In JavaScript modules we can tag
//one class or function as the `default` exported item.
//That allows another module to import this default exported
//class like so:
//
//  import App from "./app.jsx";
//
//if you don't export this class as the default exported item
//then you'd have to use this syntax to import it:
//
//  import {App} from "./app.jsx";
//
//See http://www.2ality.com/2014/09/es6-modules-final.html
//for more details 
export default class extends React.Component {
    constructor(props) {
        super(props);
        //initialize this component's state to contain 
        //a `data` property set to an object with one 
        //property named `items`, which is set to an empty
        //array. This mimics what we will get back from
        //the GitHub API, and allows us to avoid an if()
        //check during render() to handle the case of having
        //no data when the component first loads
        this.state = {
            data: {
                items: []
            }
        };
    }

    //handleSearch() handles searching the GitHub API
    //it needs a query string to search for, and can 
    //optionally be given a page number (defaults to 1)
    //here we use the new ES6 syntax for default parameters
    // `page=1` in the param list is equivallent to putting
    // `page = page || 1` in the function body
    handleSearch(query, page=1) {
        fetch(githubSearchURL + query + "&page=" + page)
            .then(response => response.json())
            .then(data => this.setState({
                data: data,
                query: query,
                page: page
            }));
    }

    render() {
        return (
            <main className="container">
                <h1>Search Repos</h1>
                <SearchForm placeholder="name of repo"
                    onSearch={query => this.handleSearch(query)} />
                <p>{this.state.data.total_count} repos found</p>
                <p>
                    <button className="btn btn-default"
                        onClick={() => this.handleSearch(this.state.query, this.state.page+1)}
                        disabled={!this.state.page || this.state.page * 30 > this.state.data.total_count}
                        >
                        Next Page
                    </button>
                </p>

                {
                    //use .map() to transform each of the objects in the
                    //returned items array into a <Repo> component, passing
                    //the repo data object as the `repo` prop, and using the
                    //repo data object's `.id` property as the React `key`.
                    //for a reminder of why React needs a `key` prop on lists
                    //of repeated components, see their documentation:
                    //https://facebook.github.io/react/docs/lists-and-keys.html
                    this.state.data.items.map(repo => <Repo key={repo.id} repo={repo}/>)
                }
            </main>
        );
    }
}
