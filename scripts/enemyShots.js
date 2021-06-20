class EnemyShots extends SuperShots{


      constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight, radius = 5, speedX, speedY = 0) {
        super(ctx, playerPosX, playerPosY, playerWidth, playerHeight, radius, speedX, speedY )  
        this.pos.x = playerPosX
        this.speed.x = -10;
      }

    }

