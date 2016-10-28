"use strict";

var currentUser;

//ask Firebase to call our function whenever the
//authentication state changes; this will be called
//when the page first loads, as well as after the user
//signs out
firebase.auth().onAuthStateChanged(function(user) {
    //`user` will be null or a Firebase User object
    if (user) {
        //user is signed-in; set the global variable
        //currentUser to the user so we can refer to it
        //later
        currentUser = user;
        
        //set the <span id="user-name"> text content
        //to be the user's .displayName
        document.getElementById("user-name").textContent = user.displayName;
    } else {
        //the user isn't signed in anymore
        //navigate the browser back to index.html
        window.location = "index.html";
    }
});

document.getElementById("sign-out-button").addEventListener("click", function() {
    //tell Firebase to sign the current user out...
    //after the signout is complete, Firebase will call the
    //onAuthStateChanged callback function defined above
    firebase.auth().signOut();
});
