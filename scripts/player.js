class Player extends SuperClass{
  
  // constructor(ctx, gameW, gameH, gravity, playerPosX = 0, playerPosY, playerWidth, playerHeight, playerImg, keys, speed = 25){
  constructor(ctx, gameW, gameH, posX, posY, sizeW, sizeH, img, speedX, speedY, gravity, keys){
    super(ctx, gameW, gameH, posX, posY, sizeW, sizeH, img, speedX, speedY)
      
      this.gravity = gravity,
      this.keys = keys,
      this.repeatedShots = 15,
      this.shots = [],
      this.pressedKeys = [],
      // this.weapon = ''//BASS, ACUSTICA, LA_OTRA

      // this.speed ={x: 15, y: 15}

      this.hasBomb = true,
        
      this.init()     
      this.setListeners()
    }
  
    init(){
        this.imageInstance = new Image()
        this.imageInstance.src = `./img/${this.image}` 
    }
  
    draw(){
      this.inertialMove()
      this.ctx.drawImage(this.imageInstance, this.pos.x, this.pos.y, this.size.w, this.size.h)
      this.shots.forEach(shot => shot.draw())
    }

    inertialMove(){
      if(this.pos.x > 0){
        this.pos.x -= 1
      }
      if( (this.pos.y + this.size.h) < this.gameH && this.gravity == 1){
        this.pos.y += 1
      }
    }




    moveAndShoot(){

      const shot = this.pressedKeys.includes("SPACE")
      if(shot){
        const shot = new Shots(this.ctx, this.pos.x, this.pos.y, this.size.w, this.size.h, 5, 35, 0)

        if(this.shots.length < this.repeatedShots){
          // this.shots.shift()
          this.shots.push( shot )
        }
      }

      const bomb = this.pressedKeys.includes("BOMB")
      if(bomb && this.hasBomb == true){
        // for(bbbbb)
        const shot = new Shots(this.ctx, this.pos.x, this.pos.y, this.size.w, this.size.h, 5, 35, 0)

        if(this.shots.length < this.repeatedShots){
          // this.shots.shift()
          this.shots.push( shot )
        }
      }

      const up   = this.pressedKeys.includes("UP")
      if(up){
        if(this.pos.y > 0){
          this.pos.y -= this.speed.y
        }
      }

      const down   = this.pressedKeys.includes("DOWN")
      if(down){
        
        if(this.pos.y < this.gameH - this.size.h){
          this.pos.y += this.speed.y
        }
      }

      const right = this.pressedKeys.includes("RIGHT")
      if(right){
        
        if(this.pos.x < this.gameW - this.size.w){
          this.pos.x += this.speed.x
        }
      }

      const left   = this.pressedKeys.includes("LEFT")
      if(left){
        
        if(this.pos.x > 0){
          this.pos.x -= this.speed.x
        }
      }





    }


    

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
        this.moveAndShoot()
      }

      if(e.keyCode == this.keys.DOWN){
        if( !this.pressedKeys.includes("DOWN") ){
          this.pressedKeys.push('DOWN')

        }
        this.moveAndShoot();
      }

      if(e.keyCode == this.keys.RIGHT){
        if( !this.pressedKeys.includes("RIGHT") ){
          this.pressedKeys.push('RIGHT')
        }
        this.moveAndShoot();
      }

      if(e.keyCode == this.keys.LEFT){
        if( !this.pressedKeys.includes("LEFT") ){
          this.pressedKeys.push('LEFT')
        }
        this.moveAndShoot();
      }

      if(e.keyCode == this.keys.SPACE){
        if( !this.pressedKeys.includes("SPACE") ){
          this.pressedKeys.push('SPACE')
        }
        this.moveAndShoot();
      }

      if(e.keyCode == this.keys.BOMB){
        if( !this.pressedKeys.includes("BOMB") && this.hasBomb == true){
          this.pressedKeys.push('BOMB')
        }
        this.moveAndShoot();
      }


    });


    document.addEventListener("keyup", e => {

      if(e.keyCode == this.keys.UP){

        if( this.pressedKeys.includes("UP") ){
          this.removeElementFromArray("UP", this.pressedKeys)
      }
    }
    
      if(e.keyCode == this.keys.DOWN){
     
        if( this.pressedKeys.includes("DOWN") ){
          this.removeElementFromArray("DOWN", this.pressedKeys)
      }
    }
    
      if(e.keyCode == this.keys.RIGHT){
      
        if( this.pressedKeys.includes("RIGHT") ){
          this.removeElementFromArray("RIGHT", this.pressedKeys)
      }
    }
    
      if(e.keyCode == this.keys.LEFT){
       
        if( this.pressedKeys.includes("LEFT") ){
          this.removeElementFromArray("LEFT", this.pressedKeys)
      }
    }
    
      if(e.keyCode == this.keys.SPACE){
        // if( )
        if( this.pressedKeys.includes("SPACE") ){
          this.removeElementFromArray("SPACE", this.pressedKeys)
      }
    }
    
      if(e.keyCode == this.keys.BOMB){
        // if( )
        if( this.pressedKeys.includes("BOMB") ){
          this.removeElementFromArray("BOMB", this.pressedKeys)
      }
    }



    });







  }
  
  
  
  
  }