import React from "react";
import {render} from "react-dom";

import "whatwg-fetch";
import "./css/main.css";

import App from "./app.jsx";

render(<App/>, document.getElementById("app"));
