/**
 * JavaScript Review Session
 */

//put the interpreter into strict mode
"use strict";

/**
 * FUNCTIONS
 * 
 * JavaScript functions are just like static
 * methods in Java. They are blocks of code that
 * can accept one or more parameters, and may
 * return a value to the caller. Parameters are
 * like local variables: you can name them
 * whatever you want. The values passed to your 
 * function by the caller are matched up based 
 * on the order they appear in the function call
 */
console.group("Functions");
/**
 * offsetText() returns a string where each character
 * of inputText is offset by `amount` characters
 * @param {string} inputText the text to offset
 * @param {number} amount the amount to offset
 * @returns {string} the offset string
 */
function offsetText(inputText, amount) {
    var outputText = "";
    var idx;
    for (idx = 0; idx < inputText.length; idx++) {
        outputText += String.fromCharCode(inputText.charCodeAt(idx) + amount);
    }
    return outputText;
}

var plainText = "Hello JavaScript!";
var badlyEncryptedText = offsetText(plainText, 1);
console.log(plainText, "=", badlyEncryptedText, "=", offsetText(badlyEncryptedText, -1)); 

//functions are values in JavaScript, so a
//function name can be used wherever a value can
//be used: for example, assigning to a variable
var fn = offsetText;
badlyEncryptedText = fn(plainText, 10);
console.log(plainText, "=", badlyEncryptedText, "=", fn(badlyEncryptedText, -10)); 

//since a function parameter is just like a variable
//you can also pass a function to another function
//as a paramter
function formatAsDate(value) {
    return moment(value).format("l");
}

function formatAsNumber(value) {
    return numeral(value).format("0,0");
}

function formatAsCurrency(value) {
    return numeral(value).format("$0,0.00");
}

function logValue(value, formatter) {
    console.log(formatter(value));
}

//call logValue passing formatAsDate as the formatter
logValue("2016-10-27", formatAsDate);

/**
 * PRACTICE
 * call `logValue()` passing a `somenumber` as the first
 * parameter, and one of the other formatter functions
 * as the second parameter
 */
var someNumber = 123456789;
//logValue(...)






console.groupEnd();

/**
 * OBJECTS
 * 
 * JavaScript has two built-in complex data types,
 * Objects and Arrays. Objects are just HashMaps.
 * A HashMap is a data structure that stores key/value
 * pairs. The key must be a string, but the value can
 * be of any type. Getting or setting a value given a
 * key is very fast. 
 */
console.group("Objects");

//this creates an object with four properties
//(that is, four key/value pairs)
var course = {
    curriculum: "INFO",
    num: 343,
    section: "D",
    title: "Client-Side Web Development"
};

console.log("I'm taking", course.curriculum, course.num);

//if we want to access a property's value and we have
//that property name in a string variable, we can do 
//that using an alternative syntax:
var propName1 = "curriculum";
var propName2 = "num";
console.log("Alternative syntax: I'm taking", course[propName1], course[propName2]);

//you can get all of the property names from any object
//using Object.keys(). This returns an array of strings,
//one element for each property name
var propNames = Object.keys(course);
console.log("property names:", propNames);

//and since that's an array, we can use any of the array
//methods on it...

/**
 * PRACTICE
 * Use the array's .forEach() method to iterate
 * over that `propNames` array, writing each 
 * property name to the console along with its
 * corresponding value in the `course` object.
 * Your console log output should look like this:
 * 
 *   curriculum = INFO
 *   num = 343
 *   section = D
 *   title = Client-Side Web Development
 * 
 * If you can't remember what .forEach() look like
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 */





console.groupEnd();

/**
 * ARRAYS
 */
console.group("Arrays");

//Because the data/babynames-1996.js file was added
//to our index.html page before this script, we can
//access the global variable BABYNAMES, which that
//file declares. That variable is set to an array
//of objects, each of which has three properties:
//name, sex, and count.

//how many elements are in the BABYNAMES array?
console.log(BABYNAMES.length);


console.groupEnd();