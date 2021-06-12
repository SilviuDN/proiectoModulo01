class Shots {

    constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight) {
      this.ctx = ctx;
      this.posX = playerPosX + playerWidth;
      this.posY = playerPosY + playerHeight / 2;
      this.playerHeight = playerHeight;
  
      this.radius = 5;
  
      this.velX = 25 + 10;
    }
  
    draw() {
      this.ctx.beginPath();
      this.ctx.fillStyle = "black";
      this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.closePath();
      this.move()
    }
  
    move() {
      this.posX += this.velX;
    }
  }