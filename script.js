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

    // Set the camera position
    camera.position.z = 5;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate the rocket
        rocket.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    animate();
    ```
