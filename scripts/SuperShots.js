class SuperShots {

    constructor(ctx, playerPosX, playerPosY, playerWidth, playerHeight, radius = 5, speedX, speedY = 0) {
      this.ctx = ctx;

      this.pos = { x: playerPosX + playerWidth, y: playerPosY + playerHeight / 2};
      this.size = { w: 2* this.radius, h: 2* this.radius};
  
      this.radius = radius;
  
      this.speed = { x: speedX, y: speedY} //35
    }
  
    draw() {
      this.ctx.beginPath();
      this.ctx.fillStyle = "white";
      this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);

      this.ctx.fill();
      this.ctx.closePath();
      this.move()
    }
  
    move() {
      this.pos.x += this.speed.x;

    }
  }