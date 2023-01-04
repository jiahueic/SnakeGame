var direction = 1
var board = document.querySelector(".gameboard")
var left = document.querySelector(".left")
left.addEventListener("click",function(){direction = -1})
var right = document.querySelector(".right")
right.addEventListener("click",function(){direction = 1})
var up = document.querySelector(".up")
up.addEventListener("click",function(){direction = -10})
var down = document.querySelector(".down")
down.addEventListener("click",() => {direction = 10})
var playAgain = document.querySelector(".replay")
playAgain.addEventListener("click", replay)
var scoreBoard = document.querySelector(".score")
var initialSnake = [2,1,0]
var width = 10
let score = 0
var intervalTime = 0
var interval = 0
// add 100 cells to the game board
function startGame() {
    for(let i = 0; i < 100; i++){
        cell = document.createElement("div")
        board.appendChild(cell)
    }
    
    var cells = document.querySelectorAll(".gameboard div")
    for(let j = 0; j < 100; j++){
        if(j % 2 != 0){
            cells[j].classList.add("dark")
        }
    }
    initialSnake = [2,1,0]
    for(let k = 0; k < initialSnake.length; k++) {
        cells[k].classList.add("snake")
    }

    scoreBoard.innerHTML = '<p style="color:white; font-size:3rem;border: margin-left:20px;padding-top:20px;"> Score:'+ score + '</span>'
    
}





function replay() {
    board.innerHTML = ""
    direction = 1
    main()
    
}

function checkBoundary() {
    // checks if the the head of the snake is bound to hit anywhere for any of the four directions
    // the index goes from 0 to 99
    if ((initialSnake[0] + width >= width * width && direction === width)){
        alert("You have hit the boundary")
        clearInterval(interval)
        return false
    }
    if(initialSnake[0] - width <= 0 && direction === -width){
        alert("You have hit the boundary")
        clearInterval(interval)
        return false
    }
    console.log(initialSnake[0] % width === 9 && direction === 1)
    if(initialSnake[0] % width === 9 && direction === 1) {
        alert("You have hit the boundary")
        clearInterval(interval)
        return false
    }
    if(initialSnake[0] % width === 0 && direction === -1) {
        alert("You have hit the boundary")
        clearInterval(interval)
        return false
    }
    // add a new rule to check if the snake eats itself (when it shifts left)
    if(initialSnake[0] + direction === initialSnake[1]){
        alert("You have eaten yourself")
        clearInterval(interval)
        return false
    }
    // problem with down then left direction (keyboard)
    return true
     
}
function moveSnake() {
    var cells = document.querySelectorAll(".gameboard div")
        var tail = initialSnake.pop() // pops the tail index of the snake
        // remove the snake class from the class list
        if(typeof cells[tail] !== 'undefined') {
            cells[tail].classList.remove("snake")
        }
        
        // unshift adds element to the start of the array
        initialSnake.unshift(initialSnake[0] + direction)
   
    // checks if the snake head eats the apple
    

    // if the apple is consumed, need to randomly generate a new apple again
    eatApple(initialSnake,tail)   
    if(typeof cells[initialSnake[0]] !== 'undefined') {
        cells[initialSnake[0]].classList.add("snake")
    }
    
}
function randomApple() {
    var cells = document.querySelectorAll(".gameboard div")
    // we need to continually generate the random location for the apple until we find a location with no snake
    do {
        randomLoc = Math.floor(Math.random() * cells.length)
    } while(cells[randomLoc].classList.contains("snake"))
   
    cells[randomLoc].classList.add("apple")

}

function eatApple(initialSnake, tail) {
    cells = document.querySelectorAll(".gameboard div")
    // initial snake is the index, we need to get the cell of the index
    var targetCell = cells[initialSnake[0]]
    if(typeof targetCell !== 'undefined') {
        if(targetCell.classList.contains("apple")) {
      
            score ++
        
            scoreBoard.innerHTML = '<p style="color:white; font-size:3rem;margin-left:20px;padding-top:20px;"> Score:'+ score + '</span>'
            targetCell.classList.remove("apple")
            initialSnake.push(tail)
            // make the snake longer after eating the apple
            lastSnakeIndex = initialSnake[initialSnake.length - 1]
            cells[lastSnakeIndex].classList.add("snake")
            randomApple()
        }
    }
    
    
}


function main() {
        // add an event listener for keyboard actions
        document.addEventListener("keyup", (e) => {
            if(e.code === "ArrowLeft") {
                //left
                direction = -1
            }
            else if(e.code === "ArrowUp") {
                // up
                direction = -width
            }
            else if(e.code === "ArrowRight") {
                // right
                direction = 1
            }
            else if(e.code === "ArrowDown") {
                // down
                direction = width
            }
        })
        startGame()
        randomApple()
        interval = setInterval(loop,700)
        
        //move the snake if the boundary is maintained   
    
}

function loop() {
    if(checkBoundary()) {
        moveSnake()
    }

    else{
        clearInterval(interval)
    }
}
main()
