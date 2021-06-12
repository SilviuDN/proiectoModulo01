const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    FPS: 10,
    framesCounter: 0,
  
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
          this.drawAll()
          this.framesCounter ++
      }, this.FPS)

    },

    createAsteroids(){  
      if( this.framesCounter % 200 == 0){
        const posStartY = Math.random() * (this.height - 50)
        const asteroid = new Asteroid(this.ctx, this.width, posStartY, 5, 'asteroid')
        this.asteroids.push(asteroid)        
      }
    },


    clear() {
        // this.ctx.clearRect(0, 0, this.width, this.height, this.keys)
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.explodeAsteroid()
        this.asteroids = this.asteroids.filter( asteroid => asteroid.asteroidPos.x > 0)
      },
    

      // explodeAsteroid(){
      //   this.asteroids = this.asteroids.filter( asteroid => {
      //     this.player.shots.some( shot => {
      //       console.log(shot.posX > asteroid.asteroidPos.x)
      //       if( shot.posX > asteroid.asteroidPos.x ){
      //         return true
      //       }
      //     })
      //   })
      // },
      explodeAsteroid(){
        this.asteroids = this.asteroids.filter( asteroid => {
          if( asteroid.x < 300){
            return false
          }
          return true
        })
      },
      // explodeAsteroid(){
      //   this.asteroids = this.asteroids.filter( asteroid => {
      //     !this.player.shots.some( shot => {
      //       return shot.posX > asteroid.asteroidPos.x
      //     })
      //   })
      // },

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
    }

}