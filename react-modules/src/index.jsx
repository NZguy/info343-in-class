//this imports the react module, which was installed
//to the node_modules directory when we ran `npm install`
import React from "react";
//this imports just the render() function from the 
//react-dom module, which also was installed to
//node_modules when we ran `npm install`
import {render} from "react-dom";

//see the app.jsx file for more comments on the `import` syntax
import App from "./app.jsx";

//render the App component to the page
render(<App/>, document.getElementById("app"));
