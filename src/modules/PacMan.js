import TileMap from "./TileMap";




class PacMan{
    constructor(x, y, tilesize, velocity, tilemap){
        this.x = x;
        this.y = y;
        this.tilesize = tilesize;
        this.velocity = velocity;
        this.tilemap = tilemap;
        this.#loadPacmanImages();
    }

    draw(ctx){
        ctx.drawImage();

    }

    #loadPacmanImages(){

        const pacmanImage1  = new Image();
        pacmanImage1.src = "../../assets/images/pac0.png";
    }


}


export default PacMan