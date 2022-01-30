import TileMap from "./TileMap.js"

// constant variables
const tileSize = 32;                                    //Each square in the map is 32 pixles
const velocity = 2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');

const gameMap = new TileMap(tileSize);
const pacman = gameMap.getPacman(velocity);
const ghosts = gameMap.getGhosts(velocity);


// Redraw the screen certain amount of times every 1 second
function gameLoop(){
    gameMap.draw(ctx);
    pacman.draw(ctx);
    ghosts.forEach((ghost) => ghost.draw(ctx, pause(), pacman));
    
}
// Once Pac Man moves, game will not be pause and ghosts will start moving
function pause(){
    return !pacman.madeFirstMove;
}


gameMap.setCanvasSize(canvas);


//Call the function every x period of time, call function 75 times every 1000ms or 1 second
setInterval(gameLoop, 1000 / 75);