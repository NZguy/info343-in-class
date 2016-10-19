//put interpreter into strict mode
"use strict";

//how many records are in the BABYNAMES array?
console.log(numeral(BABYNAMES.length).format("0,0"));

/**
 * compareSex() *returns* a comparator function you can use
 * with the array.filter() method. The returned comparator
 * will compare each record's .sex property against the 
 * value passed as the `sex` parameter to this function.
 * @param {string} sex - the value to compare against each
 * record's .sex property
 * @returns {Function} a comparator function you can passed
 * to array.filter() 
 */
function compareSex(sex) {
    //because functions are values in JavaScript
    //we can return a function from a function
    //the returned function isn't executed right away
    //we are returning a reference to a function that
    //the receiving code can invoke later
    return function(record) {
        //whenever you define a function within another
        //function, the inner function has access to the 
        //outer function's parameters and variables through
        //what's called a *closure* 
        //(https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch5.md)
        //here we use the `sex` param passed to compareSex() inside the returned
        //function, which will be called later when we use it with array.filter()
        //this allows us to generate multiple comparator functions,
        //one for each distinct value we might want to compare against
        //in this case, it's just "M" or "F"
        return sex == record.sex;
    }
}

/**
 * compareByCount() is a sort comparison function that can
 * be used with the array.sort() method. It takes two records
 * and returns a negative value if rec1 should be before rec2,
 * a zero value if rec1 and rec2 are equal, or a positive
 * value if rec1 should be after rec2 in the final sorted order
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * @param {Object} rec1
 * @param {Object} rec2
 * @returns {number}
 */
function compareByCount(rec1, rec2) {
    return rec1.count - rec2.count; 
}

/**
 * descending() *returns* a sort comparrison function that can be
 * used with array.sort(). The returned function calls `comparator`, 
 * passing the two records to compare, and then simply negates the result.
 * The function passed as `comparator` must be a sort comparrison function,
 * but it could be *any* sort comparrison function. The descending() function
 * doesn't care what `comparator` does--it only needs to negate the result
 * to make the sort order be descending instead of ascending 
 */
function descending(comparator) {
    //the returned function has access to the `comparator` parameter
    //because of the closure created by returning a function from 
    //another function. So when the returned function is eventually
    //called by array.sort(), it can still invoke `comparator`,
    //passing along the rec1 and rec2 parameters.
    //note that the returned function is not invoked right away.
    //the code that receives this returned function will invoke it
    //later, in this case by passing it to array.sort(), which will
    //invoke this returned function several times as it sorts the array.
    return function(rec1, rec2) {
        //call `comparator` (whichever function that was)
        //and return the negation of the return value
        //a positive return value becomes a negative value, and vice-versa
        return -(comparator(rec1, rec2));
    }
}

//use the compareSex() function return a function we can pass to array.filter().
//the returned function will return true only if the record's .sex property == "F"
//this extracts only the female baby names and returns them as a new array
var females = BABYNAMES.filter(compareSex("F"));

//sort the filterd array by count descending 
females.sort(descending(compareByCount));
console.log(females.length);

//do the same for the male baby names...
var males = BABYNAMES.filter(compareSex("M"));
males.sort(descending(compareByCount))
console.log(males.length);

//now that we have the female and male baby names separated
//and sorted, create another array of the top 500 female and
//males baby names, so we have a reasonably-sized set of
//data to render in the browser. the .slice() method will
//return a subset of the array elements given two array indexes
//and .concat() will concatenate two arrays together, returning
//a new array that contains all elements from the two concatenated
//arrays. since we are slicing only the first 500 from the females
//and males arrays, the resulting mostPopular array will have 1000 elements. 
var mostPopular = females.slice(0,500).concat(males.slice(0,500));

//get a reference to the <tbody> element on our web page
//document.querySelector() accepts a CSS selector, just like
//the ones you've used in your CSS stylesheets.
//document.querySelector() returns only the *first* element that
//matches the selector, but document.querySelectorAll() will return
//a list of all elements that match the selector. In this case we
//only want the one element, and that selector will match only one
//element in our page. The returned value is a DOMElement, which
//has methods we can use to add new child elements within it. 
var tbody = document.querySelector("tbody");

/**
 * createElement() will create and return a new DOM element 
 * given an element name, and if a value for `text` is supplied, 
 * it will set the new element's textContent to that value.
 * @param {string} elemName - the name of the element to create (e.g., "td")
 * @param {string} [text] - an optional value to use for the element's textContent
 * @returns {DOMElement}
 */
function createElement(elemName, text) {
    var elem = document.createElement(elemName);
    if (text) {
        elem.textContent = text;
    }
    return elem;
}

/**
 * render() will render a set of records as rows within the
 * <tbody> element. This will clear any existing rows, and then
 * create a new table row and cells for each record in the set
 * @param {Object[]} records - the set of records to render
 */
function render(records) {
    //clear any existng content that might already be in the <tbody> element
    tbody.innerHTML = "";
    
    //for each record...
    records.forEach(function(record) {
        //create a new table row element   
        var tr = document.createElement("tr");
        //add a style class based on the record's .sex property
        tr.classList.add("sex-" + record.sex.toLowerCase());

        //create table cells for the various columns
        //and append them to the tr
        tr.appendChild(createElement("td", record.name));
        tr.appendChild(createElement("td", record.sex));
        tr.appendChild(createElement("td", numeral(record.count).format("0,0")));

        //append the tr (with all of it's child td elements)        
        //to the tbody element. After this line of code
        //the table row will appear on the page
        tbody.appendChild(tr);
    });
}

//render the popularNames array we created above
//(top 500 males and top 500 female names)
render(mostPopular);

//get a reference to the search input element
//since that element as an `id` attribute, we can use the more
//direct document.getElementById() method. Pass the value of the
//element's `id` attribute as the first parameter, and this method
//will return a reference to that DOMElement
var searchInput = document.getElementById("name-search-input");

//when the user interacts with an element, the browser raises
//an "event", and we can ask the browser to call a particular function
//whenever that event is raised. This code asks the browser to call
//the function passed as the second parameter whenever the "input"
//event is raised on the searchInput. This event is raised whenever
//the user changes the contents of that input, and it's raised after
//every keystroke.
searchInput.addEventListener("input", function() {
    //while developing, use a console.log() to ensure your event handler function
    //is being called, but don't leave that enabled in your final
    //code, as it litters the console with debug messages 
    //console.log("input event");

    //get the text the user has typed into the search input
    //and convert it to lower case so we can compare it to 
    //the names in the records in a case-insensitive manner
    var query = searchInput.value.toLowerCase();

    //find all baby names that contain the text the user
    //entered in the search input. The easiest way to do 
    //this is to use the array.filter() method, passing a
    //function that returns true if the record's .name
    //property contains the text entered by the user
    var matches = mostPopular.filter(function(record) {
        //convert the record's name property to lower case
        //and use .indexOf() to see if the query text
        //is anywhere in the name (contains search)
        return record.name.toLowerCase().indexOf(query) >= 0;
    });

    //render the matches
    render(matches);
});

//enable resorting the list by clicking on the count column heading
//you can use this same pattern to enable click-to-sort on the other
//column headings as well
var countColHeading = document.getElementById("count-col-header");
countColHeading.addEventListener("click", function() {
    //console.log("clicked col header!");
    mostPopular.sort(descending(compareByCount));
    render(mostPopular);
});
