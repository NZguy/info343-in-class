import React from "react";
import {render} from "react-dom";

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<h2>Hello React!</h2>
		);
	}
}

render(<App/>, document.getElementById("app"));
