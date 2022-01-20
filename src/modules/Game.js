import TileMap from "./TileMap.js";


const tileSize = 32;                                    //Each square in the map is 32 pixles
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');
const gameMap = new TileMap(tileSize);



// Redraw the screen certain amount of times every 1 second
function gameLoop(){
    console.log('gg')
    gameMap.draw(ctx);


}


gameMap.setCanvasSize(canvas);


//Call the function every x period of time, call function 75 times every 1000ms or 1 second
setInterval(gameLoop, 1000 / 75);