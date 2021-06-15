class Shots extends SuperShots{

    constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight, radius = 5, speedX, speedY = 0) {
      super(ctx, playerPosX, playerPosY, playerWidth, playerHeight, radius, speedX, speedY ) 
        this.radius = 10;
        this.speed.x = 25 + 10;
      }
  
    }