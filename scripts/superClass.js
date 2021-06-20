class SuperClass{
    constructor(ctx, gameW, gameH, posX, posY, sizeW, sizeH, img, speedX, speedY){
        this.ctx = ctx,
        this.gameW = gameW,
        this.gameH = gameH,
        this.pos = { x: posX, y: posY},
        this.size = { w: sizeW, h: sizeH},
        this.image = img,
        this.speed ={x: speedX, y: speedY}
    }
}