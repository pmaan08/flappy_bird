//variables to get canvas and select the context
var cvs = document.getElementById("canvas")
var ctx = cvs.getContext("2d")



//load images
var bird = new Image();
var bg = new Image();
var fg = new Image(); 
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png"
bg.src = "images/bg.png"
fg.src = "images/fg.png"
pipeNorth.src = "images/pipeNorth.png"
pipeSouth.src = "images/pipeSouth.png"

// extra vaiables

var gap = 75;
var constant = pipeNorth.height + gap;

var bX = 10;
var bY = 150;
var gravity = 1.5;
var score  = 0;

// audio

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/sounds_fly.mp3"
scor.src = "sounds/sounds_score.mp3"

// on key down 

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 25;
    fly.play();
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}

// draw images

function draw() {

    //background
    ctx.drawImage(bg,0,0);

    for(var i=0; i < pipe.length; i++)
    {
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x, pipe[i].y+constant);

        //move pipe to left
        pipe[i].x--;

        if( pipe[i].x == 125)
        {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        //detect colission

        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= cvs.height - fg.height)
        {
            location.reload();
        }

        if(pipe[i].x == 5 ){
            score++;
            scor.play;

        }
    }
      
    //ground
    ctx.drawImage(fg,0,cvs.height - fg.height);

    //bird
    ctx.drawImage(bird, bX, bY);
    bY += gravity;

    ctx.fillStyle = "#0000"
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+ score,10,cvs.height-20);


    requestAnimationFrame(draw);

}

draw();