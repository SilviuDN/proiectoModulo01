const Game = {
    title: 'Space Adventure',
    projectManager: 'Theo',
    honorificProjectManager: 'Paula',
    parallaxMaster: 'German',
    authors: 'Kike, Silviu',
    license: undefined,
    version: '1.0.0',
    description: 'Shooter App with gravity and everything',

    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    topScores: [{name: 'A', score: 3}, {name: 'B', score: 10}, {name: 'C', score: 1}],
    FPS: 10,
    framesCounter: 0,

    score : 0,
    lives : 5,
    hasBomb: true,
    gravity : 0,
    asteroidsFreq: 200,

  
    background: undefined,
    player: undefined,
    asteroids: [],
    enemies: [],
    // enemyShots: [],
    livesBarrell: undefined,

    //difficulty
    level: 1,
    maxLivesNumber: 50,
    tempContor: 0,

  
    keys: {
      UP: 38,
      DOWN: 40,
      LEFT: 37,
      RIGHT: 39,
      SPACE: 32,
      PAUSE: 80, //P
      BOMB: 66 //B        
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
      this.width = 0.7*window.innerWidth
      this.height = 0.7*window.innerHeight
      // this.width = 4000
      // this.height = 2000
      this.canvas.width = this.width
      this.canvas.height = this.height
    },
  
    start() {

        this.reset()
    

        this.interval = setInterval(() => {   
          refreshData()     
          this.clear()  
          this.hasGravity()  
          this.createAsteroids()
          this.explodeAsteroid()
          this.createEnemies()
          this.enemyFires()
          this.explodeEnemy()
          this.createLivesBarrell()
          this.useLivesBarrell()
          this.isShipImpact()
          this.isShipImpactConEnemyShip()
          this.isShipImpactWithEnemyShot()
          if(this.lives > 0){
            this.drawAll()
          }            
          this.isWin()  
          this.framesCounter ++
          this.framesCounter %= 10000
      }, this.FPS)

    },

    hasGravity(){
      if( this.background.passedScreens % 2 == 0){
        this.gravity = 0    
      }else{
        this.gravity = 1
      }
      this.player.gravity = this.gravity
    },

    createAsteroids(){  
      if( this.framesCounter % this.asteroidsFreq == 0){
        // condition that asteroids don't enter in out of range area
        const posStartY = this.player.size.h / 2 + Math.random() * (this.height - this.player.size.h)

        const asteroid = new Asteroid(this.ctx, this.width, this.height, this.width, posStartY, 50, 50, 'asteroid', 5, 0)


        this.asteroids.push(asteroid)                
      }

    },

    enemyFires(){  
      // if( this.framesCounter % 200 == 0 && (this.enemies.length > 0) ){
      if(  (this.enemies.length > 0) ){
        // condition that asteroids don't enter in out of range area
        // console.log(this.enemies)
        this.enemies.forEach(enemy => enemy.enemyFires())
      }

    },

    createLivesBarrell(){  
      if( this.framesCounter % 4000 == 0){
        // condition that asteroids don't enter in out of range area
        const posStartY = this.player.size.h / 2 + Math.random() * (this.height - this.player.size.h)

        this.livesBarrell = new LivesBarrell(this.ctx, this.width, this.height, this.width, posStartY, 50, 50, 'asteroid', 3, 0)

        
      }
    },

    createEnemies(){
      // const randomDistance = 50 + Math.floor(Math.random() * 300)
      if( this.framesCounter % 400 == 50){
        const posStartY = this.player.size.h / 2 + Math.random() * (this.height - this.player.size.h)  
        
        
          
    // constructor(ctx, frameCounter, player, gameW, gameH,  enemyPosY, enemyImg, speed = -5){
      const enemy = new Enemy(this.ctx, this.width, this.height, this.width, posStartY, 100, 100, 'ship.jpg', -3, 0, this.frameCounter, this.player)
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
        this.enemies.forEach( enemy => enemy.shots = enemy.shots.filter(shot => shot.pos.x > -5))
        
        

      },
    

  useLivesBarrell(){
    if(this.livesBarrell){
        const isImpact = this.isImpact(this.player, this.livesBarrell)  
        if( isImpact ){
          this.lives += 3
          this.lives = this.lives > this.maxLivesNumber ? this.maxLivesNumber : this.lives 
          // console.log(this.lives)
          this.livesBarrell = ''
        } 
    }
                        
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
          //copiaza gloantele in nava ascunsa
          this.enemies[0].shots =[...enemy.shots]
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
        if(this.lives <= 0){
          this.isGameOver('You loose')
        }
      }      
      return isImpact
    })
  },

  isShipImpactWithEnemyShot(){

    this.enemies.forEach(enemy => {
      enemy.shots.forEach(shot => {
        const isImpact = this.isImpact(this.player, shot)
        if(isImpact){
          this.removeElementFromArray(shot, enemy.shots)
          this.lives--
          console.log('Atins', this.tempContor++, this.lives)
          if(this.lives <= 0){
            this.isGameOver('You loose')
          }        
        }
      })
    })

  },

  isWin(){
    if(this.background.passedScreens >= 2){
      console.log("DOES NOT WORK!!!!!")
      // this.player.pressedKeys = []
      // this.isGameOver('You win')
    }
  },

  isShipImpactConEnemyShip(){
    // const isShipImpact = this.asteroids.some( asteroid => this.isImpact(this.player, asteroid))
    const isShipImpact = this.enemies.some( enemy => {
      const isImpact = this.isImpact(this.player, enemy)
      if(isImpact){

        //*************************************************************************************************** */
        
        this.enemies[0].shots =[...enemy.shots]
        this.removeElementFromArray(enemy, this.enemies)
        this.lives -= 2 //cambiar vidas mas adelante
        if(this.lives <= 0){
          this.isGameOver('You loose')  //paint the final screen
        }
      }      
      return isImpact
    })
  },   

  isGameOver(message){
    console.log('Game Over! :)')
    // this.background.draw()
    saveData()
    clearInterval(this.interval)
    displayNewResults()
    this.background.draw()


    // this.myFillRect(this.width/4, this.height/4, this.width/2, this.height/2,'green')
    // this.ctx.fillStyle = "orange"
    // this.ctx.font = "150px Arial"
    // this.ctx.fillText(`${message}! You won ${this.score} points!`, this.width/4, this.height/2, this.width/2)
    
    // this.ctx.fillText( getStupidScoreText(), this.width/4, this.height/2, this.width/2)
    
    console.log('Game Over! :)')
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
    if(this.livesBarrell){
      this.livesBarrell.draw()
    }
    
  },
      
  reset() {
      this.background = new Background(this.ctx, this.width, this.height, "./img/background.jpg")
      this.player = new Player(this.ctx, this.width, this.height, 50, 300, 80, 80, "ship03.png", 15, 15, this.gravity, this.keys)

      const stealthEnemy = new StealthEnemy(this.ctx, this.width, this.height, this.width, this.height/2, 200, 200, 'ship.png', -5, 0, this.frameCounter, this.player)

      this.obstacles = []
      this.enemies =[]
      this.enemies.push(stealthEnemy)
  },

// para uniformizar las medidas utilizadas en las condiciones de choque
    setBorders(object){
      let upperLimit, lowerLimit, leftLimit, rightLimit;

      // if( object instanceof Shots || object instanceof EnemyShots){
      if( object instanceof SuperShots){
        upperLimit = object.pos.y - object.radius
        lowerLimit = object.pos.y + object.radius
        leftLimit = object.pos.x - object.radius
        rightLimit = object.pos.x + + object.radius
      }else{
        upperLimit = object.pos.y 
        lowerLimit = object.pos.y + object.size.h
        leftLimit = object.pos.x
        rightLimit = object.pos.x + object.size.w 
      }
      // return upperLimit
      return [upperLimit, lowerLimit, leftLimit, rightLimit]
    },

    


  isImpact(o1, o2){
    let [upper1, lower1, left1, right1] = this.setBorders(o1)
    let [upper2, lower2, left2, right2] = this.setBorders(o2)

    if( ( right1 < left2 ) || ( right2 < left1 ) || ( lower1 < upper2 ) || ( lower2 <  upper1 ) ){
      return false
    }else{
      return true
    }
  }, 

  increaseLevel(){
    // console.log("kjsdnlkal")
    this.level++
  }


}