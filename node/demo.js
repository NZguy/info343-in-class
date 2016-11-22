/**
 * demo.js
 * Demonstration script for introducting Node.js
 */
"use strict";

console.log("Hello node.js");

var fs = require("fs"); // fs = file system (built into node)
var names = require("./data/babynames-1996.json");
console.log("there are %d names", names.length);
// Don't have to use babel for es6 since we are using node
var popFemNames = names.filter(rec => "F" == rec.sex)
    .sort((rec1, rec2) => rec2.count - rec1.count)
    .slice(0,10)
    .map(rec => rec.name);

console.log(popFemNames);
fs.writeFileSync("./data/pop-fem-names.json", JSON.stringify(popFemNames));