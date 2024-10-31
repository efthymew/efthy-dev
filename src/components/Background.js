import { Component, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';

function RotatingCamera() {
    const { camera } = useThree();

    useFrame(({ clock }) => {
        const rotationMatrix = new THREE.Matrix4().makeRotationY(0.01); // Adjust rotation speed as needed

        // Apply the rotation to the camera's position
        camera.position.applyMatrix4(rotationMatrix);
        camera.lookAt(0, 0, 0); // Ensure the camera always looks at the origin
    });

    return null; // No need to render anything; this component only updates the camera
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
                <RotatingCube />
                <RotatingCamera />
            </Canvas>
        )
    }
}

export default Background;