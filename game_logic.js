let playerText = document.getElementById('PlayerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = Math.random() >= 0.5 ? O_TEXT : X_TEXT ;
document.getElementById("xORo").innerHTML = currentPlayer
let spaces = Array(9).fill(null)
let counterPress = 0
let lang = 'ru'

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id] && !playerHasWon()) {
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer
        counterPress++

        if(playerHasWon()) {
            var cc=''
            if(lang=='ru'){
                cc='Выиграл!'
            } else {
                cc='Has won!'
            }
            playerText = `${currentPlayer} ${cc}`
            document.getElementById("currentPlayer").innerHTML = playerText
            let winning_blocks = playerHasWon()
            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
        } 
        else if(draw()) {
            if(lang=='ru'){
                playerText = "Ничья!"
            } 
            else {
                playerText = "Draw!"
            }
            document.getElementById("currentPlayer").innerHTML = playerText
        } 
        else {
            currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
            cPlayer(currentPlayer)
        }
    }
}

function draw() {
    if (!(playerHasWon()) && counterPress==9){
        return true
    }
    return false;
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let[a,b,c] = condition
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}
 
restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)
    counterPress = 0
    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })
    currentPlayer = randPlayer()
    cPlayer(currentPlayer)
    if(lang=='ru'){
        document.getElementById("currentPlayer").innerHTML = "Текущий игрок:"
    }else{document.getElementById("currentPlayer").innerHTML = "Current player:"}
}

function changeText() {
    lang = "en"
    document.getElementById("playerText").innerHTML = "X and O"
    document.getElementById("currentPlayer").innerHTML = "Current player:"
    document.getElementById("restartBtn").innerHTML = "Restart"
    restart()
    
}

function changeText2() {
    lang = "ru"
    document.getElementById("playerText").innerHTML = "Крестики░Нолики"
    document.getElementById("currentPlayer").innerHTML = "Текущий игрок:"
    document.getElementById("restartBtn").innerHTML = "Перезагрузка"
    restart()
}

function randPlayer() {
    return Math.random() >= 0.5 ? O_TEXT : X_TEXT ;
}

function cPlayer(currentPlayer) {
    document.getElementById("xORo").innerHTML = currentPlayer
}

startGame()
