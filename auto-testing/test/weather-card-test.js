//when testing React components, you need to import React from "react"
import React from "react";

//for details on the expect() method from the chai module see
//http://chaijs.com/api/bdd/
import {expect} from "chai";

//for details on the shallow() function and the wrapper it returns, see
//https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md
import {shallow} from "enzyme";

//import our WeatherCard we wrote during lab last week
import WeatherCard from "../src/weather-card.jsx";

//some sample data in the same shape as the data returned from
//the open weather API
var sampleData = {
    "weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],
    "main":{"temp":56.41,"pressure":1019,"humidity":71,"temp_min":53.6,"temp_max":59},
    "name":"Seattle"
};

//See shared-state-test.js for a detailed comment on how Mocha
//tests are structured.

//register a new test suite function for the weather card component
describe("WeatherCard Component", function() {
    //test that it renders the "loading" message when passed empty data
    it("should render with loading message with empty data", function() {
        var emptyData = {};
        var wrapper = shallow(<WeatherCard data={emptyData} fahrenheit={true}/>);
        expect(wrapper.find(".loading-text")).to.have.length(1);
        expect(wrapper.find(".loading-text").text()).to.equal("Loading");
    });

    //test that it does render a complete card when given the sample data
    it("should render a card with sample data", function() {
        var wrapper = shallow(<WeatherCard data={sampleData} fahrenheit={true}/>);
        expect(wrapper.find(".weather-card")).to.have.length(1);
        expect(wrapper.find(".city-name").text()).to.equal(sampleData.name);
        //TODO: more expect() calls to verify that the other elements and data
        //were rendered correctly....
    });
});
