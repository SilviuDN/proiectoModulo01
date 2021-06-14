const Game = {
    title: 'Space Adventure',
    projectManager: 'Paula, Theo, German',
    authors: 'Kike, Silviu',
    license: undefined,
    version: '1.0.0',
    desciption: 'Shooter App with gravity and everything',
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    FPS: 10,
    framesCounter: 0,
    score : 0,
    lives : 3,
    gravity : 0,
  
    background: undefined,
    player: undefined,
    asteroids: [],
    enemies: [],
  
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
      // this.width = window.innerWidth
      // this.height = window.innerHeight
      this.width = 4000
      this.height = 2000
      this.canvas.width = this.width
      this.canvas.height = this.height
    },
  
    start() {

        this.reset()
    
        this.interval = setInterval(() => {        
          this.clear()  
          this.hasGravity()  
          this.createAsteroids()
          this.explodeAsteroid()
          this.createEnemies()
          this.explodeEnemy()
          this.isShipImpact()
          this.isShipImpactConEnemyShip()
          if(this.lives > 0){
            this.drawAll()
          }          
          this.framesCounter ++
          this.framesCounter %= 10000
      }, this.FPS)

    },

    hasGravity(){
      if( this.background.passedScreens == 0){
        this.gravity = 1
      }else{
        this.gravity = 0
      }
      this.player.gravity = this.gravity
    },

    createAsteroids(){  
      if( this.framesCounter % 200 == 0){
        // condition that asteroids don't enter in out of range area
        const posStartY = this.player.size.h / 2 + Math.random() * (this.height - this.player.size.h)
        const asteroid = new Asteroid(this.ctx, this.width, posStartY, 5, 'asteroid')
        this.asteroids.push(asteroid)                
      }

    },

    createEnemies(){
      // const randomDistance = 50 + Math.floor(Math.random() * 300)
      if( this.framesCounter % 400 == 50){
        const posStartY = this.player.size.h / 2 + Math.random() * (this.height - this.player.size.h)              
                                                         
        const enemy = new Enemy(this.ctx, this.framesCounter, this.player, this.width, this.height, posStartY, 'ship.jpg')
        this.enemies.push(enemy) 
        // console.log(enemy.pos.x)
        // console.log(this.enemies.length)
      }
    },


    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.asteroids = this.asteroids.filter( asteroid => asteroid.pos.x > -5)
        this.enemies = this.enemies.filter( enemy => enemy.pos.x > -5)
        
        this.player.shots = this.player.shots.filter(shot =>  shot.pos.x < this.width ) 

      },
    

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

  
  explodeEnemy(){
    this.enemies = this.enemies.filter( enemy => {
      if(this.player.shots.length == 0){
        return true
      }
      return !this.player.shots.some( shot => {
        const isImpact = this.isImpact(shot, enemy)  
        if( isImpact ){
          this.score += 2
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

  isShipImpactConEnemyShip(){
    // const isShipImpact = this.asteroids.some( asteroid => this.isImpact(this.player, asteroid))
    const isShipImpact = this.enemies.some( enemy => {
      const isImpact = this.isImpact(this.player, enemy)
      if(isImpact){
        this.removeElementFromArray(enemy, this.enemies)
        this.lives -= 2 //cambiar vidas mas adelante
        if(this.lives <= 0){
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
    this.enemies.forEach(enemy => {
      enemy.draw()
    }) 
  },
      
  reset() {
      this.background = new Background(this.ctx, this.width, this.height, "./img/bg.png")
      this.player = new Player(this.ctx, this.width, this.height, this.gravity, 50, 300, 150, 150, "ship.jpg", this.keys)

      this.obstacles = []
      this.enemies =[]
  },



  // isImpact(o1, o2){
  //   if( ( (o1.pos.x + o1.size.w) < o2.pos.x ) || ( (o2.pos.x + o2.size.w) < o1.pos.x ) || ( (o1.pos.y + o1.size.h) < o2.pos.y ) || ( (o2.pos.y + o2.size.h) <  o1.pos.y ) ){
  //     return false
  //   }else{
  //     return true
  //   }
  // }

     
  isImpact(object1, object2){
    return (

      (object1.pos.x ) >= object2.pos.x && 
      ( 
        // (object1.posY > object2.pos.y && object1.posY < (object2.pos.y + 50))
        (object1.pos.y > object2.pos.y && object1.pos.y < (object2.pos.y + object2.size.h) ) ||
        (object1.pos.y + object1.size.h > object2.pos.y && (object1.pos.y + object1.size.h) < (object2.pos.y + object2.size.h) ) 
        || ( (object1.pos.y < object2.pos.y && (object1.pos.y + object1.size.h) > object2.pos.y) ) 
        || ( ( object1.pos.y > object2.pos.y ) && ( object1.pos.y + object1.size.h < object2.pos.y + object2.size.h ) )       
      )
      )
  }

}