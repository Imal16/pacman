import TileMap from "./TileMap.js"

// https://www.youtube.com/watch?v=Tk48dQCdQ3E
// constant variables
const tileSize = 32;                                    //Each square in the map is 32 pixles
const velocity = 2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');

const gameMap = new TileMap(tileSize);
const pacman = gameMap.getPacman(velocity);
const ghosts = gameMap.getGhosts(velocity);

let gameOver = false;
let gameWin = false;

const gameOverSound = new Audio("../../assets/sounds/gameOver.wav");
const gameWinSound = new Audio("../../assets/sounds/gameWin.wav");

// Redraw the screen certain amount of times every 1 second
function gameLoop(){
    gameMap.draw(ctx);
    drawGameEnd();
    pacman.draw(ctx, pause(), ghosts);
    ghosts.forEach((ghost) => ghost.draw(ctx, pause(), pacman));
    checkGameOver();
    checkGameWin();
}

function checkGameWin(){
    if(!gameWin){
        gameWin = gameMap.didWin();
        if (gameWin){
            gameWinSound.play();

        }
    }
}

function checkGameOver(){
    if(!gameOver){
        gameOver = isGameOver();
        if (gameOver){
            gameOverSound.play();
        }
    }
}

// If Power Dot was not active/consumed and there is a collision between a ghost and Pacman
function isGameOver(){
    return ghosts.some(ghost => !pacman.powerDotActive && ghost.collide(pacman) )
}

// Once Pac Man moves, game will not be pause and ghosts will start moving
function pause(){
    return !pacman.madeFirstMove || gameOver || gameWin;
}

function drawGameEnd(){
    if(gameOver || gameWin){
        let text = " You Win!";
        if(gameOver){
            text = "Game Over";
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, canvas.height / 3.2, canvas.width , 80);

        ctx.font = "80px comic sans";
        const gradient = ctx.createLinearGradient(0,0, canvas.width, 80);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");

        ctx.fillStyle = gradient;
        ctx.fillText(text, 10, canvas.height / 2);
    }
}


gameMap.setCanvasSize(canvas);

//Call the function every x period of time, call function 75 times every 1000ms or 1 second
setInterval(gameLoop, 1000 / 75);