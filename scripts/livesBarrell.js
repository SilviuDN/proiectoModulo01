class LivesBarrell {    
    constructor(ctx, posX, posY, speedX, asteroidImage) {
        this.ctx = ctx
        this.pos = { x: posX, y: posY }
        this.size = {w: 100, h: 100}
        this.speed = { x: speedX, y: 0}
        this.asteroidImage = asteroidImage

        this.init()

    }


      
    init(){
        this.imageInstance = new Image()
        this.imageInstance.src = `./img/asteroid.jpg` 
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.pos.x, this.pos.y, this.size.w, this.size.h)     
        this.move()
    }

    move() {
        this.pos.x -= this.speed.x
    }

}
