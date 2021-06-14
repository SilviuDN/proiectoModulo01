class Enemy {
  
    constructor(ctx, frameCounter, player, gameW, gameH,  enemyPosY, enemyImg, speed = -5){
        this.ctx = ctx,
        this.frameCounter = frameCounter,
        this.player = player,
        this.gameW = gameW,
        this.gameH = gameH,
        // this.pos = { x: gameW/2, y: enemyPosY},
        this.pos = { x: gameW, y: enemyPosY},
        this.size = { w: 200, h: 200},
        this.enemyImage = enemyImg,
        this.speed ={x: speed, y:0}
        this.shots = [],
          
        this.init()     
      }
    
      init(){
          this.imageInstance = new Image()
        //   this.imageInstance.src = `./img/${this.enemyImage}` 
          this.imageInstance.src = `./img/enemy.png` 
      }
    


      draw(){      
        this.move()
        this.ctx.drawImage(this.imageInstance, this.pos.x, this.pos.y, this.size.w, this.size.h)  

        // this.shots.forEach(shot => shot.draw())
        // this.clearShots()
      }

      move(){
        this.pos.x += this.speed.x
        this.folowThePlayer()
        this.pos.y += this.speed.y
      }

      folowThePlayer(){
        const enemyCenter = (this.pos.y + this.size.h/2)
        // const playerCenter = (this.player.pos.y + this.player.pos.h/2)
        // const centerToCenterGap = enemyCenter - playerCenter
        if(  Math.random() < 0.03  ){
        // if( this.frameCounter % 9000 && Math.random() < 0.03){
          if( enemyCenter < this.player.pos.y){
            this.speed.y = 10
          }else if( enemyCenter > (this.player.pos.y + this.player.size.h) ){
            this.speed.y = -10
          }
        }

      }
  
  
    //   shot(){
    //     const shot = new Shots(this.ctx, this.pos.x, this.pos.y, this.size.w, this.size.h)
    //     this.shots.push( shot )
    //   }
  

    
    
    
    
    }