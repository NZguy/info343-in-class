import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import WeatherCard from "../src/weather-card.jsx";

var sampleData = {
    "weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],
    "main":{"temp":56.41,"pressure":1019,"humidity":71,"temp_min":53.6,"temp_max":59},
    "name":"Seattle"
};

describe("WeatherCard Component", function() {
    it("should render with loading message with no data prop", function() {
        var wrapper = shallow(<WeatherCard fahrenheit={true}/>);
        expect(wrapper.find(".loading-text")).to.have.length(1);
        expect(wrapper.find(".loading-text").text()).to.equal("Loading");
    });

    it("should render with loading message with empty data", function() {
        var emptyData = {};
        var wrapper = shallow(<WeatherCard data={emptyData} fahrenheit={true}/>);
        expect(wrapper.find(".loading-text")).to.have.length(1);
        expect(wrapper.find(".loading-text").text()).to.equal("Loading");
    });

    it("should render a card with sample data", function() {
        var wrapper = shallow(<WeatherCard data={sampleData} fahrenheit={true}/>);
        expect(wrapper.find(".weather-card")).to.have.length(1);
        expect(wrapper.find(".city-name").text()).to.equal(sampleData.name);
    });


});
