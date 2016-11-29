#Drawing app with the canvas element.
![](http://i.giphy.com/GKNbJswvbtjIA.gif)
##Setting up your environment

Follow [these steps](https://github.com/info343-a16/info343-in-class) to set up your development environment.

##Overview##
Today we will be building a drawing application that uses the canvas html element. Instead of creating shapes manually like we learned in lecture, we will use a vector graphics library called [Paper.js](http://paperjs.org/). 

Please read through [this](http://paperjs.org/tutorials/getting-started/using-javascript-directly/) page on how to use paper.js with javascript. You will need to read the whole thing, no shortcuts :(

**You must be on a web server for this to work, use browser-sync.**

##Overview of starter files##
###index.html###
This file already includes a link to the paper.js source code as well as a link to the [Font Awesome](http://fontawesome.io/icons/) stylesheet. 

I used Font Awesome for the buttons on the left side but you do not have to. 

I have also included some styles for the canvas element to make it fill up the whole browser page. You can change these if you want.

The javascript file containing your paper.js code is linked at the end of the body tag.

###main.js###
Your drawing code goes in here! 

Here are some helpful links:

[Event handlers with regular js](http://paperjs.org/tutorials/getting-started/using-javascript-directly/#installing-event-handlers)

[Event examples](http://paperjs.org/tutorials/interaction/mouse-tool-events/) (these are made in paperscript so look to the previous article for how to make these work with javascript)

[Shapes](http://paperjs.org/reference/shape/)

[Paths](http://paperjs.org/reference/path/)

##Done early?##
If you are done early you can play around with making drawings different colors, adding an erase option, and/or adding 'save' functionality.