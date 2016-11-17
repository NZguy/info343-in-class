import React from "react";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        /**
         * This returns some HTML that looks like a Material Design
         * card, showing the user's picture and login name. It also
         * renders `{this.props.children}` after the user's name.
         * This allows other components that use this component to
         * include additional elements that are specific to the usage
         * of this user card component. For example, the user-list.jsx
         * component can include an "Add to Favorites" button, while the
         * favorite-list.jsx can include a "Remove" button. This component
         * is the same in both cases, but those buttons can be different,
         * allowing the containing component to provide some extra
         * functionality.
         */
        return (
            <div className="user">
                <div>
                    <img src={this.props.user.avatar_url} 
                        alt={this.props.user.login}/>
                </div>
                <div className="user-description">
                    <h2>{this.props.user.login}</h2>
                    <p>
                        {this.props.children}
                    </p>
                </div>
            </div>
        );
    }
}