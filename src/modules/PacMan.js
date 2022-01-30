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

        this.pacmanRotation = this.Rotation.right;

        this.wakaSound = new Audio("../../assets/sounds/waka.wav");
        
        this.powerDotSound = new Audio("../../assets/sounds/power_dot.wav");
        this.powerDotActive = false;
        this.powerDotExpire = false;

        this.madeFirstMove = false;

        document.addEventListener("keydown", this.#keydown);



        this.#loadPacmanImages();
    }


    Rotation= {
        up: 0,
        down: 1,
        left: 2,
        right: 3,
    }



    draw(ctx){

        const size = this.tilesize / 2;

        // private method;
        this.#move();
        this.#animation();
        this.#eatDot();
        this.#eatPowerDot();


        ctx.save();
        ctx.translate(this.x + size, this.y + size);
        ctx.rotate((this.pacmanRotation * 90 * Math.PI) / 180);
        ctx.drawImage(this.pacmanImages[this.pacmanImageIndex], -size, -size, this.tilesize, this.tilesize);
        //restore state that was save
        ctx.restore();

        //ctx.drawImage(this.pacmanImages[this.pacmanImageIndex], this.x, this.y,this.tilesize, this.tilesize);

    }

    #loadPacmanImages(){

        const pacmanImage1  = new Image();
        pacmanImage1.src = "../../assets/images/pac0.png";

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
        this.timers = [];

    }

    #keydown =(event) =>{
        //up arrow
        if(event.keyCode == 38){
            if(this.currentDirection == MovingDirection.down){
                this.currentDirection = MovingDirection.up;
            }
            this.requestedDirection = MovingDirection.up;
            this.madeFirstMove = true;
        }
        // down arrow
        if(event.keyCode == 40){
            if(this.currentDirection == MovingDirection.up){
                this.currentDirection = MovingDirection.down;
            }
            this.requestedDirection = MovingDirection.down;
            this.madeFirstMove = true;


        }
        //left arrow
        if(event.keyCode == 37){
            if(this.currentDirection == MovingDirection.right){
                this.currentDirection = MovingDirection.left;
            }
            this.requestedDirection = MovingDirection.left;
            this.madeFirstMove = true;
        }
        //right arrow        
        if(event.keyCode == 39){
            if(this.currentDirection == MovingDirection.left){
                this.currentDirection = MovingDirection.right;
            }
            this.requestedDirection = MovingDirection.right;
            this.madeFirstMove = true;
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
                this.pacmanRotation = this.Rotation.right;
                break; 

            case MovingDirection.down:
                this.y += this.velocity;
                this.pacmanRotation = this.Rotation.down;
                break;

            case MovingDirection.left:
                this.x -= this.velocity;
                this.pacmanRotation = this.Rotation.left;
                break; 

            case MovingDirection.right:
                this.x += this.velocity;
                this.pacmanRotation = this.Rotation.up;
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

    #eatDot(){
        if(this.tilemap.eatDot(this.x, this.y) && this.madeFirstMove) {
            //If dot is eaten play a sound
            this.wakaSound.play();
        }
    }

    #eatPowerDot(){
        if(this.tilemap.eatPowerDot(this.x, this.y)) {
            // the ghost will become blue
            this.powerDotSound.play();
            this.powerDotActive = true;
            this.powerDotExpire = false;
            
            this.timers.forEach((timer) => clearTimeout(timer));
            this.timers = [];

            // Execute function once certain amount of time goes by in milliseconds
            let powerDotTimer = setTimeout( () => {
                this.powerDotActive = false;
                this.powerDotExpire = false;
            }, 1000 * 6)

            this.timers.push(powerDotTimer);

            let powerDotExpireTimer = setTimeout( () => {
                this.powerDotExpire = true;
            }, 1000 * 3);

            this.timers.push(powerDotExpireTimer);
        }
    }




}


export default PacMan