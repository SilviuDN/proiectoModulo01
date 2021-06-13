const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    FPS: 10,
    framesCounter: 0,
    score : 0,
    lives : 3,
  
    background: undefined,
    player: undefined,
    asteroids: [],
  
    keys: {
      UP: 38,
      DOWN: 40,
      LEFT: 37,
      RIGHT: 39,
      SPACE: 32,
      PAUSE: 80, //P
      BOMBA: 66 //B        
    },
  
    init() {
      this.setContext()
      this.setDimensions()
      this.start()
    },

    setContext(){
      this.canvas = document.getElementById("mySpaceCanvas")
      this.ctx = this.canvas.getContext("2d")

    },
  
    setDimensions() {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.canvas.width = this.width
      this.canvas.height = this.height
    },
  
    start() {

        this.reset()
    
        this.interval = setInterval(() => {        
          this.clear()    
          this.createAsteroids()
          this.explodeAsteroid()
          this.isShipImpact()
          if(this.lives){
            this.drawAll()
          }          
          this.framesCounter ++
          this.framesCounter %= 5000
      }, this.FPS)

    },

    createAsteroids(){  
      if( this.framesCounter % 200 == 0){
        // const posStartY = Math.random() * (this.height - 50)
        // condition that asteroids don't enter in out of range area
        const posStartY = this.player.size.h / 2 + Math.random() * (this.height - this.player.size.h)
        const asteroid = new Asteroid(this.ctx, this.width, posStartY, 5, 'asteroid')
        this.asteroids.push(asteroid)                
      }

    },


    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.asteroids = this.asteroids.filter( asteroid => asteroid.pos.x > -5)
        this.player.shots = this.player.shots.filter(shot =>  shot.pos.x < this.width ) 

      },
    

    //   explodeAsteroid(){
    //     this.asteroids = this.asteroids.filter( asteroid => {
    //       if(this.player.shots.length == 0){
    //         return true
    //       }
    //       return !this.player.shots.some( shot => {
    //         return (
    //           shot.pos.x > asteroid.pos.x && 
    //           ( 
    //             // (shot.posY > asteroid.pos.y && shot.posY < (asteroid.pos.y + 50))
    //             (shot.pos.y > asteroid.pos.y && shot.pos.y < (asteroid.pos.y + asteroid.size.h) ) ||
    //             (shot.pos.y + shot.size.h > asteroid.pos.y && (shot.pos.y + shot.size.h) < (asteroid.pos.y + asteroid.size.h) )
                
    //           )
    //           )
         
    //         })      
        
    //     })
    // },


  explodeAsteroid(){
    this.asteroids = this.asteroids.filter( asteroid => {
      if(this.player.shots.length == 0){
        return true
      }
      return !this.player.shots.some( shot => {
        const isImpact = this.isImpact(shot, asteroid)  
        if( isImpact ){
          this.score += 1
          this.removeElementFromArray(shot, this.player.shots)
        }                   
        return isImpact              
        })              
    })
  },

  removeElementFromArray(el, arr){
    const index = arr.indexOf(el)
    if( index > -1){
      arr.splice(index, 1)
    }
  },

  isShipImpact(){
    // const isShipImpact = this.asteroids.some( asteroid => this.isImpact(this.player, asteroid))
    const isShipImpact = this.asteroids.some( asteroid => {
      const isImpact = this.isImpact(this.player, asteroid)
      if(isImpact){
        this.removeElementFromArray(asteroid, this.asteroids)
        this.lives--
        if(this.lives == 0){
          this.isGameOver()
        }
      }      
      return isImpact
    })
  },
   

  isGameOver(){
    console.log('You loose! :)')
    this.background.draw()
    clearInterval(this.interval)
    this.myFillRect(this.width/4, this.height/4, this.width/2, this.height/2,'green')
    this.ctx.fillStyle = "orange"
    this.ctx.font = "150px Arial"
    this.ctx.fillText(`Congrats! You won ${this.score} points!`, this.width/4, this.height/2, this.width/2)

  },

  myFillRect(x, y, w, h, color){
    this.ctx.fillStyle = color
    this.ctx.fillRect(x, y, w, h)    
  },

  drawAll() {
    this.background.draw()
    this.player.draw()
    this.explodeAsteroid()
    this.asteroids.forEach(asteroid => {
      asteroid.draw()
    });
  },
      
  reset() {
      this.background = new Background(this.ctx, this.width, this.height, "./img/bg.png")
      this.player = new Player(this.ctx, this.width, this.height, 50, 300, 150, 150, "ship.jpg", this.keys)

      this.obstacles = []
  },

  isImpact(object1, object2){
    return (
      (object1.pos.x ) >= object2.pos.x && 
      ( 
        // (object1.posY > object2.pos.y && object1.posY < (object2.pos.y + 50))
        (object1.pos.y > object2.pos.y && object1.pos.y < (object2.pos.y + object2.size.h) ) ||
        (object1.pos.y + object1.size.h > object2.pos.y && (object1.pos.y + object1.size.h) < (object2.pos.y + object2.size.h) ) 
        || ( (object1.pos.y < object2.pos.y && (object1.pos.y + object1.size.h) > object2.pos.y) )        
      )
      )
  }

}