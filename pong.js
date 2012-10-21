//Setup
noStroke();

var Score = 0;
var hiScore = 0;

var gameover = false;

var hardMode = false;
var weirdMode = false;

var paddleWidth = 100;

var initialSpeedX = random (5,8);
var initialSpeedY = -8;

var ballSpeedX = initialSpeedX;
var ballSpeedY = initialSpeedY;

var ballX = 0;
var ballY = 0;

var ballMoving = false;

var draw = function() {
    //Text & Stuff
    background(42, 189, 59);
    fill(222, 205, 17);
    textSize(20);
    text ("Score", 7,30);
    text ("High Score", 292,30);
    textSize(30);
    text (Score, 9,60); 
    text (hiScore, 337,60);
    if (Score > 100 && Score <110) {
        fill(222, 205, 17);
        textSize(40);
        text ("Awesome!", 105,190);
    }
    if (hardMode) {
        fill(255, 0, 0);
        textSize(30);
        text ("Hard!", 155,36); 
   }
   if (weirdMode) {
        fill(255, 0, 0);
        textSize(30);
        text ("...weird...?", 125,36); 
   }
    if (gameover) {
        fill(255, 0, 0);
        textSize(65);
        text("GAME OVER",2,200);
}
    if (!ballMoving) {
        fill(0, 0, 0);
        textSize(20);
        text("Hard Mode! |", 2,300);
        text("Normal Mode",139,300);
        text("| Weird Mode!", 275,300);
        
    }
    // Draw the Paddle
    if (Score<100) {
        fill(20, 28, 184);
    }
    else {
        stroke(233, 250, 165);
        fill (150, 143, 11);
    }
    rect(mouseX-paddleWidth/2, 350, paddleWidth, 10);
    if (weirdMode) {
        paddleWidth = paddleWidth + random (-2,2);
    }
    if (ballMoving) {
        ballX += ballSpeedX;
        ballY += ballSpeedY;
    }
    else {
        ballX = mouseX;
        ballY = 340;
    }
    //Draw the Ball
    noStroke();
    fill(194, 57, 15);
    ellipse(ballX, ballY, 20, 20);
    //Ball bouncing physics (Top)
    if (ballY <= 10) {
            ballSpeedY = -ballSpeedY;
        if (hardMode) {
            Score = Score + 2;
        }
        else if (weirdMode) {
            Score = Score + 1;
        }
        else {
           Score = Score + 1; 
        }
    }
    //Ball bouncing physics (Left)
    if (ballX <= 10) {
            ballSpeedX = -ballSpeedX;
        
        if (ballMoving) {
            if (hardMode) {
            Score = Score + 2;
        }
        else if (weirdMode) {
            Score = Score + 3;
        }
        else {
           Score = Score + 1; 
        }    
        }
    }
    //Ball bouncing physics (Right)
    if (ballX >= 390) {
        if (!weirdMode) {
            ballSpeedX = -ballSpeedX;
        }
        else {
            ballSpeedX = -ballSpeedX+random (-5,5);
        }
        if (ballMoving) {
            if (hardMode) {
            Score = Score + 2;
        }
        else if (weirdMode) {
            Score = Score + 2;
        }
        else {
           Score = Score + 1; 
        }   
        }
    }
    //Ball bouncing physics (Paddle)
    if (ballY >= 340 && ballY <346 && ballX >= mouseX - paddleWidth/2 && ballX <= mouseX + paddleWidth/2) {
        ballSpeedY = -ballSpeedY;
        if (hardMode) {
            ballSpeedX = ballSpeedX + random (-3,3);
        }
        else if (weirdMode) {
            ballSpeedX = ballSpeedX + random (-15,15);
        }
        else {
            ballSpeedX = ballSpeedX+random(-1,1);   
        }
    }
    //Game over
    if (ballY >= 400) {
        ballMoving = false;
        gameover = true;
        paddleWidth = 100;
        hardMode = false;
        weirdMode = false;
        if (Score>hiScore) {
            hiScore = Score;
        }
    }
};
//Game Start
var mouseClicked = function() {
    if (!ballMoving) {
        Score = 0;
        gameover = false;
        if (ballX < 100) {
           ballSpeedX = initialSpeedX+9;
           ballSpeedY = initialSpeedY-13;
           paddleWidth = paddleWidth -30;
           hardMode = true;
        }
       else if (ballX > 300) {
           ballSpeedX = initialSpeedX+4;
           ballSpeedY = initialSpeedY-5;
           weirdMode = true;
        }
        else{
            ballSpeedX = initialSpeedX;
        ballSpeedY = initialSpeedY;
        }

        ballMoving = true;
    }
};
