// Array of plant objects
const plants = [
    { name: "Aloe Vera", image: "images/aloe-vera.jpg", link: "aloe-vera.html", description: "Soothing skin care remedy", model: 'models/aloe-vera.glb' },
    { name: "Basil", image: "images/basil.jpg", link: "basil.html", description: "Boosts immune system", model: 'models/basil.glb' },
    { name: "Chamomile", image: "images/chamomile.jpg", link: "chamomile.html", description: "Great for relaxation", model: 'models/chamomile.glb' },
    { name: "Dandelion", image: "images/dandelion.jpg", link: "dandelion.html", description: "Detoxifies the liver", model: 'models/dandelion.glb' },
    { name: "Echinacea", image: "images/echinacea.jpg", link: "echinacea.html", description: "Fights infections", model: 'models/echinacea.glb' },
    { name: "Fenugreek", image: "images/fenugreek.jpg", link: "fenugreek.html", description: "Improves digestion", model: 'models/fenugreek.glb' },
    { name: "Ginger", image: "images/ginger.jpg", link: "ginger.html", description: "Helps reduce nausea", model: 'models/ginger.glb' },
    { name: "Lavender", image: "images/lavender.jpg", link: "lavender.html", description: "Promotes calmness", model: 'models/lavender.glb' },
    { name: "Neem", image: "images/neem.jpg", link: "neem.html", description: "Natural antiseptic", model: 'models/neem.glb' },
    { name: "Tulsi", image: "images/tulsi.jpg", link: "tulsi.html", description: "Helps relieve stress", model: 'models/tulsi.glb' }
];

// Create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a light source
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Function to load GLTF models
function loadModel(modelPath, position) {
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function(gltf) {
        const model = gltf.scene;
        model.position.set(position.x, position.y, position.z);
        model.scale.set(0.5, 0.5, 0.5); // Adjust scale if needed
        scene.add(model);
    }, undefined, function(error) {
        console.error('An error happened', error);
    });
}

// Load all plant models with their positions
const positions = [
    { x: -5, y: 0, z: -5 },
    { x: -3, y: 0, z: -5 },
    { x: -1, y: 0, z: -5 },
    { x: 1, y: 0, z: -5 },
    { x: 3, y: 0, z: -5 },
    { x: 5, y: 0, z: -5 },
    { x: -5, y: 0, z: -3 },
    { x: -3, y: 0, z: -3 },
    { x: -1, y: 0, z: -3 },
    { x: 1, y: 0, z: -3 }
];

plants.forEach((plant, index) => {
    loadModel(plant.model, positions[index] || { x: 0, y: 0, z: 0 });
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
