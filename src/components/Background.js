import { Component, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';

const spawnParticleMaxX = 10
const spawnParticleMaxY = 20
const spawnParticleMaxZ = 10
const particleCount = 500;

const cameraPos = new THREE.Vector3(0, 0, 20)
// gravity_mass*(xyz) / ((x-grav_x)^2 + (y-grav_y)^2 + (z_grav_z)^2 + particle_mass)^(3/2)
// scale velocity off accelartion instead of velocity again
function RotatingCamera() {
    const { camera } = useThree();

    useEffect(() => {
        // Set the initial camera position
        camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);

        // Make the camera look at a specific point (e.g., the center of gravity/origin)
        camera.lookAt(0, 0, 0);

        // Update camera projection matrix if you change any camera parameters
        camera.updateProjectionMatrix();
    }, [camera]);

    useFrame(() => {
        const rotationMatrix = new THREE.Matrix4().makeRotationY(0.00); // Adjust rotation speed as needed
        const rotationMatrixX = new THREE.Matrix4().makeRotationX(0.00);

        // Apply the rotation to the camera's position
        camera.position.applyMatrix4(rotationMatrix);
        camera.position.applyMatrix4(rotationMatrixX);
        camera.lookAt(0, 0, 0); // Ensure the camera always looks at the origin
    });

    return null; // No need to render anything; this component only updates the camera
}


function Particles() {
    const particlesRef = useRef();
    const [particleVelocities] = useState(new Float32Array(particleCount * 3)); // Store velocities as a Float32Array

    const [currentDt, setCurrentDt] = useState(0.001); // Initial delta time
    // State for global variables that can change in real time
    const [gravityCenter] = useState(new THREE.Vector3(0, 0, 0)); // Change this to set the gravity center location
    const [gravityMass, setGravityMass] = useState(100.0); // change to increase strength of gravity toward center

    // modify these variables to alter strength of gravity in a particular xyz direction. (camera is looking in -z direction at origin)
    const [gravityStrengthMultiplierX, setGravityStrengthMultiplierX] = useState(1.0);
    const [gravityStrengthMultiplierY, setGravityStrengthMultiplierY] = useState(0.0001);
    const [gravityStrengthMultiplierZ, setGravityStrengthMultiplierZ] = useState(1.0);

    // Generate random positions only once on mount
    useEffect(() => {
        const positions = new Float32Array(particleCount * 3);
        const geometry = new THREE.BufferGeometry();
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * spawnParticleMaxX; // X
            positions[i * 3 + 1] = (Math.random() - 0.5) * spawnParticleMaxY; // Y
            positions[i * 3 + 2] = (Math.random() - 0.5) * spawnParticleMaxZ; // Z
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        particlesRef.current.geometry = geometry;
    }, []);

    // Effect to update currentDt after 1 second
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentDt(currentDt / 1); // Update delta time after 1 second
        }, 1000); // 1000 milliseconds for 1 second

        // Cleanup timer on component unmount
        return () => clearTimeout(timer);
    });

    useFrame(() => {
        // rest of the code remains the same
        const positionArray = particlesRef.current.geometry.attributes.position.array;

        for (let i = 0; i < positionArray.length; i += 3) {
            const position = new THREE.Vector3(positionArray[i], positionArray[i + 1], positionArray[i + 2])
            const x = position.x;
            const y = position.y;
            const z = position.z;
            const r = position.distanceTo(gravityCenter)
            let vx = particleVelocities[i];
            let vy = particleVelocities[i + 1];
            let vz = particleVelocities[i + 2];

            // Calculate the vector from the gravity center to the particle
            // const gravityVector = new THREE.Vector3(x - gravityCenter.x, y - gravityCenter.y, z - gravityCenter.z);
            // const length = gravityVector.length(); // Get the distance
            // gravity_mass*(xyz) / ((x-grav_x)^2 + (y-grav_y)^2 + (z_grav_z)^2 + particle_mass)^(3/2)
            let dx = gravityMass * (x - gravityCenter.x) / (r ** 3 + (1 / gravityStrengthMultiplierX) ** 1.5) * currentDt;
            let dy = gravityMass * (y - gravityCenter.y) / (r ** 3 + (1 / gravityStrengthMultiplierY) ** 1.5) * currentDt;
            let dz = gravityMass * (z - gravityCenter.z) / (r ** 3 + (1 / gravityStrengthMultiplierZ) ** 1.5) * currentDt;

            // Only apply force if length is non-zero to avoid division by zero
            // Update particle speeds
            vx -= dx;
            vy -= dy;
            vz -= dz;


            // calculate angular vector TODO: revisit this (its constant angular acceleration and i think orbits have locked angular velocities assuming spin of gravity is constant)
            var fromCenter = new THREE.Vector2(x - gravityCenter.x, z - gravityCenter.z);
            fromCenter.normalize();
            var rotationVector = new THREE.Vector2(-fromCenter.y, fromCenter.x)
            rotationVector.multiplyScalar((gravityMass) ** 0.5 / (r ** 2))
            vx -= (rotationVector.x * currentDt)
            vz -= (rotationVector.y * currentDt)

            positionArray[i] += vx;
            positionArray[i + 1] += vy;
            positionArray[i + 2] += vz;

            particleVelocities[i] = vx;
            particleVelocities[i + 1] = vy;
            particleVelocities[i + 2] = vz;
            // console.log(particlesRef.current.geometry.attributes)
        }

        // Notify Three.js to update the position attribute after all changes
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={particlesRef}>
            <pointsMaterial color="white" size={0.1} />
        </points>
    );
}

/**
 * center of gravity
 * points spawn in and are pulled by gravity in 3d space
 * camera pans on page scroll
 * gravity partial derivative equation = d/dt = gravity_mass*(xyz) / ((x-grav_x)^2 + (y-grav_y)^2 + (z_grav_z)^2 + particle_mass)^(3/2)
 * 
 */

class Background extends Component {
    render() {
        return (
            <Canvas
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: -1,
                }}
            >
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <Particles />
                <RotatingCamera />
            </Canvas>
        )
    }
}

export default Background;