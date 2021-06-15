const score = document.querySelector(".score")
const lives = document.querySelector(".lives")


function refreshData(){
    lives.textContent = Game.lives
    score.textContent = Game.score

}