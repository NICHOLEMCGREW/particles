let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let distance = Math.min(15, window.innerWidth / 3); // Adjusted distance for smaller size
let geometry = new THREE.Geometry();

for (let i = 0; i < 800; i++) { // Reduced number of particles
    let vertex = new THREE.Vector3();
    let theta = THREE.Math.randFloatSpread(360);
    let phi = THREE.Math.randFloatSpread(360);

    vertex.x = distance * Math.sin(theta) * Math.cos(phi);
    vertex.y = distance * Math.sin(theta) * Math.sin(phi);
    vertex.z = distance * Math.cos(theta);

    geometry.vertices.push(vertex);
}

let particles = new THREE.Points(geometry, new THREE.PointsMaterial({
    color: 0xff44ff,
    size: 0.5 // Adjusted particle size for smaller size
}));
particles.boundingSphere = 25; // Adjusted bounding sphere size

let renderingParent = new THREE.Group();
renderingParent.add(particles);

let resizeContainer = new THREE.Group();
resizeContainer.add(renderingParent);
scene.add(resizeContainer);

// Load the font
const fontLoader = new THREE.FontLoader();
fontLoader.load('https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    // Adding text "TicketMate" with loaded font
    const textGeometry = new THREE.TextGeometry('TicketMate', {
        font: font,
        size: 3.5, // Adjusted text size for bigger size
        height: 0.1, // Adjusted text height for smaller size
        curveSegments: 12,
        bevelEnabled: false
    });
    textGeometry.computeBoundingBox();
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Change color here
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(
        -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x), // Center horizontally
        -0.5 * (textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y), // Center vertically
        0 // Center along z-axis
    );
    scene.add(textMesh);
});

camera.position.z = 100; // Adjusted camera position for smaller size

let animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

let myTween;
function onMouseMove(event) {
    if (myTween)
        myTween.kill();

    let mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    let mouseY = (event.clientY / window.innerHeight) * 2 - 1;
    myTween = gsap.to(particles.rotation, { duration: 0.1, x: mouseY * -1, y: mouseX });
}

document.addEventListener('mousemove', onMouseMove, false);

animate();

let animProps = { scale: 1, xRot: 0, yRot: 0 };
gsap.to(animProps, {
    duration: 10, scale: 0.8, repeat: -1, yoyo: true, ease: 'sine', onUpdate: function () { // Adjusted scale for smaller size
        renderingParent.scale.set(animProps.scale, animProps.scale, animProps.scale);
    }
});

gsap.to(animProps, {
    duration: 120, xRot: Math.PI * 2, yRot: Math.PI * 4, repeat: -1, yoyo: true, ease: 'none', onUpdate: function () {
        renderingParent.rotation.set(animProps.xRot, animProps.yRot, 0);
    }
});
