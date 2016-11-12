import React from "react";
import {render} from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

import App from "./app.jsx";
import UserList from "./user-list.jsx";
import FavoriteList from "./favorite-list.jsx";

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={UserList}/>
            <Route path="/favorites" component={FavoriteList} />
        </Route>
    </Router>
), document.getElementById("app"));
