"use strict";

var signUpForm = document.getElementById("signup-form");
var emailInput = document.getElementById("email-input");
var passwordInput = document.getElementById("password-input");
var displayNameInput = document.getElementById("display-name-input");

signUpForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    //use Firebase to create a new user
    //with the email and password
    //after the account is created, then use
    //the .updateProfile() method to set the display name
    //this operation happens asyncrhonously, so this expression returns a Promise.
    //A Promise represents an asynchronous action that may succeed or fail.
    //to run code when it succeeds, pass a function to the Promise's .then() method.
    //to run code when it fails, pass a function to the Promise's .catch() method.
    firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function(user) {
            //Promises have another handy behavior: if a function
            //passed to .then() returns another Promise, the original
            //promise takes on the state of the returned promise. This 
            //allows us to serialize multiple asynchronous operations.
            //the next .then() function will be executed after the 
            //Promise returned from this .then() function completes
            return user.updateProfile({
                displayName: displayNameInput.value
            });
        })
        .then(function() {
            //account is created, and user profile is updated
            //with the displayName.
            //now navigate to our secure.html file
            window.location = "secure.html";
        })
        .catch(function(err) {
            //if either async operation fails, this function
            //will be executed
            alert(err.message);
        });

    return false;
});