/**
 * app.js
 * main application script
 */
"use strict";

var video = document.querySelector("video");
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var filterSel = document.querySelector("#filter-select");
var mouseIsDown = false;

function evtToCanvas(evt){
    return {
        x: evt.clientX - canvas.offsetLeft + window.scrollX,
        y: evt.clientY - canvas.offsetTop + window.scrollY
    }
}

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
    navigator.mediaDevices.getUserMedia({video: true})
        .then(function(stream){
            video.src = window.URL.createObjectURL(stream);

            video.addEventListener("click", function(){
                canvas.width = video.clientWidth;
                canvas.height = video.clientHeight;
                ctx.drawImage(video, 0, 0);
            });

            filterSel.addEventListener("change", function(){
                var filterName = filterSel.options.item(filterSel.selectedIndex).value;
                console.log(filterName);
                canvas.className = filterName;
                // can get imagebuffer of canvas and manipulate myself in js
            });

            // canvas.addEventListener("click", function(){
            //     console.log(canvas.toDataURL());
            // });

            canvas.addEventListener("mousedown", function(evt){
                mouseIsDown = true;
                ctx.beginPath();
                ctx.strokeStyle = "#FF0";
                var coords = evtToCanvas(evt);
                ctx.moveTo(coords.x, coords.y); 
            });

            canvas.addEventListener("mousemove", function(evt){
                if(mouseIsDown){
                    var coords = evtToCanvas(evt);
                    ctx.lineTo(coords.x, coords.y);
                    ctx.stroke();
                }
            });

            canvas.addEventListener("mouseup", function(evt){
                mouseIsDown = false;
            });
        })
        .catch(function(err){
            console.error(err);
            alert(err.message);
        });
}else{
    alert("Sorry your browser doesn't allow using a webcam, use Chrome of Firefox");
}