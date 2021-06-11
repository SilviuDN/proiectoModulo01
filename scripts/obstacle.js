class Obstacle {    
    constructor(ctx, posX, posY, width, speedX, speedY, isShip = false, isEnemy = true, canvasSize) {
        this.ctx = ctx
        this.obstaclePos = { x: SCREEN_WIDTH, y: posY = RANDOM }
        this.obstacleSize = { w: width, h: 10 } ///PODRIA SER RANDOM
        this.obstacleSpeed = { x: speedX, y: speedY}
        this.isShip= isShip
        this.isEnemy= isEnemy //si es inamigo destruye nuestra nave al impacto

        this.canvasSize = canvasSize

    }



    draw() {
        
    }

    move() {
    }

}

/// empezamos con Obstaculos(ctx, 1000, RANDOM, RANDOM, 0, FALSE, TRUE, ...)
// Subclases para asteroido, nave, nuestroTiro... ???