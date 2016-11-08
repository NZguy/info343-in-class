import React from 'react';

export default class extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {		
		return (
			<div id="weather-area">
				<div className="demo-card-square mdl-card mdl-shadow--2dp weather-card">
					<div className="mdl-card__supporting-text">
						<p className="weather-text center-text">{this.props.data.name}</p>
						<p className="weather-text center-text">{moment().format('dddd, h:mm a')}</p>
						<p className="weather-text center-text">{this.props.data.weather[0].description}</p>					    	
						<h2 className="weather-temp center-text">
							<img 
								className="weather-img" 
								src="http://openweathermap.org/img/w/01d.png" 
								alt={this.props.data.weather[0].description} 
							/>
							<span>56 &#176;F</span>
						</h2>
					</div>				    
				</div>						
			</div>
		);
	}
}
		