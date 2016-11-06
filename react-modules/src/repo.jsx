//every module that defines a new React component 
//must import React from "react" so that you can
//say the new component `extends React.Component`
//The `Component` class is exposed via a property
//on the react module's interface, and this import
//statement will bind the identifier `React` to
//that module interface
import React from "react";

//see the comments in app.jsx regarding `export`
//and `default`
export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //render the repo info returned from the GitHub API
        //remember that the data is passed into this component
        //via the `repo` property on the `props` object
        return (
        <div className="repo">
            <div className="repo-owner">
                <img src={this.props.repo.owner.avatar_url} alt="picture of owner"/>
            </div>
            <div className="repo-info">
                <h2>{this.props.repo.full_name}</h2>
                <p>{this.props.repo.description}</p>
            </div>
        </div>);
    }
}
