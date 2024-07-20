const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let swimmer = new Image();
swimmer.src = 'anne.webp'; // Image de la nageuse
let shark = new Image();
shark.src = 'shark.webp'; // Image du requin
let obstacles = [];
let score = 0;
let gameOver = false;

function createObstacle() {
    let img = new Image();
    img.src = 'bridge.webp'; // Image d'obstacle
    let obstacle = {
        img: img,
        x: canvas.width,
        y: Math.random() * (canvas.height - 30),
        width: 40,
        height: 40
    };
    obstacles.push(obstacle);
}

function drawSwimmer() {
    ctx.drawImage(swimmer, 50, canvas.height / 2 - swimmer.height / 2);
}

function drawShark() {
    ctx.drawImage(shark, canvas.width - shark.width - 20, canvas.height / 2 - shark.height / 2);
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.drawImage(obstacle.img, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
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
    if (event.key === 'ArrowUp' && canvas.height / 2 > 0) {
        canvas.height -= 10;
    } else if (event.key === 'ArrowDown' && canvas.height / 2 < canvas.height - swimmer.height) {
        canvas.height += 10;
    }
});

swimmer.onload = () => {
    shark.onload = () => {
        gameLoop();
    };
};
