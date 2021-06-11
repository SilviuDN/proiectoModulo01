class Player {


  constructor(ctx, gameW, gameH, playerPosX = 0, playerPosY, playerWidth, playerHeight, playerImg){
      this.ctx = ctx,
      this.gameW = gameW,
      this.gameH = gameH,
      this.shipPos = { x: playerPosX, y: playerPosY},
      this.shipSize = { w: playerWidth, h: playerHeight},
      this.shipImage = playerImg,
      
  
      this.init()   
  
    }
  
    init(){
        this.imageInstance = new Image()
        // this.imageInstance.src = `./img/${this.playerImg}` 
        this.imageInstance.src = "./img/player.png"
        

    }
  
    draw(){
      this.ctx.drawImage(this.imageInstance, this.shipPos.x, this.shipPos.y, this.shipSize.w, this.shipSize.h)
    }
  
    moveUp() {
      if(this.shipPos.y > 0){
        this.shipPos.y -= 25
      }
    }

    moveDown() {
      if(this.shipPos.y < gameH){
        this.shipPos.y += 25
      }
        
    }
  
  
  
  
  }