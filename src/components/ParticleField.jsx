// components/ParticleField.jsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ParticleField({ count = 1000 }) {
  const mesh = useRef();

  // Generate particle positions
  const particles = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    particles[i * 3 + 0] = (Math.random() - 0.5) * 100;
    particles[i * 3 + 1] = (Math.random() - 0.5) * 100;
    particles[i * 3 + 2] = (Math.random() - 0.5) * 100;
  }

  // Rotate particles slowly over time
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.0005;
      mesh.current.rotation.x += 0.0003;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        color="#ffffff"
        size={0.5}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.3}
        depthWrite={false}
      />
    </points>
  );
}
