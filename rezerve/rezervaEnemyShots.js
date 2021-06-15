class EnemyShots {

    constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight) {
      this.ctx = ctx;

      // this.posX = playerPosX + playerWidth;
      // this.posY = playerPosY + playerHeight / 2;

      this.pos = { x: playerPosX, y: playerPosY + playerHeight / 2},
      this.size = { w: 2* this.radius, h: 2* this.radius},
      // this.playerHeight = playerHeight;
  
      this.radius = 5;
  
      this.velX =  10;
    }
  
    draw() {
      this.ctx.beginPath();
      this.ctx.fillStyle = "white";
      // this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
      this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);

      this.ctx.fill();
      this.ctx.closePath();
      this.move()
    }
  
    move() {
      this.pos.x -= this.velX;

    }
  }