const scene = new THREE.Scene();

// dark GTA style background
scene.background = new THREE.Color(0x050505);

scene.fog = new THREE.Fog(0x050505, 5, 25);


// camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 8;


// renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false
});


renderer.setClearColor(0x000000, 0);

renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("three-bg").appendChild(renderer.domElement);


// particles
const geometry = new THREE.BufferGeometry();

const count = 5000;

const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {

    positions[i] = (Math.random() - 0.5) * 30;

}

geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
);

const material = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x3b82f6,
    transparent: true,
    opacity: 0.4
});


const particles = new THREE.Points(geometry, material);

scene.add(particles);


// object reveal (like GTA zoom reveal)
const sphere = new THREE.Mesh(

    new THREE.SphereGeometry(1.5, 32, 32),

    new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        wireframe: true
    })

);

sphere.position.z = -15;

scene.add(sphere);


// render loop (NO automatic animation)
function animate() {

    requestAnimationFrame(animate);

    renderer.render(scene, camera);

}

animate();


// scroll controlled animation
window.addEventListener("scroll", () => {

    const scrollPercent =
        window.scrollY /
        (document.body.scrollHeight - window.innerHeight);

    // camera zoom
    camera.position.z = 8 - scrollPercent * 10;

    // camera slight vertical move
    camera.position.y = scrollPercent * 2;

    // particles movement
    particles.rotation.y = scrollPercent * 3;

    // sphere reveal rotation
    sphere.rotation.y = scrollPercent * 5;

});


// resize fix
window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
