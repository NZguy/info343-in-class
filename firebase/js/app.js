//put the interpreter into strict mode
"use strict";

//create a new Firebase application using the Firebase
//console, https://console.firebase.google.com/

//setup OAuth with GitHub
//- on Firebase, enable the GitHub sign-in method
//- go to GitHub, and go to your account settings
//- under Developer Settings on the left, choose OAuth applications
//- fill out the form, setting the Authorization Callback URL
//  to the URL provided by Firebase 

//paste the Firebase initialization code here
// NOTE: Look at firebase documentation 

// var config = {
//     apiKey: "AIzaSyBNb1BWhy7NsYHo5q3QPThNp95u68rqm_I",
//     authDomain: "tasks-demo-7ccd9.firebaseapp.com",
//     databaseURL: "https://tasks-demo-7ccd9.firebaseio.com",
//     storageBucket: "tasks-demo-7ccd9.appspot.com",
//     messagingSenderId: "490287187965"
// };

var config = {
    apiKey: "AIzaSyAXPqOiYrBj7B5yhQkluI3s_sQoERUmBaI",
    authDomain: "info343-practice.firebaseapp.com",
    databaseURL: "https://info343-practice.firebaseio.com",
    storageBucket: "info343-practice.appspot.com",
    messagingSenderId: "1040240773603"
};

firebase.initializeApp(config);

var currentUser;
var authProvider = new firebase.auth.GithubAuthProvider();

firebase.auth().onAuthStateChanged(function(user){
    if(user){
        currentUser = user;
        console.log(currentUser);
    }else{
        firebase.auth().signInWithRedirect(authProvider);
    }
});

var taskForm = document.querySelector(".new-task-form");
var taskTitleInput = taskForm.querySelector(".new-task-title");
var taskList = document.querySelector(".task-list");
var purgeButton = document.querySelector(".btn-purge");

var tasksRef = firebase.database().ref("tasks");

taskForm.addEventListener("submit", function(evt){
    evt.preventDefault();

    var task = {
        title: taskTitleInput.value.trim(),
        done: false,
        createdOn: firebase.database.ServerValue.TIMESTAMP,
        createdBy: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email
        }
    };

    tasksRef.push(task);

    taskTitleInput.value = "";

    return false;
});

function renderTask(snapshot){
    var task = snapshot.val();
    var li = document.createElement("li");

    var spanTitle = document.createElement("span");
    spanTitle.textContent = task.title;
    spanTitle.classList.add("task-title");
    li.appendChild(spanTitle);

    var spanCreation = document.createElement("span");
    spanCreation.textContent = moment(task.createdOn).fromNow()
    + " by " + (task.createdBy.displayName || task.createdBy.email);
    spanCreation.classList.add("task-creation");
    li.appendChild(spanCreation);

    if(task.done){
        li.classList.add("done");
        purgeButton.classList.remove("hidden");
    }

    li.addEventListener("click", function(){
        // console.log("click for " + task.title);
        snapshot.ref.update({
            done: !task.done
        });
    });

    taskList.appendChild(li);
}

function render(snapshot){
    taskList.innerHTML = "";
    purgeButton.classList.add("hidden");
    snapshot.forEach(renderTask);
}

// Calls render whenever the value of the data changes, event listener
tasksRef.on("value", render);

// Deletes finished items from the database
purgeButton.addEventListener("click", function(){
    //console.log("purge button clicked!");
    tasksRef.once("value", function(snapshot){
        snapshot.forEach(function(taskSnapshot){
            if(taskSnapshot.val().done){
                taskSnapshot.ref.remove();
            }
        });
    });
});