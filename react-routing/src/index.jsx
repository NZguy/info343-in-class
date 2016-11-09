//for a reminder of the `import` syntax and what it does, see
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import 
import React from "react";
import {render} from "react-dom";

import App from "./app.jsx";
import Cart from "./cart.jsx";
import Products from "./products.jsx";

//import the various classes we need from the react-router module
//we installed this module in our project by using the command:
//  npm install --save react-router
//that downloads the module to the node_modules folder, and it
//adds the module as a dependency to our package.json file.
//adding the dependency allows new developers to simply
//clone the repo and execute `npm install` to get all of the
//module this project depends upon
import {Router, Route, IndexRoute, hashHistory} from "react-router";

/*
Client-side routing is a technique where we use the bookmark part
of the URL (the part after the #) to determine which component is
instantiated and rendered to the page. As the bookmark changes, a
different react component is instantiated and rendered. This allows
us to create "single page applications" where the user can switch 
between various "views" without ever navigating to a different web page.

Native desktop and mobile apps do this all the time, so client-side
routiing is just trying to mimic that behavior in the browser, which 
has no native support for this. Instead, we use a special module/library
like react-router, and tell it which react component to show for
which "route". A "route" is simply a path that can appear in the
bookmark part of the URL (the part after the #).

Here we create a <Router> component, which is defined in the 
react-router module. If we hand this <Router> component to 
React's main render() function, the Router will watch the bookmark
part of the URL and instantiate/render the correct component as that
bookmark changes. To declare the mapping between what's in the 
bookmark part of the URL and the component you want to render,
we create a number of <Route> and <IndexRoute> components.

For more details on react-router, see their tutorial:
https://github.com/reactjs/react-router-tutorial
and their guide on route configuration:
https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteConfiguration.md 
*/
var router = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Products}></IndexRoute>
            <Route path="/cart" component={Cart}></Route>
        </Route>
    </Router>
);

//render the <Router> component instead of <App>
//the Router will instantiate and render <App>
//as well as the correct sub-component, depending
//on the current route (bookmark part of the URL).
//if the current route is "/", it will instantiate
//and render the <Products> component.
//if the current route is "/cart", it will instantiate
//and render the <Cart> component instead.
//The <App> component will always be there, so we can
//put any common HTML we want to always be on-screen
//in the <App> component (see ./app.jsx)
render(router, document.getElementById("app"));
