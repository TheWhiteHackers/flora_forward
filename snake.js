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
let gameStarted = false;

// default colors
let bgColor = "green";
let snakeColor = "white";
let foodColor = "yellow";

window.onload = function (){
    // set boards up
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    placeFood();
    // movement
    document.addEventListener("keydown", changeDirection);
    // eco
    board.addEventListener("click", selectEcosystem);
    // set snake speed
    setInterval(update, 1000 / 10);
}

function update(){
    // ecosystem selection
    if (!gameStarted){
        context.fillStyle = "black";
        context.fillRect(0, 0, board.width, board.height);

        context.fillStyle = "white";
        context.textAlign = "center";
        context.font = "25px sans=serif";
        context.fillText("Select Your Ecosystem: ", board.width / 2, 90);
    
        // three buttons
        context.fillStyle = "#444";
        // marsh
        context.fillRect(board.width / 2 - 125, 130, 250, 40);
        // woodlands
        context.fillRect(board.width / 2 - 125, 190, 250, 40);
        // pirarie
        context.fillRect(board.width / 2 - 125, 250, 250, 40);

        // text
        context.fillStyle = "white";
        context.font = "18px sans-serif";
        context.fillText("Marsh", board.width / 2, 157);
        context.fillText("Coastal Woodlands", board.width / 2, 217);
        context.fillText("Prairie", board.width / 2, 277);

        context.textAlign = "left";
        return;
    }
    
    
    
    // death screen
    if (gameOver){
        context.fillStyle = "black";
        context.fillRect(0, board.height / 2 - 60, board.width, 130);
        
        context.fillStyle = "white";
        context.textAlign = "center";
        context.font = "40px sans-serif";
        context.fillText("Game Over", board.width / 2, board.height / 2);
        context.font = "20px sans-serif";
        context.fillText("Press Space to Restart", board.width / 2, board.height / 2 + 40);
        context.textAlign = "left";
        
        return;
    }

    // background
    context.fillStyle = bgColor;
    context.fillRect(0, 0, board.width, board.height);
    // food color
    context.fillStyle = foodColor;
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

    // snake color
    context.fillStyle = snakeColor;

    // updating the coordinates of the snake
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // out of bounds
    if (snakeX < 0 || snakeX >= total_col * blockSize || snakeY < 0 || snakeY >= total_row * blockSize){
        gameOver = true;
    }

    // snake eating itself
    for (let i = 0; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
        }
    }
}

// movement of the snake
function changeDirection(e){
    // stops scrolling
    if(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)){
        e.preventDefault();
    }

    if (!gameStarted){
        return;
    }

    if (gameOver && e.code == "Space"){
        restartGame();
        return;
    }
    // direction controls
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

// reset game
function restartGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    speedX = 0;
    speedY = 0;
    snakeBody = [];
    gameOver = false;
    gameStarted = false;
    placeFood();
}

// select ecosystem
function selectEcosystem(e){
    if (gameStarted) {
        return;
    }

    let rect = board.getBoundingClientRect();
    let clickX = e.clientX - rect.left;
    let clickY = e.clientY - rect.top;

    let btnX = board.width / 2 - 125;
    let btnWidth = 250;

    if (clickX >= btnX && clickX <= btnX + btnWidth){
        if (clickY >= 130 && clickY <= 170){
            bgColor = "#4682B4";
            snakeColor = "#222222";
            foodColor = "#868686";
            gameStarted = true;
        }
        else if (clickY >= 190 && clickY <= 230) {
            bgColor = "#8B4513";
            snakeColor = "#fed400";
            foodColor = "#228B22";
            gameStarted = true;
        } 
        else if (clickY >= 250 && clickY <= 290) {
            bgColor = "#FFF8DC";
            snakeColor = "#D2B48C";
            foodColor = "#5C4033";
            gameStarted = true;
        }
    }
}