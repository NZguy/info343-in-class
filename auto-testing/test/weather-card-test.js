import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import WeatherCard from "../src/weather-card.jsx";

var sampleData = {
    "weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],
    "main":{"temp":56.41,"pressure":1019,"humidity":71,"temp_min":53.6,"temp_max":59},
    "name":"Seattle"
};

