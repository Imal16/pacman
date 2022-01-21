import TileMap from "./TileMap.js"

// constant variables
const tileSize = 32;                                    //Each square in the map is 32 pixles
const velocity = 1;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');
const gameMap = new TileMap(tileSize);
const pacman = TileMap.getPacman(velocity)


// Redraw the screen certain amount of times every 1 second
function gameLoop(){
    gameMap.draw(ctx);

    pacman.draw(ctx)

}


gameMap.setCanvasSize(canvas);


//Call the function every x period of time, call function 75 times every 1000ms or 1 second
setInterval(gameLoop, 1000 / 75);