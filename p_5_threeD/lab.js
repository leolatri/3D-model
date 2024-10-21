import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let canvas = document.getElementById('myscene');
let width = 1400;
let height = 800;

let renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.setSize(width, height);
renderer.setClearColor(0x000000);

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
camera.position.set(0, 0, 300);

let group = new THREE.Group();

scene.add(group);


document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                let canvas2d = document.createElement('canvas');
                let ctx = canvas2d.getContext('2d');
                canvas2d.width = 200;
                canvas2d.height = 200;

                ctx.drawImage(img, 0, 0, 200, 200);
                let size = 200;
                let data = ctx.getImageData(0, 0, size, size).data;

                group.clear();

                for (let i = 0; i < size; ++i) {
                    let geometry = new THREE.BufferGeometry();
                    let vertices = new Float32Array(size * 3);
                    let colors = new Float32Array(size * 3); 

                    for (let j = 0; j < size; ++j) {
                        let colorIndex = (j * size + i) * 4; 
                        let r = data[colorIndex] / 255; 
                        let g = data[colorIndex + 1] / 255; 
                        let b = data[colorIndex + 2] / 255;

                        vertices[j * 3] = j - 100; 
                        vertices[j * 3 + 1] = i - 100; 
                        vertices[j * 3 + 2] = data[colorIndex] / 10; 

                        colors[j * 3] = r;
                        colors[j * 3 + 1] = g; 
                        colors[j * 3 + 2] = b; 
                    }

                    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
                    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

                    let material = new THREE.LineBasicMaterial({ vertexColors: true });
                    let line = new THREE.Line(geometry, material);
                    group.add(line);
                }
            };
            img.src = e.target.result; 
            
        };
        reader.readAsDataURL(file); 
       
    }
});
group.rotateZ(-Math.PI/2);

let controls = new OrbitControls(camera, renderer.domElement);

function animation() {
    requestAnimationFrame(animation);
    controls.update();
    renderer.render(scene, camera);
}
animation();
