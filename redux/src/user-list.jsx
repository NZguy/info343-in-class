import React from "react";

//polyfill for the fetch() API so that we can use
//it in Safari and older browsers
//this module was already included in our package.json
//so after you execute `npm install` this module will
//be in the node_modules directory, so we can load it
//simply by importing it's module name
import "whatwg-fetch";

import UserCard from "./user-card.jsx";
//import the redux store and the addFavorite action creator function 
//from our ./shared-state.js module
import {store, addFavorite} from "./shared-state.js";

const GITHUB_USERS_API = "https://api.github.com/users";

export default class extends React.Component {
    constructor(props) {
        super(props);

        //initialize component state to be an 
        //object with a property `lastID`
        //set ot 0        
        this.state = {lastID: 0}
    }

    getUsers() {
        //fetch users from the GitHub API
        //the `since` query string parameter can
        //be set to the last user ID we got in
        //the previous page of results.
        //we reset this each time we get a new 
        //page of data, and send it to GitHub 
        //with the next fetch()
        fetch(GITHUB_USERS_API + "?since=" + this.state.lastID)
            .then(response => response.json())
            .then(data => this.setState({
                users: data,
                lastID: data[data.length-1].id
            }));
    }

    componentDidMount() {
        //after we mount, get the first
        //page of users from GitHub
        this.getUsers();
    }

    render() {
        var userCards;
        if (this.state.users) {
            //when the user clicks the Add To Favorites button, create and
            //dispatch an add favorite action, specifying the current record
            //as the item to add to the list of favorites.
            //note that the <button> element is *inside* the <UserCard> element.
            //that <button> will be passed to the <UserCard> as the `children`
            //property on its `props` object, so the <UserCard> component can
            //render it with the expression `{this.props.children}`
            userCards = this.state.users.map(record => 
                <UserCard key={record.id} user={record}>
                    <button onClick={() => store.dispatch(addFavorite(record))}>
                        Add to Favorites
                    </button>
                </UserCard>
            );
        }
        return (
            <div className="container">
                <h1>GitHub Users</h1>
                <p>
                    <button className="raised" 
                        onClick={() => this.getUsers()}>
                        Next Page
                    </button>
                </p>
                <div className="user-list">
                    {userCards}
                </div>
            </div>
        );
    }
}