class StealthEnemy extends SuperClass{
  

    constructor(ctx, gameW, gameH, posX, posY, sizeW, sizeH, img, speedX, speedY, frameCounter, player){
      super(ctx, gameW, gameH, posX, posY, sizeW, sizeH, img, speedX, speedY)   
        
        // this.frameCounter = frameCounter,
        // this.player = player,
        this.shots = []
        // this.repeatedShots = 1,
          
        // this.init()     
      }
    
    //   init(){
    //       this.imageInstance = new Image()
    //     //   this.imageInstance.src = `./img/${this.enemyImage}` 
    //       this.imageInstance.src = `./img/enemy.png` 
    //   }
    
      
    enemyFires(){
    //   const shot = new EnemyShots(this.ctx, this.pos.x, this.pos.y, this.size.w, this.size.h, 5, -10, 0)
    //   const shootProbability = Math.random()

    //   if( shootProbability < 0.03){
    //     if(this.shots.length < this.repeatedShots){
    //       // this.shots.shift()
    //       this.shots.push( shot )
    //     }
    //   }
    }


      draw(){      
        // this.move()
        // this.ctx.drawImage(this.imageInstance, this.pos.x, this.pos.y, this.size.w, this.size.h) 
        this.shots.forEach(shot => shot.draw()) 

        
        
        // this.shots.forEach(shot => shot.draw())
        // this.clearShots()
      }

    //   move(){
    //     this.pos.x += this.speed.x
    //     this.folowThePlayer()
    //     this.pos.y += this.speed.y
    //   }

    //   folowThePlayer(){
    //     const enemyCenter = (this.pos.y + this.size.h/2)
    //     // const playerCenter = (this.player.pos.y + this.player.pos.h/2)
    //     // const centerToCenterGap = enemyCenter - playerCenter
    //     if(  Math.random() < 0.03  ){
    //     // if( this.frameCounter % 9000 && Math.random() < 0.03){
    //       if( enemyCenter < this.player.pos.y){
    //         this.speed.y = 10
    //       }else if( enemyCenter > (this.player.pos.y + this.player.size.h) ){
    //         this.speed.y = -10
    //       }
    //     }

    //   }
  
  

    
    
    
    
    }