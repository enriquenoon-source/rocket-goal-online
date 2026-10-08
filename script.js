```javascript
// Initialize the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load textures
const textureLoader = new THREE.TextureLoader();
const rocketTexture = textureLoader.load('path/to/rocket-texture.jpg');
const goalTexture = textureLoader.load('path/to/goal-texture.jpg');

// Create rocket car geometry and material with texture
const rocketGeometry = new THREE.BoxGeometry(1, 0.5, 0.5);
const rocketMaterial = new THREE.MeshBasicMaterial({ map: rocketTexture });
const rocket = new THREE.Mesh(rocketGeometry, rocketMaterial);
scene.add(rocket);

// Create goal post geometry and material with texture
const goalGeometry = new THREE.BoxGeometry(2, 0.5, 0.1);
const goalMaterial = new THREE.MeshBasicMaterial({ map: goalTexture });
const goal = new THREE.Mesh(goalGeometry, goalMaterial);
goal.position.y = 2;
scene.add(goal);

// Add ambient and directional lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Set the camera position
camera.position.z = 5;

// Add controls
let thrust = 0;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        rocket.rotation.y -= 0.1;
    } else if (event.key === 'ArrowRight') {
        rocket.rotation.y += 0.1;
    }
    if (event.key === 'ArrowUp') {
        thrust = 0.05;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') {
        thrust = 0;
    }
});

// Add scoring
let score = 0;

function checkGoal() {
    if (rocket.position.y > goal.position.y - 1 && rocket.position.y < goal.position.y + 1) {
        score++;
        console.log('Score:', score);
    }
}

// Initialize obstacles
const obstacleGeometry = new THREE.BoxGeometry(0.5, 1, 0.5);
const obstacleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

let obstacles = [];

function createObstacle() {
    const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
    obstacle.position.y = Math.random() * 5 - 2.5;
    obstacle.position.x = Math.random() * 10 - 5;
    scene.add(obstacle);
    obstacles.push(obstacle);
}

// Create initial obstacles
for (let i = 0; i < 5; i++) {
    createObstacle();
}

// Update obstacles
function updateObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.position.z -= 0.05;
        if (obstacle.position.z < -10) {
            scene.remove(obstacle);
            obstacles = obstacles.filter(o => o !== obstacle);
            createObstacle();
        }
    });
}

// Collision detection
function checkCollision() {
    obstacles.forEach(obstacle => {
        const distance = rocket.position.distanceTo(obstacle.position);
        if (distance < 0.75) {
            console.log('Collision with obstacle!');
            // Handle collision (e.g., reset game)
        }
    });
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the rocket
    rocket.rotation.y += 0.01;

    // Move the rocket with thrust
    rocket.position.y -= thrust;

    // Check if the rocket reaches the goal
    checkGoal();

    // Update obstacles
    updateObstacles();

    // Check for collision
    checkCollision();

    renderer.render(scene, camera);
}

animate();
```
