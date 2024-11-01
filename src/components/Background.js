import { Component, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';

const gravityCenter = new THREE.Vector3(0, 0, 0); // Change this to set the gravity center location
const gravityDt = 0.0001; // Adjust this value to change the force applied good rule of thumb: 1 / gravityMass * particleMass
const gravityMass = 10
const particleMass = 10

// gravity_mass*(xyz) / ((x-grav_x)^2 + (y-grav_y)^2 + (z_grav_z)^2 + particle_mass)^(3/2)
// scale velocity off accelartion instead of velocity again
function RotatingCamera() {
    const { camera } = useThree();
    const x = gravityCenter.x
    const y = gravityCenter.y
    const z = gravityCenter.z

    useEffect(() => {
        // Set the initial camera position
        camera.position.set(0, 25, 0);

        // Make the camera look at a specific point (e.g., the origin)
        camera.lookAt(0, 0, 0);

        // Update camera projection matrix if you change any camera parameters
        camera.updateProjectionMatrix();
    }, [camera]);

    useFrame(({ clock }) => {
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
    const particleCount = 500;
    const particlesRef = useRef();
    const startTimeRef = useRef(null);
    const geometry = new THREE.BufferGeometry();
    const particleVelocities = Array(particleCount * 3).fill(0.0);

    // Generate random positions
    let positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10; // X
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // Y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    useFrame(({ clock }) => {
        if (startTimeRef.current === null) {
            startTimeRef.current = clock.getElapsedTime();
        }
    
        const elapsedTime = (clock.getElapsedTime() - startTimeRef.current) * 1000;
    
        // Run logic only if elapsed time exceeds gravityDt
        if (elapsedTime < gravityDt) return;
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
            const dx = (gravityMass*particleMass*x / ((x-gravityCenter.x)**2 + (y-gravityCenter.y)**2 + (z-gravityCenter.z)**2 + particleMass)**1.5) * gravityDt
            const dy = (gravityMass*particleMass*y / ((x-gravityCenter.x)**2 + (y-gravityCenter.y)**2 + (z-gravityCenter.z)**2 + particleMass)**1.5) * gravityDt
            const dz = (gravityMass*particleMass*z / ((x-gravityCenter.x)**2 + (y-gravityCenter.y)**2 + (z-gravityCenter.z)**2 + particleMass)**1.5) * gravityDt

            // Only apply force if length is non-zero to avoid division by zero
            // Update particle speeds
            vx -= dx;
            vy -= dy;
            vz -= dz;


            // calculate angular vector
            var fromCenter = new THREE.Vector2(x, z);
            fromCenter.normalize();
            var rotationVector = new THREE.Vector2(-fromCenter.y, fromCenter.x)
            rotationVector.multiplyScalar((gravityMass*particleMass)**0.5/(r**2))
            vx -= (rotationVector.x * gravityDt)
            vz -= (rotationVector.y * gravityDt)

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
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial color="white" size={0.1} />
        </points>
    );
}

function RotatingCube() {
    const cubeRef = useRef();

    // Rotate the cube on each frame
    useFrame(() => {
        if (cubeRef.current) {
            cubeRef.current.rotation.x += 0.00;
            cubeRef.current.rotation.y += 0.00;
        }
    });

    return (
        <mesh ref={cubeRef}>
            <boxGeometry args={[1, 1, 1]} /> {/* Cube with width, height, depth of 1 */}
            <meshStandardMaterial color="white" />
        </mesh>
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