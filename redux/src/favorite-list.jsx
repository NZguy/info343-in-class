import React from "react";

import UserCard from "./user-card.jsx";
import {store, removeFavorite} from "./shared-state.js";

export default class extends React.Component {
    constructor(props) {
        super(props);

        //initialize our state to be the current state
        //of the Redux store
        this.state = store.getState();
    }

    componentDidMount() {
        //subscribe to the store: i.e., ask the store to call a function
        //whenever the data in the store changes. When that occurs, use 
        //this.setState() to reset our state, which will trigger a re-render
        this.unsub = store.subscribe(() => this.setState(store.getState()));
    }

    /**
     * componentWillUnmount() is called just before this component is
     * removed ("unmounted") from the page. When react-router switches
     * from this component to the users list component, this component
     * is unmounted and removed from the page. When that happens we need
     * to unsubscribe from the redux store, so that we don't try to 
     * call .setState() while the component is unmounted. 
     */
    componentWillUnmount() {
        //Use the unsubscribe function that was returned from store.subscribe()
        //which we saved as our `unsub` class property.
        this.unsub();
    }

    render() {
        var userCards;
        if (this.state.favorites) {
            //when the user clicks the Remove button, create and dispatch
            //a remove favorite action, specifying the unique item ID value
            userCards = this.state.favorites.map(record => 
                <UserCard key={record.id} 
                    user={record}>
                    <button onClick={() => store.dispatch(removeFavorite(record.id))}>
                        Remove
                    </button>
                </UserCard>);
        }
        return (
            <div className="container">
                <h1>My Favorites</h1>
                <div className="user-list">
                    {userCards}
                </div>
            </div>
        );
    }
}
