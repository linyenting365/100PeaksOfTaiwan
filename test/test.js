const assert = require('assert');
const data = require('../backend/data/result_2.json');
const backend = require("../backend/app.js");


// Test height function
describe("Hight function test", function () {
    it("input valid should return some data", function () {
        let input = 3300;
        let searching_Data = [];
        let searching_result = [];
        searching_Data = backend.searching_height(input, data);
        assert.notEqual(searching_Data, searching_result);
    });
    it("input not valid range", function () {
        let input = 2000;
        let searching_Data = [];
        searching_Data = backend.searching_height(input, data);
        let outputString = JSON.stringify(searching_Data, null, 2);
        console.log("outputString: ", outputString);
        assert.equal(searching_Data, "invalid range");
    });
});

// Test difficluty function 
describe("Difficluty function test", function () {
    it("should return Difficluty data", function () {
        let input = "A";
        let searching_Data = [];
        searching_Data = backend.searching_diff(input, data);
        assert.equal(searching_Data[0].Difficluty, "A");
    });
});