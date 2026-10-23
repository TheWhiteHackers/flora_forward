let blockSize = 25;
let total_row = 17;
let total_col = 17;
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let speedX = 0;
let speedY = 0;

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;

window.onload = function (){
    // set boards up
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    placeFood();
    // movement
    document.addEventListener("keyup", changeDirection);
    // set snake speed
    setInterval(update, 1000 / 10);
}

function update(){
    if (gameOver){
        return;
    }

    // background
    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height);
    // food color
    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    // body of snake growing
    for (let i = snakeBody.length -1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "white";
    // updating the coordinates of the snake
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // out of bounds
    if (snakeX < 0 || snakeX > total_col * blockSize || snakeY < 0 || snakeY > total_row * blockSize){
        gameOver = true;
        alert("Game Over");
    }

    // snake eating itself
    for (let i = 0; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("Game Over");
        }
    }
}

// movement of the snake
function changeDirection(e){
    if (e.code == "ArrowUp" && speedY != 1){
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "ArrowDown" && speedY != -1){
        speedX = 0;
        speedY = 1;
    } 
    else if (e.code == "ArrowLeft" && speedX != 1){
        speedX = -1;
        speedY = 0;
    }
    else if (e.code == "ArrowRight" && speedX != -1){
        speedX = 1;
        speedY = 0;
    }
}


// randomly place food
function placeFood() {
    foodX = Math.floor(Math.random() * total_col) * blockSize;
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}