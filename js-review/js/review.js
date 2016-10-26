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
    //loop over the characters in the string,
    //convert each character to its char code number
    //add the offset amount, and convert back to a character 
    for (idx = 0; idx < inputText.length; idx++) {
        outputText += String.fromCharCode(inputText.charCodeAt(idx) + amount);
    }
    return outputText;
}

function badlyEncryptText(inputText) {
    return offsetText(inputText, 1);
}

function badlyDecryptText(inputText) {
    return offsetText(inputText, -1);
}

var plainText = "Hello JavaScript!";
var badlyEncryptedText = badlyEncryptText(plainText);
console.log(plainText, "=", badlyEncryptedText, "=", badlyDecryptText(badlyEncryptedText)); 

//functions are values in JavaScript, so a
//function name can be used wherever a value can
//be used: for example, assigning to a variable
var fn = offsetText;
badlyEncryptedText = fn(plainText, 10);
console.log(plainText, "=", badlyEncryptedText, "=", fn(badlyEncryptedText, -10)); 

//since a function parameter is just like a variable
//you can also pass a function to another function
//as a paramter

/**
 * @callback formatter
 * @param {any} value
 * @returns {string} the formatted value 
 */

function formatAsDate(value) {
    return moment(value).format("l");
}

function formatAsNumber(value) {
    return numeral(value).format("0,0");
}

function formatAsCurrency(value) {
    return numeral(value).format("$0,0.00");
}

function formatAsString(value) {
    //every JavaScript value has a .toString() method
    return value.toString();
}

/**
 * logValue() formats `value` using the `formatter`
 * function and writes the result to console.log()
 * @param {any} value the value to log
 * @param {formatter} [formatter] a function that can
 *   format `value` for the log
 */
function logValue(value, formatter) {
    //if a value was passed as `formatter`
    //use it to format the value
    if (formatter) {
        value = formatter(value);
    }
    console.log(value);
}

//example: call logValue passing a date, formatting
//it first as a string, and then as a date
logValue("2016-10-27", formatAsString);
logValue("2016-10-27", formatAsDate);

/**
 * PRACTICE
 * call `logValue()` passing a `someNumber` as the first
 * parameter, and formatAsNumber as the second param.
 * Then try logging the same value but formatting it
 * as a currency instead.
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

//you can also test if an object has a property already
//using two different approaches:
//first: use .hasOwnProperty()
if (course.hasOwnProperty("title")) {
    console.log(course.title);
}
//second; test the value for the property
//asking for a property that doesn't yet exist
//in the HashMap will return `undefined`, which
//will coerce to false
if (course.foobar) {
    //this won't ever run because there is no
    //`foobar` key in the HashMap
    console.log(course.foobar);
}

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
//every array has a `.length` property
console.log("BABYNAMES has %s elements", 
    formatAsNumber(BABYNAMES.length));

//every array also has a .filter() method, which 
//returns a new array containing only the elements
//that pass your testing function. Your testing 
//function should return `true` if the element should
//be in the returned filtered array, or `false` if not
var females = BABYNAMES.filter(function(record) {
    //this function is called once for each element
    //in the array, and it's passed the current element
    //as the first parameter--here we call it `record`
    return "F" == record.sex;
});

var males = BABYNAMES.filter(function(record) {
    return "M" == record.sex;
});

console.log("There are %s female names and %s males names", 
    formatAsNumber(females.length), formatAsNumber(males.length));

//every array also has a `.sort()` method, which will sort
//the array elements in-place according to your compare
//function. The compare function will be called many
//times, and each time the sort algorithm will pass it
//two elements from the array. The compare function must
//return a negative number if the first element is 
//"less than" the second, return 0 if they are equal,
//or return a positive number if the first element is
//"greater than" the second element

//let's sort the females and males arrays by count ascending
//(least popular names at the top)
females.sort(function(record1, record2) {
    //since count is a number, we can just subtract them
    //if record1.count is < than record2.count, the result
    //will be negative; if they are equal, the result will
    //be 0; if record1.count > record2.count, the result
    //will be positive
    return record1.count - record2.count;
});

//every array has a `.slice()` method that you can use
//to slice off a range of the array elements
var leastPopFemRecs = females.slice(0,10);
console.log("least popular female name records:", leastPopFemRecs);

//every array also has a `.map()` method, which will
//return a new array containing the same number of elements
//but each element will be transformed using your 
//transformation function
//this transformation function returns only the .name
//property from each record, so the returned array will
//contain only the names (it will be an array of strings) 
var leastPopFemNames = leastPopFemRecs.map(function(record) {
    //return just the name property
    return record.name;
});

console.log("least popular female names:", leastPopFemNames);

//this is how `.map()` is actually implemented...
function mapArray(array, transFn) {
    var mappedElems = [];
    var idx;
    for (idx = 0; idx < array.length; idx++) {
        mappedElems.push(transFn(array[idx]));
    }
    return mappedElems;
}

//arrays also have a `.join()` method, which will join all
//of the elements into one single output string, using
//the separator string you provide
console.log("least popular female names:", leastPopFemNames.join(", "));

//although we are passing anonymous inline functions above,
//we can also pass a reference to a function defined elsewhere
var badlyEncryptedNames = leastPopFemNames.map(badlyEncryptText);
var badlyDecryptedNames = badlyEncryptedNames.map(badlyDecryptText);

console.log("badly encrypted least popular female names:", badlyEncryptedNames.join(", "));
console.log("badly decrypted least popular female names:", badlyDecryptedNames.join(", "));

//arrays also have a `.reduce()` method, which is tricky to
//understand, but it's super powerful. It calls your reducer
//function once for each element in the array, passing the
//current reduction value, and the current element. whatever
//your reducer function returns will become the new reduction
//value.
//for example, to sum all of the .count properties in the
//array of baby name records, we could do this:
var totalCount = BABYNAMES.reduce(function(curTotal, record) {
    return curTotal + record.count;
}, 0); //second param is the starting reduction value

console.log("Total count", formatAsNumber(totalCount));

/**
 * PRACTICE
 * now sort the `males` array by count *descending*
 * and slice off the top 10 records. Then use `.map()`
 * to extract transform that top 10 array of records
 * into a array of 10 strings. Then use .join() to
 * write that array of 10 strings to the console as
 * a comma, delimited list. To sort descending,
 * just reverse the logic in your compare function.
 */





console.groupEnd();