class Enemy {
  
    constructor(ctx, gameW, gameH,  enemyPosY, enemyImg, speed = -5){
        this.ctx = ctx,
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
      }
  
  
    //   shot(){
    //     const shot = new Shots(this.ctx, this.pos.x, this.pos.y, this.size.w, this.size.h)
    //     this.shots.push( shot )
    //   }
  

    
    
    
    
    }