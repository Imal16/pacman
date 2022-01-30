import MovingDirection from "./Movement.js";

// Ideas for ghost movement, default = random. Level 1 = if seen pacman move towards it. Level 2 level 1 + communication with all other ghosts.


export default class Ghost{
    constructor(x, y, tilesize, velocity, map) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.tilesize = tilesize;
        this.tileMap = map;

        this.#loadImages();

        this.moveDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);

        this.directionTimerDefault = this.#random(1, 5);
        this.directionTimer = this.directionTimerDefault;

        this.scaredTimerDefault = 10;
        this.scaredTimer = this.scaredTimerDefault;

    }

    draw(ctx, pause, pacman){
        if(!pause){
            this.#move();
            this.#changeDirection();
        }
        this.#setImage(ctx, pacman);

        ctx.drawImage(this.image, this.x, this.y, this.tilesize, this.tilesize);

    }

    collide(pacman){
        // Example on Mozilla developer page for 2D collision detection
        const size = this.tilesize / 2; // Pacman is halway above an ghost
        if(this.x < pacman.x + size &&
            this.x + size > pacman.x &&
            this.y < pacman.y + size &&
            this.y + size > pacman.y
            ){
                return true;
        }
        else{
            return false;
        }

    }


    #setImage(ctx, pacman){
        if(pacman.powerDotActive){
            this.#setScaredImage(pacman);
        }
        else{
            this.image = this.normalGhost;
        }
        ctx.drawImage(this.image, this.x, this.y, this.tilesize, this.tilesize);
    }


    #setScaredImage(pacman){
        if (pacman.powerDotExpire){
            this.scaredTimer--;
            if(this.scaredTimer === 0){
                this.scaredTimer = this.scaredTimerDefault;
                // Flash image of ghosts by alternating between images
                if(this.image === this.scaredGhost1){
                    this.image = this.scaredGhost2;
                } else{
                    this.image = this.scaredGhost1;
                }
            }
        }
        else{
            this.image = this.scaredGhost1;
        }
    }






    #move(){
        
        if(!this.tileMap.didCollideEnv(this.x, this.y, this.moveDirection)){
            
            switch (this.moveDirection) {
                case MovingDirection.up:
                    this.y -=  this.velocity;
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
    }

    #changeDirection(){

        this.directionTimer--;
        let newMoveDirection = null;

        if (this.directionTimer == 0) {

          this.directionTimer = this.directionTimerDefault;
          newMoveDirection = Math.floor(
            Math.random() * Object.keys(MovingDirection).length
            );
        }
        
        //check if new direction is not the same as odl
        if (newMoveDirection != null && this.moveDirection != newMoveDirection) {

            // check if ghost is on a full square
          if (Number.isInteger(this.x / this.tilesize) && Number.isInteger(this.y / this.tilesize)) {
            
            // if ghost did not collide with wall, this helps prevent a ghost constantly running into the wall
            if (!this.tileMap.didCollideEnv(this.x, this.y, newMoveDirection)) {
              this.moveDirection = newMoveDirection;
            }
          }
        }
    }

    #random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    #loadImages(){
        this.normalGhost = new Image();
        this.normalGhost.src = "../../assets/images/ghost.png";

        this.scaredGhost1 = new Image();
        this.scaredGhost1.src = "../../assets/images/scaredGhost.png";

        this.scaredGhost2 = new Image();
        this.scaredGhost2.src = "../../assets/images/scaredGhost2.png";

        this.image = this.normalGhost;

    }


}