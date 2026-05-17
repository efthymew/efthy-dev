import { Component, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {Vector2, Vector3, Matrix4, BufferGeometry, Float32BufferAttribute} from 'three';

const spawnParticleMaxX = 10
const spawnParticleMaxY = 10
const spawnParticleMaxZ = 10
const particleCount = 500;

const cameraPos = new Vector3(0, 0, 20)
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
        const rotationMatrix = new Matrix4().makeRotationY(0.00); // Adjust rotation speed as needed
        const rotationMatrixX = new Matrix4().makeRotationX(0.00);

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

    // State for global variables that can change in real time
    const [gravityCenter] = useState(new Vector3(0, 0, 0)); // Change this to set the gravity center location
    const [gravityMass, setGravityMass] = useState(20.0); // change to increase strength of gravity toward center
    const [desiredOrbitRadius, setDesiredOrbitRadius] = useState(2.0);

    // modify these variables to alter strength of gravity in a particular xyz direction. (camera is looking in -z direction at origin)
    const [gravityStrengthMultiplierX, setGravityStrengthMultiplierX] = useState(1.0);
    const [gravityStrengthMultiplierY, setGravityStrengthMultiplierY] = useState(1.0);
    const [gravityStrengthMultiplierZ, setGravityStrengthMultiplierZ] = useState(1.0);

    // Generate random positions only once on mount
    useEffect(() => {
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const geometry = new BufferGeometry();
        for (let i = 0; i < particleCount; i++) {
            const particle = new Vector3((Math.random() - 0.5) * spawnParticleMaxX, (Math.random() - 0.5) * spawnParticleMaxY, (Math.random() - 0.5) * spawnParticleMaxZ);

            //make rotation vector tilt up to 10 degrees either direction along xz plane
            var rotationVector = new Vector3(-particle.z + gravityCenter.z, 0, particle.x - gravityCenter.x).normalize();
            const angleToRotate = (Math.random() - 0.5) * Math.PI / 2;
            const rotationAxis = new Vector3(0, 1, 0).cross(rotationVector).normalize();
            rotationVector.applyAxisAngle(rotationAxis, angleToRotate);
            rotationVector.multiplyScalar(Math.sqrt(gravityMass / desiredOrbitRadius));

            console.log(rotationVector)
            positions[i * 3] = particle.x; // X
            positions[i * 3 + 1] = particle.y; // Y
            positions[i * 3 + 2] = particle.z; // Z

            particleVelocities[i * 3] = rotationVector.x;
            particleVelocities[i * 3 + 1] = rotationVector.y
            particleVelocities[i * 3 + 2] = rotationVector.z;
        }
        geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
        particlesRef.current.geometry = geometry;
    }, []);

    // pointer hovering
    // const handlePointerMove = (e) => {
    //     if (e.index === undefined) return;
    //     const point = e.point.clone().project(camera);
    //     onHover({
    //         index: e.index,
    //         x: (point.x * 0.5 + 0.5) * size.width,
    //         y: (-point.y * 0.5 + 0.5) * size.height,
    //     });
    // };

    useFrame((state, delta) => {
        // kill logic here if the mount hasnt set the geometry yet
        if (!particlesRef.current?.geometry?.attributes?.position) return;

        delta = Math.min(delta, 0.05);
        const positionArray = particlesRef.current.geometry.attributes.position.array;

        for (let i = 0; i < positionArray.length; i += 3) {
            const position = new Vector3(positionArray[i], positionArray[i + 1], positionArray[i + 2])
            const x = position.x;
            const y = position.y;
            const z = position.z;
            const r = position.distanceTo(gravityCenter)
            let vx = particleVelocities[i];
            let vy = particleVelocities[i + 1];
            let vz = particleVelocities[i + 2];

            // Calculate the vector from the gravity center to the particle
            // const gravityVector = new Vector3(x - gravityCenter.x, y - gravityCenter.y, z - gravityCenter.z);
            // const length = gravityVector.length(); // Get the distance
            // gravity_mass*(xyz) / ((x-grav_x)^2 + (y-grav_y)^2 + (z_grav_z)^2 + particle_mass)^(3/2)
            let dx = gravityMass * (x - gravityCenter.x) / ((r ** 2 + (1 / gravityStrengthMultiplierX)) ** 1.5);
            let dy = gravityMass * (y - gravityCenter.y) / ((r ** 2 + (1 / gravityStrengthMultiplierY)) ** 1.5);
            let dz = gravityMass * (z - gravityCenter.z) / ((r ** 2 + (1 / gravityStrengthMultiplierZ)) ** 1.5);

            // Only apply force if length is non-zero to avoid division by zero
            // Update particle speeds
            vx -= dx * delta;
            vy -= dy * delta;
            vz -= dz * delta;


            // calculate angular vector TODO: revisit this (its constant angular acceleration and i think orbits have locked angular velocities assuming spin of gravity is constant)
            // var fromCenter = new Vector2(x - gravityCenter.x, z - gravityCenter.z);
            // fromCenter.normalize();
            // var rotationVector = new Vector2(-fromCenter.y, fromCenter.x)
            // rotationVector.multiplyScalar((gravityMass) ** 0.5 / (r ** 2))
            // vx -= (rotationVector.x * delta)
            // vz -= (rotationVector.y * delta)

            //dampening since perpendicular forces add energy into the system, leading to the particles expanding outward
            // vx *= 0.999;
            // vy *= 0.999;
            // vz *= 0.999;

            positionArray[i] += vx * delta;
            positionArray[i + 1] += vy * delta;
            positionArray[i + 2] += vz * delta;

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
            <pointsMaterial size={0.1} />
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
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
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