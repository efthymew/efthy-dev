import { Component } from "react";
import '../css/AnimatedBackground.css';
//import * as THREE from "three";
//import SimplexNoise from 'simplex-noise';
import Particles from 'react-tsparticles';

class AnimatedBackground extends Component {

    // componentDidMount() {
    //     // create a scene, that will hold all our elements such as objects, cameras and lights.
    //     var scene = new THREE.Scene();
    //     var simplex = new SimplexNoise();
    //     var dpr = window.devicePixelRatio;
    //     var width = window.innerWidth * dpr;
    //     var height = window.innerHeight * dpr;

    //     // create a camera, which defines where we're looking at.
    //     var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    //     // create a render and set the size
    //     var webGLRenderer = new THREE.WebGLRenderer(); // init like this
    //     webGLRenderer.setClearColor(0x000000, 1); // second param is opacity, 0 => transparent
    //     webGLRenderer.setSize(width, height, false);
    //     webGLRenderer.domElement.style.height = '100%';
    //     webGLRenderer.domElement.style.width = '100%';
    //     webGLRenderer.shadowMap.enabled = true;

    //     //mount it
    //     this.mount.appendChild(webGLRenderer.domElement);
    //     // position and point the camera to the center of the scene

    //     camera.position.x = 0;
    //     camera.position.y = 0;
    //     camera.position.z = -125;
    //     camera.lookAt(new THREE.Vector3(0, 0, 0));

    //     var z = 0;
    //     var getValue = function (x, y) {
    //         var scale = 0.005;
    //         return simplex.noise2D(x * scale, y * scale) * Math.PI * 2;
    //     }
    //     // steps:
    //     // generate noise flowfield
    //     // generate particles
    //     // have particles movement influenced by flowfield
    //     // have mouse movement influence flowfield

    //     var animate = function () {
    //         webGLRenderer.clear();
    //         const geometry = new THREE.SphereGeometry(5, 100, 100);
    //         const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    //         const sphere = new THREE.Mesh(geometry, material);
    //         scene.add(sphere);
    //         //render scene
    //         requestAnimationFrame(animate);
    //         webGLRenderer.render(scene, camera);


    //     };

    //     var timestamp = null;
    //     var lastMouseX = null;
    //     var lastMouseY = null;

    //     document.body.addEventListener("mousemove", function (e) {
    //         if (timestamp === null) {
    //             timestamp = Date.now();
    //             lastMouseX = e.screenX;
    //             lastMouseY = e.screenY;
    //             return;
    //         }

    //         var now = Date.now();
    //         var dt = now - timestamp;
    //         var dx = e.screenX - lastMouseX;
    //         var dy = e.screenY - lastMouseY;
    //         var speedX = Math.round(dx / dt * 100);
    //         var speedY = Math.round(dy / dt * 100);
    //         console.log(speedX, speedY);
    //         timestamp = now;
    //         lastMouseX = e.screenX;
    //         lastMouseY = e.screenY;
    //     });
    //     animate();


    //     window.addEventListener('resize', function () {

    //         camera.aspect = window.innerWidth / window.innerHeight;
    //         camera.updateProjectionMatrix();

    //         webGLRenderer.setSize(window.innerWidth * dpr, window.innerHeight * dpr, false);
    //     }, false);
    // }

    render() {
        // return (
        //     <div style={{ height: '100%', width: '100%', position: 'fixed' }} ref={ref => (this.mount = ref)} />
        // )
        return (
            <Particles
                className='surrounder'
                width='100%'
                height='100%'
                options={{
                    background: {
                        color: {
                            value: "#000000",
                        },
                    },
                    fpsLimit: 144,
                    interactivity: {
                        detectsOn: "canvas",
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 0.8,
                                size: 40,
                            },
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 100,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outMode: "bounce",
                            random: false,
                            speed: 6,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                value_area: 800,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            random: true,
                            value: 5,
                        },
                    },
                    detectRetina: true,
                }}
            />
        );
    }
}

export default AnimatedBackground;