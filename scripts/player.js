class Player {
  
  constructor(ctx, gameW, gameH, gravity, playerPosX = 0, playerPosY, playerWidth, playerHeight, playerImg, keys, speed = 25){
      this.ctx = ctx,
      this.gameW = gameW,
      this.gameH = gameH,
      this.gravity = gravity,
      this.pos = { x: playerPosX, y: playerPosY},
      this.size = { w: playerWidth, h: playerHeight},
      this.playerImage = playerImg,
      this.keys = keys,
      this.speed =speed,
      this.repeatedShots = 15,
      this.shots = [],
      this.pressedKeys = [],
        
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
      if( (this.pos.y + this.size.h) < this.gameH && this.gravity == 1){
        this.pos.y += 1
      }
    }

    clearShots(){
      // this.shots = this.shots.filter(shot => {
      //   return ( shot.pos.x < this.gameW )
      // }) 
    }

  
    // moveUp() {      
    //   const up   = this.pressedKeys.includes("UP")
    //   if(up){
    //     if(this.pos.y > 0){
    //       this.pos.y -= 25
    //     }
    //   }

    // }

    moveUp() {
      if(this.pos.y > 0){
        this.pos.y -= 25
      }
      const up = this.pressedKeys.includes("UP")
      if(up){
        if(this.pos.y > 0){
          this.pos.y -= 25
        }
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

      if(this.shots.length < this.repeatedShots){
        // this.shots.shift()
        this.shots.push( shot )
      }
      // this.shots.push( shot )

      const up   = this.pressedKeys.includes("UP")
      if(up){
        if(this.pos.y > 0){
          this.pos.y -= 25
        }
      }

      const down   = this.pressedKeys.includes("DOWN")
      if(down){
        
        if(this.pos.y < this.gameH - this.size.h){
          this.pos.y += 25
        }
      }




    }

    
  // removeElementFromArray(el, arr){
  //   const index = arr.indexOf(el)
  //   if( index > -1){
  //     arr.splice(index, 1)
  //   }
  // }

  removeElementFromArray(el, arr){
    const index = arr.indexOf(el)
    if( index > -1){
      arr.splice(index, 1)
    }
  }

    
  setListeners() {

    document.addEventListener("keydown", e => {
      
      if(e.keyCode == this.keys.UP){
        if( !this.pressedKeys.includes("UP") ){
          this.pressedKeys.push('UP')

        }
        this.moveUp()
      }

      if(e.keyCode == this.keys.DOWN){
        if( !this.pressedKeys.includes("DOWN") ){
          this.pressedKeys.push('DOWN')

        }
        this.moveDown();
      }

      switch (e.keyCode) {
        // case this.keys.UP:
        //   this.moveUp()
        //   break;
        // case this.keys.DOWN:
        //   this.moveDown();
        //   break;
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


    document.addEventListener("keyup", e => {

      if(e.keyCode == this.keys.UP){
        // if( )
        if( this.pressedKeys.includes("UP") ){
          this.removeElementFromArray("UP", this.pressedKeys)
      }
    }
    
      if(e.keyCode == this.keys.DOWN){
        // if( )
        if( this.pressedKeys.includes("DOWN") ){
          this.removeElementFromArray("DOWN", this.pressedKeys)
      }
    }



    });







  }
  
  
  
  
  }