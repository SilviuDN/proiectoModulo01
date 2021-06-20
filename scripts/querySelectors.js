// Game.audio.inicio.loop
// Game.audio.inicio.play()
const score = document.querySelector(".score")
const level = document.querySelector(".level")
const lives = document.querySelector(".lives")
const playerNameElement = document.querySelector(".name")
const topScore = document.querySelector(".topScore")

window.topScores = [{name: 'James', score: 3}, {name: 'Lars', score: 10}, {name: 'Kirk', score: 1}, {name: 'Robert', score: 1}, {name: 'Bob', score: 1}]

const section1 = document.querySelector('.section1')
const section2 = document.querySelector('.section2')
const section3 = document.querySelector('.section3')
const controls = document.querySelector('.controls')
const playerNameInput = document.getElementById('player')
const s2PlayerName = document.querySelector('h2.name')
const guitars = document.querySelectorAll('img.guitar')

const startButton = document.getElementById('startButtonSection1')
const startGameButton = document.getElementById('start-game')
const exitButton23 = document.getElementById('exit')
const startOverButton = document.getElementById('startOver')


guitars.forEach(guitar => {
    
    guitar.addEventListener('click', (e) => {
        window.player.image = guitar.getAttribute('id')   
        Game.audio[ window.player.image ].play()
        
        guitars.forEach((guitar) => guitar.classList.remove('activeGuitar'))

        guitar.classList.add('activeGuitar')
    })
    
})


startButton.addEventListener('click', () => {
    window.player.name = playerNameInput.value
    section1.setAttribute('hidden','')
    section2.removeAttribute('hidden','')
    controls.removeAttribute('hidden','')
    s2PlayerName.textContent = window.player.name
    startGameButton.disabled=false
    Game.reset()
    Game.clear()
    
    Game.audio.guitar01.pause()
    Game.audio.guitar02.pause()
    Game.audio.guitar03.pause()
})

startGameButton.addEventListener('click' , (e) => {
    
    controls.setAttribute('hidden','')
    Game.init()
    Game.audio.mainSound.loop = true
    Game.audio.mainSound.play()
    e.currentTarget.disabled = true
})

exitButton23.addEventListener('click', () => {
    
    section2.setAttribute('hidden','')
    section3.removeAttribute('hidden','')

    Game.isGameOver()
    clearInterval(this.interval)
    displayNewResults()
    Game.background.draw()

    Game.audio.newLevel.pause()
    Game.audio.gotLives.pause()
    Game.audio.explodeAsteroid.pause()
    Game.audio.explodeEnemy.pause()
    Game.audio.asteroidImpact.pause()
    Game.audio.shotImpact.pause()
    Game.audio.shipImpact.pause()
    Game.audio.mainSound.loop = true
    Game.audio.mainSound.pause()
})

startOverButton.addEventListener('click', (e) => {
    section3.setAttribute('hidden','')
    section1.removeAttribute('hidden','')
    s2PlayerName.textContent = window.player.name
    Game.resetGame()
    Game.audio.clap.pause()
})



function refreshData(){
    lives.innerHTML ='<span>Lives </span>' + Game.lives
    score.innerHTML ='<span>Points </span>' + Game.score
    level.innerHTML ='<span>Level </span>' + Game.level

}

function saveData(){
    const name = playerNameElement.textContent
    localStorage.setItem("teo", 1000)
    window.topScores.push({name: name, score: Game.score})
    console.log('Test ', window.topScores )
}

function selectDataToDisplay(){
    window.topScores = window.topScores.sort( (entry1, entry2) => 
        ( (entry2.score - entry1.score) || (entry1.name.localeCompare(entry2.name)) ) ).splice(0,3)
    return window.topScores

}

function createTopScoreEntry(position, name, score){
 
    const entryPosition = document.createElement('th')
    entryPosition.setAttribute("scope", "row")
    entryPosition.textContent = position

    const entryName = document.createElement('td')
    entryName.textContent = name

    const entryScore = document.createElement('td')
    entryScore.textContent = score

    const newEntry = document.createElement('tr')

    newEntry.appendChild(entryPosition)
    newEntry.appendChild(entryName)
    newEntry.appendChild(entryScore)

    return newEntry
}

function displayNewResults(){
    let topScoresCounter = 0
    topScore.innerHTML = ''
    selectDataToDisplay(window.topScores).forEach(entry => 
    topScore.appendChild( createTopScoreEntry(++topScoresCounter, entry.name, entry.score) ))
    Game.audio.clap.play()

}



