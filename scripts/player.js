class Player {


  constructor(ctx, gameW, gameH, playerPosX = 0, playerPosY, playerWidth, playerHeight, playerImg, keys, speed = 25){
      this.ctx = ctx,
      this.gameW = gameW,
      this.gameH = gameH,
      this.playerPos = { x: playerPosX, y: playerPosY},
      this.playerSize = { w: playerWidth, h: playerHeight},
      this.playerImage = playerImg,
      this.keys = keys,
      this.speed =speed,
      this.shots = [],
        
      this.init()     
      this.setListeners()
    }
  
    init(){
        this.imageInstance = new Image()
        this.imageInstance.src = `./img/${this.playerImage}` 
    }
  
    draw(){
      this.ctx.drawImage(this.imageInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
      this.shots.forEach(shot => shot.draw())
      this.clearShots()
    }

    clearShots(){
      this.shots = this.shots.filter(shot => shot.posX < this.gameW )
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

    moveRight() {
      if(this.playerPos.x < this.gameW - this.playerSize.w){
        this.playerPos.x += 25
      }
    }

    moveLeft() {
      if(this.playerPos.x > 0){
        this.playerPos.x -= 25
      }
    }

    shot(){
      const shot = new Shots(this.ctx, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
      this.shots.push( shot )
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
        case this.keys.RIGHT:
          this.moveRight();
          break;
        case this.keys.LEFT:
          this.moveLeft();
          break;
        case this.keys.SPACE:
          this.shot();
          break;
      }
    });
  }
  
  
  
  
  }