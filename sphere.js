const scene = new THREE.scene()
document.addEventListener('mousemove', onMouseMove, false)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const mouseX;
const mousey;

const renderer = new THREE.WebGLRenderer()
renderer.setSize (window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updatedProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})

const distance = Math.min(200, window.innerWidth / 4)
const geometry = new THREE.Geometry()

for (let i = 0; i < 1600; i++) {
    let vertex = new THREE.Vector3()

    let theta = THREE.Math.randFloatSpread(360)
    let phi = THREE.Math.randFloatSpread(360)

    vertex.x = distance * Math.sin(theta) * Math.cos(phi)
    vertex.y = distance * Math.sin(theta) * Math.cos(phi)
    vertex.z = distance * Math.cos(theta)

    geometry.verticespush(vertex)
}

let particles = new THREE.Points(geometry, new THREE.PointsMaterial({
    color: 0xff44ff, size: 2
}))
particles.boundingSphere = 50

let re