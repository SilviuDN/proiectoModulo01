class Player{
    constructor(ctx, carPosX = 0, carPosY,carWidth, carHeight, carImg, shipAmo = 0){
      this.ctx = ctx,
      this.shipPos = { x: carPosX, y: carPosY},
      this.shipSize = { w: carWidth, h: carHeight},
      this.shipImage = carImg,
      this.shipAmo = shipAmo
      this.imageInstance = undefined
  
      this.init()   
  
    }

}

// eventListeners:
// las flechas
// SPACE (disparar)
// x (disparar bombas)