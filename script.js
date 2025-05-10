const canvas = document.getElementById('gameCanvas'); 
const ctx = canvas.getContext('2d'); 
const gridSize = 20; 
let snake = [{x: 10, y: 10}]; 
let velocity = { x: 0, y: 0 }; 
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;


//add snake image
let snokoSprite = new Image();
snokoSprite.src = '/Users/jmess/Documents/snoko/snoko.png'; 

// Wait for image to load before drawing
snokoSprite.onload = function() {
    drawSnake();
};

function drawSnake() {
    snake.forEach(segment => {
        const x = segment.x * gridSize;
        const y = segment.y * gridSize;
        ctx.drawImage(snokoSprite, x, y, gridSize * 5, gridSize * 5);
    });
}

function updateSnake(){
    const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y }; 
    
    //border collision
    if (head.x < 0 || head.x >= canvasWidth / gridSize || 
        head.y < 0 || head.y >= canvasHeight / gridSize) {
        return;
    }
    
    //update pos 
    snake.unshift(head);
    snake.pop(); 
}

function handleInput(event) {

    switch (event.key) {
        
        case 'ArrowUp':
        case 'w':
            velocity = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
        case 's':
            velocity = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
        case 'a':
            velocity = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
        case 'd':
            velocity = { x: 1, y: 0 };
            break;
    }
    updateSnake();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawSnake();
}

document.addEventListener('keydown', handleInput);

drawSnake();