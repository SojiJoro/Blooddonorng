// components/HeroCanvas.jsx
"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { ParticleField } from "./ParticleField";

export default function HeroCanvas() {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <BloodCellMesh />
        <ParticleField count={1000} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
        <spotLight 
          position={[5, 5, 5]} 
          angle={0.3} 
          penumbra={0.8} 
          intensity={1} 
          castShadow 
          color="#e74c3c" 
        />
      </Canvas>
    </div>
  );
}

function BloodCellMesh() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
      meshRef.current.rotation.y += 0.003;
      
      // Gentle pulsing effect
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Main blood cell */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusGeometry args={[5, 1.5, 32, 100]} />
        <meshStandardMaterial
          color="#e74c3c"
          metalness={0.1}
          roughness={0.3}
          emissive="#e74c3c"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Smaller blood cells */}
      <SmallBloodCell position={[8, 3, -2]} scale={0.7} rotation={[0.5, 0.3, 0.2]} />
      <SmallBloodCell position={[-7, -4, 1]} scale={0.8} rotation={[0.2, 0.1, 0.5]} />
      <SmallBloodCell position={[4, -6, -3]} scale={0.6} rotation={[0.7, 0.4, 0.1]} />
      
      {/* Heart shape in the center */}
      <HeartShape position={[0, 0, 0]} />
    </group>
  );
}

function SmallBloodCell({ position, scale, rotation }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      // Orbit around the center
      const time = state.clock.getElapsedTime();
      meshRef.current.position.x = position[0] * Math.cos(time * 0.2);
      meshRef.current.position.y = position[1] * Math.sin(time * 0.3);
      meshRef.current.position.z = position[2] * Math.sin(time * 0.2);
      
      // Self rotation
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} rotation={rotation} castShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#e74c3c"
        metalness={0.1}
        roughness={0.4}
        emissive="#e74c3c"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

function HeartShape({ position }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      // Pulsing effect for the heart
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
      
      // Gentle rotation
      meshRef.current.rotation.y += 0.005;
    }
  });

  // Create a heart shape using a custom geometry
  const createHeartShape = () => {
    const shape = new THREE.Shape();
    
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0, -1, -2, -2, -4, 0);
    shape.bezierCurveTo(-6, 2, -6, 4, -4, 6);
    shape.bezierCurveTo(-2, 8, 0, 8, 0, 6);
    shape.bezierCurveTo(0, 8, 2, 8, 4, 6);
    shape.bezierCurveTo(6, 4, 6, 2, 4, 0);
    shape.bezierCurveTo(2, -2, 0, -1, 0, 0);
    
    const extrudeSettings = {
      depth: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.5,
      bevelThickness: 0.5
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  };

  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      scale={0.3} 
      rotation={[Math.PI, 0, 0]}
      castShadow
    >
      <torusKnotGeometry args={[2, 0.5, 128, 32, 2, 3]} />
      <meshStandardMaterial
        color="#2d5242"
        metalness={0.2}
        roughness={0.3}
        emissive="#2d5242"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}