class LivesBarrell extends SuperClass{    

    constructor(ctx, gameW, gameH, posX, posY, sizeW, sizeH, img, speedX, speedY){
        super(ctx, gameW, gameH, posX, posY, sizeW, sizeH, img, speedX, speedY)    
        this.init()
    }


      
    init(){
        this.imageInstance = new Image()
        this.imageInstance.src = `./img/extraLife.png` 
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.pos.x, this.pos.y, this.size.w, this.size.h)     
        this.move()
    }

    move() {
        this.pos.x -= this.speed.x
    }

}
