class Asteroid {    
    constructor(ctx, posX, posY, speedX, asteroidImage) {
        this.ctx = ctx
        this.pos = { x: posX, y: posY }
        this.size = {w: 50, h: 50}
        this.speed = { x: speedX, y: 0}
        this.asteroidImage = asteroidImage

        this.init()

    }


      
    init(){
        this.imageInstance = new Image()
        // this.imageInstance.src = `./img/${this.asteroidImage}` 
        this.imageInstance.src = "img/image 21.png"
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.pos.x, this.pos.y, this.size.w, this.size.h)     
        this.move()
    }

    move() {
        this.pos.x -= this.speed.x
    }

}

/// empezamos con Obstaculos(ctx, 1000, RANDOM, RANDOM, 0, FALSE, TRUE, ...)
// Subclases para asteroido, nave, nuestroTiro... ???