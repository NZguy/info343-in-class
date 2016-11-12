import React from "react";

import UserCard from "./user-card.jsx";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        var userCards;
        if (this.state.favorites) {
            userCards = this.state.favorites.map(record => 
                <UserCard key={record.id} 
                    user={record}>
                    <button>Remove</button>
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
