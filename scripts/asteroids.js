class Asteroid {    
    constructor(ctx, posX, posY, speedX, asteroidImage) {
        this.ctx = ctx
        this.asteroidPos = { x: posX, y: posY }
        this.asteroidSpeed = { x: speedX, y: 0}
        this.asteroidImage = asteroidImage

        this.init()

    }


      
    init(){
        this.imageInstance = new Image()
        // this.imageInstance.src = `./img/${this.asteroidImage}` 
        this.imageInstance.src = `./img/asteroid.jpg` 
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.asteroidPos.x - 100, this.asteroidPos.y, 50, 50)     
        this.move()
    }

    move() {
        this.asteroidPos.x -= this.asteroidSpeed.x
    }

}

/// empezamos con Obstaculos(ctx, 1000, RANDOM, RANDOM, 0, FALSE, TRUE, ...)
// Subclases para asteroido, nave, nuestroTiro... ???