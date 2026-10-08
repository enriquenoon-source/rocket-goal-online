```javascript
// Initialize the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the rocket car geometry and material
const geometry = new THREE.BoxGeometry(1, 0.5, 0.5);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const rocket = new THREE.Mesh(geometry, material);
scene.add(rocket);

// Create the ground plane
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x888888, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Create the goal post geometry and material
const goalGeometry = new THREE.BoxGeometry(2, 0.5, 0.1);
const goalMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const goal = new THREE.Mesh(goalGeometry, goalMaterial);
goal.position.y = 2;
scene.add(goal);

// Set the camera position
camera.position.z = 5;

// Add controls
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        rocket.rotation.y -= 0.1;
    } else if (event.key === 'ArrowRight') {
        rocket.rotation.y += 0.1;
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

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the rocket
    rocket.rotation.y += 0.01;

    // Move the rocket
    rocket.position.y -= 0.05;

    // Check if the rocket reaches the goal
    checkGoal();

    renderer.render(scene, camera);
}

animate();
```

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rocket Goal Online</title>
    <style>
        body { margin: 0; }
        canvas { display: block; }
    </style>
</head>
<body>
    <script src="three.js"></script>
    <script src="script.js"></script>
</body>
</html>
```
