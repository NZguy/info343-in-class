"use strict";

var signUpForm = document.getElementById("signin-form");
var emailInput = document.getElementById("email-input");
var passwordInput = document.getElementById("password-input");

signUpForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    //use Firebase to sign in 
    //using the email name and password...
    //this operation happens asynchronously, so it returns a Promise.
    //A Promise represents an asynchronous action that may succeed or fail.
    //to run code when it succeeds, pass a function to the Promise's .then() method.
    //to run code when it fails, pass a function to the Promise's .catch() method.
    firebase.auth().signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function() {
            //navigate the browser to our secure.html page
            window.location = "secure.html";
        })
        .catch(function(err) {
            //for now, just show the error message in an alert
            //but you should do something more user-friendly
            //like display this in the page with appropriate styling
            alert(err.message);
        });

    return false;
});