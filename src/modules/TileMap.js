import PacMan from "./PacMan.js"
import MovingDirection from "./Movement.js";


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
      [1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
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
        for( let row=0; row< this.map.length; row++){
            for(let col=0; col < this.map[row].length; col++){
                let tile = this.map[row][col];
                if(tile == 4){
                    //replace this location by a dot
                    this.map[row][col] = 0;
                    //Get new PacMan object
                    return new PacMan(col * this.tileSize, row * this.tileSize, this.tileSize, velocity, this);
                }
            }

        }
    }

    setCanvasSize(canvas){
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize;
    }

    didCollideEnv(x, y, direction){

        // default image at startiung position
        if(direction == null){
            return;
        }


        if(Number.isInteger(x / this.tileSize) && Number.isInteger(y / this.tileSize)){
            
            let column = 0;
            let row = 0;
            let nextcolumn = 0;
            let nextrow = 0;

            switch(direction){
                case MovingDirection.right:
                    nextcolumn = x + this.tileSize;
                    column = nextcolumn / this.tileSize;
                    row = y / this.tileSize;
                    break;

                case MovingDirection.left:
                    nextcolumn = x - this.tileSize;
                    column = nextcolumn / this.tileSize;
                    row = y / this.tileSize;
                    break;
                
                case MovingDirection.up:
                    nextrow = y - this.tileSize;
                    row = nextrow / this.tileSize;
                    column = x / this.tileSize;
                    break;

                case MovingDirection.down:
                    nextrow = y + this.tileSize;
                    row = nextrow / this.tileSize;
                    column = x / this.tileSize;
                    break;
            }

            const tile = this.map[row][column];
            if (tile === 1){

                return true;
            }
        }
        return false;
    }

}

export default TileMap;