class StealthEnemy extends SuperClass{
  

    constructor(ctx, gameW, gameH, posX, posY, sizeW, sizeH, img, speedX, speedY, frameCounter, player){
      super(ctx, gameW, gameH, posX, posY, sizeW, sizeH, img, speedX, speedY)   
   
        this.shots = []
 
      }

    
      
    enemyFires(){
 
    }


      draw(){      
        this.shots.forEach(shot => shot.draw()) 
      }


    
    
    
    }