class Background {

    constructor(ctx, w, h, imgSource) {
      this.ctx = ctx;
      this.width = w;
      this.height = h;
  
      this.image = new Image();
      this.image.src = imgSource;
  
      this.posX = 0;
      this.posY = 0;
  
      this.velX = 1;
      this.passedScreens = 0;
    }
  
    draw() {
      this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
      this.ctx.drawImage(this.image, this.posX + this.width, this.posY, this.width, this.height);
      this.move()
    }
  
    move() {
      if (this.posX <= -this.width) {
        this.posX = 0;
        this.passedScreens ++
        if( this.passedScreens % 2 == 0){
          Game.increaseLevel();
        }
      }
      this.posX -= this.velX;
    }

  }
  