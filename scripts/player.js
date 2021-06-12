class Player {


  constructor(ctx, gameW, gameH, playerPosX = 0, playerPosY, playerWidth, playerHeight, playerImg, keys){
      this.ctx = ctx,
      this.gameW = gameW,
      this.gameH = gameH,
      this.playerPos = { x: playerPosX, y: playerPosY},
      this.playerSize = { w: playerWidth, h: playerHeight},
      this.playerImage = playerImg,
      this.keys = keys,
        
      this.init()     
      this.setListeners()
    }
  
    init(){
        this.imageInstance = new Image()
        this.imageInstance.src = `./img/${this.playerImage}` 
        

    }
  
    draw(){
      this.ctx.drawImage(this.imageInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
    }
  
    moveUp() {
      if(this.playerPos.y > 0){
        this.playerPos.y -= 25
      }
    }

    moveDown() {
      if(this.playerPos.y < this.gameH - this.playerSize.h){
        this.playerPos.y += 25
      }
        
    }

    
  setListeners() {

    document.addEventListener("keydown", e => {

      switch (e.keyCode) {
        case this.keys.UP:
          this.moveUp()
          break;
        case this.keys.DOWN:
          this.moveDown();
          break;
      }
    });
  }
  
  
  
  
  }