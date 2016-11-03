import React from "react";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {query: ""};
    }

    handleChange(event) {
        this.setState({query: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.props.onSearch) {
            this.props.onSearch(this.state.query);
        }
    }

    render() {
        return (
            <form className="search-form"
                    onSubmit={event => this.handleSubmit(event)} >
                <div className="input-group">
                    <input type="text" className="form-control"
                            value={this.state.query} 
                            placeholder={this.props.placeholder}
                            onChange={event => this.handleChange(event)} />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" 
                            aria-label="search">
                            <span className="glyphicon glyphicon-search" 
                                aria-hidden="true">
                            </span>
                        </button>
                    </span>
                </div>
            </form>
        );
    }
}