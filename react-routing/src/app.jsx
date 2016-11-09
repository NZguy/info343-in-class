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

/*
Import the <Link> and <IndexLink> components from the react-router module.

The <Router>, <Route>, and <IndexRoute> components let us declare
a mapping between routes and the components we want instantiated and
rendered when the bookmark part of the URL is set to that route, but
the <Link> and <IndexLink> components let us create hyperlinks (<a>)
that will switch the bookmark part of the URL to a given route. Use
these components in navigation UI that allows the user to switch
between components.
*/
import {Link, IndexLink} from "react-router";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        /*
        When we declared the <Router> over in `index.jsx`, we nested
        the two child components (Products and Cart) within the App component.
        This allows us to put common UI here that should be shown
        regardless of which child component is active (Products or Cart).

        In this case just add a <nav> at the top of the page with links
        that allow users to switch between the two child views. This nav
        will always remain visible as the user switches between the child
        components (Products vs Cart).   
        
        Below the <nav>, inside the <main> element, we add: 
        
            {this.props.children}
        
        That JavaScript expression will evaluate to either the Products
        component or the Cart component, depending on which route is
        active (i.e., what the bookmark part of the URL is set to).
        This value of the `children` property of the `props` object
        is set by the Router component, which is the component we
        handed to React's render() function, so it is the outermost
        (root) component in the hierarchy, and is thus the one that
        creates <App> and provides `props` to it.
        */
        return (
            <div>
                <nav>
                    <ul>
                        <li>
                            <IndexLink to="/" activeClassName="active">
                                Products
                            </IndexLink>
                        </li>
                        <li>
                            <Link to="/cart" activeClassName="active">
                                Cart
                            </Link>
                        </li>
                    </ul>
                </nav>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}
