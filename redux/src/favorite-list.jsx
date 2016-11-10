import React from "react";

import UserCard from "./user-card.jsx";
import {store, removeFavorite} from "./shared-state.js";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = store.getState();
    }

    componentDidMount() {
        this.unsub = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        this.unsub();
    }

    render() {
        var userCards;
        if (this.state.favorites) {
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
                {userCards}
            </div>
        );
    }
}
