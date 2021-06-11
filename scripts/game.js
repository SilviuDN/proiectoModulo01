const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    // FPS: 60,
    // framesCounter: 0,
  
    // background: undefined,
    // player: undefined,
    obstacles: [],
  
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
      this.canvas = document.getElementById("mySpaceCanvas")
      this.ctx = this.canvas.getContext("2d")
      this.setDimensions()
      this.start()
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
          this.drawAll()

      })

    },

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
      },
    
  drawAll() {
    this.background.draw()
    // this.player.draw()
    // this.player.draw(this.framesCounter)
    // this.obstacles.forEach(obs => obs.draw())
  },
      
    reset() {
        this.background = new Background(this.ctx, this.width, this.height, "./img/bg.png")
        this.player = new Player(this.ctx, this.width, this.height, playerPosX = 0, 300, 150, 150, "player.png")

        this.obstacles = []
    }

}