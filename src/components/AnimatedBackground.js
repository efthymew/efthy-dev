import { Component } from "react";
import '../css/AnimatedBackground.css';
//import * as THREE from "three";
//import SimplexNoise from 'simplex-noise';
import Particles from 'react-tsparticles';

class AnimatedBackground extends Component {
    
    render() {
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
                            resize: true
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