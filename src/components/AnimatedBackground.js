import { Component } from "react";
import * as THREE from "three";
import SimplexNoise from 'simplex-noise';

class AnimatedBackground extends Component {

    componentDidMount() {
        // create a scene, that will hold all our elements such as objects, cameras and lights.
        var scene = new THREE.Scene();
        var simplex = new SimplexNoise();
        var width = window.innerWidth;
        var height = window.innerHeight;
        // create a camera, which defines where we're looking at.
        var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

        // create a render and set the size
        var webGLRenderer = new THREE.WebGLRenderer(); // init like this
        webGLRenderer.setClearColor(0x000000, 1); // second param is opacity, 0 => transparent
        webGLRenderer.setSize(width, height);
        webGLRenderer.shadowMap.enabled = true;

        //mount it
        this.mount.appendChild(webGLRenderer.domElement);
        // position and point the camera to the center of the scene
        camera.position.x = width / 2;
        camera.position.y = height / 2;
        camera.position.z = -500;
        camera.lookAt(new THREE.Vector3(width / 2, height / 2, 0));

        var z = 0;

        var getValue = function (x, y) {
            var scale = 0.005;
            return simplex.noise3D(x * scale, y * scale, z) * Math.PI * 2;
        }

        var animate = function () {
            webGLRenderer.clear();
            for (var y = 0; y < height; y += 5) {
                var p = {
                    x: width / 2,
                    y: y,
                    vx: 0,
                    vy: 0
                };
                var path = new THREE.Path([new THREE.Vector2(p.x, p.y)]);

                for (var i = 0; i < 500; i++) {
                    var value = getValue(p.x, p.y);
                    p.vx += Math.cos(value) * 0.1;
                    p.vy += Math.sin(value) * 0.1;
                    p.x += p.vx;
                    p.y += p.vy;
                    path.lineTo(p.x, p.y);

                    p.vx *= 0.99;
                    p.vy *= 0.99;
                }
                const points = path.getPoints();

                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const material = new THREE.LineBasicMaterial({ color: 0xffffff });

                const line = new THREE.Line(geometry, material);
                scene.add(line);
            }
            z += 0.0005;
            //render scene
            webGLRenderer.render(scene, camera);
            //requestAnimationFrame(animate);

        };
        animate();
    }

    render() {
        return (
            <div style={{ position: 'fixed' }} ref={ref => (this.mount = ref)} />
        )
    }
}

export default AnimatedBackground;