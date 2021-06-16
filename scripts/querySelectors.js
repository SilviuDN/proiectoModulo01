const score = document.querySelector(".score")
const lives = document.querySelector(".lives")
const playerNameElement = document.querySelector(".name")
// const topScoresEntries = document.querySelector(".topScoresEntries")
const topScore = document.querySelector(".topScore")



function refreshData(){
    lives.innerHTML ='<span>Lives </span>' + Game.lives
    score.innerHTML ='<span>Points </span>' + Game.score

}

function saveData(){
    const name = playerNameElement.textContent
    localStorage.setItem("teo", 1000)
    Game.topScores.push({name: name, score: Game.score})
    // const newEntry = Game.topScores.push({name: name, score: Game.score})
}

function selectDataToDisplay(){
    return Game.topScores.sort( (entry1, entry2) => (entry2.score - entry1.score) ).splice(0,3)
}

function createTopScoreEntry(position, name, score){
 
    const entryPosition = document.createElement('th')
    entryPosition.setAttribute("scope", "row")
    //atributo
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
    selectDataToDisplay(Game.topScores).forEach(entry => 
        topScore.appendChild( createTopScoreEntry(++topScoresCounter, entry.name, entry.score) ))

}


// function createTopScoreEntry(position, name, score){
//     const entryPosition = document.createElement('p')
//     entryPosition.className = 'entry-number'
//     entryPosition.textContent = position

//     const entryName = document.createElement('p')
//     entryName.className = 'entry-name'
//     entryName.textContent = name

//     const entryScore = document.createElement('p')
//     entryScore.className = 'entry-score'
//     entryScore.textContent = score

//     const newEntry = document.createElement('div')
//     newEntry.className = 'entry'

//     newEntry.appendChild(entryPosition)
//     newEntry.appendChild(entryName)
//     newEntry.appendChild(entryScore)

//     return newEntry
// }

// function displayNewResults(){
//     let topScoresCounter = 0
//     topScoresEntries.innerHTML = ''
//     selectDataToDisplay(Game.topScores).forEach(entry => 
//         topScoresEntries.appendChild( createTopScoreEntry(++topScoresCounter, entry.name, entry.score) ))

// }

// // displayNewResults()

// function getStupidScoreText(){
//     const finalists = selectDataToDisplay()
//     let contor = 1
//     const partialRes = finalists.map( finalist => (contor++) +'. ' + finalist.name + ': ' + finalist.score)
//     const response = partialRes.join(', ')
//     console.log(response)
//     return response
// }
