import PacMan from "./PacMan.js"



class TileMap{
    constructor(tileSize){
        this.tileSize = tileSize;

        this.yellowDot = new Image()
        this.yellowDot.src = '../../assets/images/yellowDot.png';

        this.wall = new Image()
        this.wall.src = '../../assets/images/wall.png';

    }


    //1 - wall
    //0 - dots
    //4 - pacman
    //5 - empty space
    //6 - enemy
    //7 - power dot
    map = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 7, 0, 0, 4, 0, 0, 0, 0, 0, 0, 7, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 6, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 7, 1, 1, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    draw(ctx) {
        for(let row=0; row < this.map.length; row++){
            for(let col=0; col < this.map[row].length; col++){
                
                let tile = this.map[row][col];
                if(tile === 1){
                    //# -> private method
                    this.#drawWall(ctx, col, row, this.tileSize);
                }
                else if (tile == 0){
                    this.#drawDot(ctx, col, row, this.tileSize);
                }
            }
        }

    }

    #drawWall(ctx, column, row, size){

        ctx.drawImage(this.wall, 
            column * this.tileSize, 
            row * this.tileSize,
            size,
            size);

    }

    #drawDot(ctx, column, row, size){
        ctx.drawImage(this.yellowDot, 
            column* this.tileSize, 
            row* this.tileSize, 
            size, 
            size)
    }


    getPacman(velocity){
        for( let row=0; row< this.map.lengthl; row++){
            for(let col =0; low<this.map[row].length; col){
                let tile = this.map[row][col];
                if(tile == 4){
                    //replace this location by a dot
                    this.map[row][col] = 0;
                    //Get new PacMan object
                    return new PacMan();
                }
            }

        }
    }



    setCanvasSize(canvas){
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize;
    }


}

export default TileMap;