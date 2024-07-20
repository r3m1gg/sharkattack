const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let swimmer = { emoji: '🏊‍♀️', x: 50, y: canvas.height / 2, size: 48 };
let shark = { emoji: '🦈', x: canvas.width - 120, y: canvas.height / 2 - 24, size: 48 };
let obstacles = [];
let score = 0;
let gameOver = false;

function createObstacle() {
    let obstacle = {
        emoji: '🌉',
        x: canvas.width,
        y: Math.random() * (canvas.height - 30),
        size: 48
    };
    obstacles.push(obstacle);
}

function drawSwimmer() {
    ctx.font = `${swimmer.size}px Arial`;
    ctx.fillText(swimmer.emoji, swimmer.x, swimmer.y);
}

function drawShark() {
    ctx.font = `${shark.size}px Arial`;
    ctx.fillText(shark.emoji, shark.x, shark.y);
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.font = `${obstacle.size}px Arial`;
        ctx.fillText(obstacle.emoji, obstacle.x, obstacle.y);
    });
}

function updateGame() {
    obstacles.forEach(obstacle => {
        obstacle.x -= 5; // Vitesse de déplacement des obstacles
    });
    if (Math.random() < 0.05) {
        createObstacle();
    }
    score++;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSwimmer();
    drawShark();
    drawObstacles();
    ctx.font = '20px Arial';
    ctx.fillText("Score: " + score, 10, 30);
    if (!gameOver) {
        requestAnimationFrame(gameLoop);
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && swimmer.y > 50) {
        swimmer.y -= 20;
    } else if (event.key === 'ArrowDown' && swimmer.y < canvas.height - 50) {
        swimmer.y += 20;
    }
});

gameLoop();
