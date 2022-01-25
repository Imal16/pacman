import TileMap from "./TileMap.js";
import MovingDirection from "./Movement.js";



class PacMan{
    constructor(x, y, tilesize, velocity, tilemap){
        this.x = x;
        this.y = y;
        this.tilesize = tilesize;
        this.velocity = velocity;
        this.tilemap = tilemap;

        this.currentDirection = null;
        this.requestedDirection = null;

        this.animationTimerDefault = 10;
        this.animationTimer = null;


        document.addEventListener("keydown", this.#keydown);



        this.#loadPacmanImages();
    }

    draw(ctx){

        this.#move();
        this.#animation();

        ctx.drawImage(this.pacmanImages[this.pacmanImageIndex], this.x, this.y,this.tilesize, this.tilesize);

    }

    #loadPacmanImages(){

        const pacmanImage1  = new Image();
        pacmanImage1.src = "../../assets/images/pac0.png"

        const pacmanImage2  = new Image();
        pacmanImage2.src = "../../assets/images/pac1.png";

        const pacmanImage3  = new Image();
        pacmanImage3.src = "../../assets/images/pac2.png";

        this.pacmanImages = [
            pacmanImage1,
            pacmanImage2,
            pacmanImage3,
            pacmanImage2
        ];


        this.pacmanImageIndex = 0;

    }

    #keydown =(event) =>{
        //up arrow
        if(event.keyCode == 38){
            if(this.currentDirection == MovingDirection.down){
                this.currentDirection = MovingDirection.up;
            }
            this.requestedDirection = MovingDirection.up;
        }
        // down arrow
        if(event.keyCode == 40){
            if(this.currentDirection == MovingDirection.up){
                this.currentDirection = MovingDirection.down;
            }
            this.requestedDirection = MovingDirection.down;


        }
        //left arrow
        if(event.keyCode == 37){
            if(this.currentDirection == MovingDirection.right){
                this.currentDirection = MovingDirection.left;
            }
            this.requestedDirection = MovingDirection.left;
        }
        //right arrow        
        if(event.keyCode == 39){
            if(this.currentDirection == MovingDirection.left){
                this.currentDirection = MovingDirection.right;
            }
            this.requestedDirection = MovingDirection.right;
        }
    };


    #move(){
        if(this.currentDirection != this.requestedDirection){
            // Check if Movement is within a 32 pixel square (size of each tile) so we check if the position is an even number divisable by 32
            if( Number.isInteger(this.x / this.tilesize) && Number.isInteger (this.y / this.tilesize)){

                //check for collision, if not collide, change requested dir.
                if( !this.tilemap.didCollideEnv(this.x, this.y, this.requestedDirection)){

                }
                this.currentDirection = this.requestedDirection;
            }
        }

        //collision check on current moving path
        if(this.tilemap.didCollideEnv(this.x, this.y, this.currentDirection)){
            //stop animation if collided with wall
            this.animationTimer = null;
            this.pacmanImageIndex = 1;
            return;
        }
        else if(this.currentDirection != null && this.animationTimer == null){
            this.animationTimer = this.animationTimerDefault;
        }

        switch(this.currentDirection){

            case MovingDirection.up:
            // (0,0) is top left of map
            this.y -= this.velocity;
            break; 

            case MovingDirection.down:
            this.y += this.velocity;
            break;

            case MovingDirection.left:
            this.x -= this.velocity;
            break; 

            case MovingDirection.right:
            this.x += this.velocity;
            break; 
        }
    }

    #animation(){
        if(this.animationTimer == null){
            return;
        }
        this.animationTimer--;
        if(this.animationTimer ==0){
            // Once timer finishes, reset timer and change image by incrementing index pointing to image arrya
            this.animationTimer = this.animationTimerDefault;
            this.pacmanImageIndex++;
            // reset index so it loops
            if(this.pacmanImageIndex == this.pacmanImages.length){
                this.pacmanImageIndex = 0;
            }
        }
    }






}


export default PacMan