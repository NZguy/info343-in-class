import React from "react";

//import our CSS file so it gets included in the bundle
import "./css/main.css";

import {Link, IndexLink} from "react-router";

//import just the Redux store from our ./shared-state.js module
import {store} from "./shared-state.js";

export default class extends React.Component {
    constructor(props) {
        super(props);

        //initialize our state to be the current state
        //of the Redux store
        this.state = store.getState();
    }

    componentDidMount() {
        //just like over in favorite-list.jsx, subscribe to the store
        //and update our state whenever the store's state changes
        this.unsub = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        //unsubscribe from the store
        this.unsub();
    }

    render() {
        //use the store's state to show how many items are in the
        //favorites array
        return (
            <div>
                <nav>
                    <ul>
                        <li>
                            <IndexLink to="/" activeClassName="active">
                                Users
                            </IndexLink>
                        </li>
                        <li>
                            <Link to="/favorites" activeClassName="active">
                                Favorites ({this.state.favorites.length})
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
