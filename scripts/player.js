class Player {
  
  constructor(ctx, gameW, gameH, playerPosX = 0, playerPosY, playerWidth, playerHeight, playerImg, keys, speed = 25){
      this.ctx = ctx,
      this.gameW = gameW,
      this.gameH = gameH,
      this.pos = { x: playerPosX, y: playerPosY},
      this.size = { w: playerWidth, h: playerHeight},
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
      this.inertialMove()
      this.ctx.drawImage(this.imageInstance, this.pos.x, this.pos.y, this.size.w, this.size.h)
      this.shots.forEach(shot => shot.draw())
      this.clearShots()
    }

    inertialMove(){
      if(this.pos.x > 0){
        this.pos.x -= 1
      }
    }

    clearShots(){
      // this.shots = this.shots.filter(shot => {
      //   return ( shot.pos.x < this.gameW )
      // }) 
    }

  
    moveUp() {
      if(this.pos.y > 0){
        this.pos.y -= 25
      }
    }

    moveDown() {
      if(this.pos.y < this.gameH - this.size.h){
        this.pos.y += 25
      }
    }

    moveRight() {
      if(this.pos.x < this.gameW - this.size.w){
        this.pos.x += 25
      }
    }

    moveLeft() {
      if(this.pos.x > 0){
        this.pos.x -= 25
      }
    }

    shot(){
      const shot = new Shots(this.ctx, this.pos.x, this.pos.y, this.size.w, this.size.h)
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