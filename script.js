const canvas = document.getElementById('gameCanvas'); 
const ctx = canvas.getContext('2d'); 
const gridSize = 20; 
let snake = [{x: 10, y: 10}]; 
let velocity = { x: 1, y: 0 }; 
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;


function drawSnake(){
    ctx.fillStyle = 'white';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function updateSnake(){
    const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y }; 

    // handle border wrapping 
    if (head.x < 0) {
        head.x = canvasWidth / gridSize - 1;
    } else if (head.x >= canvasWidth / gridSize) {
        head.x = 0;
    }

    if (head.y < 0) {
        head.y = canvasHeight / gridSize - 1;
    } else if (head.y >= canvasHeight / gridSize) {
        head.y = 0;
    }

    snake.unshift(head);
    snake.pop(); 
}

function handleInput(event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            if (velocity.y === 0) velocity = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
        case 's':
            if (velocity.y === 0) velocity = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
        case 'a':
            if (velocity.x === 0) velocity = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
        case 'd':
            if (velocity.x === 0) velocity = { x: 1, y: 0 };
            break;
    }
}

document.addEventListener('keydown', handleInput);

function gameLoop() {
    updateSnake();
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawSnake(); 
}

const gameInterval = setInterval(gameLoop, 100); 