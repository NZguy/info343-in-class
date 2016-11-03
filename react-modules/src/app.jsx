import React from "react";

//polyfill for the fetch() API so that we can use
//it in Safari and older browsers
import "whatwg-fetch";

const githubSearchURL = "https://api.github.com/search/repositories?q=";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    render() {
        return (
            <main className="container">
                <h1>Hello React!</h1>
            </main>
        );
    }
}
