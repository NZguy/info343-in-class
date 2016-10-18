"use strict";

var boxOne = document.getElementById('one'),
	boxTwo = document.getElementById('two'),
	boxThree = document.getElementById('three'),
	boxFour = document.getElementById('four'),
	boxFive = document.getElementById('five'),
	boxSix = document.getElementById('six');

boxOne.addEventListener("click", function(){
	boxOne.classList.add("fade-to-black", "black");
});

boxTwo.addEventListener("click", function(){
	boxTwo.classList.add("fall");
});

boxThree.addEventListener("mouseenter", function(){
	boxThree.classList.remove("fade-to-bg-color", "grey");
	boxThree.classList.add("fade-to-white", "white");
});

boxThree.addEventListener("mouseleave", function(){
	boxThree.classList.remove("fade-to-white", "white");
	boxThree.classList.add("fade-to-bg-color", "grey");
});

var boxFourMoved = false;
boxFour.addEventListener("click", function(){
	if(boxFourMoved){
		boxFour.classList.remove("fall");
		boxFour.classList.add("float");
		boxFourMoved = false;
	}else{
		boxFour.classList.remove("float");
		boxFour.classList.add("fall");
		boxFourMoved = true;
	}
});

boxFive.addEventListener("click", function(){
	var myInterval = setInterval(function(){
		boxFive.style.width = (boxFive.offsetWidth + 5) + "px";
		boxFive.style.height = (boxFive.offsetHeight + 5) + "px";
		if(boxFive.offsetWidth >= 500){
			boxFive.style.display = "none";
			clearInterval(myInterval);
		}
	}, 50);
});