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
    var promise = firebase.auth().createUserWithEmailAndPassword(emailInput.value,
    passwordInput.value);

    // promise returned from createUser... gives us the user object
    promise.then(function(user){
        // we then set the users displayName property
        return user.updateProfile({
            displayName: displayNameInput.value
        });
    }).then(function(){
        // this function is called after the pervious .then()
        window.location = "secure.html";
    });

    promise.catch(function(err){
        alert(err.message);
    });

    // better formatting for promises below, promise chain
    // don't nest then calls (like I did in promise lab)
    // firebase.auth().createUserWithEmailAndPassword(emailInput.value,
    // passwordInput.value)
    //     .then(function(user){
    //         return user.updateProfile({
    //             displayName: displayNameInput.value
    //         });
    //     })
    //     .then(function(){
    //         window.location = "secure.html";
    //     })
    //     .catch(function(err){
    //         alert(err.message);
    //     });

    return false;
});