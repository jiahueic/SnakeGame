var board = document.querySelector(".gameboard")
var left = document.querySelector(".left")
var right = document.querySelector(".right")
var up = document.querySelector(".up")
var down = document.querySelector(".down")
var direction = 1
var initialSnake = [2,1,0]
var width = 10
let score = 0
// add 100 cells to the game board
function startGame() {
    for(let i = 0; i < 100; i++){
        cell = document.createElement("div")
        board.appendChild(cell)
    }
    
    var cells = document.querySelectorAll(".gameboard div")
    console.log(cell.length)
    for(let j = 0; j < 100; j++){
        if(j % 2 != 0){
            cells[j].classList.add("dark")
        }
    }
    
    for(let k = 0; k < initialSnake.length; k++) {
        cells[k].classList.add("snake")
    }

    score.innerHTML = score
}
left.addEventListener("click",() =>{direction = -1})
right.addEventListener("click",() => {direction = 1})
up.addEventListener("click",() =>{direction = -10})
down.addEventListener("click",() => {direction = 10})

function checkBoundary() {
    // checks if the the head of the snake is bound to hit anywhere for any of the four directions
    // the index goes from 0 to 99
    if ((snake[0] + width >= width * width & direction === width) ||
     (snake[0] - width <= 0 && direction === -width) ||
     (snake[0] % width === 9 && direction === 1) || (snake[0] % width === 0 && direction === -1)) {
        // returns true if boundary is maintained
        // false if boundary is not maintained
        return false
     }
    return true
     
}
function moveSnake() {
    var cells = document.querySelectorAll(".gameboard div")
    var tail = initialSnake.pop() // pops the tail index of the snake
    // remove the snake class from the class list
    cells[tail].classList.remove("snake")
    // unshift adds element to the start of the array
    initialSnake.unshift(initialSnake[0] + direction)
    // checks if the snake head eats the apple
    
    // if the apple is consumed, need to randomly generate a new apple again
    if(eatApple(initialSnake,tail)) {
        randomApple()
    }
    
    cells[initialSnake[0]].classList.add("snake")
}
function randomApple() {
    var cells = document.querySelectorAll(".gameboard div")
    // we need to continually generate the random location for the apple until we find a location with no snake
    do {
        randomLoc = Math.floor(Math.random() * cells.length)
    } while(cells[randomLoc].classList.contains("snake"))
    console.log(randomLoc)
    cells[randomLoc].classList.add("apple")

}

function eatApple(initialSnake, tail) {
    if(initialSnake[0].classList.contains("apple")) {
        score ++
        score.textContent = score
        initialSnake[0].classList.remove("apple")
        initialSnake.push(tail)
        initialSnake[-1].classList.add("snake")
        return true
    }
    return false
}
function keyboardControl() {

}

function main() {
        // add an event listener for keyboard actions
        document.addEventListener("keyup", keyboardControl)
        startGame()
        randomApple()
        if(checkBoundary) {
            moveSnake()
        }
        //move the snake if the boundary is maintained
    
    
}

main()