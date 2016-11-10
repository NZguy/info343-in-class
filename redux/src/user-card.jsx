import React from "react";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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