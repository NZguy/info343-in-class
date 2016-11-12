import React from 'react';
import 'whatwg-fetch';
import "./css/main.css";

import WeatherCard from './WeatherCardSolution.jsx';
import SearchCity from './SearchCitySolution.jsx';


const url = 'http://api.openweathermap.org/data/2.5/weather?q=';
const key = '&APPID=0fb08316daf6d617035e6c494fedc392';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fahrenheit: true,
			data: {}
        };        
    }
	
	handleClick() {
		this.setState({fahrenheit: !this.state.fahrenheit});
	}

	handleSearch(query) {
		fetch(url + query + key)
			.then(response => {
				if (!response.ok) throw response.statusText;
				return response.json()
			})
			.then(data => this.setState({error: false, data: data}))
			.catch(error => this.setState({error: true}));
	}

	convert(temp) {
		if (this.state.fahrenheit) {
			return (temp * (9 / 5) - 459.67).toFixed(0);
		} else {
			return (temp -  273.15).toFixed(0);
		}
	}

	componentDidMount() {
		fetch(url + 'Seattle' + key)
			.then(response => response.json())
			.then(data => this.setState({data: data}));
	}

    render() {
    	var content;
		if (this.state.error) {
			content = <p className="center-text">Invalid city name.</p>;
		} else {
			content = (
				<div>
					<div className="button-house">
						<button 
							className={"mdl-button mdl-js-button mdl-button--primary " + (this.state.fahrenheit ? "button-clicked" : "")}
							onClick={() => this.handleClick()}
						>
						  &#176;F
						</button>
						<button 
							className={"mdl-button mdl-js-button mdl-button--primary " + (!this.state.fahrenheit ? "button-clicked" : "")}
							onClick={() => this.handleClick()}
						>
						  &#176;C
						</button>					
					</div> 
					<div id="weather-area">
						<WeatherCard 
							data={this.state.data} 
							convert={(num) => this.convert(num)} 
							fahrenheit={this.state.fahrenheit}
						/>					
					</div>
				</div>
			);
		}

        return (
            <main className="container">
				<h1 className="center-text">Current Weather</h1>
				<SearchCity onSearch={query => this.handleSearch(query)}/>
				{content}								              
            </main>
        );
    }
}
