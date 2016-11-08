import React from "react";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>{this.props.movie.title}</h2>
            </div>
        );
    }
}