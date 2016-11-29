"use strict";
// physicsJS

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
// more at freesound.org
var pongSound = new Audio("/sounds/pong.wav");
var gameOverSound = new Audio("/sounds/game-over.wav");
var gameState;

function resizeCanvas(){
    var docElem = document.documentElement;
    canvas.width = docElem.clientWidth;
    canvas.height = docElem.clientHeight;
    if(gameState){
        gameState.paddle.height = canvas.height / 6;
    }
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// advance animation one step
// Fix ball loosing error by setting y of ball to bottom of canvas if it "bounces"
// can use math.min to decide if it should be moved back on screen
function step(timestamp){
    var ball = gameState.ball;
    ball.x += ball.vectorX * ball.velocity;
    ball.y += ball.vectorY * ball.velocity;

    // bounce the ball if hit bottom 
    // and put it back on screen if it fell off
    if (ball.y + ball.radius >= canvas.height){
        ball.vectorY = -ball.vectorY;
        ball.y = Math.min(ball.y, canvas.height - ball.radius);
        pongSound.play();
    }
    // bounce the ball if hit bottom
    // and put it back on screen if it fell off
    if(ball.y - ball.radius <= 0){
        ball.vectorY = -ball.vectorY;
        ball.y = Math.max(ball.y, ball.radius);
        pongSound.play();
    }

    // bounce off right wall
    if(ball.x + ball.radius >= canvas.width){
        ball.vectorX = -ball.vectorX;
        ball.x = Math.min(ball.x, canvas.width - ball.radius);
        pongSound.play();
    }

    // bounce if hit paddle
    var paddle = gameState.paddle;
    if(ball.x - ball.radius <= paddle.x + paddle.width){
        if(ball.y + ball.radius >= paddle.y && ball.y - ball.radius <= paddle.y + paddle.height){
            ball.vectorX = -ball.vectorX;
            pongSound.play();
        } 
    }

    // end game if ball off screen
    if(ball.x + ball.radius <= 0){
        gameOverSound.play();
        return false;
       
    }

    if(timestamp - ball.lastVelocityIncrease > 2000){
        ball.lastVelocityIncrease = timestamp;
        ball.velocity++;
    }

    return true;
}

// render game state to the canvas context
function render(state){
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // render the ball
    ctx.beginPath();
    ctx.arc(state.ball.x, state.ball.y, state.ball.radius, 0, Math.PI * 2);
    ctx.fill();

    // render the paddle
    ctx.fillRect(state.paddle.x, state.paddle.y, state.paddle.width, state.paddle.height);
}

// step and then render
function animate(timestamp){
    // step on the animatin and keep going if step returns true
    if(step(timestamp)){
        requestAnimationFrame(animate);
    }

    render(gameState);
}

// start a new game
function startGame(){
    gameState = {
        ball: {
            x: 50,
            y: 50,
            radius: 15,
            vectorX: 1,
            vectorY: 1,
            velocity: 4,
            lastVelocityIncrease: performance.now()
        },
        paddle: {
            x: 10,
            y: 10,
            width: 10,
            height: canvas.height / 6
        }
    };
    requestAnimationFrame(animate)
}

canvas.addEventListener("mousemove", function(evt){
    var paddle = gameState.paddle;
    paddle.y = evt.clientY - (paddle.height / 2);
})

startGame();