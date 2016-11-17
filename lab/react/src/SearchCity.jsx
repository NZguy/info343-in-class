import React from 'react';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {query: ''};
	}

	handleChange(event) {
		this.setState({query: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.props.onSearch) {
			this.props.onSearch(this.state.query);
			this.setState({query: ''});
		}
	}

	render() {		
		return (
			<div className="form-house">
				<form 
					className="search-form"
					onSubmit={event => this.handleSubmit(event)}
				>
				  	<div className="mdl-textfield mdl-js-textfield">
				    	<input 
				    		value={this.state.query}
				    		onChange={event => this.handleChange(event)}
				    		className="mdl-textfield__input" 
				    		type="text" 
				    		id="search-input" 
				    		placeholder="Search a city..."
				    	/>
				    	<label 
				    		className="mdl-textfield__label" 
				    		htmlFor="search-input"
				    	></label>					  		
				  	</div>					  	
				  	<button 
				  		type="submit" 
				  		className="mdl-button mdl-js-button mdl-button--icon"
				  	>
					    <i className="material-icons">search</i>
					</button>
				</form>	
			</div>				
		);
	}
}	