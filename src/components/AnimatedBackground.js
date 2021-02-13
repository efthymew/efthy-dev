import { Component } from "react";
import * as THREE from "three";

class AnimatedBackground extends Component {

    componentDidMount() {
        // from THREE.js examples
        var generateSprite = function () {

            var canvas = document.createElement('canvas');
            canvas.width = 16;
            canvas.height = 16;

            var context = canvas.getContext('2d');
            var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
            gradient.addColorStop(0, 'rgba(255,255,255,1)');
            gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
            gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
            gradient.addColorStop(1, 'rgba(0,0,0,1)');
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);

            var texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            return texture;

        }

        var createParticleSystem = function (geom) {
            
            var material = new THREE.PointsMaterial({
                color: 0xffffff,
                size: 3,
                blending: THREE.AdditiveBlending,
                map: generateSprite()
            });

            var system = new THREE.Points(geom, material);
            system.sortParticles = true;
            return system;
        }
        const radius = 40;
        const tube = 28.2;
        const radialSegments = 600;
        const tubularSegments = 12;
        const p = 5;
        const q = 4;
        const heightScale = 4;
        const rotate = true;
        // create a scene, that will hold all our elements such as objects, cameras and lights.
        var scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        // create a render and set the size
        var webGLRenderer = new THREE.WebGLRenderer(); // init like this
        webGLRenderer.setClearColor( 0x000000, 1 ); // second param is opacity, 0 => transparent
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
        webGLRenderer.shadowMap.enabled = true;


        // position and point the camera to the center of the scene
        camera.position.x = -30;
        camera.position.y = 40;
        camera.position.z = 50;
        camera.lookAt(new THREE.Vector3(10, 0, 0));

        //mount it
        this.mount.appendChild(webGLRenderer.domElement);
        var geom = new THREE.TorusKnotGeometry(radius, tube, Math.round(radialSegments), Math.round(tubularSegments), Math.round(p), Math.round(q), heightScale);
        var step = 0;
        var knot = createParticleSystem(geom);
        scene.add(knot)

        var animate = function () {
            if (rotate) {
                knot.rotation.y = step += 0.0005;
            }
            // render using requestAnimationFrame
            requestAnimationFrame(animate);
            webGLRenderer.render(scene, camera);
        };
        animate();
    }

    render() {
        return (
            <div style={{position: 'fixed'}} ref={ref => (this.mount = ref)} />
        )
    }
}

export default AnimatedBackground;